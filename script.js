const apiKey = "09da788b1ac7bc23e707c351352a2a6a"; // ใส่ API Key ของคุณตรงนี้

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info-container");
const forecastContainer = document.getElementById("forecast-container");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
        saveCity(city);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        fetchWeather(lastCity);
        fetchForecast(lastCity);
    }
});

function saveCity(city) {
    localStorage.setItem("lastCity", city);
}

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("ไม่พบข้อมูลเมือง");
        const data = await res.json();
        displayWeather(data);
        changeBackground(data.weather[0].main);
    } catch (error) {
        weatherInfo.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const html = `
        <h2 class="fade-in">${data.name}, ${data.sys.country}</h2>
        <p class="temp fade-in">${Math.round(data.main.temp)}°C</p>
        <p class="fade-in">${data.weather[0].description}</p>
        <p class="fade-in">ความชื้น: ${data.main.humidity}% | ลม: ${data.wind.speed} m/s</p>
    `;
    weatherInfo.innerHTML = html;
}

async function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=th`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("ไม่พบข้อมูลพยากรณ์");
        const data = await res.json();
        displayForecast(data);
    } catch (error) {
        forecastContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayForecast(data) {
    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    const forecastHTML = daily.map(item => `
        <div class="forecast-card fade-in">
            <p>${new Date(item.dt_txt).toLocaleDateString("th-TH", { weekday: "short", day: "numeric", month: "short" })}</p>
            <p>${item.weather[0].description}</p>
            <p>${Math.round(item.main.temp)}°C</p>
        </div>
    `).join("");
    forecastContainer.innerHTML = forecastHTML;
}

function changeBackground(weatherMain) {
    document.body.classList.remove("sunny", "rainy", "cloudy");
    if (weatherMain.includes("Clear")) {
        document.body.classList.add("sunny");
    } else if (weatherMain.includes("Rain")) {
        document.body.classList.add("rainy");
    } else if (weatherMain.includes("Cloud")) {
        document.body.classList.add("cloudy");
    }
}
