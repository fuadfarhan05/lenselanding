document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-container');
  const overlay = slider.querySelector('.slider-image-overlay');
  const handle = slider.querySelector('.slider-handle');

  let isDragging = false;
  let animationFrame;
  let direction = 1; // 1 = right, -1 = left
  let autoPercent = 50; // starting position %

  const moveHandle = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let pos = clientX - rect.left;
    pos = Math.max(0, Math.min(pos, rect.width));

    const percent = (pos / rect.width) * 100;
    setSlider(percent);
  };

  const setSlider = (percent) => {
    overlay.style.width = percent + '%';
    handle.style.left = percent + '%';
  };

  const startDrag = (e) => {
    isDragging = true;
    cancelAnimationFrame(animationFrame); // stop auto animation while dragging
    e.preventDefault();
  };

  const stopDrag = () => {
    isDragging = false;
    animate(); // resume auto movement after drag ends
  };

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

  // Auto animation
  const animate = () => {
    if (isDragging) return; // don't auto move while dragging

    autoPercent += direction * 0.02; // << super slow speed
    if (autoPercent >= 100) {
      autoPercent = 100;
      direction = -1;
    } else if (autoPercent <= 0) {
      autoPercent = 0;
      direction = 1;
    }

    setSlider(autoPercent);
    animationFrame = requestAnimationFrame(animate);
  };

  // Start animation
  animate();
});
