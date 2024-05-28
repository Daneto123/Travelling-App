import { geocodeCity } from '../api/geocoderData.ts';


export interface WeatherData {
    hourly: {
      time: Date[];
      temperature2m: number[];
    };
  }
  
  export async function fetchWeatherData(latitude: number, longitude: number ): Promise<WeatherData> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
    const response = await fetch(url);
    const data = await response.json();
  
    // Process the response data here (assuming similar structure as before)
    const hourly = {
      time: data.hourly.time.map((t) => new Date(t * 1000)),
      temperature2m: data.hourly.temperature_2m,
    };
  
    return { hourly };
  }