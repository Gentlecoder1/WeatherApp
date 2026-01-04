import { IoSettingsOutline } from "react-icons/io5";
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import Logo from "../assets/Logo.svg"
import Unit from "./Unit"
import { useState } from "react";
import { MotionHeader, FadeInLeft, dropIn } from "./motion";

const Header = () => {

  const [openUnit, setOpenUnit] = useState(false);

  return (
    <MotionHeader className="w-full mx-auto space-y-3">
        <div className='flex justify-between items-center text-white'>
            <FadeInLeft 
              delay={0.2}
              className='flex items-center text-[15.4px] sm:text-[22px] font-bold gap-[10px]'
            >
                <img src={Logo} className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]" alt="" />
                <p>Weather Now</p>
            </FadeInLeft>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => setOpenUnit(!openUnit)}
              whileTap={{ scale: 0.98 }}
              className="bg-[#262540] rounded-[8px] flex items-center gap-[10px] px-[10px] py-[8px] sm:px-[16px] sm:py-[12px] cursor-pointer"
            >
                <IoSettingsOutline className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
                <p className="text-[14px] sm:text-[16px] font-medium">Units</p>
                <ChevronDown className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
            </motion.div>
        </div>

        <AnimatePresence>
          {openUnit && (
            <motion.div
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex justify-end"
            >
              <Unit />
            </motion.div>
          )}
        </AnimatePresence>
    </MotionHeader>
  )
}

export default Header