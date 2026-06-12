const express = require("express");

const router = express.Router();

let favorites = [];

router.get("/", (req, res) => {
    res.json(favorites);
});

router.post("/", (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).json({
            error: "City is required"
        });
    }

    if (!favorites.includes(city)) {
        favorites.push(city);
    }

    res.status(201).json({
        message: "Favorite added",
        city
    });
});

router.delete("/:city", (req, res) => {
    const city = req.params.city;

    favorites = favorites.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    res.json({
        message: "Favorite removed",
        city
    });
});

module.exports = router;