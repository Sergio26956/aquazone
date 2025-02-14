document.addEventListener('DOMContentLoaded', () => {
  console.log("Página de AquaZone cargada exitosamente.");

  // Funcionalidad para el modal del área administrativa
  const adminBtn = document.getElementById('adminBtn');
  const adminModal = document.getElementById('adminModal');
  const closeModal = document.querySelector('.modal .close');

  adminBtn.addEventListener('click', (e) => {
    e.preventDefault();
    adminModal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    adminModal.style.display = 'none';
  });

  // Cerrar el modal al hacer clic fuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === adminModal) {
      adminModal.style.display = 'none';
    }
  });

  // Envío del formulario de contacto (simulación)
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
    contactForm.reset();
  });

  // Envío del formulario del área administrativa (placeholder)
  const adminForm = document.getElementById('adminForm');
  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Acceso administrativo no implementado en esta demo.');
    adminForm.reset();
    adminModal.style.display = 'none';
  });
});
