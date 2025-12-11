const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const weatherIcon = document.querySelector("#weather-icon");
const forecastTemp = document.querySelector("#forecast-temp");

// --- Replace these ---
const lat = -16.49469163457868;
const lon = -68.11755960479924;
const apiKey = "317206b6561569c5b192116010f244f0";
// ---------------------

const currentWeatherURL = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        // CURRENT WEATHER
        const response = await fetch(currentWeatherURL);
        const data = await response.json();

        const temp = data.main.temp.toFixed(1);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;

        currentTemp.textContent = `${temp}°C`;
        weatherDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIcon.alt = desc;

        // FORECAST (3 days ahead)
        const forecastRes = await fetch(forecastURL);
        const forecastData = await forecastRes.json();

        // Find the forecast approx. 72 hours ahead (index 24)
        const threeDayTemp = forecastData.list[24].main.temp.toFixed(1);

        forecastTemp.textContent = `${threeDayTemp}°C`;

    } catch (error) {
        console.log("Weather API Error:", error);
    }
}

getWeather();
