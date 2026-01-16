import React, { forwardRef } from "react";

import clsx from "clsx"
import { unitTemp } from './index'
import { TapButton } from "../Animations/motion";


interface UnitProps {
    selectedUnits: Record<number, number>;
    setSelectedUnits: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

const Unit = forwardRef<HTMLDivElement, UnitProps>(({ selectedUnits, setSelectedUnits }, ref) => {
        const handleSelect = (categoryIndex: number, unitId: number) => {
                setSelectedUnits((prev) => ({ ...prev, [categoryIndex]: unitId }))
        }

    return (
        <div ref={ref} className='w-54 text-white bg-[#262540] border border-[#3C3B5E] py-2.5 px-2 space-y-3 rounded-xl absolute z-50'>
        <TapButton className='text-[18px] font-medium py-2.5 px-2 rounded-lg hover:bg-[#3C3B5E]/50 text-center cursor-pointer'>Switch to Imperial</TapButton>

        <div className='flex flex-col gap-2.5'>
            {unitTemp.map(({ title, units }, index) => (
                <React.Fragment key={index}>
                    <div className='flex flex-col gap-2 cursor-pointer'>
                        <h1 className='text-[#ACACB7] text-[14px] font-medium'><i>{title}</i></h1>
                        <ul className="space-y-2">
                            {units.map((unit) => (
                                <li>
                                    <TapButton
                                        key={unit.id}
                                        onClick={() => handleSelect(index, unit.id)}
                                        className={clsx(
                                            "py-2.5 px-2 text-[16px] font-medium rounded-lg text-white hover:bg-[#3C3B5E]/50",
                                            selectedUnits[index] === unit.id 
                                                ? "bg-[#3C3B5E] " 
                                                : ""
                                        )}
                                    >
                                        {unit.name}
                                    </TapButton>
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
});

export default Unit;