const init = () => {
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight-4;
  canvas.style.backgroundColor = "#000010";
  const ctx = canvas.getContext("2d");
  const stars = [];
  for (let i = 0; i < 20; i++) {
    stars.push(new Star());
  }
  window.addEventListener("resize", () => updateCanvasSize(canvas));
  animate(ctx, stars);
};

class Star {
  constructor() {
    this.size = Math.random() * 4 + 0.1;
    this.maxSize = 5;
    this.minSize = 0.1;
    this.approaching = true;
    this.xPos =
      Math.random() * (window.innerWidth - this.size * 6) + this.size * 3;
    this.yPos = Math.random() * (window.innerHeight - 200) + 50;
  }

  render(ctx) {
    const startX = this.xPos - this.size / 2;
    const startY = this.yPos - this.size / 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + this.size / 2, startY - this.size);
    ctx.lineTo(startX + this.size, startY);
    ctx.lineTo(startX + this.size * 2, startY + this.size / 2);
    ctx.lineTo(startX + this.size, startY + this.size);
    ctx.lineTo(startX + this.size / 2, startY + this.size * 2);
    ctx.lineTo(startX, startY + this.size);
    ctx.lineTo(startX - this.size, startY + this.size / 2);
    ctx.lineTo(startX, startY);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.shadowColor = "white";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.stroke();
  }

  update() {
    if (this.size >= this.maxSize) {
      this.approaching = false;
    } else if (this.size <= this.minSize) {
      this.xPos =
        Math.random() * (window.innerWidth - this.size * 6) + this.size * 3;
      this.yPos = Math.random() * (window.innerHeight - 200) + 50;
      this.approaching = true;
    }

    if (this.approaching) this.size += Math.random() * 0.4;
    else this.size -= Math.random() * 0.4;
  }
}

const animate = (ctx, stars) => {
  setTimeout(() => {
    requestAnimationFrame(() => animate(ctx, stars));
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach((star) => {
      setTimeout(() => {}, Math.random());
      star.render(ctx);
      star.update();
    });
  }, 80);
};

const updateCanvasSize = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-4;
}

init();