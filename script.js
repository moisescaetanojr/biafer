const fichas = {
  hipertrofia: {
    titulo: "Peito + Tríceps",
    tempo: "~60 min",
    exercicios: [
      ["Supino reto", "Peitoral", "4 × 10"],
      ["Supino inclinado", "Peitoral superior", "3 × 10"],
      ["Crucifixo", "Peitoral", "3 × 12"],
      ["Tríceps pulley", "Tríceps", "3 × 12"],
      ["Tríceps francês", "Tríceps", "3 × 10"]
    ]
  },
  emagrecimento: {
    titulo: "Circuito Full Body",
    tempo: "~45 min",
    exercicios: [
      ["Agachamento", "Pernas", "3 × 15"],
      ["Flexão", "Peito", "3 × 10"],
      ["Remada", "Costas", "3 × 12"],
      ["Afundo", "Pernas", "3 × 12"],
      ["Prancha", "Abdômen", "3 × 30s"]
    ]
  },
  condicionamento: {
    titulo: "Condicionamento Geral",
    tempo: "~40 min",
    exercicios: [
      ["Caminhada rápida", "Cardio", "10 min"],
      ["Agachamento", "Pernas", "3 × 15"],
      ["Flexão", "Peito", "3 × 10"],
      ["Polichinelo", "Cardio", "3 × 30s"],
      ["Prancha", "Core", "3 × 30s"]
    ]
  }
};

function toggleMenu() {
  document.getElementById("menu").classList.toggle("aberto");
}

function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  if (!peso || !altura || peso <= 0 || altura <= 0) {
    alert("Digite seu peso e sua altura.");
    return;
  }

  const imc = peso / (altura * altura);
  const valor = imc.toFixed(1);
  let classificacao;

  if (imc < 18.5) classificacao = "Abaixo do peso";
  else if (imc < 25) classificacao = "Faixa considerada adequada";
  else if (imc < 30) classificacao = "Sobrepeso";
  else classificacao = "Obesidade";

  document.querySelector("#resultadoIMC strong").textContent = valor;
  document.querySelector("#resultadoIMC p").textContent = classificacao;
  document.getElementById("imcResumo").textContent = valor;
  document.getElementById("pesoResumo").textContent = peso + " kg";

  localStorage.setItem("peso", peso);
  localStorage.setItem("altura", altura);
  localStorage.setItem("imc", valor);
}

function salvarMedidas() {
  ["cintura", "quadril", "braco", "perna"].forEach(id => {
    localStorage.setItem(id, document.getElementById(id).value);
  });

  document.getElementById("mensagemMedidas").textContent =
    "✓ Medidas salvas com sucesso!";
}

function concluirTreino() {
  let treinos = parseInt(localStorage.getItem("treinos")) || 0;
  treinos++;
  localStorage.setItem("treinos", treinos);

  document.getElementById("diasTreino").textContent = treinos;
  document.getElementById("barraProgresso").style.width = "100%";
  document.getElementById("porcentagem").textContent = "100%";
  document.getElementById("treinoHoje").textContent = "Treino concluído! 💪";
}

function mostrarTreino(objetivo, botaoClicado) {
  const ficha = fichas[objetivo];
  const container = document.getElementById("fichaTreino");

  let html = `
    <div class="ficha-topo">
      <div>
        <span>FICHA DE TREINO</span>
        <h3>${ficha.titulo}</h3>
      </div>
      <strong>${ficha.tempo}</strong>
    </div>
  `;

  ficha.exercicios.forEach(exercicio => {
    html += `
      <div class="exercicio">
        <div>
          <strong>${exercicio[0]}</strong>
          <span>${exercicio[1]}</span>
        </div>
        <b>${exercicio[2]}</b>
      </div>
    `;
  });

  container.innerHTML = html;

  document.querySelectorAll(".objetivo").forEach(botao => {
    botao.classList.remove("ativo");
  });

  botaoClicado.classList.add("ativo");
}

function carregarDados() {
  const peso = localStorage.getItem("peso");
  const altura = localStorage.getItem("altura");
  const imc = localStorage.getItem("imc");
  const treinos = localStorage.getItem("treinos");

  if (peso) {
    document.getElementById("pesoResumo").textContent = peso + " kg";
    document.getElementById("peso").value = peso;
  }

  if (altura) document.getElementById("altura").value = altura;
  if (imc) document.getElementById("imcResumo").textContent = imc;
  if (treinos) document.getElementById("diasTreino").textContent = treinos;

  ["cintura", "quadril", "braco", "perna"].forEach(id => {
    const valor = localStorage.getItem(id);
    if (valor) document.getElementById(id).value = valor;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarDados();
  mostrarTreino("hipertrofia", document.querySelector(".objetivo"));
});
