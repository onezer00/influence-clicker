let followers = 0;
let cash = 0;
let perClick = 1;
const followerSpan = document.getElementById('followers');
const cashSpan = document.getElementById('cash');
const clickBtn = document.getElementById('click-btn');
const upgradesList = document.getElementById('upgrades');

const upgrades = [
  { id: 'camera', name: 'Comprar Câmera', cost: 10, bonus: 1 },
  { id: 'dance', name: 'Dancinhas Virais', cost: 50, bonus: 5 },
  { id: 'scandal', name: 'Escândalos', cost: 100, bonus: 10 },
  { id: 'bots', name: 'Bots', cost: 200, bonus: 20 },
  { id: 'collab', name: 'Collabs', cost: 500, bonus: 50 },
  { id: 'govern', name: 'Governar a Internet', cost: 1000, bonus: 0, win: true }
];

function update() {
  followerSpan.textContent = followers;
  cashSpan.textContent = cash.toFixed(2);
}

clickBtn.addEventListener('click', () => {
  followers += perClick;
  cash += perClick * 0.1; // gera cash a cada clique
  update();
});

function renderUpgrades() {
  upgrades.forEach(upg => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = `${upg.name} - ${upg.cost} seguidores`;
    btn.addEventListener('click', () => buyUpgrade(upg, btn));
    li.appendChild(btn);
    upgradesList.appendChild(li);
  });
}

function buyUpgrade(upg, button) {
  if (followers >= upg.cost) {
    followers -= upg.cost;
    perClick += upg.bonus;
    button.disabled = true;
    button.textContent = upg.name + ' adquirido';
    if (upg.win) {
      alert('Parabéns! Você governa a internet!');
    }
    update();
  }
}

renderUpgrades();
update();

// registra o service worker para funcionamento offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
