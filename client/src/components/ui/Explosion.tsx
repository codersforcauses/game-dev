import { motion } from "framer-motion";

type ExplosionProps = {
  colour1: string;
  colour2: string;
  count: number;
};

const Explosion = ({ colour1, colour2, count }: ExplosionProps) => {
  const particles = Array.from({ length: count });
  const randomOffset = Math.random() * 10;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(i + randomOffset) * 150,
            y: Math.sin(i + randomOffset) * 150,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-small absolute h-3 w-3"
          style={{
            backgroundColor: i % 2 === 0 ? colour1 : colour2,
            boxShadow: `0 0 10px ${colour1}`,
          }}
        />
      ))}
    </div>
  );
};

export default Explosion;
