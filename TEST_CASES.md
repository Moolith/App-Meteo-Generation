
```markdown
# 🧪 Casi di Test - Meteo 8-Bit

Utilizzare questo documento come checklist per verificare la stabilità dell'applicazione dopo ogni aggiornamento del codice.

## 1. Test di Ricerca e Geocoding
| ID | Descrizione | Input | Risultato Atteso |
|:---|:---|:---|:---|
| TC-1 | Ricerca città valida | "Roma" | Mostra correttamente i dati meteo di Roma. |
| TC-2 | Città con nomi lunghi | "San Francisco" | L'interfaccia deve adattarsi senza rompere il layout. |
| TC-3 | Città inesistente | "CittàInesistente123" | Messaggio a schermo: "ERRORE: CITTA' NON TROVATA". |
| TC-4 | Input vuoto | "" | Nessuna chiamata API; messaggio: "INPUT NON VALIDO!". |
| TC-5 | Caratteri speciali | "!@#$%" | Messaggio di errore per input non valido. |

## 2. Test della Cache (LocalStorage)
| ID | Descrizione | Azione | Risultato Atteso |
|:---|:---|:---|:---|
| TC-6 | Salvataggio Cache | Cerca "Milano" | Controllare in "Ispeziona -> Application -> LocalStorage" la presenza di `weather_milano`. |
| TC-7 | Recupero Cache | Cerca "Milano" (entro 30m) | I dati appaiono istantaneamente senza mostrare "CONNESSIONE SATELLITE...". |
| TC-8 | Pulizia automatica | Supera 50 ricerche | Verificare che la funzione `cleanupCache` elimini la voce più vecchia. |

## 3. Test Layout e Visualizzazione
| ID | Descrizione | Azione | Risultato Atteso |
|:---|:---|:---|:---|
| TC-9 | Layout PC | Risoluzione > 1000px | Le card dei 7 giorni devono apparire su una singola riga orizzontale. |
| TC-10 | Layout Tablet | Risoluzione ~ 768px | La griglia settimanale deve passare a 4 colonne. |
| TC-11 | Layout Mobile | Risoluzione < 500px | La griglia settimanale deve passare a 2 colonne. |

## 4. Test Correttezza Dati
| ID | Descrizione | Verifica | Risultato Atteso |
|:---|:---|:---|:---|
| TC-12 | Conversione °F | Calcolo matematico | Verificare che °F sia uguale a `(°C * 9/5) + 32`. |
| TC-13 | Umidità e Vento | Confronto API | Verificare che i valori mostrati corrispondano ai dati dell'API Open-Meteo. |
| TC-14 | Coerenza Icone | Codici WMO | Se il codice è 0, deve apparire l'icona "☀️" e il testo "SOLE". |
```