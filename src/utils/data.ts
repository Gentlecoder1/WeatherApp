import type { WeatherType } from '../Functions.ts/useWeatherLogic'


export interface Day {
  id: number;
  name: string;
  date: string;
}

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

// interface for daily component data item
export interface DailyDataItem {
  id: number;
  time: string;
  date: string;
  high: number;
  low: number;
  unit: string;
  weatherCode?: number;
  weatherType?: WeatherType;
}

// interface for hourly component data item
export interface HourlyDataItem {
  time: string;
  date: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  weatherCode?: number;
  weatherType?: WeatherType;
  unit: string;
}
