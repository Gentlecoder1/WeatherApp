import React from 'react'
import { dailyForecast } from '.'

const Daily = () => {
  return (
    <div className='w-full flex flex-col gap-[20px]'>
        <h1 className='text-[20px] font-semibold'>Daily forcast</h1>

        <div className='w-full grid grid-cols-3 sm:grid-cols-7 gap-[16px]'>
            {dailyForecast.map(({ id, day, icon, high, low })=> (
                <div 
                    key={id}
                    className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[16px] flex flex-col items-center'
                >
                    <p className='text-[18px] font-medium'>{day}</p>
                    <div className='w-[60px] h-[60px]'><img src={icon} alt="" /></div>
                    <div className='w-full flex justify-between'>
                        <p>{low}°</p>
                        <p>{high}°</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Daily