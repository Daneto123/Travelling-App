import axios from 'axios';

interface GeoCodeResponse {
    lat: string;
    lon: string;
}

async function geocodeCity(cityName: string): Promise<[number, number] | null> {
    try {
        const response = await axios.get<GeoCodeResponse>(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`);
        const data = response.data;
        if (data && data.length > 0) {
            const latitude = parseFloat(data[0].lat);
            const longitude = parseFloat(data[0].lon);
            return [latitude, longitude];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error geocoding city:', error);
        return null;
    }
}


export { geocodeCity };