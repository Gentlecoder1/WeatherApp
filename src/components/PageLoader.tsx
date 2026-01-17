import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PageLoader = ({ duration = 1200 }: { duration?: number }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Prevent scrolling when loader is active
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => setShow(false), duration);
    return () => {
      clearTimeout(timer);
      // Restore scrolling when loader is removed
      document.body.style.overflow = '';
    };
  }, [duration]);

  if (!show) return null;
  return (
    <div className="fixed h-full w-full inset-0 z-50 flex items-center justify-center bg-[#02012C]/40 backdrop-blur-lg">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-400 via-orange-100 to-orange-500 opacity-75 blur-sm" />
        <div className="absolute inset-2 rounded-full bg-[#02012C]" />
        <div className="absolute inset-4 rounded-full bg-linear-to-r from-blue-400 to-orange-300" />
      </motion.div>
    </div>
  );
};

export default PageLoader;
