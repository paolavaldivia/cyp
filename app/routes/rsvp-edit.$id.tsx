import {
  ActionFunctionArgs,
  json,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { invariant } from "@remix-run/router/history";

import styles from "~/styles/rsvp.css?url";
import { RsvpForm } from "~/components/rsvpForm";
import { toInputErrors } from "~/models/toInputErrors";
import { formSchema } from "~/models/formSchema";
import { redirect } from "@remix-run/router";
import { ZodError } from "zod";
import { repository } from "~/repository/repository";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  invariant(params.id, "Missing guest id param");
  const guest = await repository.getGuest(params.id, context);
  if (!guest) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ guest });
};

export default function RsvpEdit() {
  const { guest } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData<typeof action>();
  const errors = toInputErrors(actionData);

  return (
    <div className="rsvp-container">
      <div className="rsvp-content">
        <h1>Actualiza tu RSVP</h1>
        <RsvpForm isSubmitting={isSubmitting} errors={errors} guest={guest} />
      </div>
    </div>
  );
}

export const action = async ({
  request,
  context,
  params,
}: ActionFunctionArgs) => {
  invariant(params.id, "Missing guest id param");
  const formPayload = Object.fromEntries(await request.formData());
  const id = params.id;
  console.log({ formPayload });
  try {
    const parsed = formSchema.parse(formPayload);
    console.log({ parsed });
    const response = await repository.rsvpUpdate(id, parsed, context);
    return redirect(`/rsvp-confirm/${response.id}`);
  } catch (error) {
    console.error(`form not submitted ${error}`);
    if (error instanceof ZodError) {
      return json(error);
    }
    return json({ error });
  }
};
