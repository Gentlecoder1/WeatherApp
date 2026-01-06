import { MapPinOff } from "lucide-react";
import { motion } from "framer-motion";
import { floatAnimationReverse } from "../Animations/motion";

const NoResult = () => {
  return (
    <div className="bg-[#262540]/60 rounded-lg p-6 flex flex-col items-center justify-center gap-4 text-white text-center">
        <motion.div
            animate={floatAnimationReverse}
        >
            <MapPinOff size={50} />
        </motion.div>
        <h1 className="text-[38px] sm:text-[48px] font-bold">Location not found!</h1>
        <p className="text-[20px] sm:text-[28px]">Please try searching for a different location.</p>
    </div>
  )
}

export default NoResult