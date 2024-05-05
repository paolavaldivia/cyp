import { useState } from "react";
import { Form } from "@remix-run/react";
import { clsx } from "clsx";
import { Guest } from "../../src/domain/guest";

interface RSVPFormProps {
  isSubmitting: boolean;
  errors: Record<string, string>;
  guest?: Guest;
}

export const RsvpForm = ({ isSubmitting, errors, guest }: RSVPFormProps) => {
  const [plusOneChecked, setPlusOneChecked] = useState(guest?.plusOne || false);

  return (
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
            defaultValue={guest?.name}
          />
        </label>
        <div
          className={clsx("rsvp-input-error-message", !!errors.first && "show")}
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
            defaultValue={guest?.lastName}
          />
        </label>
        <div
          className={clsx("rsvp-input-error-message", !!errors.last && "show")}
        >
          {errors.last + " "}
        </div>
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
        </label>
        <div
          className={clsx("rsvp-input-error-message", !!errors.email && "show")}
        >
          {errors.email + " "}
        </div>
      </div>
      <div>
        <label>
          Teléfono (WhatsApp de preferencia):
          <input
            type="text"
            name="phone"
            disabled={isSubmitting}
            className={clsx("rsvp-input required", errors.phone && "error")}
            defaultValue={guest?.phone}
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
            className={clsx("rsvp-input required", errors.attend && "error")}
            name="attend"
            disabled={isSubmitting}
            defaultValue={!guest ? "" : guest?.attend ? "yes" : "no"}
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
            defaultChecked={guest?.plusOne}
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
      <label>
        Nombre de tu acompañante:
        <input
          className={clsx("rsvp-input", errors.plusOneName && "error")}
          type="text"
          name="plusOneName"
          disabled={isSubmitting || !plusOneChecked}
          defaultValue={guest?.plusOneName || ""}
        />
      </label>
      <label>
        Apellido de tu acompañante:
        <input
          className={clsx("rsvp-input", errors.plusOneLastName && "error")}
          type="text"
          name="plusOneLastName"
          disabled={isSubmitting || !plusOneChecked}
          defaultValue={guest?.plusOneLastName || ""}
        />
      </label>
      <label>
        Llevarás niños? Cuántos?
        <select
          className={clsx("rsvp-input required", errors.kids && "error")}
          name="kids"
          disabled={isSubmitting}
          defaultValue={guest?.kids || "0"}
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
          defaultValue={guest?.comments || ""}
        />
      </label>
      <button type="submit" className="rsvp-button" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </Form>
  );
};
