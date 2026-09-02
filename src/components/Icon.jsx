/**
 * Material Symbols ikonu. Orijinal tasarımda 76 yerde tekrar eden
 * inline font-family span'ının yerini alır.
 */
export default function Icon({ name, size = 20, fill = 0, color, style }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontFamily: "'Material Symbols Outlined'",
        fontSize: size,
        lineHeight: 1,
        color,
        fontVariationSettings: `'FILL' ${fill}`,
        textTransform: 'none',
        ...style
      }}
    >
      {name}
    </span>
  );
}
