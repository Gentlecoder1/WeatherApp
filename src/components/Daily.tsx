import { useWeatherLogic } from '../Functions.ts/useWeatherLogic'
import { FadeInUp, StaggerContainer, StaggerItemScale, HoverCard } from '../Animations/motion'

import Sunny from '../assets/Sunny.png'
import Cloud from '../assets/cloud.png'
import Rain from '../assets/Rain.svg'
import Snowy from '../assets/Snow.svg'
import Thunderstorms from '../assets/Thunderstorms.svg'
import PartlyCloudy from '../assets/PartlyCloudy.svg'

const Daily = () => {
  const { dailyData = [], loading } = useWeatherLogic();

  const icons = [Sunny, Cloud, Rain, Thunderstorms, Sunny, PartlyCloudy, Rain];
  const dailyForecast = dailyData && dailyData.length > 0
    ? dailyData.map((day, idx) => ({
        id: idx + 1,
        icon: icons[idx % icons.length],
        day: day.time || '--',
        high: typeof day.high === 'number' ? Math.round(day.high) : '--',
        low: typeof day.low === 'number' ? Math.round(day.low) : '--',
      }))
    : Array(7).fill(null).map((_, idx) => ({
        id: idx + 1,
        icon: icons[idx % icons.length],
        day: '--',
        high: '--',
        low: '--',
      }));

  if (loading) {
    return (
      <FadeInUp 
        delay={0.7}
        className='w-full flex flex-col gap-[20px]'
      >
        <h1 className='text-[20px] font-semibold'>Daily forecast</h1>
        <div className='w-full grid grid-cols-3 sm:grid-cols-7 gap-[16px]'>
          {Array(7).fill(null).map((_, idx) => (
            <div key={idx} className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] animate-pulse' />
          ))}
        </div>
      </FadeInUp>
    );
  }

  return (
    <FadeInUp 
      delay={0.7}
      className='w-full flex flex-col gap-[20px]'
    >
        <h1 className='text-[20px] font-semibold'>Daily forecast</h1>

        <StaggerContainer 
          staggerDelay={0.15}
          childrenDelay={0.8}
          className='w-full grid grid-cols-3 sm:grid-cols-7 gap-[16px]'
        >
            {dailyForecast.map(({ id, day, icon, high, low })=> (
                <StaggerItemScale key={id}>
                    <HoverCard 
                        scale={1.05}
                        lift={-5}
                        className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[16px] flex flex-col items-center cursor-pointer'
                    >
                        <p className='text-[18px] font-medium'>{day}</p>
                        <div className='w-[60px] h-[60px]'><img src={icon} alt="weatherIcon" /></div>
                        <div className='w-full flex justify-between'>
                            <p>{low}°</p>
                            <p>{high}°</p>
                        </div>
                    </HoverCard>
                </StaggerItemScale>
            ))}
        </StaggerContainer>
    </FadeInUp>
  )
}

export default Daily