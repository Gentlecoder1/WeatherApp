import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'thunderstorm'

interface WeatherBackgroundProps {
    weatherType: WeatherType
}

// Cloud component for realistic cloud shapes
const Cloud = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <div className={`absolute ${className}`} style={style}>
        <div className="relative">
            {/* Main cloud body */}
            <div className="absolute w-16 h-10 bg-white/80 rounded-full blur-[2px]" />
            <div className="absolute left-8 -top-3 w-20 h-14 bg-white/90 rounded-full blur-[2px]" />
            <div className="absolute left-20 top-0 w-14 h-10 bg-white/80 rounded-full blur-[2px]" />
            <div className="absolute left-4 top-4 w-24 h-8 bg-white/70 rounded-full blur-[2px]" />
            {/* Cloud highlights */}
            <div className="absolute left-10 -top-1 w-12 h-8 bg-white/95 rounded-full blur-[1px]" />
        </div>
    </div>
)

// Smaller cloud variant
const SmallCloud = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <div className={`absolute ${className}`} style={style}>
        <div className="relative scale-75">
            <div className="absolute w-10 h-6 bg-white/70 rounded-full blur-[2px]" />
            <div className="absolute left-5 -top-2 w-12 h-8 bg-white/80 rounded-full blur-[2px]" />
            <div className="absolute left-12 top-0 w-8 h-6 bg-white/70 rounded-full blur-[2px]" />
        </div>
    </div>
)

// Dark rain cloud component
const RainCloud = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <div className={`absolute ${className}`} style={style}>
        <div className="relative">
            {/* Dark cloud body */}
            <div className="absolute w-14 h-8 bg-slate-400/70 rounded-full blur-[2px]" />
            <div className="absolute left-6 -top-2 w-16 h-10 bg-slate-500/80 rounded-full blur-[2px]" />
            <div className="absolute left-16 top-0 w-12 h-8 bg-slate-400/70 rounded-full blur-[2px]" />
            <div className="absolute left-3 top-3 w-20 h-6 bg-slate-600/60 rounded-full blur-[2px]" />
        </div>
    </div>
)

// Smaller dark rain cloud
const SmallRainCloud = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <div className={`absolute ${className}`} style={style}>
        <div className="relative scale-60">
            <div className="absolute w-10 h-5 bg-slate-400/60 rounded-full blur-[2px]" />
            <div className="absolute left-4 -top-1 w-12 h-7 bg-slate-500/70 rounded-full blur-[2px]" />
            <div className="absolute left-10 top-0 w-8 h-5 bg-slate-400/60 rounded-full blur-[2px]" />
        </div>
    </div>
)

// Particle configurations for each weather type
const getParticleConfig = (weatherType: WeatherType): ISourceOptions => {
    const configs: Record<WeatherType, ISourceOptions> = {
        sunny: {
            fullScreen: { enable: false },
            background: {
                color: { value: "transparent" }
            },
            particles: {
                number: { value: 30, density: { enable: true } },
                color: { value: ["#FFD700", "#FFF8DC", "#FFFACD"] },
                shape: { type: "circle" },
                opacity: {
                    value: { min: 0.3, max: 0.7 },
                    animation: { enable: true, speed: 1, sync: false }
                },
                size: {
                    value: { min: 2, max: 6 },
                    animation: { enable: true, speed: 2, sync: false }
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "top",
                    random: true,
                    outModes: { default: "out" }
                }
            }
        },
        cloudy: {
            fullScreen: { enable: false },
            background: {
                color: { value: "transparent" }
            },
            particles: {
                number: { value: 0 } // No particles, using CSS clouds instead
            }
        },
        rainy: {
            fullScreen: { enable: false },
            background: {
                color: { value: "transparent" }
            },
            particles: {
                number: { value: 200, density: { enable: true, width: 400, height: 400 } },
                color: { value: "#a4d4ff" },
                shape: { type: "circle" },
                opacity: { value: { min: 0.4, max: 0.8 } },
                size: { value: { min: 1, max: 3 } },
                move: {
                    enable: true,
                    speed: { min: 10, max: 20 },
                    direction: "bottom",
                    straight: true,
                    outModes: { default: "out" }
                },
                trail: {
                    enable: true,
                    length: 8,
                    fill: {
                        color: "#a4d4ff"
                    }
                }
            }
        },
        thunderstorm: {
            fullScreen: { enable: false },
            background: {
                color: { value: "transparent" }
            },
            particles: {
                number: { value: 300, density: { enable: true, width: 400, height: 400 } },
                color: { value: "#8faec9" },
                shape: { type: "circle" },
                opacity: { value: { min: 0.5, max: 0.9 } },
                size: { value: { min: 1, max: 4 } },
                move: {
                    enable: true,
                    speed: { min: 20, max: 35 },
                    direction: "bottom",
                    straight: true,
                    outModes: { default: "out" }
                },
                trail: {
                    enable: true,
                    length: 10,
                    fill: {
                        color: "#8faec9"
                    }
                }
            }
        }
    }
    return configs[weatherType]
}

// Gradient backgrounds for each weather type
const gradients: Record<WeatherType, string> = {
    sunny: "bg-gradient-to-b from-[#4A90D9] via-[#74B9FF] to-[#87CEEB]",
    cloudy: "bg-gradient-to-b from-[#5D6D7E] via-[#85929E] to-[#ABB2B9]",
    rainy: "bg-gradient-to-b from-[#2C3E50] via-[#34495E] to-[#5D6D7E]",
    thunderstorm: "bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
}

