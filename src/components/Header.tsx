import { CiSun } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

import Unit from "./Unit"
import { useState } from "react";

const Header = () => {

  const [openUnit, setOpenUnit] = useState(false);

  return (
    <header className="w-full mx-auto space-y-3">
        <div className='flex justify-between items-center text-white'>
            <div className='flex items-center text-[15.4px] sm:text-[22px] font-bold'>
                <CiSun className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]" fill="#FF820A" />
                <p>Weather Now</p>
            </div>

            <motion.div
              onClick={() => setOpenUnit(true)}
              whileTap={{ scale: 0.98 }}
              className="bg-[#262540] rounded-[8px] flex items-center gap-[10px] px-[10px] py-[8px] sm:px-[16px] sm:py-[12px]"
            >
                <IoSettingsOutline className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
                <p className="text-[14px] sm:text-[16px] font-medium">Units</p>
                <ChevronDown className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
            </motion.div>
        </div>

        <div 
          className="flex justify-end ">
          <Unit />
        </div>
    </header>
  )
}

export default Header