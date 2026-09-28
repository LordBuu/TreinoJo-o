const weeks = {
  1: {
    mon: [
      "4 × 30 m — saída do bloco (100 m)",
      "2 × 2 × 75 m — 95%",
      "2'30\" entre os tiros",
      "5' entre as séries",
      "1 × 300 m — 36–37\""
    ],
    fri: [
      "5 × 30 m — saída do bloco (200 m)",
      "3 × 120 m — 13\"",
      "4' entre os tiros"
    ],
    note:"Academia: 3 × 10 nos principais e complementares; agachamento 45°."
  },
  2: {
    mon:["4 × 30 m — saída do bloco (100 m)","2 × 2 × 75 m — 95%","2'30\" entre os tiros","5' entre as séries","1 × 280 m — 33–35\""],
    fri:["5 × 30 m — saída do bloco (200 m)","1 × 150 m — 95%","1 × 120 m — 95%","1 × 90 m — 95%","4' entre os tiros"],
    note:"Academia: 3 × 10 nos principais e complementares; agachamento 45°."
  },
  3: {
    mon:["4 × 30 m — saída do bloco (100 m)","2 × 2 × 60 m — 95%","2' entre os tiros","4' entre as séries","6' antes do último tiro","1 × 280 m — 32–34\""],
    fri:["5 × 30 m — saída do bloco (200 m)","3 × 100 m — 95%","5' entre os tiros"],
    note:"Academia: 3 × 10 nos principais e complementares; agachamento 45°."
  },
  4: {
    mon:["4 × 30 m — saída do bloco (100 m)","2 × 2 × 60 m — 95%","2' entre os tiros","4' entre as séries","6' antes do último tiro","1 × 250 m — 28–30\""],
    fri:["5 × 30 m — saída do bloco (200 m)","3 × 90 m — 95%","6' entre os tiros"],
    note:"Academia: 3 × 8 nos principais e complementares; agachamento 45°."
  },
  5: {
    mon:["4 × 30 m — saída do bloco (100 m)","2 × 2 × 50 m — 95%","2' entre os tiros","4' entre as séries","6' antes do último tiro","1 × 250 m — 28–29\""],
    fri:["5 × 30 m — saída do bloco (200 m)","2 × 100 m — 95%","5' entre os tiros"],
    note:"Academia: 3 × 8 nos principais e complementares; agachamento 45°."
  },
  6: {
    mon:["4 × 30 m — saída do bloco (100 m)","4 × 30 m — saída do bloco (100 m)","3 × 60 m — 95%","3' entre os tiros","5' antes do 220 m","1 × 220 m — 95%"],
    fri:["5 × 30 m — saída do bloco (200 m)","Sessão específica de sexta ainda não definida."],
    note:"Academia: principais 3 × 8; complementares 1 × 8; agachamento 45°."
  }
};

const warmups = {
  mon:[
    ["AQUECIMENTO",["15' estabilização — 1' trabalho / 1' recuperação","10' corrida alternada — 150 m / 150 m"]],
    ["COORDENAÇÃO E TÉCNICA",["16 × 30 m coordenações — educativos + deslocamento raso","2 × 80 m progressivos"]]
  ],
  fri:[
    ["AQUECIMENTO",["15' estabilização — 1' trabalho / 1' recuperação","10' corrida alternada — 100 m / 100 m"]],
    ["COORDENAÇÃO E TÉCNICA",["16 × 30 m coordenações — educativos + deslocamento raso","2 × 80 m progressivos"]]
  ]
};

function list(items){ return `<ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul>`; }

function pistaDay(day, main, type){
  const blocks = type==="mon" ? warmups.mon : warmups.fri;
  let html = blocks.map(b=>`<div class="block"><h4>${b[0]}</h4>${list(b[1])}</div>`).join("");
  html += `<div class="block highlight"><h4>PARTE PRINCIPAL</h4>${list(main)}</div>`;
  html += `<div class="block"><h4>DESAQUECIMENTO</h4>${list(["10' trote leve","20' alongamento + mobilidade"])}</div>`;
  return card(day,"PISTA",html);
}
function card(day, kindText, body){ return `<article class="day-card"><div class="day-head">${day}</div><div class="day-body"><div class="kind">${kindText}</div>${body}</div></article>`; }

