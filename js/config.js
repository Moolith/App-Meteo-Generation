/**
 * @fileoverview Configurazione globale e variabili d'ambiente per l'applicazione Meteo.
 * @module config
 */

/**
 * @typedef {Object} Config
 * @property {string} WEATHER_API_URL - Endpoint per le previsioni Open-Meteo.
 * @property {string} GEOCODING_API_URL - Endpoint per la ricerca delle coordinate.
 * @property {number} CACHE_EXPIRATION_MS - Tempo di validità della cache in millisecondi.
 * @property {number} MAX_CACHE_ENTRIES - Numero massimo di città memorizzabili localmente.
 */

/** @type {Config} */
const ENV = {
    WEATHER_API_URL: "https://api.open-meteo.com/v1/forecast",
    GEOCODING_API_URL: "https://geocoding-api.open-meteo.com/v1/search",
    CACHE_EXPIRATION_MS: 30 * 60 * 1000,
    MAX_CACHE_ENTRIES: 50
};

export default ENV;