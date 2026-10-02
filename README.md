# 💻 Slutprojekt - Frontend (React Webbapp)

Detta är den webbaserade klienten för mitt fullstack-projekt. Applikationen är byggd med **React** och kommunicerar med mitt centrala C# API för att hantera användare, uppgifter och statistik.

## 🚀 Teknisk Stack
* **Bibliotek:** React
* **Kommunikation:** Fetch API för anrop mot backend
* **Funktioner:** Hanterar inloggning (med LocalStorage), datavisning och filuppladdning.

## 🛠️ Kom igång & Starta webbappen

För att köra applikationen lokalt behöver du ha Node.js installerat på din dator.

### 1. Installation
Öppna en terminal i projektets rotmapp och installera alla nödvändiga paket:
`npm install`

### 2. Starta applikationen
När installationen är klar, starta utvecklingsservern med kommandot:
`npm run dev`
*(Notering: Om projektet är byggt med Create React App, använd kommandot `npm start` istället).*

### 3. API-krav
För att webbappen ska fungera korrekt (inloggning, hämtning av uppgifter etc.) måste backend-API:et vara igång samtidigt på datorn. Webbappen gör sina anrop mot localhost.