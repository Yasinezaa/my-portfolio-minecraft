const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let snowParticles = [];

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initializeSnow();
}

function initializeSnow() {
  const particleCount = Math.min(140, Math.max(80, Math.floor(window.innerWidth / 12)));
  snowParticles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2.6 + 1.4,
    speedX: (Math.random() - 0.5) * 0.8,
    speedY: Math.random() * 1.4 + 0.6,
    opacity: Math.random() * 0.8 + 0.2,
  }));
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowParticles.forEach((flake) => {
    flake.x += flake.speedX;
    flake.y += flake.speedY;

    if (flake.x > canvas.width + 5) flake.x = -5;
    if (flake.x < -5) flake.x = canvas.width + 5;
    if (flake.y > canvas.height + 5) {
      flake.y = -5;
      flake.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(drawSnow);
}

window.addEventListener('resize', setCanvasSize);

setCanvasSize();
drawSnow();
