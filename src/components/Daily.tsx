import { FadeInUp, StaggerContainer, StaggerItemScale, HoverCard } from '../Animations/motion'

import Sunny from '../assets/Sunny.png'
import Cloud from '../assets/cloud.png'
import Rain from '../assets/Rain.svg'
import Snowy from '../assets/Snow.svg'
import Thunderstorms from '../assets/Thunderstorms.svg'
import PartlyCloudy from '../assets/PartlyCloudy.svg'

interface DailyDataItem {
  id: number;
  time: string;
  date: string;
  high: number;
  low: number;
}

interface DailyProps {
  dailyData: DailyDataItem[];
  loading: boolean;
}

const Daily = ({ dailyData = [], loading }: DailyProps) => {

  const icons = [Sunny, Cloud, Rain, Thunderstorms, Sunny, PartlyCloudy, Rain];
  
  // Placeholder data when no API data
  const placeholderData = Array(7).fill(null).map((_, idx) => ({
    id: idx + 1,
    icon: icons[idx % icons.length],
    day: '--',
    high: '--' as string | number,
    low: '--' as string | number,
  }));

  // Map daily data from API
  const dailyForecast = dailyData.length > 0
    ? dailyData.map((day, idx) => ({
        id: idx + 1,
        icon: icons[idx % icons.length],
        day: day.time || '--',
        high: typeof day.high === 'number' ? day.high : '--',
        low: typeof day.low === 'number' ? day.low : '--',
      }))
    : placeholderData;

  if (loading) {
    return (
      <FadeInUp 
        delay={0.7}
        className='w-full flex flex-col gap-5'
      >
        <h1 className='text-[20px] font-semibold'>Daily forecast</h1>
        <div className='w-full grid grid-cols-3 sm:grid-cols-7 gap-4'>
          {Array(7).fill(null).map((_, idx) => (
            <div key={idx} className='px-3 py-4 h-[150px] rounded-xl bg-[#262540] border border-[#3C3B5E] animate-pulse' />
          ))}
        </div>
      </FadeInUp>
    );
  }

  return (
    <FadeInUp 
      delay={0.7}
      className='w-full flex flex-col gap-5'
    >
        <h1 className='text-[20px] font-semibold'>Daily forecast</h1>

        {dailyData.length > 0 ? (
          <StaggerContainer 
            staggerDelay={0.15}
            childrenDelay={0.8}
            className='w-full grid grid-cols-3 sm:grid-cols-7 gap-4'
          >
              {dailyForecast.map(({ id, day, icon, high, low })=> (
                  <StaggerItemScale key={id}>
                      <HoverCard 
                          scale={1.05}
                          lift={-5}
                          className='px-3 py-4 rounded-xl bg-[#262540] border border-[#3C3B5E] space-y-4 flex flex-col items-center cursor-pointer'
                      >
                          <p className='text-[18px] font-medium'>{day}</p>
                          <div className='w-15 h-15'><img src={icon} alt="weatherIcon" /></div>
                          <div className='w-full flex justify-between'>
                              <p>{low}°</p>
                              <p>{high}°</p>
                          </div>
                      </HoverCard>
                  </StaggerItemScale>
              ))}
          </StaggerContainer>
        ) : (
          <div className='w-full grid grid-cols-3 sm:grid-cols-7 gap-4'>
            {placeholderData.map(({ id, icon, day, high, low }) => (
              <HoverCard 
                key={id}
                scale={1.05}
                lift={-5}
                className='px-3 py-4 rounded-xl bg-[#262540] border border-[#3C3B5E] space-y-4 flex flex-col items-center cursor-pointer'
              >
                <p className='text-[18px] font-medium'>{day}</p>
                <div className='w-15 h-15'><img src={icon} alt="weatherIcon" /></div>
                <div className='w-full flex justify-between'>
                  <p>{low}°</p>
                  <p>{high}°</p>
                </div>
              </HoverCard>
            ))}
          </div>
        )}
    </FadeInUp>
  )
}

export default Daily