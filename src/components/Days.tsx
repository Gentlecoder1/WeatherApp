import clsx from "clsx"
import type { Day } from '../utils/data'

interface DaysProps {
    selectedDay: Day | null | undefined;
    days: Day[];
    onSelect: (day: Day) => void;
}


const Days = ({ days = [], selectedDay, onSelect }: DaysProps) => {
    if (!days || days.length === 0) {
        return null;
    }
    
    return (
        <div className='w-53.5 text-white bg-[#262540] border border-[#3C3B5E] py-2.5 px-2 rounded-xl'>
            <ul className="space-y-2">
                {days.map((day: Day) => (
                    <li
                        key={day.id}
                        onClick={() => onSelect(day)}
                        className={clsx(
                            "cursor-pointer py-2.5 px-2 text-[16px] font-medium rounded-lg text-white hover:bg-[#3C3B5E]/50",
                            selectedDay && selectedDay.id === day.id ? "bg-[#3C3B5E]" : ""
                        )}
                    >
                        {day.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Days