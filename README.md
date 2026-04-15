
# 🌈 Meteo 8-Bit Pro

Un'applicazione meteo in stile pixel-art ispirata ai videogiochi classici. Offre previsioni in tempo reale e settimanali con un'interfaccia ottimizzata per PC e Mobile.

## 🚀 Caratteristiche
- **Design 8-Bit**: Interfaccia grafica coerente con font e animazioni pixel-art.
- **Cache Intelligente**: Memorizza i dati per 30 minuti per ridurre le chiamate API e migliorare la velocità.
- **Layout Adattivo**: Visualizzazione orizzontale (7 giorni in linea) su PC e a griglia su mobile.
- **Dati Completi**: Temperatura (C/F), Umidità, Vento e probabilità di pioggia.

## 🛠️ Tecnologie Utilizzate
- **HTML5 & CSS3**: Utilizzo di CSS Grid e animazioni Keyframes.
- **JavaScript (ES6+)**: Architettura a moduli e Fetch API.
- **Open-Meteo API**: Per i dati meteorologici e il geocoding (senza chiavi API esposte).

## 📂 Struttura del Progetto
```text
/
├── index.html          # Struttura principale
├── README.md           # Documentazione
├── TEST_CASES.md       # Casi di test
├── css/
│   └── style.css       # Stili e animazioni nuvole
└── js/
    ├── config.js       # Variabili di configurazione (Environment)
    └── script.js       # Logica applicativa e gestione cache
```

## ⚙️ Installazione e Utilizzo
Poiché l'app utilizza i **Moduli JavaScript**, deve essere eseguita tramite un server locale per evitare restrizioni di sicurezza (CORS).

1. **VS Code**: Installa l'estensione "Live Server", tasto destro su `index.html` -> "Open with Live Server".
2. **Python**: Se hai Python installato, esegui `python -m http.server` nella cartella del progetto.
3. **Browser**: Apri l'indirizzo `http://127.0.0.1:5500` (o quello indicato dal tuo server).

## 🔒 Nota sulla Sicurezza
Le URL delle API sono centralizzate in `js/config.js`. Se in futuro utilizzerò API con chiavi private, mi assicurerò di implementare un proxy backend per non esporre le chiavi nel codice client-side.




