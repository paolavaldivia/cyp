const n = 8;
const imagePaths = Array.from(
  { length: n },
  (_, i) => `/images/photos/cyp_${i}.jpg`,
);

export function MainPhoto() {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const selectedImage = imagePaths[randomIndex];
  return (
    <div className="main-photo">
      <img className="photo" src={selectedImage} alt="Céline y Paola" />
    </div>
  );
}
