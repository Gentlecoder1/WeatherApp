import { useState, useRef, useEffect } from 'react';
import axios from 'axios'

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
        relative_humidity_2m: number[];
        precipitation: number[];
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
        windspeed: number;
    };
}

// Weather type
export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'thunderstorm' | 'snowy';

// Map Open-Meteo weather codes to our weather types
const getWeatherType = (code: number | undefined, temp: number | undefined): WeatherType => {
    // Very cold temperatures (freezing or below) with clear/cloudy sky should show snowy
    if (temp !== undefined && temp <= 0) {
        if (code === undefined || code === 0 || [1, 2, 3].includes(code)) {
            return 'snowy';
        }
    }
    
    if (code === undefined) return 'sunny';
    
    // Clear sky
    if (code === 0) return 'sunny';
    
    // Mainly clear, partly cloudy, overcast, fog
    if ([1, 2, 3, 45, 48].includes(code)) return 'cloudy';
    
    // Snow fall, snow grains, snow showers
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowy';
    
    // Drizzle, rain, freezing rain, rain showers
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rainy';
    
    // Thunderstorm (with or without hail)
    if ([95, 96, 99].includes(code)) return 'thunderstorm';
    
    return 'sunny'; // default
};

export const useWeatherLogic = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const abortControllerRef = useRef<AbortController | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search`
    const mainUrl = `https://api.open-meteo.com/v1/forecast`    
    
    const fetchWeatherData = async (city: City) => {
        setSuggestions([]);
        setLoading(true);

        const fullName = `${city.name}${city.admin1 ? `, ${city.admin1}` : ''}, ${city.country}`;

        try {
            const weatherRes = await axios.get(mainUrl, {
                params: {
                    latitude: city.latitude,
                    longitude: city.longitude,
                    hourly: 'temperature_2m,relative_humidity_2m,precipitation',
                    daily: 'temperature_2m_max,temperature_2m_min',
                    current_weather: true,
                    timezone: 'auto'
                }
            });
            console.log('API Response:', weatherRes.data);
            setWeatherData({
                ...weatherRes.data,
                displayName: fullName
            });
            setError('');
            setLocation(''); // Clear input after successful search
        } catch (err) {
            console.error("Weather error", err);
            setError("Failed to fetch weather data");
        } finally {
            setLoading(false);
        }
    };

    // function to search by cities for suggestions
    const searchCities = async (query: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        try {
            const geoRes = await axios.get(geoUrl, {
                params: { name: query },
                signal: abortControllerRef.current.signal
            });
            
            const results: City[] = geoRes.data.results || [];

            if (results.length === 0) {
                setSuggestions([]);
            } else if (results.length === 1) {
                fetchWeatherData(results[0]);
            } else {
                setSuggestions(results);
                setError('');
            }
        } catch (err: any) {
            if (axios.isCancel(err)) return;
            console.error("Geocoding error", err);
            setError('Failed to fetch city suggestions');
        }
    };
    
    // search function triggered on search button click
    const handleSearch = async () => {
        if (location.length < 2) return;

        setLoading(true);
        setError('');

        try {// Re-fetch the top result for whatever is currently in the text box
            const res = await axios.get(geoUrl, {
                params: { name: location, count: 1, language: 'en', format: 'json' }
            });

            if (res.data.results && res.data.results.length > 0) {
                await fetchWeatherData(res.data.results[0]);
                console.log("Fetched weather for", res.data.results[0]);
            } else {
                setError("City not found. Please be more specific.");
                setLocation('');
                setLoading(false);
            }
        } catch (err) {
            setError("Search failed.");
            setLocation('');
            setLoading(true);
        } finally {
            setLoading(false);
        }
    };

    // Debounce effect for city search
    useEffect(() => {
        if (location.length < 2) {
            setSuggestions([]);
            return; 
        }

        // Clear error when user starts typing a new search
        if (error) {
            setError('');
        }

        // Only skip search if location exactly matches current display name
        if (weatherData?.displayName.toLowerCase() === location.toLowerCase()) {
            setSuggestions([]);
            return;
        }

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            searchCities(location);
        }, 400);

        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [location]);

    // Computed values
    const currentTemp = weatherData?.current_weather?.temperature 
        ? Math.round(weatherData.current_weather.temperature) 
        : '---';

    const displayName = weatherData?.displayName || "---";

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const currentWeather = getWeatherType(
        weatherData?.current_weather?.weathercode,
        weatherData?.current_weather?.temperature
    );

    // Debug: log weatherData to see what's available
    console.log('weatherData:', weatherData);

    // Conditions data from API (from 'current' object)
    const windSpeed = weatherData?.current_weather?.windspeed;
    const apparentTemp = weatherData?.hourly?.temperature_2m?.[0];
    const relativeHum = weatherData?.hourly?.relative_humidity_2m?.[0];
    const precip = weatherData?.hourly?.precipitation?.[0];

    const conditions = [
        { id: 1, value: apparentTemp },
        { id: 2, value: relativeHum },
        { id: 3, value: windSpeed },
        { id: 4, value: precip }
    ];

    return {
        location, setLocation,
        weatherData,
        suggestions, setSuggestions,
        error, setError,
        loading,
        searchCities,
        fetchWeatherData,
        handleSearch,
        // Computed values
        currentTemp,
        displayName,
        currentDate,
        currentWeather,
        conditions
    }
}