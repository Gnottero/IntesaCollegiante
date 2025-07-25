let punti = 0;
let passi = 3;
let tempMax = 60;
let tempo = tempMax;
let intervallo;
const maxPassi = 3;
let partitaInCorso = false;

const parolaEl = document.getElementById("parola");
const puntiEl = document.getElementById("punti");
const passiEl = document.getElementById("passi");
const timerEl = document.getElementById("timer");

// Inizializza il timer visualizzato
timerEl.textContent = tempo;

async function nuovaParola() {
  const res = await fetch("/parola");
  const data = await res.json();
  parolaEl.textContent = data.parola;
}

function resetPartita() {
  clearInterval(intervallo);
  tempo = tempMax;
  punti = 0;
  passi = maxPassi;
  partitaInCorso = false;
  timerEl.textContent = tempo;
  puntiEl.textContent = punti;
  passiEl.textContent = passi;
  parolaEl.textContent = "Premi Start";
}

function avviaPartita() {
  if (partitaInCorso) return;
  if (tempo <= 0) resetPartita();
  partitaInCorso = true;
  nuovaParola();
  intervallo = setInterval(() => {
    tempo--;
    timerEl.textContent = tempo;
    if (tempo <= 0) {
      clearInterval(intervallo);
      parolaEl.textContent = "⏰ Tempo Scaduto!";
      partitaInCorso = false;
    }
  }, 1000);
}

document.getElementById("startBtn").onclick = avviaPartita;
document.getElementById("resetBtn").onclick = resetPartita;

document.getElementById("puntoBtn").onclick = () => {
  if (tempo <= 0) return;
  punti++;
  puntiEl.textContent = punti;
  pausaPartita();
};

document.getElementById("menoBtn").onclick = () => {
  if (tempo <= 0) return;
  if (punti > 0) punti--;
  puntiEl.textContent = punti;
  pausaPartita();
};

document.getElementById("passoBtn").onclick = () => {
  if (tempo <= 0 || passi <= 0) return;
  passi--;
  passiEl.textContent = passi;
  pausaPartita();
};

function pausaPartita() {
  clearInterval(intervallo);
  partitaInCorso = false;
}

window.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    event.preventDefault();
    pausaPartita();
  }
});