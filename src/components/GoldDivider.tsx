import { motion } from "framer-motion";

type GoldDividerProps = {
  align?: "left" | "center";
  width?: number;
  className?: string;
};

export default function GoldDivider({ align = "left", width = 64, className = "" }: GoldDividerProps) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ width, transformOrigin: align === "center" ? "center" : "left" }}
      className={`h-px bg-gradient-to-r from-summit-gold via-summit-gold-soft to-summit-gold ${
        align === "center" ? "mx-auto" : ""
      } ${className}`}
    />
  );
}