const WeatherBackground = ({ weatherType }: WeatherBackgroundProps) => {
    const [init, setInit] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine)
        }).then(() => {
            setInit(true)
        })
    }, [])

    const options = useMemo(() => getParticleConfig(weatherType), [weatherType])

    return (
        <div className={`absolute inset-0 overflow-hidden rounded-[20px] ${gradients[weatherType]}`}>
            {init && weatherType !== 'cloudy' && (
                <Particles
                    id={`tsparticles-${weatherType}`}
                    options={options}
                    className="absolute inset-0 w-full h-full"
                />
            )}
            
            {/* Sun element for sunny weather */}
            {weatherType === 'sunny' && (
                <div className="absolute top-6 right-8 w-20 h-20 bg-yellow-300 rounded-full shadow-[0_0_60px_20px_rgba(255,223,0,0.5)] animate-pulse" />
            )}

            {/* Animated clouds for cloudy weather */}
            {weatherType === 'cloudy' && (
                <>
                    {/* Layer 1 - Background clouds (slower, more transparent) */}
                    <Cloud 
                        className="animate-[cloudMove_25s_linear_infinite] opacity-50"
                        style={{ top: '15%', animationDelay: '0s' }}
                    />
                    <SmallCloud 
                        className="animate-[cloudMove_30s_linear_infinite] opacity-40"
                        style={{ top: '50%', animationDelay: '-5s' }}
                    />
                    
                    {/* Layer 2 - Middle clouds */}
                    <Cloud 
                        className="animate-[cloudMove_20s_linear_infinite] opacity-70"
                        style={{ top: '30%', animationDelay: '-8s' }}
                    />
                    <SmallCloud 
                        className="animate-[cloudMove_22s_linear_infinite] opacity-60"
                        style={{ top: '65%', animationDelay: '-12s' }}
                    />
                    
                    {/* Layer 3 - Foreground clouds (faster, more opaque) */}
                    <Cloud 
                        className="animate-[cloudMove_15s_linear_infinite] opacity-90 scale-110"
                        style={{ top: '45%', animationDelay: '-3s' }}
                    />
                    <SmallCloud 
                        className="animate-[cloudMove_18s_linear_infinite] opacity-80"
                        style={{ top: '75%', animationDelay: '-10s' }}
                    />

                    {/* Extra clouds for density */}
                    <Cloud 
                        className="animate-[cloudMove_28s_linear_infinite] opacity-45 scale-90"
                        style={{ top: '8%', animationDelay: '-15s' }}
                    />
                    <SmallCloud 
                        className="animate-[cloudMove_24s_linear_infinite] opacity-55"
                        style={{ top: '85%', animationDelay: '-7s' }}
                    />
                </>
            )}

            {/* Dark clouds for rainy weather */}
            {weatherType === 'rainy' && (
                <>
                    <RainCloud 
                        className="animate-[cloudMove_22s_linear_infinite] opacity-70"
                        style={{ top: '5%', animationDelay: '0s' }}
                    />
                    <SmallRainCloud 
                        className="animate-[cloudMove_28s_linear_infinite] opacity-50"
                        style={{ top: '18%', animationDelay: '-6s' }}
                    />
                    <RainCloud 
                        className="animate-[cloudMove_18s_linear_infinite] opacity-80"
                        style={{ top: '10%', animationDelay: '-12s' }}
                    />
                    <SmallRainCloud 
                        className="animate-[cloudMove_25s_linear_infinite] opacity-60"
                        style={{ top: '2%', animationDelay: '-4s' }}
                    />
                </>
            )}
            
            {/* Lightning flash and bolt for thunderstorm */}
            {weatherType === 'thunderstorm' && (
                <>
                    {/* Background flash */}
                    <div className="absolute inset-0 animate-[flash_4s_ease-in-out_infinite] bg-white/0" 
                         style={{
                             animation: 'flash 4s ease-in-out infinite'
                         }}
                    />
                    
                    {/* Lightning bolt 1 */}
                    <svg 
                        className="absolute top-2 left-[20%] w-12 h-28 animate-[lightning_4s_ease-in-out_infinite]"
                        viewBox="0 0 50 120"
                        fill="none"
                    >
                        <path
                            d="M25 0 L15 45 L25 45 L10 120 L30 55 L20 55 L35 0 Z"
                            fill="url(#lightning-gradient-1)"
                            filter="drop-shadow(0 0 8px rgba(255, 255, 100, 0.9)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))"
                        />
                        <defs>
                            <linearGradient id="lightning-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="30%" stopColor="#ffffa0" />
                                <stop offset="100%" stopColor="#ffff00" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Lightning bolt 2 - delayed */}
                    <svg 
                        className="absolute top-4 right-[25%] w-10 h-24 animate-[lightning2_4s_ease-in-out_infinite]"
                        viewBox="0 0 50 120"
                        fill="none"
                    >
                        <path
                            d="M28 0 L18 40 L26 40 L12 120 L32 50 L22 50 L38 0 Z"
                            fill="url(#lightning-gradient-2)"
                            filter="drop-shadow(0 0 6px rgba(255, 255, 100, 0.8)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))"
                        />
                        <defs>
                            <linearGradient id="lightning-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="40%" stopColor="#ffffa0" />
                                <stop offset="100%" stopColor="#ffdd00" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Dark storm clouds */}
                    <RainCloud 
                        className="animate-[cloudMove_20s_linear_infinite] opacity-90"
                        style={{ top: '0%', animationDelay: '0s' }}
                    />
                    <RainCloud 
                        className="animate-[cloudMove_16s_linear_infinite] opacity-80"
                        style={{ top: '8%', animationDelay: '-8s' }}
                    />
                    <SmallRainCloud 
                        className="animate-[cloudMove_22s_linear_infinite] opacity-70"
                        style={{ top: '5%', animationDelay: '-4s' }}
                    />
                </>
            )}
        </div>
    )
}

export default WeatherBackground
