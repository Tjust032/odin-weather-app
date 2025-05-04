import './styles.css'; // Import styles
import { getWeather } from './modules/weatherapi.js';
import lofiAudio from './assets/audios/some-lofi.mp3';
import clearWeather from './assets/audios/clear-weather-music.mp3';
import rainyWeather from './assets/audios/rainy-weather-music.mp3';
import partlyCloudy from './assets/audios/partly-cloudy-music.mp3';

// Grab all html elements
const searchBar = document.querySelector('.search-bar input');
const weatherIcon = document.querySelector('.weather-info .weather-icon img');
const backgroundGif = document.querySelector('.background-gif');
const temperature = document.querySelector('.weather-info .temperature');
const location = document.querySelector('.weather-info .location');
const humidityLabel = document.getElementById('humidity-label');
const windSpeedLabel = document.getElementById('wind-label');

// Weather background GIFs
const SUNNY_WEATHER_URL =
    'https://64.media.tumblr.com/82c3faacad3d9cf03bded602985e0221/tumblr_omh938XTbk1vg9wr5o1_400.gif';
const RAINY_WEATHER_URL = 'https://i.gifer.com/embedded/download/Z5aE.gif';
const SNOWY_WEATHER_URL =
    'https://cdna.artstation.com/p/assets/images/images/037/904/864/original/ryan-haight-uw-snow-big.gif';
const CLOUDY_WEATHER_URL =
    'https://i.pinimg.com/originals/bc/24/b2/bc24b2dd54aeb8d2cb19593a6fef29f0.gif';

// Weather icon URLs
const partlyCloudyIconUrl =
    'https://cdn-icons-png.freepik.com/512/11742/11742562.png';
const rainyIconUrl = 'https://cdn-icons-png.flaticon.com/512/4834/4834585.png';

// Create audio objects but don't play yet
const lofiMusic = new Audio(lofiAudio);
lofiMusic.loop = true;

const clearWeatherMusic = new Audio(clearWeather);
const rainyWeatherMusic = new Audio(rainyWeather);
const partlyCloudyMusic = new Audio(partlyCloudy);
rainyWeatherMusic.volume = 0.1;

clearWeatherMusic.preload = 'auto';
rainyWeatherMusic.preload = 'auto';
partlyCloudyMusic.preload = 'auto';

let currentWeatherData = await getWeather('Atlanta'); // Test location
console.log(currentWeatherData);

function playWeatherMusic(weather) {
    clearWeatherMusic.pause();
    clearWeatherMusic.currentTime = 0;
    rainyWeatherMusic.pause();
    rainyWeatherMusic.currentTime = 0;
    partlyCloudyMusic.pause();
    partlyCloudyMusic.currentTime = 0;

    switch (weather) {
        case 'Clear':
            clearWeatherMusic.play();
            break;
        case 'Rain':
            rainyWeatherMusic.play();
            break;
        case 'Partially cloudy':
        case 'Overcast':
            partlyCloudyMusic.play();
            break;
        default:
            clearWeatherMusic.play();
            break;
    }
}

function setWeatherBackground(weather) {
    console.log(`Weather is: ${weather}`);
    switch (weather) {
        case 'Clear':
            backgroundGif.src = SUNNY_WEATHER_URL;
            weatherIcon.src =
                'https://cdn-icons-png.flaticon.com/512/9055/9055356.png';
            break;
        case 'Rain':
            backgroundGif.src = RAINY_WEATHER_URL;
            weatherIcon.src = rainyIconUrl;
            break;
        case 'Snowy':
            backgroundGif.src = SNOWY_WEATHER_URL;
            break;
        case 'Partially cloudy':
        case 'Overcast':
            backgroundGif.src = CLOUDY_WEATHER_URL;
            weatherIcon.src = partlyCloudyIconUrl;
            break;
        default:
            backgroundGif.src = SUNNY_WEATHER_URL;
    }
}

function updateWeatherUI(weatherData) {
    humidityLabel.textContent = `${weatherData.currentConditions.humidity}%`;
    windSpeedLabel.textContent = `${weatherData.currentConditions.windspeed} mph`;
    location.textContent = weatherData.resolvedAddress;
    temperature.textContent = `${((weatherData.currentConditions.temp * 9) / 5 + 32).toFixed(1)}°F`;

    const mainCondition = weatherData.currentConditions.conditions
        .split(',')[0]
        .trim();

    console.log(mainCondition);
    setWeatherBackground(mainCondition);
}

// === AUDIO PLAYBACK GATE === //
let audioInitialized = false;

function initializeAudioPlayback() {
    if (audioInitialized) return;
    audioInitialized = true;

    lofiMusic.play().catch((err) => {
        console.warn('Lofi music blocked by browser:', err);
    });

    if (currentWeatherData) {
        const condition = currentWeatherData.currentConditions.conditions
            .split(',')[0]
            .trim();
        playWeatherMusic(condition);
    }
}

window.addEventListener('click', initializeAudioPlayback, { once: true });
window.addEventListener('keydown', initializeAudioPlayback, { once: true });

if (currentWeatherData) {
    updateWeatherUI(currentWeatherData);
} else {
    console.error('No weather data available');
}

// === SEARCH HANDLER === //
document
    .querySelector('.search-bar')
    .addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = searchBar.value.trim();
        if (query) {
            try {
                const weatherData = await getWeather(query);
                if (weatherData) {
                    currentWeatherData = weatherData;
                    updateWeatherUI(weatherData);

                    // Re-play correct weather music if audio was initialized
                    if (audioInitialized) {
                        const condition =
                            weatherData.currentConditions.conditions
                                .split(',')[0]
                                .trim();
                        playWeatherMusic(condition);
                    }
                } else {
                    console.error('No weather data available');
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
    });
