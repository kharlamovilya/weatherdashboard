const API_BASE = "http://localhost:3000/api";
const MAX_HISTORY_ITEMS = 5;

let currentCity = "";
let isLoading = false;

const elements = {
    form: document.getElementById("searchForm"),
    input: document.getElementById("cityInput"),
    searchButton: document.getElementById("searchButton"),
    error: document.getElementById("error"),
    weatherCard: document.getElementById("weatherCard"),
    cityName: document.getElementById("cityName"),
    temperature: document.getElementById("temperature"),
    humidity: document.getElementById("humidity"),
    description: document.getElementById("description"),
    favoriteButton: document.getElementById("favoriteButton"),
    favoritesList: document.getElementById("favoritesList"),
    favoritesCount: document.getElementById("favoritesCount"),
    historyList: document.getElementById("historyList")
};

function getSelectedUnit() {
    return document.querySelector('input[name="unit"]:checked').value;
}

function getUnitSymbol(unit) {
    return unit === "imperial" ? "°F" : "°C";
}

function setError(message = "") {
    elements.error.textContent = message;
}

function setLoading(value) {
    isLoading = value;
    elements.searchButton.disabled = value;
    elements.searchButton.textContent = value ? "Loading..." : "Search";
}

function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

async function requestJson(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Request failed");
    return response.json();
}

async function searchWeather(cityFromClick) {
    if (isLoading) return;

    const city = (cityFromClick || elements.input.value).trim();
    setError();

    if (!city) {
        setError("Please enter a city name.");
        return;
    }

    setLoading(true);

    try {
        const unit = getSelectedUnit();
        const data = await requestJson(`${API_BASE}/weather?city=${encodeURIComponent(city)}&unit=${unit}`);

        currentCity = data.city;
        elements.input.value = data.city;
        renderWeather(data, unit);

        await saveHistory(data.city);
        await loadHistory();
    } catch (error) {
        setError("Could not load weather data. Check the city name and backend server.");
    } finally {
        setLoading(false);
    }
}

function renderWeather(data, unit) {
    elements.cityName.textContent = data.city;
    elements.temperature.textContent = `${Math.round(data.temperature)}${getUnitSymbol(unit)}`;
    elements.humidity.textContent = `Humidity ${data.humidity}%`;
    elements.description.textContent = data.description || "No description";
    elements.weatherCard.classList.remove("hidden");
}

async function addFavorite() {
    if (!currentCity) return;

    try {
        await fetch(`${API_BASE}/favorites`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({city: currentCity})
        });
        await loadFavorites();
    } catch (error) {
        setError("Could not save favorite city.");
    }
}

function createCityButton(city) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "city-button";
    button.textContent = city;
    button.addEventListener("click", () => searchWeather(city));
    return button;
}

async function loadFavorites() {
    try {
        const favorites = await requestJson(`${API_BASE}/favorites`);
        elements.favoritesList.textContent = "";
        elements.favoritesCount.textContent = favorites.length;

        if (!favorites.length) {
            elements.favoritesList.appendChild(createEmptyItem("No favorite cities yet."));
            return;
        }

        favorites.forEach(city => {
            const li = document.createElement("li");
            li.appendChild(createCityButton(city));

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "remove-button";
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => removeFavorite(city));

            li.appendChild(removeButton);
            elements.favoritesList.appendChild(li);
        });
    } catch (error) {
        elements.favoritesList.textContent = "";
        elements.favoritesList.appendChild(createEmptyItem("Could not load favorites."));
    }
}

async function saveHistory(city) {
    await fetch(`${API_BASE}/history`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({city})
    });
}

async function loadHistory() {
    try {
        const history = await requestJson(`${API_BASE}/history`);
        elements.historyList.textContent = "";

        const latestHistory = [...history]
            .sort((a, b) => new Date(b.searchedAt || 0) - new Date(a.searchedAt || 0))
            .slice(0, MAX_HISTORY_ITEMS);

        if (!latestHistory.length) {
            elements.historyList.appendChild(createEmptyItem("No recent searches yet."));
            return;
        }

        latestHistory.forEach(item => {
            const li = document.createElement("li");
            li.appendChild(createCityButton(item.city));

            const time = document.createElement("span");
            time.className = "meta";
            time.textContent = formatDate(item.searchedAt);

            li.appendChild(time);
            elements.historyList.appendChild(li);
        });
    } catch (error) {
        elements.historyList.textContent = "";
        elements.historyList.appendChild(createEmptyItem("Could not load history."));
    }
}

function createEmptyItem(text) {
    const li = document.createElement("li");
    li.className = "empty-item";
    li.textContent = text;
    return li;
}

async function removeFavorite(city) {
    try {
        await fetch(`${API_BASE}/favorites/${encodeURIComponent(city)}`, {method: "DELETE"});
        await loadFavorites();
    } catch (error) {
        setError("Could not remove favorite city.");
    }
}

elements.form.addEventListener("submit", event => {
    event.preventDefault();
    searchWeather();
});

elements.favoriteButton.addEventListener("click", addFavorite);
document.querySelectorAll('input[name="unit"]').forEach(input => {
    input.addEventListener("change", () => {
        if (currentCity) searchWeather(currentCity);
    });
});

loadFavorites();
loadHistory();
