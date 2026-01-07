// Utility functions for unit conversion

export function convertTemp(value: number, to: '°C' | '°F'): number {
    if (to === '°C') return value;
    // Celsius to Fahrenheit
    return Math.round((value * 9) / 5 + 32);
}

export function convertWind(value: number, to: 'km/h' | 'mph'): number {
    if (to === 'km/h') return value;
    // km/h to mph
    return Math.round(value * 0.621371);
}

export function convertPrecip(value: number, to: 'mm' | 'in'): number {
    if (to === 'mm') return value;
    // mm to inches
    return +(value * 0.0393701).toFixed(2);
}
