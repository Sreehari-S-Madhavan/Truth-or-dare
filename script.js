const segments = [
  'Truth', 'Dare', 'Swap Turn', 'All Answer', 'Mystery Task', 'Skip Turn', 'Double Dare', 'Challenge Battle'
];

let truths = [];
let dares = [];
let mysteryTasks = [];
let challengeBattles = [];

// Load JSON files
fetch('truth-questions.json')
  .then(res => res.json())
  .then(data => truths = data.truths);

fetch('dare-questions.json')
  .then(res => res.json())
  .then(data => dares = data.dares);

fetch('mystery-tasks.json')
  .then(res => res.json())
  .then(data => mysteryTasks = data.mysteryTasks);

fetch('challenge-battles.json')
  .then(res => res.json())
  .then(data => challengeBattles = data.challengeBattles);

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const result = document.getElementById("result");
const spinBtn = document.getElementById("spin-button");

const drawWheel = () => {
  const angle = 360 / segments.length;
  segments.forEach((seg, index) => {
    const startAngle = (angle * index) * Math.PI / 180;
    const endAngle = (angle * (index + 1)) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, startAngle, endAngle);
    ctx.fillStyle = `hsl(${index * 45}, 70%, 50%)`;
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(seg, 150 + Math.cos((startAngle + endAngle)/2) * 100, 150 + Math.sin((startAngle + endAngle)/2) * 100);
  });
};

drawWheel();

spinBtn.addEventListener("click", () => {
  const chosen = segments[Math.floor(Math.random() * segments.length)];
  let output = '';

  if (chosen === 'Truth') {
    const question = truths[Math.floor(Math.random() * truths.length)];
    output = `Truth: ${question}`;
  } else if (chosen === 'Dare') {
    const task = dares[Math.floor(Math.random() * dares.length)];
    output = `Dare: ${task}`;
  } else if (chosen === 'Mystery Task') {
    const task = mysteryTasks[Math.floor(Math.random() * mysteryTasks.length)];
    output = `Mystery Task: ${task}`;
  } else if (chosen === 'Challenge Battle') {
    const challenge = challengeBattles[Math.floor(Math.random() * challengeBattles.length)];
    output = `Challenge Battle: ${challenge}`;
  } else if (chosen === 'All Answer') {
    const question = truths[Math.floor(Math.random() * truths.length)];
    output = `All Players Answer: ${question}`;
  } else if (chosen === 'Double Dare') {
    const dare1 = dares[Math.floor(Math.random() * dares.length)];
    let dare2;
    do {
      dare2 = dares[Math.floor(Math.random() * dares.length)];
    } while (dare1 === dare2);
    output = `Double Dare: 1) ${dare1}  2) ${dare2}`;
  } else if (chosen === 'Swap Turn') {
    output = `Swap Turn: Choose a player to take your turn.`;
  } else if (chosen === 'Skip Turn') {
    output = `Skip Turn: You lose your turn.`;
  } else {
    output = `${chosen} - Special action!`;
  }

  result.innerText = output;
});
