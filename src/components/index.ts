import Sunny from '../assets/Sunny.png'
import Cloud from '../assets/cloud.png'
import Rain from '../assets/Rain.svg'
import Snowy from '../assets/Snow.svg'
import Thunderstorms from '../assets/Thunderstorms.svg'
// import PartlyCloudy from '../assets/PartlyCloudy.svg'


export const unitTemp = [
    {
        id: 1,
        title: "Temp",
        units: [
            { id: 1, name: 'Celsius (°C)' },
            { id: 2, name: 'Fahrenheit (°F)' }
        ]
    },
    {
        id: 1,
        title: "Wind Speed",
        units: [
            { id: 1, name: 'km/h' },
            { id: 2, name: 'mph' }
        ]
    },
    {
        id: 1,
        title: "Precipitation",
        units: [
            { id: 1, name: 'Millimeters (mm)' },
            { id: 2, name: 'Inches (in)' }
        ]
    }
]

// Conditions titles - values come from API via useWeatherLogic hook
export const conditionTitles = [
    { id: 1, title: "Feels like" },
    { id: 2, title: "Humidity" },
    { id: 3, title: "Wind" },
    { id: 4, title: "Precipitation" }
]


 // Weather icon mapping
export const weatherIcons = {
    sunny: Sunny,
    cloudy: Cloud,
    rainy: Rain,
    thunderstorm: Thunderstorms,
    snowy: Snowy
}