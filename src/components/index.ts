import Sunny from '../assets/Sunny.png'
import Cloud from '../assets/cloud.png'
import Rain from '../assets/Rain.svg'
import Thunderstorms from '../assets/Thunderstorms.svg'
import PartlyCloudy from '../assets/PartlyCloudy.svg'

export const unitTemp = [
    {
        id: 1,
        title: "Temperature",
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

export const daysOfWeek = [
    { id: 1, name: 'Sunday' },
    { id: 2, name: 'Monday' },
    { id: 3, name: 'Tuesday' },
    { id: 4, name: 'Wednesday' },
    { id: 5, name: 'Thursday' },
    { id: 6, name: 'Friday' },
    { id: 7, name: 'Saturday' }
]

export const dailyForecast = [
    {
        id: 1,
        day: 'Tue',
        icon: Sunny,
        high: 20,
        low: 10
    },
    {
        id: 2,
        day: 'Wed',
        icon: Cloud,
        high: 18,
        low: 9
    },
    {  
        id: 3,
        day: 'Thu',
        icon: Rain,
        high: 16,
        low: 8
    },
    {
        id: 4,
        day: 'Fri',
        icon: Thunderstorms,
        high: 15,
        low: 7
    },
    {
        id: 5,
        day: 'Sat',
        icon: Sunny,
        high: 22,
        low: 11
    },
    {
        id: 6,
        day: 'Sun',
        icon: PartlyCloudy,
        high: 19,
        low: 10
    },
    {
        id: 7,
        day: 'Mon',
        icon: Rain,
        high: 17,
        low: 9
    }
]