const translations = {
  en: {
    welcome: "Welcome to my website!",
    description: "This is an example of translation.",
  },
  pt: {
    welcome: "Bem-vindo ao meu site!",
    description: "Este é um exemplo de tradução.",
  }
};

const langToggleBtn = document.getElementById('langToggle');
const flagImg = langToggleBtn.querySelector('img');

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  if (lang === 'en') {
    flagImg.src = 'images/canada.webp';
    flagImg.alt = 'English';
  } else if (lang === 'pt') {
    flagImg.src = 'images/brazil.png';
    flagImg.alt = 'Português';
  }

  localStorage.setItem('siteLang', lang);
}

function toggleLanguage() {
  const currentLang = localStorage.getItem('siteLang') || 'en';
  const newLang = currentLang === 'en' ? 'pt' : 'en';
  setLanguage(newLang);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('siteLang') || 'en';
  setLanguage(savedLang);

  langToggleBtn.addEventListener('click', toggleLanguage);
});
