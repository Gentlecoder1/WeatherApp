// import React from 'react'
import Sunny from '../assets/Sunny.png'
import CloudImg from '../assets/cloud.png'
import RainImg from '../assets/Rain.svg'
import ThunderstormImg from '../assets/Thunderstorms.svg'
import Hourly from './Hourly'
import Daily from './Daily'
import Condition from './Condition'
import WeatherBackground from './WeatherBackground'
import { FadeInUp, ScaleFade, TapButton, floatAnimation, floatAnimationReverse } from './motion'

import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { Search  } from "lucide-react"
import { motion } from "framer-motion"

// Weather icon mapping
const weatherIcons = {
    sunny: Sunny,
    cloudy: CloudImg,
    rainy: RainImg,
    thunderstorm: ThunderstormImg
}

// Type for city from geocoding API
interface City {
    id: number;
    name: string;
    language: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
}

// Type for weather data
interface WeatherData {
    hourly: {
        time: string[];
        temperature_2m: number[];
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
    displayName: string;
    current_weather?: {
        temperature: number;
        weathercode: number;
    };
}

const geoUrl = `https://geocoding-api.open-meteo.com/v1/search`
const mainUrl = `https://api.open-meteo.com/v1/forecast`

// Map Open-Meteo weather codes to our weather types
type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'thunderstorm';

const getWeatherType = (code: number | undefined): WeatherType => {
    if (code === undefined) return 'sunny';
    
    // Clear sky
    if (code === 0) return 'sunny';
    
    // Mainly clear, partly cloudy, overcast, fog
    if ([1, 2, 3, 45, 48].includes(code)) return 'cloudy';
    
    // Drizzle, rain, freezing rain, rain showers, snow
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86].includes(code)) return 'rainy';
    
    // Thunderstorm (with or without hail)
    if ([95, 96, 99].includes(code)) return 'thunderstorm';
    
    return 'sunny'; // default
};

