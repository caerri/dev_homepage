// Bouncing title animation
document.addEventListener('DOMContentLoaded', function() {
  const title = document.querySelector('.bounce-title');
  
  if (title) {
    // Set initial position properties
    title.style.position = 'absolute';
    title.style.transition = 'none';
    
    let x = Math.random() * (window.innerWidth - title.offsetWidth);
    let y = Math.random() * (window.innerHeight - title.offsetHeight);
    let vx = (Math.random() - 0.5) * 4; // horizontal velocity
    let vy = (Math.random() - 0.5) * 4; // vertical velocity
    
    function animate() {
      // Update position
      x += vx;
      y += vy;
      
      // Bounce off walls
      if (x <= 0 || x >= window.innerWidth - title.offsetWidth) {
        vx = -vx;
        x = Math.max(0, Math.min(x, window.innerWidth - title.offsetWidth));
      }
      
      if (y <= 0 || y >= window.innerHeight - title.offsetHeight) {
        vy = -vy;
        y = Math.max(0, Math.min(y, window.innerHeight - title.offsetHeight));
      }
      
      // Apply position
      title.style.left = x + 'px';
      title.style.top = y + 'px';
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
});