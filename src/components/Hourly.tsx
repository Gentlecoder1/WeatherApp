import Cloudy from '../assets/cloud.png'
import Days from './Days';
import { daysOfWeek, hourlyForecast } from './index'

import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";

const Hourly = () => {

      const [openDay, setOpenDay] = useState(false);
      const [selectedDay, setSelectedDay] = useState(daysOfWeek[2]); // default to Tuesday
    
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
                className="bg-[#3C3B5E] rounded-[8px] flex items-center gap-[12px] px-[16px] py-[8px] sm:px-[16px] sm:py-[12px] cursor-pointer"
            >
                <p className="text-[14px] sm:text-[16px] font-medium">{selectedDay.name}</p>

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
              <Days 
                selectedDay={selectedDay} 
                onSelect={(day) => {
                  setSelectedDay(day)
                  setOpenDay(false)
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex flex-col gap-[16px]'>
          {hourlyForecast.map(({ id, time, icon, temp })=> (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={id}
              className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E] hover:border-[#76a5e4]'
            >
                <div className='flex items-center gap-[8px]'>
                    <img src={icon} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>{time}</p>
                </div>
                <p className='text-[16px] font-medium'>{temp}°</p>
            </motion.div>
          ))}
        </div>
    </div>
  )
}

export default Hourly