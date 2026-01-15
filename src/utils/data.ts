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