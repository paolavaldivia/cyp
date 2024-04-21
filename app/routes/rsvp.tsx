import styles from "~/styles/rsvp.css?url";
import { ActionFunctionArgs, json, LinksFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/router";
import { rsvp } from "~/repository/prismaRepository";
import { clsx } from "clsx";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { ZodError } from "zod";
import { toInputErrors } from "~/routes/toInputErrors";
import { formSchema } from "~/routes/formSchema";
import { useState } from "react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function RSVP() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData<typeof action>();
  const errors = toInputErrors(actionData);
  const [plusOneChecked, setPlusOneChecked] = useState(false);

  return (
    <div className="rsvp-container">
      <div className="rsvp-content">
        <h1>RSVP</h1>
        <Form
          className={clsx("rsvp-form", isSubmitting && "submitting")}
          method="post"
        >
          <div>
            <label>
              Nombre:
              <input
                type="text"
                name="first"
                disabled={isSubmitting}
                className={clsx("rsvp-input required", errors.first && "error")}
              />
            </label>
            <div
              className={clsx(
                "rsvp-input-error-message",
                !!errors.first && "show",
              )}
            >
              {errors.first + " "}
            </div>
          </div>
          <div>
            <label>
              Apellido:
              <input
                type="text"
                name="last"
                disabled={isSubmitting}
                className={clsx("rsvp-input required", errors.last && "error")}
              />
              <div
                className={clsx(
                  "rsvp-input-error-message",
                  !!errors.last && "show",
                )}
              >
                {errors.last + " "}
              </div>
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                disabled={isSubmitting}
                className={clsx("rsvp-input", errors.email && "error")}
              />
              <div
                className={clsx(
                  "rsvp-input-error-message",
                  !!errors.email && "show",
                )}
              >
                {errors.email + " "}
              </div>
            </label>
          </div>
          <div>
            <label>
              Teléfono (WhatsApp de preferencia):
              <input
                type="text"
                name="phone"
                disabled={isSubmitting}
                className={clsx("rsvp-input required", errors.phone && "error")}
              />
              <div
                className={clsx(
                  "rsvp-input-error-message",
                  !!errors.phone && "show",
                )}
              >
                {errors.phone + " "}
              </div>
            </label>
          </div>
          <div>
            <label>
              Vas a asistir?
              <select
                className={clsx(
                  "rsvp-input required",
                  errors.attend && "error",
                )}
                name="attend"
                disabled={isSubmitting}
              >
                <option value="">Selecciona...</option>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
              <div
                className={clsx(
                  "rsvp-input-error-message",
                  !!errors.attend && "show",
                )}
              >
                {errors.attend + " "}
              </div>
            </label>
          </div>
          <div>
            <label>
              Vas a llevar acompañante?
              <input
                className={clsx("rsvp-input-checkbox")}
                type="checkbox"
                name="plusOne"
                disabled={isSubmitting}
                onChange={(e) => setPlusOneChecked(e.target.checked)}
              />
              <div
                className={clsx(
                  "rsvp-input-error-message",
                  !!errors.plusOne && "show",
                )}
              >
                {errors.plusOne + " "}
              </div>
            </label>
          </div>
          {plusOneChecked && (
            <>
              <label>
                Nombre de tu acompañante:
                <input
                  className={clsx("rsvp-input", errors.plusOneName && "error")}
                  type="text"
                  name="plusOneName"
                  disabled={isSubmitting}
                />
              </label>
              <label>
                Apellido de tu acompañante:
                <input
                  className={clsx(
                    "rsvp-input",
                    errors.plusOneLastName && "error",
                  )}
                  type="text"
                  name="plusOneLastName"
                  disabled={isSubmitting}
                />
              </label>
            </>
          )}
          <label>
            Llevarás niños? Cuántos?
            <select
              className={clsx("rsvp-input required", errors.kids && "error")}
              name="kids"
              disabled={isSubmitting}
              defaultValue={0}
            >
              <option value="0">Ninguno</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
          <label>
            Comentarios adicionales:
            <textarea
              className={clsx("rsvp-input-textarea")}
              name="comments"
              disabled={isSubmitting}
            />
          </label>
          <button type="submit" className="rsvp-button" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </Form>
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
    const response = await rsvp(parsed, context);
    return redirect(`/rsvp-confirm/${response.id}`);
  } catch (error) {
    console.error(`form not submitted ${error}`);
    if (error instanceof ZodError) {
      return json(error);
    }
    return json({ error });
  }
};
