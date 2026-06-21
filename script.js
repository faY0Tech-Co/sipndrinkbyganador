const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

function animateRing(e) {
  if (!cursor || !cursorRing) return;
  cursor.style.left = e.clientX - 5 + 'px';
  cursor.style.top = e.clientY - 5 + 'px';
  cursorRing.style.left = e.clientX - 15 + 'px';
  cursorRing.style.top = e.clientY - 15 + 'px';
}

// Disable custom cursor on touch devices or coarse pointers
if (!window.matchMedia || !window.matchMedia('(pointer: coarse)').matches) {
  document.addEventListener('mousemove', animateRing);
} else {
  if (cursor) cursor.style.display = 'none';
  if (cursorRing) cursorRing.style.display = 'none';
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 60);
});

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

revealElements.forEach((el) => observer.observe(el));

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const filterBtns = document.querySelectorAll('.filter-btn');
const drinkCards = document.querySelectorAll('.drink-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filterValue = btn.getAttribute('data-filter');

    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    drinkCards.forEach((card) => {
      const shouldShow = filterValue === 'all' || card.classList.contains(filterValue);
      card.classList.toggle('hide', !shouldShow);
    });
  });
});

function getSelectedText(select) {
  return select?.options[select.selectedIndex]?.textContent || '';
}

function handleBook(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('button[type="submit"]') || document.getElementById('bookingSubmit');

  // Use stable IDs/names
  const name = form.querySelector('#fullName')?.value || form.elements['fullName']?.value || 'Not provided';
  const whatsapp = form.querySelector('#whatsapp')?.value || form.elements['whatsapp']?.value || 'Not provided';
  const eventDate = form.querySelector('#eventDate')?.value || form.elements['eventDate']?.value || 'Not provided';
  const eventType = form.querySelector('#eventType')?.value || form.elements['eventType']?.value || 'Not specified';
  const spirit = form.querySelector('#preferredSpirit')?.value || form.elements['preferredSpirit']?.value || 'No preference';
  const guestCount = form.querySelector('#guestCount')?.value || form.elements['guestCount']?.value || 'Not specified';
  const budget = form.querySelector('#budget')?.value || form.elements['budget']?.value || 'Not specified';
  const location = form.querySelector('#location')?.value || form.elements['location']?.value || 'Not provided';
  const requests = form.querySelector('#requests')?.value || form.elements['requests']?.value || 'None';

  const message = [
    '*NEW BOOKING INQUIRY*',
    '',
    `Name: ${name}`,
    `WhatsApp: ${whatsapp}`,
    `Event Date: ${eventDate}`,
    `Event Type: ${eventType}`,
    `Preferred Spirit: ${spirit}`,
    `Guest Count: ${guestCount}`,
    `Budget: ${budget}`,
    `Location: ${location}`,
    `Special Requests: ${requests}`
  ].join('\n');

  const whatsappURL = `https://wa.me/2348055237149?text=${encodeURIComponent(message)}`;

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Redirecting to WhatsApp...';
  }

  setTimeout(() => {
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Submit Enquiry - Response Within 2 Hours';
    }
    form.reset();
  }, 500);
}

window.handleBook = handleBook;
