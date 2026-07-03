/* Navigation — scroll + burger */
const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.nav-mobile');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

if (burger) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('ouvert');
    const ouvert = mobileMenu.classList.contains('ouvert');
    burger.querySelectorAll('span')[0].style.transform = ouvert ? 'rotate(45deg) translate(4px, 4px)' : '';
    burger.querySelectorAll('span')[1].style.opacity = ouvert ? '0' : '';
    burger.querySelectorAll('span')[2].style.transform = ouvert ? 'rotate(-45deg) translate(4px, -4px)' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('ouvert'));
  });
}

/* Lien actif selon la page */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* Animations au scroll */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* Formulaire de contact */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-envoyer');
    btn.textContent = 'Envoi…';
    btn.disabled = true;

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (res.ok) {
        form.style.display = 'none';
        document.querySelector('.form-success').style.display = 'block';
      } else {
        btn.textContent = 'Réessayer';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Réessayer';
      btn.disabled = false;
    }
  });
}
