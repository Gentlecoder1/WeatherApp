import type { WeatherType } from '../hooks/useWeatherLogic'

export interface Day {
  id: number;
  name: string;
  date: string;
}

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
