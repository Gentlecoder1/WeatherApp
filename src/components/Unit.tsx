import React, { forwardRef } from "react";
import { FaCheck } from "react-icons/fa6";
import clsx from "clsx"

import { unitTemp } from './index'
import { TapButton } from "../Animations/motion";


interface UnitProps {
    selectedUnits: Record<number, number>;
    setSelectedUnits: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

const Unit = forwardRef<HTMLDivElement, UnitProps>(({ selectedUnits, setSelectedUnits }, ref) => {

    // Determine if current selection is metric (all first units)
    const isMetric = Object.values(selectedUnits).every(unitId => unitId === 1);

    // Toggle all units between metric (1) and imperial (2)
    const handleToggleUnits = () => {
        setSelectedUnits((prev) => {
            const newUnits: Record<number, number> = {};
            const toImperial = Object.values(prev).every(unitId => unitId === 1);
            Object.keys(prev).forEach((key) => {
                newUnits[Number(key)] = toImperial ? 2 : 1;
            });
            return newUnits;
        });
    };

    const handleSelect = (categoryIndex: number, unitId: number) => {
        setSelectedUnits((prev) => ({ ...prev, [categoryIndex]: unitId }))
    }

    return (
        <div ref={ref} className='w-54 text-white bg-[#262540] border border-[#3C3B5E] py-2.5 px-2 space-y-3 rounded-xl absolute z-50'>
            <TapButton
                className='text-[18px] font-medium py-2.5 px-2 rounded-lg hover:bg-[#3C3B5E]/50 text-center cursor-pointer'
                onClick={handleToggleUnits}
            >
                {isMetric ? 'Switch to Imperial' : 'Switch to Metric'}
            </TapButton>

            <div className='flex flex-col gap-2.5'>
                {unitTemp.map(({ title, units }, index) => (
                    <React.Fragment key={index}>
                        <div className='flex flex-col gap-2 cursor-pointer'>
                            <h1 className='text-[#ACACB7] text-[14px] font-medium'><i>{title}</i></h1>
                            <ul className="space-y-2">
                                {units.map((unit) => (
                                    <li key={unit.id}>
                                        <TapButton
                                            onClick={() => handleSelect(index, unit.id)}
                                            className={clsx(
                                                "py-2.5 px-2 text-[16px] font-medium flex justify-between items-center rounded-lg text-white hover:bg-[#3C3B5E]/50",
                                                selectedUnits[index] === unit.id 
                                                    ? "bg-[#3C3B5E] " 
                                                    : ""
                                            )}
                                        >
                                            <p>{unit.name}</p>
                                            {
                                                selectedUnits[index] === unit.id 
                                                ? <FaCheck /> 
                                                : ""
                                            }
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