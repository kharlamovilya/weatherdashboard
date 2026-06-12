const API_BASE = "http://localhost:3000/api";

let currentCity = "";

async function searchWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const errorBox = document.getElementById("error");

    errorBox.textContent = "";

    if (!city) {
        errorBox.textContent = "Please enter a city name.";
        return;
    }

    try {
        const unit = document.querySelector('input[name="unit"]:checked').value;
        const response = await fetch(`${API_BASE}/weather?city=${city}&unit=${unit}`);
        if (!response.ok) {
            throw new Error("Weather request failed");
        }

        const data = await response.json();

        currentCity = data.city;

        document.getElementById("cityName").textContent = data.city;
        document.getElementById("temperature").textContent = `Temperature: ${data.temperature} °C`;
        document.getElementById("humidity").textContent = `Humidity: ${data.humidity}%`;
        document.getElementById("description").textContent = `Description: ${data.description}`;

        document.getElementById("weatherCard").classList.remove("hidden");

        await saveHistory(data.city);
        await loadHistory();

    } catch (error) {
        errorBox.textContent = "Could not load weather data.";
    }
}

async function addFavorite() {
    if (!currentCity) return;

    await fetch(`${API_BASE}/favorites`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({city: currentCity})
    });

    await loadFavorites();
}

async function loadFavorites() {
    const response = await fetch(`${API_BASE}/favorites`);
    const favorites = await response.json();

    const list = document.getElementById("favoritesList");
    list.innerHTML = "";

    favorites.forEach(city => {
        const li = document.createElement("li");
        li.innerHTML = `${city}<button onclick="removeFavorite('${city}')">Remove</button>`;
        list.appendChild(li);
    });
}

async function saveHistory(city) {
    await fetch(`${API_BASE}/history`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({city})
    });
}

async function loadHistory() {
    const response = await fetch(`${API_BASE}/history`);
    const history = await response.json();

    const list = document.getElementById("historyList");
    list.innerHTML = "";

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.city} - ${item.searchedAt}`;
        list.appendChild(li);
    });
}

async function removeFavorite(city) {
    await fetch(`${API_BASE}/favorites/${city}`, {
        method: "DELETE"
    });

    await loadFavorites();
}

loadFavorites();
loadHistory();