import { useMemo } from "react"
import { motion } from "framer-motion"

type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'thunderstorm'

interface WeatherBackgroundProps {
    weatherType: WeatherType
}

interface CloudProps {
    dark?: boolean
    top: string
    duration: number
    delay?: number
}

const Cloud = ({ dark = false, top, duration, delay = 0 }: CloudProps) => {
    const color = dark ? "bg-slate-500/70" : "bg-white/80"
    return (
        <motion.div
            className="absolute left-0"
            style={{ top }}
            animate={{ x: ["-150px", "calc(100vw + 150px)"] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear", repeatDelay: 0 }}
        >
            <div className="relative">
                <div className={`absolute w-16 h-10 ${color} rounded-full blur-[2px]`} />
                <div className={`absolute left-8 -top-3 w-20 h-14 ${color} rounded-full blur-[2px]`} />
                <div className={`absolute left-20 top-0 w-14 h-10 ${color} rounded-full blur-[2px]`} />
            </div>
        </motion.div>
    )
}

interface RainDropProps {
    delay: number
    duration: number
    left: string
    color: string
}

const RainDrop = ({ delay, duration, left, color }: RainDropProps) => (
    <motion.div
        className="absolute w-0.5 rounded-full"
        style={{ left, height: "12px", backgroundColor: color }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: "400px", opacity: [0, 0.7, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
)

const Rain = ({ isStorm = false }: { isStorm?: boolean }) => {
    const drops = useMemo(() => {
        const count = isStorm ? 60 : 40
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 2,
            duration: isStorm ? 0.4 + Math.random() * 0.3 : 0.6 + Math.random() * 0.4
        }))
    }, [isStorm])

    const color = isStorm ? "#8faec9" : "#a4d4ff"

    return (
        <div className="absolute inset-0 overflow-hidden">
            {drops.map((drop) => (
                <RainDrop key={drop.id} {...drop} color={color} />
            ))}
        </div>
    )
}

const Lightning = () => (
    <motion.svg
        className="absolute top-2 left-[20%] w-12 h-28"
        viewBox="0 0 50 120"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0, 0, 0, 0.8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
        <path
            d="M25 0 L15 45 L25 45 L10 120 L30 55 L20 55 L35 0 Z"
            fill="url(#lightning-grad)"
            filter="drop-shadow(0 0 8px rgba(255, 255, 100, 0.9))"
        />
        <defs>
            <linearGradient id="lightning-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#ffffa0" />
                <stop offset="100%" stopColor="#ffff00" />
            </linearGradient>
        </defs>
    </motion.svg>
)

const gradients: Record<WeatherType, string> = {
    sunny: "bg-gradient-to-b from-[#4A90D9] via-[#74B9FF] to-[#87CEEB]",
    cloudy: "bg-gradient-to-b from-[#5D6D7E] via-[#85929E] to-[#ABB2B9]",
    rainy: "bg-gradient-to-b from-[#2C3E50] via-[#34495E] to-[#5D6D7E]",
    thunderstorm: "bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
}

const WeatherBackground = ({ weatherType }: WeatherBackgroundProps) => {
    return (
        <div className={`absolute inset-0 overflow-hidden rounded-[20px] ${gradients[weatherType]}`}>
            {weatherType === 'sunny' && (
                <motion.div
                    className="absolute top-6 right-8 w-20 h-20 bg-yellow-300 rounded-full shadow-[0_0_60px_20px_rgba(255,223,0,0.5)]"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            )}

            {weatherType === 'cloudy' && (
                <>
                    <Cloud top="15%" duration={25} />
                    <Cloud top="40%" duration={18} delay={8} />
                    <Cloud top="65%" duration={22} delay={12} />
                </>
            )}

            {(weatherType === 'rainy' || weatherType === 'thunderstorm') && (
                <>
                    <Cloud dark top="3%" duration={20} />
                    <Cloud dark top="10%" duration={16} delay={8} />
                    <Rain isStorm={weatherType === 'thunderstorm'} />
                </>
            )}

            {weatherType === 'thunderstorm' && (
                <>
                    <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 0.3, 0, 0, 0, 0.2, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <Lightning />
                </>
            )}
        </div>
    )
}

export default WeatherBackground
