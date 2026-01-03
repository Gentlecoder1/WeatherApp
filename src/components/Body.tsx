// import React from 'react'
import Sunny from '../assets/Sunny.png'
import Hourly from './Hourly'

import { Search  } from "lucide-react"
import { motion } from "framer-motion"

const Body = () => {
  return (
    <div className="w-full mx-auto my-10 flex flex-col items-center space-y-[64px]">
        <div className="max-w-[330px] sm:max-w-[482px] md:max-w-[731px] text-center">
            <h1 className="text-[45px] sm:text-[52px] font-bold text-white">How's the sky looking today?</h1>
        </div>

        <div className="w-full mx-auto">
            <div className="flex flex-col sm:flex-row  gap-[16px] max-w-[656px] text-white mx-auto">
                <div className="bg-[#262540] w-full sm:max-w-[526px] rounded-[12px] flex items-center py-[16px] px-[24px] mx-auto gap-[16px]">
                    <Search size={20} className="text-white" />
                    <input 
                        className="outline-none text-[20px]"
                        type="text" 
                        name="" 
                        id="" 
                        placeholder="Search for a place..." 
                    />
                </div>
                
                <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#4658D9] hover:bg-[#2B1B9C] cursor-pointer py-[16px] px-[24px] rounded-[12px] flex"
                >
                    <p className="text-[20px] mx-auto">Search</p>
                </motion.div>
            </div>
        </div>

        <div className="w-full mx-auto lg:flex space-y-[32px] lg:space-y-0 text-white gap-[32px]">
            <div className="w-full lg:max-w-[70%] space-y-[32px]">
                <div className="w-full bg-blue-500 rounded-[20px] flex flex-col sm:flex-row items-center justify-between py-[80px] px-[24px]">
                    <div className="space-y-[12px]">
                        <h1 className="text-[28px] font-bold">Berlin, Germany</h1>
                        <p className="text-[18px] font-500">Friday, Jan 2, 2026</p>
                    </div>

                    <div className="flex items-center">
                        <div><img src={Sunny} alt="" /></div>
                        <p className="text-[96px] font-bold"><i>20°</i></p>
                    </div>
                </div>

                <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-[24px]'>
                    <div className='p-[20px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[20px]'>
                        <p className='text-[18px] font-500 text-[#D4D3D9]'>Feels like</p>
                        <p className='text-[32px] font-300'>18°</p>
                    </div>
                    <div className='p-[20px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[20px]'>
                        <p className='text-[18px] font-500 text-[#D4D3D9]'>Feels like</p>
                        <p className='text-[32px] font-300'>18°</p>
                    </div>
                    <div className='p-[20px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[20px]'>
                        <p className='text-[18px] font-500 text-[#D4D3D9]'>Feels like</p>
                        <p className='text-[32px] font-300'>18°</p>
                    </div>
                    <div className='p-[20px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[20px]'>
                        <p className='text-[18px] font-500 text-[#D4D3D9]'>Feels like</p>
                        <p className='text-[32px] font-300'>18°</p>
                    </div>
                </div>
                
                <div className='w-full flex flex-col gap-[20px]'>
                    <h1 className='text-[20px] font-semibold'>Daily forcast</h1>

                    <div className='w-full grid grid-cols-3 sm:grid-cols-7 gap-[16px]'>
                        <div className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[16px] flex flex-col items-center'>
                            <p className='text-[18px] font-medium'>Tue</p>
                            <div className='w-[60px] h-[60px]'><img src={Sunny} alt="" /></div>
                            <div className='w-full flex justify-between'>
                                <p>20°</p>
                                <p>20°</p>
                            </div>
                        </div>
                        <div className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[16px] flex flex-col items-center'>
                            <p className='text-[18px] font-medium'>Tue</p>
                            <div className='w-[60px] h-[60px]'><img src={Sunny} alt="" /></div>
                            <div className='w-full flex justify-between'>
                                <p>20°</p>
                                <p>20°</p>
                            </div>
                        </div>
                        <div className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[16px] flex flex-col items-center'>
                            <p className='text-[18px] font-medium'>Tue</p>
                            <div className='w-[60px] h-[60px]'><img src={Sunny} alt="" /></div>
                            <div className='w-full flex justify-between'>
                                <p>20°</p>
                                <p>20°</p>
                            </div>
                        </div>
                        <div className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[16px] flex flex-col items-center'>
                            <p className='text-[18px] font-medium'>Tue</p>
                            <div className='w-[60px] h-[60px]'><img src={Sunny} alt="" /></div>
                            <div className='w-full flex justify-between'>
                                <p>20°</p>
                                <p>20°</p>
                            </div>
                        </div>
                        <div className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[16px] flex flex-col items-center'>
                            <p className='text-[18px] font-medium'>Tue</p>
                            <div className='w-[60px] h-[60px]'><img src={Sunny} alt="" /></div>
                            <div className='w-full flex justify-between'>
                                <p>20°</p>
                                <p>20°</p>
                            </div>
                        </div>
                        <div className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[16px] flex flex-col items-center'>
                            <p className='text-[18px] font-medium'>Tue</p>
                            <div className='w-[60px] h-[60px]'><img src={Sunny} alt="" /></div>
                            <div className='w-full flex justify-between'>
                                <p>20°</p>
                                <p>20°</p>
                            </div>
                        </div>
                        <div className='px-[12px] py-[16px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[16px] flex flex-col items-center'>
                            <p className='text-[18px] font-medium'>Tue</p>
                            <div className='w-[60px] h-[60px]'><img src={Sunny} alt="" /></div>
                            <div className='w-full flex justify-between'>
                                <p>20°</p>
                                <p>20°</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Hourly />
        </div>
    </div>
  )
}

export default Body