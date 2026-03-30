const showToast = (message) => {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.top = '16px';
  toast.style.right = '16px';
  toast.style.zIndex = '9999';
  toast.style.padding = '10px 12px';
  toast.style.borderRadius = '8px';
  toast.style.border = '1px solid #4b5266';
  toast.style.backgroundColor = '#2c3140';
  toast.style.color = '#ececf1';
  toast.style.fontFamily = 'sans-serif';
  toast.style.fontSize = '14px';
  toast.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.35)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 180ms ease';

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 180);
  }, 1500);
};

window.addEventListener('load', () => {
  console.log('Class 04 - JavaScript loaded correctly');
  showToast('Class 04 - JavaScript loaded correctly');
});
