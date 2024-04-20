import styles from "~/styles/rsvp.css?url";
import {ActionFunctionArgs, json, LinksFunction} from "@remix-run/cloudflare";
import {redirect} from "@remix-run/router";
import {rsvp} from "~/repository/prismaRepository";
import {clsx} from "clsx";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import {ZodError} from "zod";
import {toInputErrors} from "~/routes/toInputErrors";
import {formSchema} from "~/routes/formSchema";


export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
];

export default function RSVP() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const actionData = useActionData<typeof action>();
    const errors = toInputErrors(actionData);


    return (
        <div className="rsvp-container">
            <div className="rsvp-content">
                <h1>RSVP</h1>
                <Form className={clsx("rsvp-form", isSubmitting && "submitting")} method="post">
                    <label>
                        Nombre:
                        <input type="text" name="first" disabled={isSubmitting} className={
                            clsx("rsvp-input required", errors.first && "error")
                        }/>
                        <div
                            className={clsx("rsvp-input-error-message", !!errors.first && "show")}>{errors.first + " "}</div>
                    </label>
                    <label>
                        Apellido:
                        <input type="text" name="last" disabled={isSubmitting}
                               className={clsx("rsvp-input required", errors.last && "error")}/>
                        <div
                            className={clsx("rsvp-input-error-message", !!errors.last && "show")}>{errors.last + " "}</div>
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" disabled={isSubmitting}
                               className={clsx("rsvp-input", errors.email && "error")}/>
                        <div
                            className={clsx("rsvp-input-error-message", !!errors.email && "show")}>{errors.email + " "}</div>
                    </label>
                    <label>
                        Teléfono (WhatsApp de preferencia):
                        <input type="text" name="phone" disabled={isSubmitting} className={
                            clsx("rsvp-input required", errors.phone && "error")
                        }/>
                        <div
                            className={clsx("rsvp-input-error-message", !!errors.phone && "show")}>{errors.phone + " "}</div>
                    </label>
                    <label>
                        Vas a asistir?
                        <select className={clsx("rsvp-input required", errors.attend && "error")}
                                name="attend" disabled={isSubmitting}>
                            <option value="">Selecciona...</option>
                            <option value="yes">Sí</option>
                            <option value="no">No</option>
                        </select>
                        <div
                            className={clsx("rsvp-input-error-message", !!errors.attend && "show")}>{errors.attend + " "}</div>
                    </label>
                    <button type="submit" className="rsvp-button" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                </Form>
            </div>
        </div>
    );
}

export const action = async ({request, context}: ActionFunctionArgs) => {
    const formPayload = Object.fromEntries(await request.formData());
    try {
        const parsed = formSchema.parse(formPayload);
        const response = await rsvp(parsed, context);
        return redirect(`/rsvp-confirm/${response.id}`);
    } catch (error) {
        console.error(`form not submitted ${error}`)
        if (error instanceof ZodError) {
            return json(error);
        }
        return json({error})
    }
};