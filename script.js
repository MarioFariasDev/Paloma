const treinos = [
    {
        dia: "DIA 1 – Full Body + Cardio Intervalado",
        tecnica: "Circuito leve + Bi-set",
        objetivo: "Ativação global, gasto calórico, técnica",
        exercicios: [
            ["Leg Press 45°", "3", "15", "-", "Pés altos para poupar lombar"],
            ["Mesa Flexora", "3", "15", "Bi-set", "Junto com Glúteo Coice"],
            ["Glúteo Coice no Cabo", "3", "15 cada", "Bi-set", "-"],
            ["Puxador frontal neutro", "3", "12-15", "-", "Controle total"],
            ["Remada baixa", "3", "12-15", "-", "Postura ereta"],
            ["Elevação lateral", "3", "15", "Bi-set", "Com elevação frontal"],
            ["Elevação frontal", "3", "15", "Bi-set", "-"],
            ["Prancha", "3", "30-40s", "-", "Ativação de core"]
        ],
        cardio: "10min caminhada inclinada ou transport leve"
    },
    {
        dia: "DIA 2 – Inferiores + Glúteos",
        tecnica: "Bi-set + pausa ativa",
        objetivo: "Trabalhar MMII sem impacto lombar, glúteo ênfase",
        exercicios: [
            ["Cadeira extensora", "4", "12", "-", "2s de contração"],
            ["Afundo com halteres", "3", "10 cada", "Bi-set", "Com glúteo 4 apoios"],
            ["Glúteo 4 apoios", "3", "15 cada", "Bi-set", "-"],
            ["Abdução quadril", "3", "20", "-", "Pico de contração"],
            ["Ponte de glúteo com halter", "3", "15", "-", "Evitar elevar os ombros"],
            ["Panturrilha sentada", "3", "20", "-", "-"],
            ["Abdominal infra alternado", "3", "20", "-", "Evitar acionar a lombar"]
        ]
    },
    {
        dia: "DIA 3 – Membros Superiores + Core",
        tecnica: "Bi-set + tempo sob tensão",
        objetivo: "Definição e ativação superior",
        exercicios: [
            ["Puxada frente", "3", "15", "-", "-"],
            ["Crucifixo banco", "3", "15", "Bi-set", "Com tríceps banco"],
            ["Tríceps banco", "3", "15", "Bi-set", "-"],
            ["Rosca alternada", "3", "15", "Bi-set", "Com rosca martelo"],
            ["Rosca martelo", "3", "15", "Bi-set", "-"],
            ["Elevação lateral", "3", "15", "-", "Controle total"],
            ["Prancha toque ombro", "3", "20", "-", "Core e estabilidade"]
        ],
        cardio: "5min elíptico + 5min escada leve"
    },
    {
        dia: "DIA 4 – Glúteo + Abdômen + Cardio",
        tecnica: "Circuito + Isometria",
        objetivo: "Ênfase estética e gasto calórico",
        exercicios: [
            ["Abdução com elástico", "3", "20", "Circuito", "-"],
            ["Ponte unilateral", "3", "12 cada", "Circuito", "-"],
            ["Avanço no step", "3", "12 cada", "Circuito", "Pouco alcance para lombar"],
            ["Abdominal canivete", "3", "15", "-", "-"],
            ["Prancha lateral com elevação", "3", "30s", "-", "-"]
        ],
        cardio: "10min caminhada moderada com inclinação leve"
    }
];


const treinoContainer = document.getElementById("treinoContainer");

// Carregar progresso salvo
const progressoSalvo = JSON.parse(localStorage.getItem("progressoTreino") || "{}");

// Gerar cards
treinos.forEach((treino, tIndex) => {
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

    treino.exercicios.forEach((ex, eIndex) => {
        const key = `dia${tIndex}_ex${eIndex}`;
        const checked = progressoSalvo[key]?.feito ? "checked" : "";
        const doneClass = progressoSalvo[key]?.feito ? "done" : "";

        html += `
      <tr class="exercise-row ${doneClass}" data-key="${key}">
        <td class="check-cell"><input type="checkbox" ${checked}></td>
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

    html += `
      </tbody>
    </table>
  `;

    if (treino.cardio) {
        html += `<p style="margin-top:1rem;"><strong>Cardio:</strong> ${treino.cardio}</p>`;
    }

    card.innerHTML = html;
    treinoContainer.appendChild(card);
});

// Checkbox individual + salvamento local
document.querySelectorAll(".exercise-row input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        const row = this.closest(".exercise-row");
        const key = row.dataset.key;
        const feito = this.checked;
        row.classList.toggle("done", feito);

        progressoSalvo[key] = { feito };
        localStorage.setItem("progressoTreino", JSON.stringify(progressoSalvo));
    });
});

// Timer por exercício
function iniciarTimer(btn) {
    const span = btn.nextElementSibling;
    let tempo = 60; // segundos de descanso
    span.textContent = formatarTempo(tempo);
    btn.disabled = true;

    const intervalo = setInterval(() => {
        tempo--;
        span.textContent = formatarTempo(tempo);
        if (tempo <= 0) {
            clearInterval(intervalo);
            btn.disabled = false;
            span.textContent = "✔️";
        }
    }, 1000);
}

function formatarTempo(segundos) {
    const m = String(Math.floor(segundos / 60)).padStart(2, "0");
    const s = String(segundos % 60).padStart(2, "0");
    return `${m}:${s}`;
}

// Feedback com salvamento local
const feedbackInput = document.getElementById("feedback");
const feedbackSalvo = localStorage.getItem("feedbackPaloma");
if (feedbackSalvo) feedbackInput.value = feedbackSalvo;

document.getElementById("salvarFeedback").addEventListener("click", () => {
    localStorage.setItem("feedbackPaloma", feedbackInput.value);
    alert("Feedback salvo com sucesso!");
});
