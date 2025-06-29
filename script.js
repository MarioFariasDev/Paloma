const treinos = [
    {
        dia: "DIA 1 – Full Body + Cardio Intervalado",
        tecnica: "Circuito leve + Bi-set",
        objetivo: "Ativação global, gasto calórico, técnica",
        exercicios: [
            ["Leg Press 45°", "3", "15", "-", "Pés mais altos para poupar lombar"],
            ["Mesa Flexora", "3", "15", "Bi-set", "Junto com Glúteo Coice"],
            ["Glúteo Coice no Cabo", "3", "15 cada", "Bi-set", "-"],
            ["Puxador frontal neutro", "3", "12-15", "-", "Controle total"],
            ["Remada baixa máquina", "3", "12-15", "-", "Postura ereta"],
            ["Elevação lateral", "3", "15", "Bi-set", "Com Elevação frontal"],
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
            ["Cadeira extensora", "4", "12", "-", "2s contração"],
            ["Afundo com halteres", "3", "10 cada", "Bi-set", "Com glúteo 4 apoios"],
            ["Glúteo 4 apoios", "3", "15 cada", "Bi-set", "-"],
            ["Abdução quadril", "3", "20", "-", "Pico de contração"],
            ["Ponte de glúteo com halter", "3", "15", "-", "Sem tirar os ombros do solo"],
            ["Panturrilha sentada", "3", "20", "-", "-"],
            ["Abdominal infra alternado", "3", "20", "-", "Sem forçar lombar"]
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
            ["Bíceps rosca alternada", "3", "15", "Bi-set", "Com rosca martelo"],
            ["Rosca martelo", "3", "15", "Bi-set", "-"],
            ["Elevação lateral", "3", "15", "-", "Controle total"],
            ["Prancha toque no ombro", "3", "20", "-", "Core e estabilidade"]
        ],
        cardio: "5 min elíptico + 5 min escada (leve)"
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
        cardio: "10 min caminhada moderada em inclinação leve"
    }
];

const container = document.getElementById("treinoContainer");

treinos.forEach((treino) => {
    const card = document.createElement("div");
    card.className = "bg-white dark:bg-gray-800 p-6 rounded-lg shadow";

    const header = `
    <div class="flex justify-between items-start">
      <div>
        <h2 class="text-xl font-semibold mb-1">${treino.dia}</h2>
        <p class="text-sm"><strong>Técnica:</strong> ${treino.tecnica}</p>
        <p class="text-sm mb-4"><strong>Objetivo:</strong> ${treino.objetivo}</p>
      </div>
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox h-5 w-5 text-green-600 mr-2"
                 onchange="this.nextElementSibling.textContent = this.checked ? '✔️ Feito' : 'Marcar como feito'">
          <span class="text-sm">Marcar como feito</span>
        </label>
      </div>
    </div>`;

    const tabela = `
    <table class="w-full border text-sm mb-4">
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-700">
          <th class="border px-2 py-1">Exercício</th>
          <th class="border px-2 py-1">Séries</th>
          <th class="border px-2 py-1">Reps</th>
          <th class="border px-2 py-1">Técnica</th>
          <th class="border px-2 py-1">Observação</th>
        </tr>
      </thead>
      <tbody>
        ${treino.exercicios.map(ex => `
          <tr>
            <td class="border px-2 py-1">${ex[0]}</td>
            <td class="border px-2 py-1 text-center">${ex[1]}</td>
            <td class="border px-2 py-1 text-center">${ex[2]}</td>
            <td class="border px-2 py-1 text-center">${ex[3]}</td>
            <td class="border px-2 py-1">${ex[4]}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>`;

    const cardio = treino.cardio
        ? `<p class="text-sm"><strong>Cardio pós-treino:</strong> ${treino.cardio}</p>`
        : "";

    card.innerHTML = header + tabela + cardio;
    container.appendChild(card);
});

document.getElementById("toggleDark").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Exportar PDF com feedback
async function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Treino Semana 1 - Paloma", 10, 10);
    doc.text("Objetivo: Emagrecimento com ganho de massa", 10, 20);
    doc.text("Feedback:", 10, 30);
    const feedback = document.getElementById("feedback").value;
    doc.text(feedback || "(sem feedback)", 10, 40);

    doc.save("Treino_Paloma_Semana1.pdf");
}
