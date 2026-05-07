const tabButtons = document.querySelectorAll('.tab-btn');
const panels = {
  missao: document.getElementById('missao-panel'),
  visao: document.getElementById('visao-panel'),
  valores: document.getElementById('valores-panel')
};

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    Object.values(panels).forEach(panel => panel.classList.remove('active'));
    panels[btn.dataset.tab].classList.add('active');
  });
});

const upload = document.getElementById('photoUpload');
const teamCards = document.querySelectorAll('.team-card');
const defaultPhotos = Array.from(teamCards).map(card => card.querySelector('.team-photo').innerHTML);

if (upload) {
  upload.addEventListener('change', () => {
    const files = Array.from(upload.files).slice(0, 4);

    files.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const photoBox = teamCards[index].querySelector('.team-photo');
        photoBox.innerHTML = '';
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = `Foto da equipe ${index + 1}`;
        photoBox.appendChild(img);
      };

      reader.readAsDataURL(file);
    });
  });
}

const resetTeam = document.getElementById('resetTeam');
if (resetTeam) {
  resetTeam.addEventListener('click', () => {
    teamCards.forEach((card, index) => {
      const photoBox = card.querySelector('.team-photo');
      photoBox.innerHTML = defaultPhotos[index];
    });
    if (upload) upload.value = '';
  });
}

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    form.reset();
  });
}

const sections = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

sections.forEach(section => observer.observe(section));

const navItems = document.querySelectorAll('.nav-links a');
const allSections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
  let current = '';

  allSections.forEach(sec => {
    const secTop = sec.offsetTop - 120;
    if (window.scrollY >= secTop) current = sec.id;
  });

  navItems.forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === `#${current}`);
  });
});