const lightsaber = document.getElementById('lightsaber');
const blade = document.getElementById('blade');
const toggleColor = document.getElementById('toggleColor');
const toggleBlade = document.getElementById('toggleBlade');

let isRed = false;
let bladeOn = true;
let isDragging = false;
let startX, startY, currentX = 0, currentY = 0, offsetX = 0, offsetY = 0;

// Alternar cor
toggleColor.addEventListener('click', () => {
  isRed = !isRed;
  lightsaber.classList.toggle('red', isRed);
});

// Ligar/desligar
toggleBlade.addEventListener('click', () => {
  bladeOn = !bladeOn;
  blade.style.display = bladeOn ? 'block' : 'none';
  toggleBlade.textContent = bladeOn ? 'Desligar Sabre' : 'Ligar Sabre';
});

// Atualiza posição
function updatePosition() {
  lightsaber.style.transform = `translate(${currentX}px, ${currentY}px) rotate(-45deg)`;
}

// Drag
function startDrag(x, y) {
  isDragging = true;
  startX = x - offsetX;
  startY = y - offsetY;
}

function dragMove(x, y) {
  if (!isDragging) return;
  currentX = x - startX;
  currentY = y - startY;
  offsetX = currentX;
  offsetY = currentY;
  updatePosition();
}

function endDrag() {
  isDragging = false;
}

// Mouse
lightsaber.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
document.addEventListener('mousemove', e => dragMove(e.clientX, e.clientY));
document.addEventListener('mouseup', endDrag);

// Toque
lightsaber.addEventListener('touchstart', e => startDrag(e.touches[0].clientX, e.touches[0].clientY));
document.addEventListener('touchmove', e => {
  dragMove(e.touches[0].clientX, e.touches[0].clientY);
  e.preventDefault();
}, { passive: false });
document.addEventListener('touchend', endDrag);
