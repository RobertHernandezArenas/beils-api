const container = document.querySelector('.hero-container');

container.addEventListener('mousemove', (e) => {
// Calculamos el porcentaje de la posición X del mouse
  const percentage = (e.clientX / window.innerWidth) * 100;
  
  // Actualizamos la variable CSS. El navegador hace el resto optimizado.
  container.style.setProperty('--mouse-x', `${percentage}%`);
});