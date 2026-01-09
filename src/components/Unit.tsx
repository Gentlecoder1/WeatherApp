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
    <div className='w-53.5 text-white bg-[#262540] border border-[#3C3B5E] py-2.5 px-2 rounded-xl absolute z-50'>
        <div className='text-[18px] font-500 py-2.5 px-2'>Switch to Imperial</div>

        <div className='flex flex-col gap-2.5'>
            {unitTemp.map(({ title, units }, index) => (
                <React.Fragment key={index}>
                    <div className='flex flex-col gap-2 cursor-pointer'>
                        <h1 className='text-[#ACACB7] text-[14px] font-500'>{title}</h1>
                        <ul>
                            {units.map((unit) => (
                                <li 
                                    key={unit.id}
                                    onClick={() => handleSelect(index, unit.id)}
                                    className={clsx(
                                        "py-1.5 px-2 text-[16px] font-500 rounded-lg text-white",
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