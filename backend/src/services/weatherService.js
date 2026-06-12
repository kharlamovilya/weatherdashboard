const axios = require("axios");

async function getCurrentWeather(city, unit = "metric") {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    const response = await axios.get(url);

    return {
        city: response.data.name,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        unit
    };
}

async function getForecast(city, unit = "metric") {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const url =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    const response = await axios.get(url);

    return {
        city: response.data.city.name,
        unit,
        forecast: response.data.list.slice(0, 5).map(item => ({
            dateTime: item.dt_txt,
            temperature: item.main.temp,
            description: item.weather[0].description
        }))
    };
}

module.exports = {
    getCurrentWeather,
    getForecast
};