import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "li";
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  y = 24,
  once = true,
  as = "div",
}: RevealOnScrollProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
