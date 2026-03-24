// ============ MAIN.JS — Navigation & Particles ============

// Mobile Nav Toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    // Close nav on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // Generate particles on home hero
  var container = document.getElementById('particles');
  if (container) {
    generateParticles(container);
  }

  // Animate feature cards on scroll
  observeCards();
});

function generateParticles(container) {
  var count = 25;
  for (var i = 0; i < count; i++) {
    var p = document.createElement('div');
    p.className = 'particle';
    var size = Math.random() * 4 + 2;
    p.style.cssText = [
      'width:' + size + 'px',
      'height:' + size + 'px',
      'left:' + Math.random() * 100 + '%',
      'animation-duration:' + (Math.random() * 12 + 8) + 's',
      'animation-delay:' + (Math.random() * 8) + 's',
      'opacity:' + (Math.random() * 0.5 + 0.2),
      i % 3 === 0 ? 'background:#00c8ff' : ''
    ].join(';');
    container.appendChild(p);
  }
}

function observeCards() {
  var cards = document.querySelectorAll('.feature-card, .sens-card, .fix-category, .device-card');
  if (!window.IntersectionObserver) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(function (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(card);
  });
}
