const express = require("express");
const cors = require("cors");

const weatherRoutes = require("./routes/weatherRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const historyRoutes = require("./routes/historyRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/favorites", favoritesRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Interactive Weather Dashboard API is running"
    });
});

module.exports = app;