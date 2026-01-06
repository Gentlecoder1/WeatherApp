import { MapPinOff } from "lucide-react";
import { motion } from "framer-motion";

const NoResult = () => {
  return (
    <div className="bg-[#262540]/60 rounded-lg p-6 flex flex-col items-center justify-center gap-4 text-white">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <MapPinOff size={50} />
        </motion.div>
        <h1 className="text-[45px] sm:text-[52px] font-bold">Location not found</h1>
        <p className="text-[20px] sm:text-[28px]">Please try searching for a different location.</p>
    </div>
  )
}

export default NoResult