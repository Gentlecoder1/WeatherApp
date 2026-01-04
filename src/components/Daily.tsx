import { dailyForecast } from '.'
import { FadeInUp, StaggerContainer, StaggerItemScale, HoverCard } from './motion'

const Daily = () => {
  return (
    <FadeInUp 
      delay={0.7}
      className='w-full flex flex-col gap-[20px]'
    >
        <h1 className='text-[20px] font-semibold'>Daily forcast</h1>

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
                        <div className='w-[60px] h-[60px]'><img src={icon} alt="" /></div>
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