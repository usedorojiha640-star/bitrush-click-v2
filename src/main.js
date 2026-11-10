const CONTACT_URL = 'https://batols.click/asxfzs6pzlsu';

const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  nav?.classList.remove('is-open');
  menuButton?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Открыть меню');
  document.body.classList.remove('menu-open');
}
menuButton?.addEventListener('click', () => {
  const next = !nav.classList.contains('is-open');
  nav.classList.toggle('is-open', next);
  menuButton.classList.toggle('is-open', next);
  menuButton.setAttribute('aria-expanded', String(next));
  menuButton.setAttribute('aria-label', next ? 'Закрыть меню' : 'Открыть меню');
  document.body.classList.toggle('menu-open', next);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 920) closeMenu(); });

const directionControls = document.querySelectorAll('input[name="direction"]');
const routeLinks = document.querySelectorAll('[data-direction]');
routeLinks.forEach(link => link.addEventListener('click', () => {
  const input = document.querySelector(`input[name="direction"][value="${link.dataset.direction}"]`);
  if (input) { input.checked = true; input.dispatchEvent(new Event('change', { bubbles: true })); }
}));

const message = document.querySelector('#form-message');
const form = document.querySelector('#exchange-form');
const copyButton = document.querySelector('#copy-request');
const getRequest = () => {
  const formData = new FormData(form);
  const direction = formData.get('direction') === 'crypto-cash' ? 'Криптовалюта → наличные' : 'Наличные → криптовалюта';
  const asset = String(formData.get('asset') || 'USDT');
  const amount = String(formData.get('amount') || '').trim();
  const city = String(formData.get('city') || '').trim();
  return `Здравствуйте! Хочу уточнить условия обмена BitRush Click.\nНаправление: ${direction}\nАктив: ${asset}\nСумма: ${amount || 'уточню'}\nГород/страна: ${city || 'уточню'}\nПодскажите, пожалуйста, доступность и актуальные условия.`;
};
const showMessage = (text, isError = false) => {
  if (!message) return;
  message.textContent = text;
  message.classList.toggle('is-error', isError);
};
copyButton?.addEventListener('click', async () => {
  const text = getRequest();
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const tmp = document.createElement('textarea');
      tmp.value = text; tmp.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(tmp); tmp.select();
      const ok = document.execCommand('copy'); tmp.remove();
      if (!ok) throw new Error('Copy unavailable');
    }
    showMessage('✓ Запрос скопирован. Откройте менеджера и вставьте сообщение.');
    copyButton.classList.add('is-copied');
    window.setTimeout(() => copyButton.classList.remove('is-copied'), 1900);
  } catch {
    showMessage('Не удалось скопировать автоматически. Попробуйте в браузере с HTTPS.', true);
  }
});
form?.addEventListener('input', () => showMessage(''));
form?.addEventListener('change', () => showMessage(''));

for (const link of document.querySelectorAll('a[target="_blank"]')) {
  if (link.href.startsWith(CONTACT_URL)) link.rel = 'noopener noreferrer';
}

const faqDetails = document.querySelectorAll('.faq-list details');
faqDetails.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) faqDetails.forEach(other => { if (other !== item) other.open = false; });
}));

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const items = document.querySelectorAll('.adv-item, .step');
  items.forEach(item => item.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } });
  }, { threshold: 0.13, rootMargin: '0px 0px -16px 0px' });
  items.forEach(item => observer.observe(item));
}
