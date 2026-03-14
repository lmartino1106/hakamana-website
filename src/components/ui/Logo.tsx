interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export default function Logo({ className = "h-12 w-auto", variant = "default" }: LogoProps) {
  const crimson = variant === "white" ? "#FFFFFF" : "#C41E3A";
  const navy = variant === "white" ? "#FFFFFF" : "#1B3A5C";

  return (
    <svg
      viewBox="0 0 360 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Hakamana - Fondo de Litigacion"
      role="img"
    >
      {/* H */}
      <text
        x="0"
        y="42"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="48"
        fontWeight="400"
        fill={crimson}
      >
        H
      </text>
      {/* | divider */}
      <line x1="38" y1="6" x2="38" y2="48" stroke={crimson} strokeWidth="1.5" />
      {/* M */}
      <text
        x="48"
        y="42"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="48"
        fontWeight="400"
        fill={crimson}
      >
        M
      </text>
      {/* HAKAMANA */}
      <text
        x="110"
        y="32"
        fontFamily="'Inter', Arial, sans-serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="3"
        fill={navy}
      >
        HAKAMANA
      </text>
      {/* FONDO DE LITIGACION */}
      <text
        x="110"
        y="50"
        fontFamily="'Inter', Arial, sans-serif"
        fontSize="13"
        fontWeight="400"
        letterSpacing="2.5"
        fill={navy}
      >
        FONDO DE LITIGACI&#xD3;N
      </text>
    </svg>
  );
}
