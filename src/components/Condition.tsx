import { conditionTitles } from '.'
import { StaggerContainer, StaggerItem, HoverCard } from '../Animations/motion'
import { convertTemp, convertWind, convertPrecip } from '../utils/unitConversion';

interface ConditionProps {
  conditions: { id: number; value: number | string }[];
  tempUnit: '°C' | '°F';
  windUnit: 'km/h' | 'mph';
  precipUnit: 'mm' | 'in';
}
const Condition = ({ conditions, tempUnit, windUnit, precipUnit }: ConditionProps) => {
  return (
    <StaggerContainer 
      staggerDelay={0.15}
      childrenDelay={0.6}
      className='w-full grid grid-cols-2 sm:grid-cols-4 gap-[24px]'
    >
        {conditionTitles.map(({ id, title, unit }) => {
            const condition = conditions.find(c => c.id === id);
            let value = condition?.value ?? '--';
            if (typeof value === 'number') {
              if (id === 1) value = convertTemp(value, tempUnit);
              if (id === 3) value = convertWind(value, windUnit);
              if (id === 4) value = convertPrecip(value, precipUnit);
            }
            const displayValue = typeof value === 'number' ? Math.round(value) : value;
            
            return (
                <StaggerItem key={id}>
                    <HoverCard
                        scale={1.02}
                        // lift={-5}
                        className='p-[20px] rounded-[12px] bg-[#262540] border border-[#3C3B5E] space-y-[20px]'
                    >
                        <p className='text-[18px] font-500 text-[#D4D3D9]'>{title}</p>
                        <p className='text-[32px] font-300'>{displayValue}{unit}</p>
                    </HoverCard>
                </StaggerItem>
            );
        })}
    </StaggerContainer>
  )
}

export default Condition