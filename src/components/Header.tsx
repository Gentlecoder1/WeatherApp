import { IoSettingsOutline } from "react-icons/io5";
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import Logo from "../assets/Logo.svg"
import Unit from "./Unit"
import { useState } from "react";
import { MotionHeader, FadeInLeft, dropIn } from "../Animations/motion";

interface HeaderProps {
  selectedUnits: Record<number, number>;
  setSelectedUnits: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}    

const Header = ({ selectedUnits, setSelectedUnits }: HeaderProps) => {

  const [openUnit, setOpenUnit] = useState(false);

  return (
    <MotionHeader className="w-full mx-auto space-y-3">
        <div className='flex justify-between items-center text-white'>
            <FadeInLeft 
              delay={0.2}
              className='flex items-center text-[15.4px] sm:text-[22px] font-bold gap-2.5'
            >
                <img src={Logo} className="w-7.8 h-7.8 sm:w-10 sm:h-10" alt="logo" />
                <p>Weather Now</p>
            </FadeInLeft>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => setOpenUnit(!openUnit)}
              whileTap={{ scale: 0.98 }}
              className="bg-[#262540] rounded-lg flex items-center gap-2.5 px-2.5 py-2 sm:px-4 sm:py-3 cursor-pointer"
            >
                <IoSettingsOutline className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                <p className="text-[14px] sm:text-[16px] font-medium">Units</p>
                <ChevronDown className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
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
              <Unit selectedUnits={selectedUnits} setSelectedUnits={setSelectedUnits} />
            </motion.div>
          )}
        </AnimatePresence>
    </MotionHeader>
  )
}

export default Header