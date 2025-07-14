const treinos = [
  {
    dia: "DIA 1 – Inferiores + Core + Cardio Leve",
    tecnica: "Bi-set com cadência + isometria",
    objetivo: "Ativação de glúteos, MMII sem impacto lombar",
    exercicios: [
      ["Leg Press 45°", "3", "15", "Cadência 3s", "Pés altos para poupar lombar"],
      ["Mesa Flexora", "3", "15", "Bi-set", "Com glúteo 4 apoios"],
      ["Glúteo 4 apoios (caneleira)", "3", "15 cada", "Bi-set", "Contração máxima"],
      ["Abdução de quadril máquina", "3", "15", "Isometria", "3s de contração no final"],
      ["Prancha frontal", "3", "40s", "Isometria", "Ativação de core"]
    ],
    cardio: "10 min caminhada inclinada leve ou bike moderada"
  },
  {
    dia: "DIA 2 – Superiores + Core",
    tecnica: "Rest-pause leve + foco postural",
    objetivo: "Gasto calórico com tonificação",
    exercicios: [
      ["Puxador frente (barra larga)", "3", "12", "Rest-pause 5s", "Controle total"],
      ["Remada baixa", "3", "12", "-", "Contração escapular"],
      ["Supino reto (halteres)", "3", "12", "-", "Movimento fluido"],
      ["Elevação lateral + frontal", "3", "12+12", "Bi-set", "Ombros com cadência"],
      ["Abdominal crunch máquina", "3", "15", "-", "Com foco na respiração"]
    ]
  },
  {
    dia: "DIA 3 – Glúteos + Posterior + Core",
    tecnica: "Bi-set e isometria com foco na posterior",
    objetivo: "Modelagem e segurança lombar",
    exercicios: [
      ["Stiff com halteres (leve)", "3", "15", "Cadência", "Controle total, sem travar"],
      ["Mesa flexora", "3", "15", "Bi-set", "Com ponte de glúteo"],
      ["Ponte de glúteo (anilha)", "3", "20", "Bi-set", "3s contração no alto"],
      ["Glúteo no cabo unilateral", "3", "15 cada", "-", "Foco na ativação consciente"],
      ["Prancha lateral", "3", "30s cada", "Isometria", "Core e estabilidade lombar"]
    ]
  },
  {
    dia: "DIA 4 – Full Body + Cardio",
    tecnica: "Circuito funcional leve",
    objetivo: "Queima calórica e resistência",
    exercicios: [
      ["Agachamento no banco", "3", "15", "-", "Controle e equilíbrio"],
      ["Remada unilateral (halter)", "3", "12 cada", "-", "Movimento fluido"],
      ["Desenvolvimento com halter", "3", "12", "-", "Sem trapézio"],
      ["Avanço com peso do corpo", "3", "12 cada", "-", "Passos curtos e controlados"],
      ["Prancha dinâmica (joelho)", "3", "40s", "-", "Alterna lado a lado"]
    ],
    cardio: "12 minutos em escada ou elíptico (leve a moderado)"
  }
];

const treinoContainer = document.getElementById("treinoContainer");
const progresso = JSON.parse(localStorage.getItem("progresso") || "{}");

treinos.forEach((treino, i) => {
  const card = document.createElement("div");
  card.className = "card";

  let html = `
    <h2>${treino.dia}</h2>
    <p><strong>Técnica:</strong> ${treino.tecnica}</p>
    <p><strong>Objetivo:</strong> ${treino.objetivo}</p>
    <table class="exercise-table">
      <thead>
        <tr>
          <th>✔</th>
          <th>Exercício</th>
          <th>Séries</th>
          <th>Reps</th>
          <th>Técnica</th>
          <th>Obs</th>
          <th>Descanso</th>
        </tr>
      </thead>
      <tbody>
  `;

  treino.exercicios.forEach((ex, j) => {
    const key = `d${i}_e${j}`;
    const checked = progresso[key]?.feito ? "checked" : "";
    const doneClass = progresso[key]?.feito ? "done" : "";

    html += `
      <tr class="exercise-row ${doneClass}" data-key="${key}">
        <td><input type="checkbox" ${checked}></td>
        <td>${ex[0]}</td>
        <td>${ex[1]}</td>
        <td>${ex[2]}</td>
        <td>${ex[3]}</td>
        <td>${ex[4]}</td>
        <td>
          <button class="timer-btn" onclick="iniciarTimer(this)">⏱️</button>
          <span class="timer-display">00:00</span>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  if (treino.cardio) html += `<p><strong>Cardio:</strong> ${treino.cardio}</p>`;
  card.innerHTML = html;
  treinoContainer.appendChild(card);
});

document.querySelectorAll(".exercise-row input[type='checkbox']").forEach(input => {
  input.addEventListener("change", function () {
    const row = this.closest(".exercise-row");
    const key = row.dataset.key;
    const feito = this.checked;
    row.classList.toggle("done", feito);
    progresso[key] = { feito };
    localStorage.setItem("progresso", JSON.stringify(progresso));
  });
});

function iniciarTimer(btn) {
  const span = btn.nextElementSibling;
  let tempo = 60;
  span.textContent = formatar(tempo);
  btn.disabled = true;

  const intervalo = setInterval(() => {
    tempo--;
    span.textContent = formatar(tempo);
    if (tempo <= 0) {
      clearInterval(intervalo);
      btn.disabled = false;
      span.textContent = "✔️";
    }
  }, 1000);
}

function formatar(s) {
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${m}:${sec}`;
}

const feedback = document.getElementById("feedback");
const feedbackSalvo = localStorage.getItem("feedbackGlobal");
if (feedbackSalvo) feedback.value = feedbackSalvo;

document.getElementById("salvarFeedback").addEventListener("click", () => {
  localStorage.setItem("feedbackGlobal", feedback.value);
  alert("Feedback salvo com sucesso!");
});

document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
