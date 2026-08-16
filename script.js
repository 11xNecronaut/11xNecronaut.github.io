document.documentElement.classList.add('js');

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Theme toggle ----------
   Session-only: flips a data-theme attribute on <html>. No storage is used,
   so it resets to the visitor's system preference on the next visit. */
(function () {
  var toggle = document.getElementById('themeToggle');
  var root = document.documentElement;

  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    toggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
})();

/* ---------- Mobile nav ---------- */
(function () {
  var btn = document.getElementById('navMenuBtn');
  var links = document.getElementById('navLinks');

  btn.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---------- Scroll reveal ---------- */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();

/* ---------- Hero terminal readout ---------- */
(function () {
  var output = document.getElementById('scanOutput');
  var cursor = document.getElementById('scanCursor');
  if (!output) return;

  var lines = [
    '$ recon --target [scope]',
    'enumerating attack surface... 3 endpoints found',
    'checking auth flows...            [ OK ]',
    'reviewing input validation...     [ OK ]',
    'cross-referencing CVE index...    up to date',
    '',
    'status: open to new engagements'
  ];

  if (reduceMotion) {
    output.textContent = lines.join('\n');
    if (cursor) cursor.style.display = 'none';
    return;
  }

  var lineIndex = 0, charIndex = 0;

  function typeNext() {
    if (lineIndex >= lines.length) {
      setTimeout(reset, 3200);
      return;
    }
    var line = lines[lineIndex];
    if (charIndex <= line.length) {
      output.textContent = lines.slice(0, lineIndex).join('\n') +
        (lineIndex > 0 ? '\n' : '') + line.slice(0, charIndex);
      charIndex++;
      setTimeout(typeNext, line.length === 0 ? 120 : 18 + Math.random() * 22);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, 260);
    }
  }

  function reset() {
    lineIndex = 0;
    charIndex = 0;
    output.textContent = '';
    typeNext();
  }

  typeNext();
})();

/* ---------- Contact form ----------
   This is a front-end placeholder: it validates the fields and confirms
   submission, but no message is actually sent anywhere yet. Wire it up to
   a form backend such as Formspree, EmailJS, or your own endpoint — swap
   the body of handleSubmit for a fetch() call to that service. */
(function () {
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      note.textContent = 'Please fill in every field before sending.';
      return;
    }
    note.textContent = 'Form captured — connect this to Formspree, EmailJS, or your own backend to actually send it.';
    form.reset();
  });
})();

/* ---------- Custom cursor tracking ---------- */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches || reduceMotion) return;

  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function followRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(followRing);
  }
  followRing();

  document.querySelectorAll('a, button, .btn').forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('is-active'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('is-active'); });
  });
})();
