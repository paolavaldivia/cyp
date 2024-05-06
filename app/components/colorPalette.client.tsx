import { getHexColor } from "../../src/utils/colorUtils";

export function ColorPaletteClient({
  paletteColors,
}: {
  paletteColors: string[];
}) {
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
