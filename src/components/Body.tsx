// import React from 'react'
import Sunny from '../assets/Sunny.png'
import Hourly from './Hourly'
import Daily from './Daily'
import Condition from './Condition'
import WeatherBackground from './WeatherBackground'

import { Search  } from "lucide-react"
import { motion } from "framer-motion"

const Body = () => {
  // Change this value to see different backgrounds: 'sunny' | 'cloudy' | 'rainy' | 'thunderstorm'
  const currentWeather: 'sunny' | 'cloudy' | 'rainy' | 'thunderstorm' = 'cloudy'
  
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

                {/* weather info card */}
                <div className="relative w-full rounded-[20px] flex flex-col sm:flex-row items-center justify-between py-[80px] px-[24px] overflow-hidden">
                    {/* Animated Weather Background */}
                    <WeatherBackground weatherType={currentWeather} />
                    
                    {/* Content overlay */}
                    <div className="relative z-10 space-y-[12px]">
                        <h1 className="text-[28px] font-bold">Berlin, Germany</h1>
                        <p className="text-[18px] font-500">Friday, Jan 2, 2026</p>
                    </div>

                    <div className="relative z-10 flex items-center">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <img src={Sunny} alt="" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [12, 0, 12] }}
                            transition={{ duration: 2, repeat: Infinity }} 
                            className="text-[96px] font-bold"
                        >
                            <i>20°</i>
                        </motion.div>
                    </div>
                </div>

                <Condition />
                
                <Daily />
            </div>

            <Hourly />
        </div>
    </div>
  )
}

export default Body