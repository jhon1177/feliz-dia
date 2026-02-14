// Animación sobre
const envelope = document.getElementById("envelope");
const btn = document.getElementById("openBtn");

btn.addEventListener("click", () => {
  envelope.classList.toggle("open");
});

const messages = document.querySelectorAll(".message");
const nextBtn = document.getElementById("nextBtn");

let current = 0;

function updateButton() {
  if (current === messages.length - 2) {
    nextBtn.textContent = "Siguiente ❤️";
  }

  if (current === messages.length - 1) {
    nextBtn.style.display = "none";
  }
}

nextBtn.addEventListener("click", () => {
  if (current < messages.length - 1) {
    messages[current].classList.remove("active");
    current++;
    messages[current].classList.add("active");
    updateButton();
  }
});

// Reiniciar cuando se cierra la carta
btn.addEventListener("click", () => {
  if (!envelope.classList.contains("open")) {
    messages[current].classList.remove("active");
    current = 0;
    messages[current].classList.add("active");
    nextBtn.style.display = "inline-block";
    nextBtn.textContent = "Siguiente ❤️";
  }
});

// Corazones flotando
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 20 + 10;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random();
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size/2, this.y - this.size/2,
                      this.x - this.size, this.y + this.size/3,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size, this.y + this.size/3,
                      this.x + this.size/2, this.y - this.size/2,
                      this.x, this.y);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speed;
    this.draw();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.1) {
    hearts.push(new Heart());
  }

  hearts.forEach((heart, index) => {
    heart.update();
    if (heart.y < -20) {
      hearts.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
