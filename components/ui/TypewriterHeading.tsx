'use client';
import { motion } from 'framer-motion';

export default function TypewriterHeading() {
  const textLine1 = "The Next-Gen OS ";
  const textLine2 = "Built For You - ";
  const textLine3 = "Aura OS";

  const renderText = (text: string, delayOffset: number) => {
    return text.split('').map((char, index) => {
      return (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: (delayOffset + index) * 0.06,
            ease: "easeIn"
          }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <h1 className="text-4xl lg:text-5xl font-ethno tracking-wide text-white leading-[1.3] min-h-[140px] lg:min-h-[180px]">
      {renderText(textLine1, 0)}
      <br />
      {renderText(textLine2, textLine1.length)}
      <br />
      <span className="text-5xl lg:text-7xl mt-4 inline-block bg-gradient-to-r from-[#D8B4FE] to-[#A855F7] text-transparent bg-clip-text">
        {renderText(textLine3, textLine1.length + textLine2.length)}
      </span>
    </h1>
  );
}
