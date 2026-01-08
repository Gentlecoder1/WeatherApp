import Sunny from '../assets/Sunny.png'
import Cloud from '../assets/cloud.png'
import Rain from '../assets/Rain.svg'
import Snowy from '../assets/Snow.svg'
import Thunderstorms from '../assets/Thunderstorms.svg'
import PartlyCloudy from '../assets/PartlyCloudy.svg'


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

// export const daysOfWeek = [
//     { id: 1, name: 'Sunday' },
//     { id: 2, name: 'Monday' },
//     { id: 3, name: 'Tuesday' },
//     { id: 4, name: 'Wednesday' },
//     { id: 5, name: 'Thursday' },
//     { id: 6, name: 'Friday' },
//     { id: 7, name: 'Saturday' }
// ]

// export const dailyForecast = [
//     {
//         id: 1,
//         icon: Sunny,
//         day: dailyData ? dailyData[0].time : '--',
//         high: dailyData ? Math.round(dailyData[0].high) : '--',
//         low: dailyData ? Math.round(dailyData[0].low) : '--'
//     },
//     {
//         id: 2,
//         icon: Cloud,
//         day: dailyData ? dailyData[1].time : '--',
//         high: dailyData ? Math.round(dailyData[1].high) : '--',
//         low: dailyData ? Math.round(dailyData[1].low) : '--'
//     },
//     {  
//         id: 3,
//         icon: Rain,
//         day: dailyData ? dailyData[2].time : '--',
//         high: dailyData ? Math.round(dailyData[2].high) : '--',
//         low: dailyData ? Math.round(dailyData[2].low) : '--'
//     },
//     {
//         id: 4,
//         icon: Thunderstorms,
//         day: dailyData ? dailyData[3].time : '--',
//         high: dailyData ? Math.round(dailyData[3].high) : '--',
//         low: dailyData ? Math.round(dailyData[3].low) : '--'
//     },
//     {
//         id: 5,
//         icon: Sunny,
//         day: dailyData ? dailyData[4].time : '--',
//         high: dailyData ? Math.round(dailyData[4].high) : '--',
//         low: dailyData ? Math.round(dailyData[4].low) : '--'
//     },
//     {
//         id: 6,
//         icon: PartlyCloudy,
//         day: dailyData ? dailyData[5].time : '--',
//         high: dailyData ? Math.round(dailyData[5].high) : '--',
//         low: dailyData ? Math.round(dailyData[5].low) : '--'
//     },
//     {
//         id: 7,
//         icon: Rain,
//         day: dailyData ? dailyData[6].time : '--',
//         high: dailyData ? Math.round(dailyData[6].high) : '--',
//         low: dailyData ? Math.round(dailyData[6].low) : '--'
//     }
// ]

export const hourlyForecast = [
    {
        id: 1,
        icon: Sunny,   
        time: '1 PM',
        temp: 18
    },
    {   
        id: 2,
        icon: PartlyCloudy,
        time: '2 PM',
        temp: 19
    },
    {  
        id: 3,
        icon: Cloud,
        time: '3 PM',
        temp: 17
    },
    {
        id: 4,
        icon: Rain,
        time: '4 PM',
        temp: 16
    },
    {
        id: 5,
        icon: Thunderstorms,
        time: '5 PM',
        temp: 15
    },
    {
        id: 6,
        icon: Cloud,
        time: '6 PM',
        temp: 14
    },
    {
        id: 7,
        icon: PartlyCloudy,
        time: '7 PM',
        temp: 13
    },
    {
        id: 8,
        icon: Sunny,
        time: '8 PM',
        temp: 12
    }
]

 // Weather icon mapping
export const weatherIcons = {
    sunny: Sunny,
    cloudy: Cloud,
    rainy: Rain,
    thunderstorm: Thunderstorms,
    snowy: Snowy
}