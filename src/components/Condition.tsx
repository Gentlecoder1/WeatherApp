import { motion } from 'framer-motion'

import React from 'react';
import { conditionTitles } from '.'
import { StaggerContainer, StaggerItem, HoverCard, floatAnimation, floatAnimationReverse } from '../Animations/motion'
import { convertTemp, convertWind, convertPrecip } from '../utils/unitConversion';

interface ConditionProps {
  conditions: Array<{ id: number; value: number | string | undefined; unit: string }>;
}
const Condition = ({ conditions = [] }: ConditionProps) => {
  return (
    <StaggerContainer 
      staggerDelay={0.15}
      childrenDelay={0.6}
      className='w-full grid grid-cols-2 sm:grid-cols-4 gap-5'
    >
      {conditionTitles.map(({ id, icon, title }) => {
        const condition = conditions.find(c => c.id === id);
        let value = condition?.value ?? '--';
        const unit = condition?.unit ?? '';
        
        // Apply conversion based on unit
        if (typeof value === 'number') {
          if (id === 1 && (unit === '°F' || unit === '°C')) value = convertTemp(value, unit as '°C' | '°F');
          if (id === 3 && (unit === 'mph' || unit === 'km/h')) value = convertWind(value, unit as 'km/h' | 'mph');
          if (id === 4 && (unit === 'in' || unit === 'mm')) value = convertPrecip(value, unit as 'mm' | 'in');
        }
        const displayValue = typeof value === 'number' ? Math.round(value) : value;

        return (
          <StaggerItem key={id}>
            <HoverCard
              scale={1.02}
              // lift={-5}
              className='p-5 rounded-xl bg-[#262540] border border-[#3C3B5E] space-y-3'
            >
              <div className='flex gap-4 items-center'>
                <motion.div 
                  animate={
                    id === 3 
                    ? { rotate: 360, transition: { duration: 0.9, repeat: Infinity, ease: "linear" } }
                    : id % 2 === 0 ? floatAnimation : floatAnimationReverse
                  }
                >
                  {React.createElement(icon, { className: "w-6 h-6" })}
                </motion.div>
                <p className='text-[18px] font-medium text-[#D4D3D9] truncate'>{title}</p>
              </div>
              <p className='text-[32px] font-300'>{displayValue}{unit}</p>
            </HoverCard>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  )
}

export default Condition