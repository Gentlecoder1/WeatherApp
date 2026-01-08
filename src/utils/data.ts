export interface WeekDay {
  id: number;
  name: string;
}

export const getOrderedWeekDays = (): WeekDay[] => {
  const todayIndex = new Date().getDay();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  return [...days.slice(todayIndex), ...days.slice(0, todayIndex)]
    .map((name, idx) => ({ id: idx, name }));
};
