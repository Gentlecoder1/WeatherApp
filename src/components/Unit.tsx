import React from 'react'

const Unit = () => {
  return (
    <div className='w-[214px] bg-[#262540] border border-[#3C3B5E] py-[6px] px-[8px] rounded-[12px]'>
        <div className='text-[16px] font-500 py-[10px] px-[8px]'>Switch to Imperial</div>
        <div className='flex flex-col gap-[5px]'>
            <div className='flex flex-col gap-[8px]'>
                <h1 className='#ACACB7 text-[15px] font-500'>Temperature</h1>

                <div className='text-[16px] font-500'>
                    <p>Celsius (°C)</p>
                    <p>Fahrenheit (°F)</p>
                </div>
            </div>

            <hr />

            <div className='flex flex-col gap-[8px]'>
                <h1 className='#ACACB7 text-[15px] font-500'>Wind Speed</h1>

                <div className='text-[16px] font-500'>
                    <p>km/h</p>
                    <p>mph</p>
                </div>
            </div>

            <hr />
            
            <div className='flex flex-col gap-[8px]'>
                <h1 className='#ACACB7 text-[15px] font-500'>Precipitation</h1>

                <div className='text-[16px] font-500'>
                    <p>Millimeters (mm)</p>
                    <p>Inches (in)</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Unit