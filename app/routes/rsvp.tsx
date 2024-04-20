import styles from "~/styles/rsvp.css?url";
import {ActionFunctionArgs, LinksFunction} from "@remix-run/cloudflare";
import {redirect} from "@remix-run/router";
import {rsvp} from "~/data/data";
import {clsx} from "clsx";
import {Form, useNavigation} from "@remix-run/react";


export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
];

export default function RSVP() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="rsvp-container">
            <div className="rsvp-content">
                <h1>RSVP</h1>
                <Form className={clsx("rsvp-form", isSubmitting && "submitting")} method="post">
                    <label>
                        Nombre:
                        <input type="text" name="first" disabled={isSubmitting} className="rsvp-input"/>
                    </label>
                    <label>
                        Apellido:
                        <input type="text" name="last" disabled={isSubmitting} className="rsvp-input"/>
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" disabled={isSubmitting} className="rsvp-input"/>
                    </label>
                    <label>
                        Teléfono (WhatsApp de preferencia):
                        <input type="text" name="rsvp" disabled={isSubmitting} className="rsvp-input"/>
                    </label>
                    <label>
                        Vas a asistir?
                        <select className="rsvp-input"  disabled={isSubmitting} >
                            <option value="">Selecciona...</option>
                            <option value="yes">Sí</option>
                            <option value="no">No</option>
                        </select>
                    </label>
                    <button type="submit" className="rsvp-button" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                </Form>
            </div>
        </div>
    );
}

export const action = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const response = await rsvp(updates);
    return redirect(`/rsvp-confirm/${response.id}`);
};