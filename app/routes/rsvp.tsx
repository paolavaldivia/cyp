import styles from "~/styles/rsvp.css?url";
import { ActionFunctionArgs, json, LinksFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/router";
import { useActionData, useNavigation } from "@remix-run/react";
import { ZodError } from "zod";
import { toInputErrors } from "~/models/toInputErrors";
import { formSchema } from "~/models/formSchema";
import { RsvpForm } from "~/components/rsvpForm";
import { PrismaRepository } from "~/repository/prismaRepository";
import { context } from "esbuild";
import { repository } from "~/repository/repository";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function RSVP() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData<typeof action>();
  const errors = toInputErrors(actionData);

  return (
    <div className="rsvp-container">
      <div className="rsvp-content">
        <h1>RSVP</h1>
        <RsvpForm isSubmitting={isSubmitting} errors={errors} />
      </div>
    </div>
  );
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const formPayload = Object.fromEntries(await request.formData());
  console.log({ formPayload });
  try {
    const parsed = formSchema.parse(formPayload);
    console.log({ parsed });
    const response = await repository.rsvp(parsed, context);
    return redirect(`/rsvp-confirm/${response.id}`);
  } catch (error) {
    console.error(`form not submitted ${error}`);
    if (error instanceof ZodError) {
      return json(error);
    }
    return json({ error });
  }
};
