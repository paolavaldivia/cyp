import { useLoaderData } from "@remix-run/react";
import { IndexData } from "~/routes/_index";

export function MainPhoto() {
  const { selectedImage } = useLoaderData<IndexData>();

  return (
    <div className="main-photo">
      <img className="photo" src={selectedImage} alt="Céline y Paola" />
      {/*<img className="back" src={backMain} alt=""/>*/}
    </div>
  );
}
