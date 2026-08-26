type SectionLabelProps = {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
};

export default function SectionLabel({ children, light = false, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-sans text-xs sm:text-sm tracking-[0.28em] uppercase ${
        light ? "text-summit-black/60" : "text-summit-gold"
      } ${className}`}
    >
      {children}
    </p>
  );
}
