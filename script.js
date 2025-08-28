// Example placeholder script
document.querySelector(".cta-btn").addEventListener("click", () => {
  alert("Hi! you are being redirecting to the waitlist form. Press ok to redirect.");
});

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-container');
  const overlay = slider.querySelector('.slider-image-overlay');
  const handle = slider.querySelector('.slider-handle');

  let isDragging = false;

  const moveHandle = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let pos = clientX - rect.left;
    pos = Math.max(0, Math.min(pos, rect.width)); // clamp to container

    const percent = (pos / rect.width) * 100;
    overlay.style.width = percent + '%';
    handle.style.left = percent + '%';
  }

  const startDrag = (e) => {
    isDragging = true;
    e.preventDefault();
  }

  const stopDrag = () => {
    isDragging = false;
  }

  // Mouse events
  handle.addEventListener('mousedown', startDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    moveHandle(e.clientX);
  });

  // Touch events
  handle.addEventListener('touchstart', startDrag);
  document.addEventListener('touchend', stopDrag);
  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    moveHandle(e.touches[0].clientX);
  });
});
