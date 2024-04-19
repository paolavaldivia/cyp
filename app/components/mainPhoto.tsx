import main from '../images/photos/cyp-0.jpeg';

export function MainPhoto() {
    return (
        <div className="main-photo">
            <img className="photo" src={main} alt="Céline y Paola"/>
            {/*<img className="back" src={backMain} alt=""/>*/}
        </div>
    )
}