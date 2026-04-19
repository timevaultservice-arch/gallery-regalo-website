'use client';

import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  stagger?: number;
}

export function RevealText({ text, className, as = 'h1', stagger = 0.04 }: RevealTextProps) {
  const words = text.split(' ');
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } }
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            {word}{i !== words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
