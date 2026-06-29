// Leaf-scallop transition between bands. `from` = colour of the section above
// (the svg background), `to` = this section's colour (the scallop fill).
export function JungleDivider({ from, to }: { from: string; to: string }) {
  return (
    <svg
      className="divider-j"
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ background: from }}
    >
      <path
        d="M0,70 C120,10 240,10 360,40 C480,70 600,5 720,30 C840,55 960,8 1080,35 C1200,62 1320,12 1440,45 L1440,70 Z"
        fill={to}
      />
    </svg>
  )
}
