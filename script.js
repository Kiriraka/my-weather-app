const apiKey = '09da788b1ac7bc23e707c351352a2a6a';

// 1. เลือก DOM Elements
const searchForm = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');
const favoritesContainer = document.querySelector('#favorites-container');
const refreshBtn = document.querySelector('#refresh-btn');

// --- EVENT LISTENERS ---
// โหลดเมืองโปรดเมื่อเปิดหน้าเว็บ
document.addEventListener('DOMContentLoaded', loadFavoriteCities);

// จัดการการเพิ่มเมืองใหม่
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName) {
        addCityToFavorites(cityName);
        cityInput.value = '';
    }
});

// จัดการการลบเมือง (ใช้ Event Delegation)
favoritesContainer.addEventListener('click', event => {
    const btn = event.target.closest('.remove-btn');
    if (btn) {
        const card = btn.closest('.weather-card');
        if (card) {
            const cityKey = card.dataset.city;
            removeCityFromFavorites(cityKey, card);
        }
    }
});

// จัดการการ Refresh
refreshBtn.addEventListener('click', loadFavoriteCities);

// --- FUNCTIONS ---

function getFavoriteCities() {
    const citiesJSON = localStorage.getItem('favoriteCities');
    return citiesJSON ? JSON.parse(citiesJSON) : [];
}

function saveFavoriteCities(cities) {
    // localStorage.removeItem('favoriteCities', JSON.stringify(cities))
    localStorage.setItem('favoriteCities', JSON.stringify(cities));
}

function loadFavoriteCities() {
    favoritesContainer.innerHTML = '';
    const cities = getFavoriteCities();
    console.log("โหลดเมืองใหม่:", cities);
    cities.forEach(cityKey => fetchAndDisplayWeather(cityKey));
}

async function addCityToFavorites(cityName) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=th`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`ไม่พบข้อมูลของ ${cityName}`);
        const data = await response.json();

        const properName = data.name;     // ชื่อจริงจาก API
        const keyName = cityName.toLowerCase(); // ✅ เก็บเป็น lowercase

        let cities = getFavoriteCities();
        if (!cities.includes(keyName)) {
            cities.push(keyName);
            saveFavoriteCities(cities);
            loadFavoriteCities();
        } else {
            alert(`${properName} อยู่ในรายการโปรดแล้ว`);
        }
    } catch (error) {
        alert(error.message);
    }
}

function removeCityFromFavorites(cityKey, cardElement) {
    let cities = getFavoriteCities();
    const newCities = cities.filter(c => c !== cityKey.toLowerCase()); // ✅ เปรียบแบบ lowercase
    saveFavoriteCities(newCities);
    console.log("หลังจากลบ:", newCities);

    if (cardElement) {
        cardElement.remove();
    }
}

async function fetchAndDisplayWeather(cityKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityKey}&appid=${apiKey}&units=metric&lang=th`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`ไม่พบข้อมูลของ ${cityKey}`);

        const data = await response.json();

        const { name, main, weather } = data;
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.setAttribute('data-city', cityKey); // ✅ ใช้ key lowercase สำหรับลบ

        card.innerHTML = `
            <div>
                <h3>${name}</h3>
                <p>${weather[0].description}</p>
            </div>
            <div class="text-right">
                <p class="temp">${main.temp.toFixed(1)}°C</p>
            </div>
            <button class="remove-btn">X</button>
        `;

        favoritesContainer.appendChild(card);

    } catch (error) {
        console.error(error);
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `<h3>${cityKey}</h3><p class="error">${error.message}</p>`;
        favoritesContainer.appendChild(card);
    }
}
