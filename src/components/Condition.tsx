import { conditionTitles } from '.'
import { StaggerContainer, StaggerItem, HoverCard } from '../Animations/motion'
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
        {conditionTitles.map(({ id, title }) => {
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
                        className='p-5 rounded-xl bg-[#262540] border border-[#3C3B5E] space-y-5'
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