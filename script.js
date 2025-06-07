const selectScreen = document.getElementById("select-gender");
const gameScreen = document.getElementById("game");
const followerSpan = document.getElementById("followers");
const perClickSpan = document.getElementById("per-click");
const perSecSpan = document.getElementById("per-sec");
const characterImg = document.getElementById("character");
const clickBtn = document.getElementById("click-btn");
const upgradesList = document.getElementById("upgrades");

let followers = 0;
let perClick = 1;
let perSecond = 0;

const avatars = {
  female: "assets/avatars/female.svg",
  male: "assets/avatars/male.svg",
};

const upgrades = [
  {
    id: "camera",
    name: "📷 Câmera",
    cost: 2840,
    bonus: 5,
    type: "sec",
    purchased: false,
  },
  {
    id: "course",
    name: "🎓 Curso de Vídeo",
    cost: 1850,
    bonus: 10,
    type: "click",
    purchased: false,
  },
  {
    id: "light",
    name: "💡 Ring Light",
    cost: 9280,
    bonus: 50,
    type: "sec",
    purchased: false,
  },
  {
    id: "sponsor",
    name: "🤝 Patrocínio",
    cost: 15000,
    bonus: 0,
    type: "sec",
    purchased: false,
    locked: true,
  },
];

function showGame() {
  const gender = localStorage.getItem("gender");
  if (gender && avatars[gender]) {
    characterImg.src = avatars[gender];
  }
  gameScreen.classList.remove("hidden");
}

function init() {
  const gender = localStorage.getItem("gender");
  if (!gender) {
    selectScreen.classList.remove("hidden");
  } else {
    showGame();
  }
}

function chooseGender(g) {
  localStorage.setItem("gender", g);
  selectScreen.classList.add("hidden");
  showGame();
}

document
  .getElementById("btn-female")
  .addEventListener("click", () => chooseGender("female"));
document
  .getElementById("btn-male")
  .addEventListener("click", () => chooseGender("male"));

clickBtn.addEventListener("click", () => {
  followers += perClick;
  updateDisplay();
});

function buyUpgrade(upg, button) {
  if (upg.locked || upg.purchased) return;
  if (followers >= upg.cost) {
    followers -= upg.cost;
    upg.purchased = true;
    button.disabled = true;
    if (upg.type === "click") {
      perClick += upg.bonus;
    } else {
      perSecond += upg.bonus;
    }
    updateDisplay();
  }
}

function renderUpgrades() {
  upgrades.forEach((upg) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = `${upg.name} – ${formatNumber(upg.cost)} – +${upg.bonus}/${upg.type === "click" ? "clique" : "segundo"}`;
    if (upg.locked) {
      btn.disabled = true;
      btn.textContent = `${upg.name} – bloqueado`;
    }
    btn.addEventListener("click", () => buyUpgrade(upg, btn));
    li.appendChild(btn);
    upgradesList.appendChild(li);
  });
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }
  return num.toString();
}

function updateDisplay() {
  followerSpan.textContent = followers.toLocaleString("pt-BR");
  perClickSpan.textContent = perClick;
  perSecSpan.textContent = perSecond;
}

setInterval(() => {
  if (perSecond > 0) {
    followers += perSecond;
    updateDisplay();
  }
}, 1000);

renderUpgrades();
updateDisplay();
init();

// register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}
