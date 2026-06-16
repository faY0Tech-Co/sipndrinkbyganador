const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

function animateRing(e) {
  if (!cursor || !cursorRing) return;
  cursor.style.left = e.clientX - 5 + 'px';
  cursor.style.top = e.clientY - 5 + 'px';
  cursorRing.style.left = e.clientX - 15 + 'px';
  cursorRing.style.top = e.clientY - 15 + 'px';
}

document.addEventListener('mousemove', animateRing);

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

function findSelectByText(form, tests) {
  return Array.from(form.querySelectorAll('select')).find((select) => {
    const text = getSelectedText(select);
    return tests.some((test) => text.includes(test));
  });
}

function handleBook(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const eventSelect = findSelectByText(form, ['Wedding', 'Corporate', 'Private', 'Masterclass', 'Launch', 'Other']);
  const spiritSelect = findSelectByText(form, ['Vodka', 'Gin', 'Tequila', 'Rum', 'preference']);
  const guestSelect = findSelectByText(form, ['guests']);
  const budgetSelect = findSelectByText(form, ['₦']);

  const formData = {
    name: form.querySelector('input[placeholder*="name"]')?.value || 'Not provided',
    whatsapp: form.querySelector('input[placeholder*="234"]')?.value || 'Not provided',
    eventDate: form.querySelector('input[type="date"]')?.value || 'Not provided',
    eventType: getSelectedText(eventSelect) || 'Not specified',
    spirit: getSelectedText(spiritSelect) || 'No preference',
    guestCount: getSelectedText(guestSelect) || 'Not specified',
    budget: getSelectedText(budgetSelect) || 'Not specified',
    location: form.querySelector('input[placeholder*="Eko"]')?.value || 'Not provided',
    requests: form.querySelector('textarea')?.value || 'None'
  };

  const message = [
    '*NEW BOOKING INQUIRY*',
    '',
    `Name: ${formData.name}`,
    `WhatsApp: ${formData.whatsapp}`,
    `Event Date: ${formData.eventDate}`,
    `Event Type: ${formData.eventType}`,
    `Preferred Spirit: ${formData.spirit}`,
    `Guest Count: ${formData.guestCount}`,
    `Budget: ${formData.budget}`,
    `Location: ${formData.location}`,
    `Special Requests: ${formData.requests}`
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
