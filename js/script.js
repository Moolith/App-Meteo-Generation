/**
 * @fileoverview Logica principale dell'app meteo 8-bit.
 * Gestisce chiamate API, caching locale e rendering della UI.
 * @requires config.js
 */

import ENV from './config.js';

/**
 * Mappatura dei codici meteo WMO in descrizioni testuali ed emoji.
 * @type {Object.<number, {desc: string, icon: string}>}
 */
const WEATHER_MAP = {
    0: { desc: "SOLE", icon: "☀️" }, 1: { desc: "QUASI SOLE", icon: "🌤️" },
    2: { desc: "NUBI PARZ.", icon: "⛅" }, 3: { desc: "NUVOLOSO", icon: "☁️" },
    45: { desc: "NEBBIA", icon: "🌫️" }, 61: { desc: "PIOGGIA", icon: "🌧️" },
    71: { desc: "NEVE", icon: "❄️" }, 95: { desc: "TEMPORALE", icon: "⛈️" }
};

/**
 * Rimuove la voce di cache più vecchia se viene superato il limite massimo.
 * @returns {void}
 */
function cleanupCache() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('weather_'));
    if (keys.length >= ENV.MAX_CACHE_ENTRIES) {
        const entries = keys.map(k => ({
            key: k,
            exp: JSON.parse(localStorage.getItem(k)).expiry
        }));
        entries.sort((a, b) => a.exp - b.exp);
        localStorage.removeItem(entries[0].key);
    }
}

/**
 * Recupera i dati meteo tramite API o Cache e avvia il rendering.
 * @async
 * @function performSearch
 * @returns {Promise<void>}
 */
async function performSearch() {
    const input = document.getElementById('cityInput');
    const btn = document.getElementById('searchBtn');
    const city = input.value.trim();

    if (!city || !/^[a-zA-Z\s\-áéíóúÁÉÍÓÚñÑ]+$/.test(city)) {
        updateStatus("INPUT NON VALIDO!", "error-text");
        return;
    }

    const cacheKey = `weather_${city.toLowerCase().replace(/\s/g, '_')}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        const parsedCache = JSON.parse(cached);
        if (Date.now() < parsedCache.expiry) {
            renderUI(parsedCache.payload);
            return;
        }
    }

    btn.disabled = true;
    updateStatus("CONNESSIONE SATELLITE...", "");

    try {
        const geoRes = await fetch(`${ENV.GEOCODING_API_URL}?name=${encodeURIComponent(city)}&count=1&language=it&format=json`);
        const geoData = await geoRes.json();
        
        if (!geoData.results) throw new Error("NOT_FOUND");
        const { latitude: lat, longitude: lon, name } = geoData.results[0];

        const params = `?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
        const wRes = await fetch(`${ENV.WEATHER_API_URL}${params}`);
        const w = await wRes.json();

        const payload = {
            name: name.toUpperCase(),
            current: {
                temp: w.current_weather.temperature,
                wind: w.current_weather.windspeed,
                code: w.current_weather.weathercode,
                hum: w.hourly.relative_humidity_2m[0]
            },
            weekly: w.daily.time.map((d, i) => ({
                day: ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"][new Date(d).getDay()],
                max: w.daily.temperature_2m_max[i],
                min: w.daily.temperature_2m_min[i],
                code: w.daily.weathercode[i],
                rain: w.daily.precipitation_probability_max[i]
            }))
        };

        cleanupCache();
        localStorage.setItem(cacheKey, JSON.stringify({
            payload: payload,
            expiry: Date.now() + ENV.CACHE_EXPIRATION_MS
        }));

        renderUI(payload);

    } catch (err) {
        updateStatus(err.message === "NOT_FOUND" ? "CITTA' NON TROVATA" : "ERRORE CONNESSIONE", "error-text");
    } finally {
        btn.disabled = false;
    }
}

/**
 * Aggiorna gli elementi DOM con i dati meteo ricevuti.
 * @param {Object} data - L'oggetto contenente i dati meteo correnti e settimanali.
 */
function renderUI(data) {
    if (!data) return;

    updateStatus("", "");
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('tempC').innerText = data.current.temp;
    document.getElementById('tempF').innerText = (data.current.temp * 9/5 + 32).toFixed(1);
    document.getElementById('hum').innerText = data.current.hum;
    document.getElementById('wind').innerText = data.current.wind;

    const cur = WEATHER_MAP[data.current.code] || { desc: "VARIABILE", icon: "🌈" };
    document.getElementById('weatherDesc').innerText = `${cur.icon} ${cur.desc}`;

    const container = document.getElementById('weeklyContainer');
    container.innerHTML = data.weekly.map(d => {
        const icon = (WEATHER_MAP[d.code] || { icon: "🌈" }).icon;
        return `
            <div class="day-card">
                <div class="day-name">${d.day}</div>
                <span class="day-icon">${icon}</span>
                <div class="day-temp">${d.max}°/${d.min}°</div>
                <div class="day-rain">💧${d.rain}%</div>
            </div>
        `;
    }).join('');

    document.getElementById('result').style.display = "block";
}

/**
 * Mostra un messaggio di stato (errore o caricamento) sotto l'input.
 * @param {string} text - Testo da mostrare.
 * @param {string} className - Classe CSS da applicare (es. 'error-text').
 */
function updateStatus(text, className) {
    const s = document.getElementById('statusMessage');
    s.innerText = text;
    s.className = `status-text ${className}`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('cityInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
});