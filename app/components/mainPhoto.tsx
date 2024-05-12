export function MainPhoto({ selectedImage }: { selectedImage: string }) {
  return (
    <div className="main-photo">
      <img className="photo" src={selectedImage} alt="Céline y Paola" />
    </div>
  );
}
