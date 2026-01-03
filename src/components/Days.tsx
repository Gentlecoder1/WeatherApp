import { useState } from "react"
import clsx from "clsx"
import { daysOfWeek } from './index'

const Days = () => {
    const [selectedDay, setSelectedDay] = useState<number>(1) // default to first day

  return (
    <div className='w-[214px] text-white bg-[#262540] border border-[#3C3B5E] py-[10px] px-[8px] rounded-[12px] absolute'>
        <ul>
            {daysOfWeek.map((day) => (
                <li 
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={clsx(
                        "cursor-pointer py-[6px] px-[8px] text-[16px] font-500 rounded-[8px] text-white",
                        selectedDay === day.id 
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