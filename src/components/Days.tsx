import clsx from "clsx"


interface Day {
    id: number;
    name: string;
}

interface DaysProps {
    selectedDay: Day | null | undefined;
    days?: Day[];
    onSelect: (day: Day) => void;
}


const Days = ({ days = [], selectedDay, onSelect }: DaysProps) => {
    if (!days || days.length === 0) {
        return null;
    }
    
    return (
        <div className='w-[214px] text-white bg-[#262540] border border-[#3C3B5E] py-[10px] px-[8px] rounded-[12px] absolute'>
            <ul>
                {days.map((day: Day) => (
                    <li
                        key={day.id}
                        onClick={() => onSelect(day)}
                        className={clsx(
                            "cursor-pointer py-[6px] px-[8px] text-[16px] font-500 rounded-[8px] text-white",
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