const panelWidthControl = document.querySelector('#panel-width');
const panelWidthValue = document.querySelector('#panel-width-value');

if (panelWidthControl && panelWidthValue) {
  const setLeftPanelWidth = (value) => {
    const widthInPx = `${value}px`;
    document.documentElement.style.setProperty('--left-panel-width', widthInPx);
    panelWidthValue.textContent = widthInPx;
  };

  panelWidthControl.addEventListener('input', (event) => {
    const nextValue = Number(event.target.value);
    setLeftPanelWidth(nextValue);
  });
}
