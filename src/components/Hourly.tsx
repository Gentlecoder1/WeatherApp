// Hourly.tsx
import { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Days from "./Days";
import { getOrderedWeekDays } from ".";
import {
  FadeInRight,
  StaggerContainer,
  StaggerItemX,
  HoverCard,
  dropIn,
  TapButton
} from "../Animations/motion";
import { weatherIcons } from ".";
import { convertTemp } from '../utils/unitConversion';
import type { Day, HourlyDataItem } from '../utils/data'

interface HourlyProps {
  hourlyData: HourlyDataItem[];
  loading: boolean;
  // openDay: boolean;
  // setOpenDay: (v: boolean | ((v: boolean) => boolean)) => void;
}

const Hourly = ({ hourlyData = [], loading }: HourlyProps) => {
  // Get ordered week days locally (current day first) - always available
  const days: Day[] = getOrderedWeekDays();

  // Selected day state (default to current day)
  const [selectedDay, setSelectedDay] = useState<Day>(days[0]);
  const [openDay, setOpenDay] = useState(false);
  const daysRef = useRef<HTMLDivElement>(null);
  useClickOutside<HTMLDivElement>(daysRef, () => setOpenDay(false));

  // Hourly data filtered for selected day
  const [filteredHourly, setFilteredHourly] = useState<typeof hourlyData>([]);

  // Filter hourly data when selected day changes or hourly data is fetched
  useEffect(() => {
    if (!hourlyData.length) {
      setFilteredHourly([]);
      return;
    }

    // Filter hourly data for the selected day's date
    const dayHours = hourlyData.filter(h => h.date === selectedDay.date);
    setFilteredHourly(dayHours);
  }, [selectedDay, hourlyData]);

  return (
    <FadeInRight
      delay={0.6}
      className="w-full lg:max-w-[30%] max-h-180 bg-[#262540] rounded-[20px] flex flex-col p-6 gap-4"
    >
      <div className="w-full flex justify-between items-center relative">
        <h1 className="text-[20px] font-semibold">Hourly forecast</h1>

        <TapButton
          data-day-toggle
          onClick={e => {
            e.stopPropagation();
            setOpenDay(!openDay);
          }}
          className={`bg-[#3C3B5E] rounded-lg flex items-center gap-3 px-4 py-2 sm:px-4 sm:py-3 cursor-pointer ${!openDay ? '' : 'border-2 border-white'}`}
        >
          <p className="text-[14px] sm:text-[16px] font-medium">
            {selectedDay.name}
          </p>
          <ChevronDown className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 transition-all duration-300 ${!openDay ? '' : 'rotate-180'}`} />
        </TapButton>

        {/* Dropdown */}
        <AnimatePresence>
          {openDay && (
            <motion.div
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 top-full mt-2 z-10"
            >
              <Days
                ref={daysRef}
                selectedDay={selectedDay}
                days={days}
                onSelect={(day) => {
                  setSelectedDay(day);
                  setOpenDay(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hourly forecast */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {Array(8).fill(null).map((_, idx) => (
            <div key={idx} className='flex justify-between items-center px-4 py-2.5 rounded-lg bg-[#302F4A] border border-[#3C3B5E] h-15 animate-pulse' />
          ))}
        </div>
      ) : filteredHourly.length > 0 ? (
        <StaggerContainer
          staggerDelay={0.12}
          childrenDelay={0.5}
          className="flex flex-col gap-4 h-100% overflow-y-auto scrollbar-hidden"
        >
          {filteredHourly.map((item, idx) => {
            let temp = item.temperature ?? '--';
            // Use the unit from the item, fallback to '°C' if missing
            const unit = item.unit || '°C';
            if (typeof temp === 'number') {
              temp = convertTemp(temp, unit as '°C' | '°F');
            }
            const displayTemp = typeof temp === 'number' ? Math.round(temp) : temp;
            return (
              <StaggerItemX key={idx}>
                <HoverCard
                  scale={1.05}
                  lift={0}
                  className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-[#302F4A] border border-[#3C3B5E] hover:border-[#76a5e4]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {item.weatherType ? (
                        <img src={weatherIcons[item.weatherType]} className="w-10 h-10" alt="weather" />
                      ) : (
                        <span className="text-[20px] text-gray-400">--</span>
                      )}
                    </div>
                    <p className="text-[20px] font-medium">
                      {new Date(item.time).toLocaleTimeString([], { hour: "2-digit" })}
                    </p>
                  </div>
                  <p className="text-[16px] font-medium">{displayTemp}°</p>
                </HoverCard>
              </StaggerItemX>
            )
          })}
        </StaggerContainer>
      ) : (
        <div className="flex flex-col gap-4">
          {Array(8).fill(null).map((_, idx) => (
            <HoverCard
              key={idx}
              scale={1.05}
              lift={0}
              className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-[#302F4A] border border-[#3C3B5E] hover:border-[#76a5e4]"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center text-gray-400">
                  <span className="text-[20px]">--</span>
                </div>
                <p className="text-[20px] font-medium">--:--</p>
              </div>
              <p className="text-[16px] font-medium">--°</p>
            </HoverCard>
          ))}
        </div>
      )}
    </FadeInRight>
  );
};

export default Hourly;
