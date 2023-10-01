const frame = document.getElementById('iphone-frame');
// phone frame observer
const frameObserver = new ResizeObserver(entries => {
  const wrapper = document.getElementsByClassName('mobile-card');
  wrapper[0].style.height = entries[0].contentRect.height + 'px';
});
frameObserver.observe(frame);