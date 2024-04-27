export function hslToHex(hsl: string) {
  const hslValues = hsl.match(/\d+/g)!.map(Number);
  const [h, s, l] = hslValues;
  const s1 = s / 100;
  const l1 = l / 100;
  let c = (1 - Math.abs(2 * l1 - 1)) * s1;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l1 - c / 2;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (h >= 0 && h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (h >= 60 && h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (h >= 120 && h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (h >= 180 && h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (h >= 240 && h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else if (h >= 300 && h < 360) {
    r1 = c;
    g1 = 0;
    b1 = x;
  }
  let r = Math.floor((r1 + m) * 255).toString(16);
  let g = Math.floor((g1 + m) * 255).toString(16);
  let b = Math.floor((b1 + m) * 255).toString(16);
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;
  return `#${r}${g}${b}`;
}

export function getHexColor(cssVar: string) {
  const style = window.getComputedStyle(document.body);
  const hsl = style.getPropertyValue(cssVar).trim();
  const hex = hslToHex(hsl);
  console.log(hex);
  return hex;
}
