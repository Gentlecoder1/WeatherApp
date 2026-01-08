import Days from './Days';
import { hourlyForecast } from './index'
import { FadeInRight, StaggerContainer, StaggerItemX, HoverCard, dropIn, TapButton } from '../Animations/motion';

import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react";

const Hourly = ({ hourlyData, daysOfWeek }: any) => {
  
  const [openDay, setOpenDay] = useState(false);
  const [selectedDay, setSelectedDay] = useState<any>(daysOfWeek[0]);

  // for the selected day
  useEffect(() => {
    if (!selectedDay && daysOfWeek?.length) {
      setSelectedDay(daysOfWeek[0]);
    }
  }, [daysOfWeek, selectedDay]);

  // filter the data from the api based of the selected day
  const filteredHourly = hourlyData.filter((item: any) => {
    const itemDay = new Date(item.time).toLocaleDateString('en-US', { weekday: 'long' });
    return itemDay === selectedDay.name;
  });

  return (
    <FadeInRight 
      delay={0.6}
      className="w-full lg:max-w-[30%] bg-[#262540] rounded-[20px] flex flex-col p-[24px] gap-[16px]"
    >
        <div className='w-full flex justify-between items-center'>
            <h1 className='text-[20px] font-semibold'>Hourly forecast</h1>

            <TapButton 
                onClick={() => setOpenDay(!openDay)}
                className="bg-[#3C3B5E] rounded-[8px] flex items-center gap-[12px] px-[16px] py-[8px] sm:px-[16px] sm:py-[12px] cursor-pointer"
            >
                <p className="text-[14px] sm:text-[16px] font-medium">{selectedDay?.name ?? '--'}</p>

                <ChevronDown className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
            </TapButton>
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

        <StaggerContainer 
          staggerDelay={0.12}
          childrenDelay={0.5}
          className='flex flex-col gap-[16px]'
        >
          {filteredHourly.map(({ id, time, icon, temp })=> (
            <StaggerItemX key={id}>
              <HoverCard
                scale={1.05}
                lift={0}
                className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E] hover:border-[#76a5e4]'
              >
                <div className='flex items-center gap-[8px]'>
                    <img src={icon} className='w-[40px] h-[40px]' alt="" />
                    <p className='text-[20px] font-medium'>{time}</p>
                </div>
                <p className='text-[16px] font-medium'>{temp}°</p>
              </HoverCard>
            </StaggerItemX>
          ))}
        </StaggerContainer>
    </FadeInRight>
  )
}

export default Hourly