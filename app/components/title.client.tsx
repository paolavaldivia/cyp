export function TitleClient() {
  const hostname = typeof window !== "undefined" && window.location?.hostname;
  const title =
    hostname && hostname.includes("paolayceline.com")
      ? "Paola y Céline"
      : "Céline y Paola";
  return <h1> {title}</h1>;
}
