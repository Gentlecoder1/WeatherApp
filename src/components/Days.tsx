import clsx from "clsx"
import { useWeatherLogic } from '../Functions.ts/useWeatherLogic'

interface Day {
    id: number
    name: string
}

interface DaysProps {
    selectedDay: Day
    onSelect: (day: Day) => void
}

const Days = ({ selectedDay, onSelect }: DaysProps) => {

    const { daysOfWeek } = useWeatherLogic();
    
    


  return (
    <div className='w-[214px] text-white bg-[#262540] border border-[#3C3B5E] py-[10px] px-[8px] rounded-[12px] absolute'>
        <ul>
            {daysOfWeek.map((day) => (
                <li 
                    key={day.id}
                    onClick={() => onSelect(day)}
                    className={clsx(
                        "cursor-pointer py-[6px] px-[8px] text-[16px] font-500 rounded-[8px] text-white",
                        selectedDay.id === day.id 
                            ? "bg-[#3C3B5E]" 
                            : ""
                    )}
                >
                    {day.name}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Days