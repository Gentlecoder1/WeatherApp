import React from "react"
import clsx from "clsx"
import { unitTemp } from './index'


interface UnitProps {
  selectedUnits: Record<number, number>;
  setSelectedUnits: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

const Unit = ({ selectedUnits, setSelectedUnits }: UnitProps) => {
    const handleSelect = (categoryIndex: number, unitId: number) => {
        setSelectedUnits((prev) => ({ ...prev, [categoryIndex]: unitId }))
    }

  return (
    <div className='w-[214px] text-white bg-[#262540] border border-[#3C3B5E] py-[10px] px-[8px] rounded-[12px] absolute'>
        <div className='text-[18px] font-500 py-[10px] px-[8px]'>Switch to Imperial</div>

        <div className='flex flex-col gap-[10px]'>
            {unitTemp.map(({ title, units }, index) => (
                <React.Fragment key={index}>
                    <div className='flex flex-col gap-[8px] cursor-pointer'>
                        <h1 className='text-[#ACACB7] text-[14px] font-500'>{title}</h1>
                        <ul>
                            {units.map((unit) => (
                                <li 
                                    key={unit.id}
                                    onClick={() => handleSelect(index, unit.id)}
                                    className={clsx(
                                        "py-[6px] px-[8px] text-[16px] font-500 rounded-[8px] text-white",
                                        selectedUnits[index] === unit.id 
                                            ? "bg-[#3C3B5E] " 
                                            : ""
                                    )}
                                >
                                   {unit.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {index < unitTemp.length - 1 && <hr />}
                </React.Fragment>
            ))}
        </div>
    </div>
  )
}

export default Unit