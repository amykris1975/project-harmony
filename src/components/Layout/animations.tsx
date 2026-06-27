import { motion } from 'framer-motion';
import type React from 'react';

export const ViewTransition: React.FC<{ children: React.ReactNode; nodeKey: string }> = ({ children, nodeKey }) => (
  <motion.div
    key={nodeKey}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
    className="h-full w-full"
  >
    {children}
  </motion.div>
);

export const SidebarMotion: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.aside
    initial={{ x: '-100%' }}
    animate={{ x: 0 }}
    exit={{ x: '-100%' }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    className="w-80 bg-silage-gray border-r border-dormant-husk/20 flex flex-col overflow-hidden z-20 shrink-0"
  >
    {children}
  </motion.aside>
);

export const StaggerContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.1,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleHover: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={className}>
    {children}
  </motion.div>
);
