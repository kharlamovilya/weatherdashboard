const express = require("express");

const router = express.Router();

let history = [];

router.get("/", (req, res) => {
    res.json(history);
});

router.post("/", (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).json({
            error: "City is required"
        });
    }

    const record = {
        city,
        searchedAt: new Date().toISOString()
    };

    history.push(record);

    res.status(201).json({
        message: "Search history saved",
        record
    });
});

module.exports = router;