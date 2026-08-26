import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type AnimatedHeadingProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  goldLines?: number[];
  delay?: number;
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0 },
  },
};

const line = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function AnimatedHeading({
  lines,
  as: Tag = "h1",
  className = "",
  goldLines = [],
  delay = 0,
}: AnimatedHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={container}
      transition={{ delayChildren: delay }}
      className="overflow-hidden"
    >
      <Tag className={className}>
        {lines.map((text, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              variants={line}
              className={`block ${goldLines.includes(i) ? "text-summit-gold" : ""}`}
            >
              {text}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
