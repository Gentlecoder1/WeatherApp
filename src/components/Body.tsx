// components imports
import Hourly from './Hourly'
import Daily from './Daily'
import Condition from './Condition'
import WeatherBackground from './WeatherBackground'
import NoResult from './NoResult'
import { FadeInUp, ScaleFade, TapButton, floatAnimation, floatAnimationReverse } from '../Animations/motion'
import { weatherIcons } from '.'
import { useWeatherLogic } from '../Functions.ts/useWeatherLogic'
import { convertTemp } from '../utils/unitConversion';

// external import
import { Search } from "lucide-react"
import { motion } from "framer-motion"

interface BodyProps {
  selectedUnits: Record<number, number>;
}

const Body = ({ selectedUnits }: BodyProps) => {
    const { 
        location, setLocation, 
        suggestions, 
        loading, error,
        fetchWeatherData,
        handleSearch,
        // Computed values
        currentTemp,
        displayName,
        currentDate,
        currentWeather,
        conditions,
        dailyData,
        hourlyData
    } = useWeatherLogic();

    // Map selectedUnits to actual unit values in each component
    const tempUnit = selectedUnits[0] === 1 ? '°C' : '°F';
    const windUnit = selectedUnits[1] === 1 ? 'km/h' : 'mph';
    const precipUnit = selectedUnits[2] === 1 ? 'mm' : 'in';

    const conditionUnits = [tempUnit, '%', windUnit, precipUnit];

    // Ensure all condition values are string or number and attach dynamic unit
    const safeConditions = conditions.map((c, i) => ({
        id: c.id,
        value: typeof c.value === 'undefined' ? '--' : c.value,
        unit: conditionUnits[i]
    }));

    // Add unit property to each hourly data item
    const hourlyDataWithUnit = hourlyData.map(item => ({
        ...item,
        unit: tempUnit
    }));

    // Add unit property and convert high/low for each daily data item
    const dailyDataWithUnit = dailyData.map(item => ({
        ...item,
        high: typeof item.high === 'number' && tempUnit === '°F' ? convertTemp(item.high, '°F') : item.high,
        low: typeof item.low === 'number' && tempUnit === '°F' ? convertTemp(item.low, '°F') : item.low,
        unit: tempUnit
    }));
  
  return (
    <div className="w-full mx-auto my-10 flex flex-col items-center space-y-16">
        <FadeInUp 
            delay={0.1}
            className="max-w-82.5 sm:max-w-120.5 md:max-w-182.75 text-center"
        >
            <h1 className="text-[45px] sm:text-[52px] font-bold text-white">How's the sky looking today?</h1>
        </FadeInUp>

        <FadeInUp 
            delay={0.2}
            className="w-full mx-auto"
        >
            <div className="flex flex-col sm:flex-row  gap-4 max-w-164 text-white mx-auto relative">
                
                {/* location input */}
                <div className="bg-[#262540] w-full sm:max-w-131.5 rounded-xl flex items-center py-4 px-6 mx-auto gap-4">
                    <Search size={20} className="text-white" />

                    <input 
                        onChange={(e) => setLocation(e.target.value)}
                        className="outline-none text-[20px] bg-transparent w-full"
                        type="text" 
                        value={location} 
                        placeholder="Search for a place..." 
                    />
                </div>
                
                {/* search button */}
                <TapButton
                    onClick={handleSearch} 
                    // disabled={loading}
                    className="bg-[#4658D9] hover:bg-[#2B1B9C] cursor-pointer py-4 px-6 rounded-xl flex"
                >
                    <p className="text-[20px] mx-auto">{loading ? 'Searching...' : 'Search'}</p>
                </TapButton>

                {/* Suggestions dropdown */}
                {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 mt-2 bg-[#262540] rounded-xl z-20 max-w-131.5 max-h-50 overflow-y-auto custom-scrollbar">
                        {suggestions.map((city) => (
                            <li
                                key={city.id}
                                onClick={() => fetchWeatherData(city)}
                                className="py-3 px-6 hover:bg-[#3C3B5E] cursor-pointer transition-colors"
                            >
                                {city.name}, {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </FadeInUp>
        
        {error ? (
            <NoResult/>
        ) : (
            <div className="w-full mx-auto lg:flex space-y-8 lg:space-y-0 text-white gap-8">
                <div className="w-full lg:max-w-[70%] space-y-8">

                    {/* weather info card */}
                    <ScaleFade 
                        delay={0.3}
                        className="relative w-full rounded-[20px] flex flex-col sm:flex-row items-center justify-between py-20 px-6 overflow-hidden"
                    >
                        {/* Animated Weather Background */}
                        <WeatherBackground weatherType={currentWeather} />
                        
                        {/* Content overlay */}

                        <div className="relative z-10 space-y-3">
                            <h1 className="text-[28px] font-bold">{displayName}</h1>
                            <p className="text-[18px] font-500">{currentDate}</p>
                        </div>

                        <div className="relative z-10 flex items-center">
                            <motion.div animate={floatAnimation}>
                                <img src={weatherIcons[currentWeather]} alt={currentWeather} className="w-24 h-24" />
                            </motion.div>
                            <motion.div
                                animate={floatAnimationReverse}
                                className="text-[96px] font-bold"
                            >
                                <i>{
                                    typeof currentTemp === 'number'
                                        ? convertTemp(currentTemp, tempUnit)
                                        : currentTemp
                                    }°
                                </i>
                            </motion.div>
                        </div>
                    </ScaleFade>

                    <Condition 
                        conditions={safeConditions}
                    />
                    <Daily dailyData={dailyDataWithUnit} loading={loading} />
                </div>

                <Hourly hourlyData={hourlyDataWithUnit} loading={loading} />
            </div>
        )}
    </div>
  )
}

export default Body