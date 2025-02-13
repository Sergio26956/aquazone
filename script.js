document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('main-nav');
  const showContactBtn = document.getElementById('show-contact');
  const contactDetails = document.getElementById('contact-details');
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');
  const bgMusic = document.getElementById('bg-music');

  // Toggle del menú
  menuBtn.addEventListener('click', () => {
    const isActive = nav.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isActive);
  });

  // Mostrar detalles de contacto
  if (showContactBtn) {
    showContactBtn.addEventListener('click', () => {
      contactDetails.classList.toggle('show');
    });
  }

  // Gestión del banner de cookies
  if (cookieBanner && acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
      cookieBanner.style.display = 'none';
      localStorage.setItem('cookiesAccepted', 'true');
    });
  }
  // Verificar si se han aceptado las cookies
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    cookieBanner.style.display = 'none';
  } else {
    cookieBanner.style.display = 'block';
  }

  // Reproducir música de fondo (con manejo de posibles bloqueos por autoplay)
  bgMusic.play().catch(error => {
    console.warn('Autoplay de la música bloqueado:', error);
    // Opcional: Mostrar un botón para iniciar la música manualmente.
  });
});
