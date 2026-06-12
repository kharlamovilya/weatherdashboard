const express = require("express");
const router = express.Router();

const weatherService =
    require("../services/weatherService");

router.get("/", async (req, res) => {

    try {

        const city = req.query.city;

        if (!city) {
            return res.status(400).json({
                error: "City parameter is required"
            });
        }

        const unit = req.query.unit || "metric";

        const weather =
            await weatherService.getCurrentWeather(city, unit);
        res.json(weather);

    } catch (error) {
        console.log("WEATHER API ERROR:", error.response?.data || error.message);

        res.status(500).json({
            error: "Failed to fetch weather data",
            details: error.response?.data || error.message
        });
    }
});

router.get("/forecast", async (req, res) => {
    try {
        const city = req.query.city;
        const unit = req.query.unit || "metric";

        if (!city) {
            return res.status(400).json({
                error: "City parameter is required"
            });
        }

        const forecast = await weatherService.getForecast(city, unit);

        res.json(forecast);

    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch forecast data"
        });
    }
});

module.exports = router;