const Body = () => {

    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
        setSelectedCity(null); // Clear selected city when user types
    };

    // Search as user types with debounce
    useEffect(() => {
        // Clear previous timeout
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Don't search if we already selected a city or input is too short
        if (selectedCity || location.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        // Debounce the search (wait 400ms after user stops typing)
        debounceRef.current = setTimeout(() => {
            searchCities(location);
        }, 400);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [location, selectedCity]);

    const searchCities = async (query: string) => {
        setError('');

        try {
            const geoRes = await axios.get(geoUrl, {
                params: {
                    name: query,
                    count: 4,
                    language: 'en',
                    format: 'json'
                }
            });

            if (geoRes.data.results && geoRes.data.results.length > 0) {
                const results: City[] = geoRes.data.results;
                
                // Show suggestions for user to pick
                setSuggestions(results);
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            console.error("Search error", err);
        }
    };

    // Handle clicking on a suggestion - fill input and store city
    const handleSelectCity = (city: City) => {
        const fullName = `${city.name}, ${city.admin1 ? city.admin1 + ', ' : ''}${city.country}`;
        setLocation(fullName);
        setSelectedCity(city);
        setSuggestions([]);
    };

    const handleSearch = async () => {
        if (location.trim().length < 2) {
            setError("Please enter at least 2 characters");
            return;
        }
        
        setSuggestions([]);
        setLoading(true);
        setError('');

        // If we have a selected city, use it directly
        if (selectedCity) {
            fetchWeatherData(selectedCity);
            return;
        }

        // Otherwise search for the city
        try {
            const geoRes = await axios.get(geoUrl, {
                params: {
                    name: location,
                    count: 3,
                    language: 'en',
                    format: 'json'
                }
            })

            if (geoRes.data.results && geoRes.data.results.length > 0) {
                // If clicking search, just fetch the first result
                fetchWeatherData(geoRes.data.results[0]);
            } else {
                setError("City not found");
                setLoading(false);
            }
        } catch (err) {
            console.error("Search error", err);
            setError("Search failed");
            setLoading(false);
        }
    };

    const fetchWeatherData = async (city: City) => {
        setSuggestions([]);
        setLoading(true);
        setLocation(city.name);

        try {
            const weatherRes = await axios.get(mainUrl, {
                params: {
                    latitude: city.latitude,
                    longitude: city.longitude,
                    hourly: 'temperature_2m',
                    daily: ['temperature_2m_max', 'temperature_2m_min'],
                    current_weather: true,
                    timezone: 'auto'
                }
            });

            setWeatherData({
                ...weatherRes.data,
                displayName: `${city.name}, ${city.admin1 ? city.admin1 + ', ' : ''}${city.country}`
            });
            setError('');
        } catch (err) {
            console.error("Weather error", err);
            setError("Failed to fetch weather data");
        } finally {
            setLoading(false);
        }
    };
    
    // Get current temperature from weather data
    const currentTemp = weatherData?.current_weather?.temperature 
        ? Math.round(weatherData.current_weather.temperature) 
        : '---';

    // Get display name or default
    const displayName = weatherData?.displayName || "---";

    // Format current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Get weather type based on API weather code
    const currentWeather = getWeatherType(weatherData?.current_weather?.weathercode);
  
  return (
    <div className="w-full mx-auto my-10 flex flex-col items-center space-y-[64px]">
        <FadeInUp 
            delay={0.1}
            className="max-w-[330px] sm:max-w-[482px] md:max-w-[731px] text-center"
        >
            <h1 className="text-[45px] sm:text-[52px] font-bold text-white">How's the sky looking today?</h1>
        </FadeInUp>

        <FadeInUp 
            delay={0.2}
            className="w-full mx-auto"
        >
            <div className="flex flex-col sm:flex-row  gap-[16px] max-w-[656px] text-white mx-auto relative">
                {/* location input */}
                <div className="bg-[#262540] w-full sm:max-w-[526px] rounded-[12px] flex items-center py-[16px] px-[24px] mx-auto gap-[16px]">
                    <Search size={20} className="text-white" />

                    <input 
                        onChange={handleInputChange}
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
                    className="bg-[#4658D9] hover:bg-[#2B1B9C] cursor-pointer py-[16px] px-[24px] rounded-[12px] flex"
                >
                    <p className="text-[20px] mx-auto">{loading ? 'Searching...' : 'Search'}</p>
                </TapButton>

                {/* Suggestions dropdown */}
                {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#262540] rounded-[12px] overflow-hidden z-20 max-w-[526px]">
                        {suggestions.map((city) => (
                            <div
                                key={city.id}
                                onClick={() => handleSelectCity(city)}
                                className="py-3 px-6 hover:bg-[#3C3B5E] cursor-pointer transition-colors"
                            >
                                {city.name}, {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                            </div>
                        ))}
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="absolute top-full left-0 mt-2 text-red-400 text-sm">
                        {error}
                    </div>
                )}
            </div>
        </FadeInUp>

        <div className="w-full mx-auto lg:flex space-y-[32px] lg:space-y-0 text-white gap-[32px]">
            <div className="w-full lg:max-w-[70%] space-y-[32px]">

                {/* weather info card */}
                <ScaleFade 
                    delay={0.3}
                    className="relative w-full rounded-[20px] flex flex-col sm:flex-row items-center justify-between py-[80px] px-[24px] overflow-hidden"
                >
                    {/* Animated Weather Background */}
                    <WeatherBackground weatherType={currentWeather} />
                    
                    {/* Content overlay */}

                    <div className="relative z-10 space-y-[12px]">
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
                            <i>{currentTemp}°</i>
                        </motion.div>
                    </div>
                </ScaleFade>

                <Condition />
                
                <Daily />
            </div>

            <Hourly />
        </div>
    </div>
  )
}

export default Body