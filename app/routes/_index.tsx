import type {LinksFunction, MetaFunction} from "@remix-run/cloudflare";

import styles from "~/styles/home.css?url";
import divider from "~/images/divider.svg";
import {MainPhoto} from "~/components/mainPhoto";
import {CardRound} from "~/components/cardRound";

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
];

export const meta: MetaFunction = () => {
    return [
        {title: "Céline y Paola"},
        {
            name: "Céline y Paola se casan",
            content: "Bienvenidos a la boda de Céline y Paola",
        },

    ];
};

export default function Index() {
    return (
        <div className="container">
            <div className="home-main">
                <MainPhoto/>
                <h1>Céline y Paola</h1>
                <img src={divider} alt="" height={20}/>
                <div className="home-main-content">
                    <div className="home-main-description">
                        <p>
                            ¡Bienvenidos a nuestra boda! <br/> Estamos muy emocionadas de compartir este día con
                            ustedes.
                        </p>
                        <p>
                            La ceremonia se llevará a cabo el 24 de Agosto en Arequipa (dirección exacta a ser
                            confirmada).
                        </p>
                        <p>
                            Únete a nosotros para celebrar este día tan especial.
                        </p>
                    </div>
                    <img src={divider} alt="" height={20}/>
                    <button>RSVP</button>
                    <p> antes del 2 de junio</p>
                </div>
            </div>
            {/*<CardRound orientation="left" className="home-story">*/}
            {/*    Nuestra historia*/}
            {/*</CardRound>*/}
            {/*<CardRound orientation="right" className="home-faq">*/}
            {/*    Información*/}
            {/*</CardRound>*/}
        </div>
    );
}
