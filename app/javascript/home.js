// home.js — tiny progressive enhancement
document.addEventListener("DOMContentLoaded", () => {
  const bouncy = document.querySelector('.bouncy-title');
  if (!bouncy) return;

  let x = 0, y = 0;
  let dx = 2, dy = 2;
  const bounce = () => {
    const w = window.innerWidth - bouncy.offsetWidth;
    const h = window.innerHeight - bouncy.offsetHeight;
    x += dx;
    y += dy;
    if (x < 0 || x > w) dx *= -1;
    if (y < 0 || y > h) dy *= -1;
    bouncy.style.position = 'fixed';
    bouncy.style.left = x + 'px';
    bouncy.style.top = y + 'px';
    requestAnimationFrame(bounce);
  };
  bounce();
});