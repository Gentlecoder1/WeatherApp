import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

// ============================================
// ANIMATION VARIANTS
// ============================================

// Fade in from bottom (for containers, titles)
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
}

// Fade in from left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
}

// Fade in from right
export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
}

// Fade in from top (for header)
export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

// Scale fade (for cards)
export const scaleFade = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6 }
  }
}

// Stagger container for condition cards
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6
    }
  }
}

// Stagger container for daily forecast
export const dailyStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.8
    }
  }
}

// Stagger container for hourly forecast (slower)
export const hourlyStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.0
    }
  }
}

// Item variant for vertical stagger (condition, daily)
export const staggerItemY = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

// Item variant with scale (daily cards)
export const staggerItemScale = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 }
  }
}

// Item variant for horizontal stagger (hourly)
export const staggerItemX = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
}

// Dropdown animation
export const dropIn = {
  hidden: { y: -5, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: -5, opacity: 0 }
}

// Float animation (for weather icon)
export const floatAnimation = {
  y: [0, 12, 0],
  transition: { duration: 2, repeat: Infinity }
}

export const floatAnimationReverse = {
  y: [12, 0, 12],
  transition: { duration: 2, repeat: Infinity }
}

// ============================================
// REUSABLE MOTION COMPONENTS
// ============================================

interface MotionContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
}

// Fade in up container
export const FadeInUp = ({ children, delay = 0, className, ...props }: MotionContainerProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Fade in from left
export const FadeInLeft = ({ children, delay = 0, className, ...props }: MotionContainerProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Fade in from right
export const FadeInRight = ({ children, delay = 0, className, ...props }: MotionContainerProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Fade in from top
export const FadeInDown = ({ children, delay = 0, className, ...props }: MotionContainerProps) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Scale fade container
export const ScaleFade = ({ children, delay = 0, className, ...props }: MotionContainerProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Stagger container wrapper
export const StaggerContainer = ({ 
  children, 
  className,
  staggerDelay = 0.15,
  childrenDelay = 0.6,
  ...props 
}: MotionContainerProps & { staggerDelay?: number; childrenDelay?: number }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: childrenDelay
        }
      }
    }}
    initial="hidden"
    animate="visible"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Stagger item (vertical)
export const StaggerItem = ({ children, className, ...props }: MotionContainerProps) => (
  <motion.div
    variants={staggerItemY}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Stagger item with scale
export const StaggerItemScale = ({ children, className, ...props }: MotionContainerProps) => (
  <motion.div
    variants={staggerItemScale}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Stagger item (horizontal)
export const StaggerItemX = ({ children, className, ...props }: MotionContainerProps) => (
  <motion.div
    variants={staggerItemX}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Hover scale card
export const HoverCard = ({ 
  children, 
  className,
  scale = 1.02,
  lift = -5,
  ...props 
}: MotionContainerProps & { scale?: number; lift?: number }) => (
  <motion.div
    whileHover={{ scale, y: lift }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Tap scale button
export const TapButton = ({ children, className, ...props }: MotionContainerProps) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Header wrapper
export const MotionHeader = ({ children, className, ...props }: MotionContainerProps) => (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={className}
    {...props}
  >
    {children}
  </motion.header>
)