function academyForWeek(w){
  const reps = w<=3 ? "3 × 10" : (w<=5 ? "3 × 8" : "3 × 8 principais / 1 × 8 complementares");
  const main = [
    `Agachamento 45° — ${reps}`,
    `Remada sentado — ${reps}`,
    `Panturrilha em pé — ${reps}`,
    `Supino reto — ${reps}`
  ];
  const comp = [
    `Elevação pélvica — ${reps}`,
    `Gráviton puxada fechada — ${reps}`,
    `Levantamento terra — ${reps}`,
    `Desenvolvimento de ombro — ${reps}`,
    `Cadeira flexora unilateral — ${reps}`,
    `Barra fixa aberta / gráviton — ${reps}`,
    `Cadeira adutora — ${reps}`,
    `Panturrilha sentada — ${reps}`,
    `Máquina adutora sentada — ${reps}`,
    `Máquina abdutora sentada — ${reps}`
  ];
  document.querySelector("#main-lifts").innerHTML = main.map((x,i)=>
    `<div class="lift"><b>${i+1}. ${x}</b>${i===0||i===2?'<small>Após cada série: 1\'30" + 10 saltos correspondentes.</small>':''}</div>`).join("")
    + `<div class="lift"><small>1'30" de recuperação entre cada exercício.</small></div>`;
  document.querySelector("#accessory-lifts").innerHTML = comp.map(x=>`<div class="lift"><b>${x}</b></div>`).join("")
    + `<div class="lift"><small>1'30" de recuperação entre cada exercício.</small></div>`;
}

function renderWeek(w){
  const d=weeks[w];
  const days = [
    pistaDay("SEGUNDA",d.mon,"mon"),
    card("TERÇA","COMPLEMENTAR",`<div class="block"><h4>BASQUETE — OPCIONAL</h4>${list(["Bom para ganhar cardio e pliometria, dependendo da atividade.","Sem muito esforço."])}</div>`),
    card("QUARTA","ACADEMIA + PLIOMETRIA",`<div class="block"><h4>ACADEMIA</h4>${list(["Seguir protocolo de musculação da semana."])}</div><div class="block"><h4>PLIOMETRIA</h4>${list(["Conforme sessão programada."])}</div>`),
    card("QUINTA","FARTLEK + FLEXIBILIDADE",`<div class="block"><h4>FARTLEK</h4>${list(["25' — 1' corrida / 1' recuperação"])}</div><div class="block"><h4>FLEXIBILIDADE</h4>${list(["20 minutos após o Fartlek"])}</div>`),
    pistaDay("SEXTA",d.fri,"fri"),
    card("SÁBADO","ACADEMIA + PLIOMETRIA",`<div class="block"><h4>ACADEMIA</h4>${list(["Seguir protocolo de musculação da semana."])}</div><div class="block"><h4>PLIOMETRIA</h4>${list(["Conforme sessão programada."])}</div>`),
    card("DOMINGO","DESCANSO",`<div class="block"><h4>RECUPERAÇÃO</h4>${list(["Descanso."])}</div>`)
  ];
  document.querySelector("#app").innerHTML = `
    <div class="week-heading">
      <div><h2>SEMANA <span>${w}</span></h2><p>Treino de pista e organização semanal</p></div>
      <div class="week-note"><strong>ACADEMIA:</strong>${d.note}</div>
    </div>
    <div class="days">${days.join("")}</div>
  `;
  academyForWeek(w);
  document.querySelectorAll(".week-btn").forEach(b=>b.classList.toggle("active",Number(b.dataset.week)===w));
}
document.querySelectorAll(".week-btn").forEach(btn=>btn.addEventListener("click",()=>renderWeek(Number(btn.dataset.week))));
document.querySelector("#printBtn").addEventListener("click",()=>window.print());
renderWeek(1);
