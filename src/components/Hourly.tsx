import Cloudy from '../assets/cloud.png'
import Days from './Days';

import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";

const Hourly = () => {

      const [openDay, setOpenDay] = useState(false);
    
      const dropIn = {
        hidden: {
          y: '0',
          opacity: 0
        },
        visible: {
          y: "0",
          opacity: 1
        },
        exit: {
          y: '0',
          opacity: 0
        }
      }

  return (
    <div className="w-full lg:max-w-[30%] bg-[#262540] rounded-[20px] flex flex-col p-[24px] gap-[16px]">
        <div className='w-full flex justify-between items-center'>
            <h1 className='text-[20px] font-semibold'>Hourly forcast</h1>

            <motion.div 
                onClick={() => setOpenDay(!openDay)}
                whileTap={{ scale: 0.98 }}
                className="bg-[#3C3B5E] rounded-[8px] flex items-center gap-[12px] px-[16px] py-[8px] sm:px-[16px] sm:py-[12px]"
            >
                <p className="text-[14px] sm:text-[16px] font-medium">Tuesday</p>
                <ChevronDown className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
            </motion.div>
        </div>

        <AnimatePresence>
          {openDay && (
            <motion.div
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex justify-end"
            >
              <Days />
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex flex-col gap-[16px]'>
            <div className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E]'>
                <div className='flex items-center gap-[8px]'>
                    <img src={Cloudy} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>3 PM</p>
                </div>
                <p className='text-[16px] font-medium'>20°</p>
            </div>
            <div className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E]'>
                <div className='flex items-center gap-[8px]'>
                    <img src={Cloudy} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>3 PM</p>
                </div>
                <p className='text-[16px] font-medium'>20°</p>
            </div>
            <div className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E]'>
                <div className='flex items-center gap-[8px]'>
                    <img src={Cloudy} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>3 PM</p>
                </div>
                <p className='text-[16px] font-medium'>20°</p>
            </div>
            <div className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E]'>
                <div className='flex items-center gap-[8px]'>
                    <img src={Cloudy} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>3 PM</p>
                </div>
                <p className='text-[16px] font-medium'>20°</p>
            </div>
            <div className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E]'>
                <div className='flex items-center gap-[8px]'>
                    <img src={Cloudy} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>3 PM</p>
                </div>
                <p className='text-[16px] font-medium'>20°</p>
            </div>
            <div className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E]'>
                <div className='flex items-center gap-[8px]'>
                    <img src={Cloudy} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>3 PM</p>
                </div>
                <p className='text-[16px] font-medium'>20°</p>
            </div>
            <div className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E]'>
                <div className='flex items-center gap-[8px]'>
                    <img src={Cloudy} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>3 PM</p>
                </div>
                <p className='text-[16px] font-medium'>20°</p>
            </div>
            <div className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E]'>
                <div className='flex items-center gap-[8px]'>
                    <img src={Cloudy} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>3 PM</p>
                </div>
                <p className='text-[16px] font-medium'>20°</p>
            </div>
        </div>
    </div>
  )
}

export default Hourly