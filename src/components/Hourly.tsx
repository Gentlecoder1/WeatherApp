// Hourly.tsx
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Days from "./Days";
import { useWeatherLogic } from "../Functions.ts/useWeatherLogic";
import { getOrderedWeekDays } from "../utils/data";
import type { WeekDay } from "../utils/data";
import {
  FadeInRight,
  StaggerContainer,
  StaggerItemX,
  HoverCard,
  dropIn,
  TapButton
} from "../Animations/motion";

const Hourly = () => {
  // Weather hook

  const { dailyData = [], hourlyData = [], loading } = useWeatherLogic();

  // Dropdown days ordered starting from today
  const weekDays: WeekDay[] = getOrderedWeekDays();

  // Selected day state (default today)
  const initialDay = weekDays && weekDays.length > 0 ? weekDays[0] : { id: 0, name: 'Today' };
  const [selectedDay, setSelectedDay] = useState<WeekDay>(initialDay);
  const [openDay, setOpenDay] = useState(false);

  // Hourly data filtered for selected day
  const [filteredHourly, setFilteredHourly] = useState<typeof hourlyData>([]);

  useEffect(() => {
    if (!dailyData.length || !hourlyData.length) {
      console.log('No data yet:', { dailyDataLength: dailyData.length, hourlyDataLength: hourlyData.length });
      return;
    }

    console.log('Filtering hourly data:', { selectedDay, dailyData, hourlyData });

    // Find the date corresponding to selectedDay
    const dayObj = dailyData.find(d => d.time === selectedDay?.name);
    console.log('Found day object:', dayObj);
    
    if (!dayObj) {
      console.log('Day not found, trying to match:', selectedDay?.name);
      setFilteredHourly([]);
      return;
    }

    // Filter hourly data for that date
    const dayHours = hourlyData.filter(h => h.date === dayObj.date);
    console.log('Filtered hourly data:', dayHours);
    setFilteredHourly(dayHours);
  }, [selectedDay, dailyData, hourlyData]);

  return (
    <FadeInRight
      delay={0.6}
      className="w-full lg:max-w-[30%] bg-[#262540] rounded-[20px] flex flex-col p-[24px] gap-[16px]"
    >
      {/* Header with dropdown */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[20px] font-semibold">Hourly forecast</h1>

        <TapButton
          onClick={() => setOpenDay(!openDay)}
          className="bg-[#3C3B5E] rounded-[8px] flex items-center gap-[12px] px-[16px] py-[8px] sm:px-[16px] sm:py-[12px] cursor-pointer"
        >
          <p className="text-[14px] sm:text-[16px] font-medium">
            {selectedDay?.name ?? "--"}
          </p>
          <ChevronDown className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
        </TapButton>
      </div>

      {/* Dropdown */}
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
              days={weekDays}
              onSelect={(day) => {
                setSelectedDay(day);
                setOpenDay(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hourly forecast */}
      {loading ? (
        <div className="flex flex-col gap-[16px]">
          {Array(5).fill(null).map((_, idx) => (
            <div key={idx} className='flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E] animate-pulse' />
          ))}
        </div>
      ) : (
        <StaggerContainer
          staggerDelay={0.12}
          childrenDelay={0.5}
          className="flex flex-col gap-[16px]"
        >
          {filteredHourly?.map((item, idx) => (
            <StaggerItemX key={idx}>
              <HoverCard
                scale={1.05}
                lift={0}
                className="flex justify-between items-center px-[16px] py-[10px] rounded-[8px] bg-[#302F4A] border border-[#3C3B5E] hover:border-[#76a5e4]"
              >
                <div className="flex items-center gap-[8px]">
                  {/* Placeholder for icon if you want later */}
                  {/* <img src={item.icon} className="w-[40px] h-[40px]" alt="" /> */}
                  <p className="text-[20px] font-medium">
                    {new Date(item.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <p className="text-[16px] font-medium">{item.temperature}°</p>
              </HoverCard>
            </StaggerItemX>
          ))}
        </StaggerContainer>
      )}
    </FadeInRight>
  );
};

export default Hourly;
