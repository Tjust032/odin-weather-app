const API_KEY = 'WABZ2R725W87W2QV4FQR5PVF8';
const BASE_URL =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

export const getWeather = async (location) => {
    const url = `${BASE_URL}${location}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
};
