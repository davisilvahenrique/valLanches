let currentLang = localStorage.getItem('lang') || 'pt';

const langBtn = document.getElementById('lang-btn');
const langFlag = document.getElementById('lang-flag');

function updateFlagIcon(langCode) {
  if (langCode === 'pt') {
    langFlag.src = 'img/uk.png';
    langFlag.alt = 'English';
  } else {
    langFlag.src = 'img/br.png';
    langFlag.alt = 'Português';
  }
}

// Função para aplicar o idioma no conteúdo da página
function updateLanguage(langObj) {
  document.getElementById("nav-home").textContent = langObj.menu.home;
  document.getElementById("nav-menu").textContent = langObj.menu.menu;
  document.getElementById("nav-about").textContent = langObj.menu.about;

  if (document.getElementById("highlights-title"))
    document.getElementById("highlights-title").textContent = langObj.homepage?.highlights;

  if (document.getElementById("kitchen-message"))
    document.getElementById("kitchen-message").textContent = langObj.homepage?.kitchenMessage;

  if (document.getElementById("visit-title"))
    document.getElementById("visit-title").textContent = langObj.homepage?.visitUsTitle;

  if (document.getElementById("visit-text"))
    document.getElementById("visit-text").textContent = langObj.homepage?.visitUsText;

  if (document.getElementById("about-title"))
    document.getElementById("about-title").textContent = langObj.about?.title;

  if (document.getElementById("about-p1"))
    document.getElementById("about-p1").textContent = langObj.about?.p1;

  if (document.getElementById("about-p2"))
    document.getElementById("about-p2").textContent = langObj.about?.p2;

  if (document.getElementById("about-p3"))
    document.getElementById("about-p3").textContent = langObj.about?.p3;

  if (document.getElementById("about-p4"))
    document.getElementById("about-p4").textContent = langObj.about?.p4;

  if (document.getElementById("menu-title"))
    document.getElementById("menu-title").textContent = langObj.menuTitle;

  if (document.getElementById("menu-intro"))
    document.getElementById("menu-intro").textContent = langObj.menuIntro;

  if (document.getElementById("footer-copy"))
    document.getElementById("footer-copy").textContent = langObj.footer?.copyright;

  if (document.getElementById("footer-address"))
    document.getElementById("footer-address").textContent = langObj.footer?.address;

  const desc = langObj.menuDescriptions;
  const ids = {
    xtudo: "desc-xtudo",
    xcalabresa: "desc-xcalabresa",
    xfrango: "desc-xfrango",
    xbacon: "desc-xbacon",
    xegg: "desc-xegg",
    cheeseburger: "desc-cheeseburger",
    dogtradicional: "desc-dogtradicional",
    dogval: "desc-dogval",
    dogcheddar: "desc-dogcheddar",
    batataP: "desc-batataP",
    batataG: "desc-batataG",
    batataCheddarBacon: "desc-batataCheddarBacon",
    refrigerante: "desc-refrigerante",
    agua: "desc-agua"
  };

  for (const key in ids) {
    const el = document.getElementById(ids[key]);
    if (el && desc[key]) el.textContent = desc[key];
  }

  if (document.getElementById("nav-suggestion"))
    document.getElementById("nav-suggestion").textContent = langObj.suggestion?.menu;

  if (document.getElementById("suggestion-title"))
    document.getElementById("suggestion-title").textContent = langObj.suggestion?.title;

  if (document.getElementById("label-nome"))
    document.getElementById("label-nome").textContent = langObj.suggestion?.form.name;

  if (document.getElementById("label-contato"))
    document.getElementById("label-contato").textContent = langObj.suggestion?.form.contact;

  if (document.getElementById("label-mensagem"))
    document.getElementById("label-mensagem").textContent = langObj.suggestion?.form.message;

  if (document.getElementById("btn-enviar"))
    document.getElementById("btn-enviar").textContent = langObj.suggestion?.form.submit;

  if (document.getElementById("modal-title"))
    document.getElementById("modal-title").textContent = langObj.suggestion?.successTitle;

  if (document.getElementById("modal-text"))
    document.getElementById("modal-text").textContent = langObj.suggestion?.successMessage;

  updateFlagIcon(currentLang);
}

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';
  localStorage.setItem('lang', currentLang);
  updateLanguage(currentLang === 'pt' ? translationsPT : translationsEN);
});

updateLanguage(currentLang === 'pt' ? translationsPT : translationsEN);


// -------- Alternador de Tema --------
const themeButn = document.getElementById('theme-btn');
if (themeButn) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    themeButn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });
} else {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// -------- Carrossel --------
const carrossels = document.querySelectorAll('.carrossel');

carrossels.forEach(carrossel => {
  const carrosselInner = carrossel.querySelector(".produtos");
  const items = Array.from(carrosselInner.children);

  items.forEach(item => {
    const clone = item.cloneNode(true);
    carrosselInner.appendChild(clone);
  });

  let offset = 0;
  const speed = 1;

  function animate() {
    offset -= speed;
    if (Math.abs(offset) >= carrosselInner.scrollWidth / 2) {
      offset = 0;
    }
    carrosselInner.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});

// -------- Formulário de Sugestões --------
const formSugestao = document.getElementById("sugestao-form");
const modalSugestao = document.getElementById("modal");
const modalCloseBtn = document.getElementById("modal-close");

if (formSugestao && modalSugestao && modalCloseBtn) {
  formSugestao.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const contato = document.getElementById("contato").value.trim();

    const hasAt = contato.includes("@");
    const atNotAtStartOrEnd = !contato.startsWith("@") && !contato.endsWith("@");

    if (nome === "" || contato === "") {
      alert((currentLang === 'pt' ? translationsPT : translationsEN).suggestion.form.validationAlert);
      return;
    }

    if (!hasAt || !atNotAtStartOrEnd) {
      alert((currentLang === 'pt' ? translationsPT : translationsEN).suggestion.form.invalidEmailAlert);
      return;
    }

    formSugestao.reset();
    modalSugestao.style.display = "flex";
  });

  modalCloseBtn.addEventListener("click", () => {
    modalSugestao.style.display = "none";
  });
}
