import Sunny from '../assets/Sunny.png'
import Cloud from '../assets/cloud.png'
import Rain from '../assets/Rain.svg'
import Snowy from '../assets/Snow.svg'
import Thunderstorms from '../assets/Thunderstorms.svg'
// import PartlyCloudy from '../assets/PartlyCloudy.svg'
import type { Day } from '../utils/data'


export const unitTemp = [
    {
        id: 1,
        title: "Temp",
        units: [
            { id: 1, name: 'Celsius (°C)' },
            { id: 2, name: 'Fahrenheit (°F)' }
        ]
    },
    {
        id: 1,
        title: "Wind Speed",
        units: [
            { id: 1, name: 'km/h' },
            { id: 2, name: 'mph' }
        ]
    },
    {
        id: 1,
        title: "Precipitation",
        units: [
            { id: 1, name: 'Millimeters (mm)' },
            { id: 2, name: 'Inches (in)' }
        ]
    }
]

// Conditions titles - values come from API via useWeatherLogic hook
export const conditionTitles = [
    { id: 1, title: "Feels like" },
    { id: 2, title: "Humidity" },
    { id: 3, title: "Wind" },
    { id: 4, title: "Precipitation" }
]

/**
 * Get ordered week days starting from today (local function, not dependent on API)
 * Returns 7 days with current day at the top
 */
export const getOrderedWeekDays = (): Day[] => {
  const today = new Date();
  const days: Day[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toISOString().split('T')[0]; // "2026-01-15" format

    days.push({
      id: i + 1,
      name: dayName,
      date: dateStr
    });
  }

  return days;
};

 // Weather icon mapping
export const weatherIcons = {
    sunny: Sunny,
    cloudy: Cloud,
    rainy: Rain,
    thunderstorm: Thunderstorms,
    snowy: Snowy
}