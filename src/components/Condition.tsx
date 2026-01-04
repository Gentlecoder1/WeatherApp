import React from 'react'
import { conditions } from '.'

const Condition = () => {
  return (
    <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-[24px]'>
        {conditions.map(({ id, title, value }) => (
            <div 
                key={id}
                className='p-[20px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[20px]'
            >
                <p className='text-[18px] font-500 text-[#D4D3D9]'>{title}</p>
                <p className='text-[32px] font-300'>{value}</p>
            </div>
        ))}
    </div>
  )
}

export default Condition