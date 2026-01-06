import { useState, useEffect, useRef } from 'react';
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

export const useWeatherLogic = () => {
    const [location, setLocation] = useState('');
        const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
        const [suggestions, setSuggestions] = useState<City[]>([]);
        // const [selectedCity, setSelectedCity] = useState<City | null>(null);
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
                        hourly: 'temperature_2m',
                        daily: ['temperature_2m_max', 'temperature_2m_min'],
                        current_weather: true,
                        timezone: 'auto'
                    }
                });
    
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
                    // Don't set error here - it's just no suggestions, not a fatal error
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

        return {
            location, setLocation,
            weatherData,
            suggestions, setSuggestions,
            error, setError,
            loading,
            searchCities,
            fetchWeatherData, debounceRef, 
            abortControllerRef, handleSearch
        }
}