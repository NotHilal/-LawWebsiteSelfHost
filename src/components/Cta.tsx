import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type CtaVariant = "primary" | "outline" | "ghost";

type CtaBaseProps = {
  children: ReactNode;
  variant?: CtaVariant;
  className?: string;
  icon?: boolean;
};

type CtaLinkProps = CtaBaseProps & { to: string; href?: never; onClick?: never };
type CtaExternalProps = CtaBaseProps & { href: string; to?: never; onClick?: never };
type CtaButtonProps = CtaBaseProps & {
  onClick: () => void;
  to?: never;
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
};

type Props = CtaLinkProps | CtaExternalProps | CtaButtonProps;

const base =
  "group relative inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 focus-visible:outline-1 focus-visible:outline-summit-gold focus-visible:outline-offset-4";

const variants: Record<CtaVariant, string> = {
  primary: "bg-summit-gold text-summit-black hover:bg-summit-gold-soft",
  outline: "border border-summit-gold/60 text-summit-ivory hover:border-summit-gold hover:bg-summit-gold/10",
  ghost: "text-summit-ivory hover:text-summit-gold",
};

function Arrow({ icon }: { icon: boolean }) {
  if (!icon) return null;
  return (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
      aria-hidden="true"
    />
  );
}

export default function Cta({ children, variant = "primary", className = "", icon = true, ...rest }: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("to" in rest && rest.to) {
    return (
      <Link to={rest.to} className={classes}>
        {children}
        <Arrow icon={icon} />
      </Link>
    );
  }

  if ("href" in rest && rest.href) {
    return (
      <a href={rest.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <Arrow icon={icon} />
      </a>
    );
  }

  const { onClick, type = "button", disabled } = rest as CtaButtonProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${classes} disabled:opacity-50`}>
      {children}
      <Arrow icon={icon} />
    </button>
  );
}
