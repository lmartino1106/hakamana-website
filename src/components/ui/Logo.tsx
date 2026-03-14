import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export default function Logo({ className = "h-12 w-auto", variant = "default" }: LogoProps) {
  return (
    <Image
      src="/images/logo.svg"
      alt="Hakamana - Fondo de Litigacion"
      width={580}
      height={110}
      className={`${className}${variant === "white" ? " brightness-0 invert" : ""}`}
      priority
    />
  );
}
