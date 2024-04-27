import { getHexColor } from "../../src/utils/colorUtils";

const paletteColors = [
  "--color-primary",
  "--color-primary-variant-1",
  "--color-primary-variant-2",
  "--color-secondary",
  "--color-secondary-variant-1",
  "--color-secondary-variant-2",
  "--color-tertiary",
  "--color-tertiary-variant-1",
  "--color-tertiary-variant-2",
];

export function ColorPaletteClient() {
  return (
    <div className="palette">
      {paletteColors.map((color) => {
        const colorHex = getHexColor(color);
        return (
          <div
            key={color}
            className="color"
            style={{ backgroundColor: `var(${color})` }}
          >
            <span>{colorHex}</span>
          </div>
        );
      })}
    </div>
  );
}
