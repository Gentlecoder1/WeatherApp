import React from 'react'
import { unitTemp } from './index'

const Unit = () => {

  return (
    <div className='w-[214px] bg-[#262540] border border-[#3C3B5E] py-[6px] px-[8px] rounded-[12px]'>
        <div className='text-[16px] font-500 py-[10px] px-[8px]'>Switch to Imperial</div>


        <div className='flex flex-col gap-[5px]'>

            {unitTemp.map(({ id, title, units }) => (
                <div 
                    key={id}
                    className='flex flex-col gap-[8px]'
                >
                    <h1 className='#ACACB7 text-[15px] font-500'>{title}</h1>
                    {units.map(({ id, name }) => (
                        <div 
                            key={id}
                            className='text-[16px] font-500'
                        >
                            <p>{name}</p>
                        </div>
                    ))}
                </div>
            ))}

            <hr />
        </div>
    </div>
  )
}

export default Unit