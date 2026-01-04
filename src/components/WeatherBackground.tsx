import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'thunderstorm'

interface WeatherBackgroundProps {
    weatherType: WeatherType
}

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
                number: { value: 15, density: { enable: true } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: {
                    value: { min: 0.2, max: 0.5 }
                },
                size: {
                    value: { min: 20, max: 60 }
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "right",
                    random: false,
                    outModes: { default: "out" }
                },
                wobble: {
                    enable: true,
                    distance: 10,
                    speed: 5
                }
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
            {init && (
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
            
            {/* Lightning flash for thunderstorm */}
            {weatherType === 'thunderstorm' && (
                <div className="absolute inset-0 animate-[flash_4s_ease-in-out_infinite] bg-white/0" 
                     style={{
                         animation: 'flash 4s ease-in-out infinite'
                     }}
                />
            )}
        </div>
    )
}

export default WeatherBackground
