const translations = {
  en: {
    welcome: "Welcome to my website!",
    introduction: "Hi! I'm Nicholas, a mobile developer with a strong passion for machine learning, full-stack development, and game development.",
    aboutbtn: "About",
    skillsbtn: "Skills",
    projectsbtn: "Projects",
    contactbtn: "Contact Me",
    aboutme: "About Me 🙍‍♂️",
    aboutmeIntroduction: "👋 Hi there, I'm Nicholas Galen!",
    aboutmeIntroduction2: "I'm a recent graduate eager to start my career and grow through new challenges.",
    myStack: "🛠️ Tech Stack",
    myStack2: "I work with a wide range of languages, frameworks, and tools to build scalable and efficient applications.",
    global: "🌍 Flexible & Global",
    global2: "Based in Waterloo, Canada. I hold a German passport, which allows me to work in the EU without a visa. Open to remote work or relocation if needed. Time zone differences aren’t a problem.",
    coding: "💻 Coding is My Passion",
    coding2: "I love solving problems and bringing ideas to life through code. I'm always learning and exploring new technologies.",
    myProjectsCard: "My Projects 👨‍💻",
    cartbutlerDesc: "Cartbutler is a startup project (made as our capstone) built using Agile methodology (via Jira), focused on multi-platform order management solutions that helps users manage their shopping lists and find the best deals within a selected radius with our API. We used GitHub for version control and developed a RESTful API with Node.js connected to a MySQL relational database. The solution includes native apps for iOS (Swift) and Android (Kotlin with Jetpack Compose), along with a web version built with HTML, CSS, and JavaScript, all hosted on AWS. In the mobile development, I applied concepts such as DSA, debouncing, and API integration using Retrofit and Gson.",
    myskills: "My Skills 🧙‍♂️",
    skills1: "Languages & Frameworks",
    skills2: "Tools & Platforms",
    soft1: "Problem Solving",
    soft2: "Adaptability",
    soft3: "Team Collaboration",
    soft4: "Communication",
    soft5: "Time Management",
    soft6: "Curiosity-Driven",
    soft7: "Strategical Thinking",
    soft8: "Critical Thinking",
    soft9: "Self-Discipline",
    education: "Education 👨‍🎓",
    education2: "2 Year Diploma, Computer Programming at Conestoga College, Canada from 2023 - 2025 | GPA: 3.8/4.0 (87%)",
    contactme: "Contact Me 💭",
    desc: "Aspiring to start a career in tech. Feel free to reach out!",
    fullname: "Full Name",
    email: "Email Address",
    message: "Your Message",
    message2: "Send Message"
},
  pt: {
    welcome: "Bem-vindo ao meu site!",
    introduction: "Olá! Eu sou Nicholas, um desenvolvedor mobile com uma forte paixão por machine learning, full-stack e desenvolvimento de jogos.",
    aboutbtn: "Sobre",
    skillsbtn: "Habilidades",
    projectsbtn: "Projetos",
    contactbtn: "Contato",
    aboutme: "Sobre mim 🙍‍♂️",
    aboutmeIntroduction: "👋 Olá, eu me chamo Nicholas Galen!",
    aboutmeIntroduction2: "Sou um recém-formado ansioso para começar minha carreira e crescer através de novos desafios.",
    myStack: "🛠️ Meu Stack",
    myStack2: "Eu trabalho com uma gama de linguagens e frameworks para construir aplicações eficientes.",
    global: "🌍 Flexível & Global",
    global2: "Morando em Waterloo, Canadá. Tenho passaporte alemão, o que me permite trabalhar na UE sem visto. Aberto a trabalho remoto ou realocação se necessário.",
    coding: "💻 Programar é minha paixão",
    coding2: "Adoro resolver problemas e trazer ideias à vida através do código. Estou sempre aprendendo e explorando novas tecnologias.",
    myProjectsCard: "Meus Projetos 👨‍💻",
    cartbutlerDesc: "Cartbutler é um projeto startup (feito como nosso projeto de conclusão de curso) construído usando a metodologia Agile (via Jira), focado em soluções de gerenciamento de pedidos multiplataforma que ajuda os usuários a gerenciar suas listas de compras e encontrar as melhores ofertas dentro de um raio selecionado pela nossa API. Usamos o GitHub para controle de versão e desenvolvemos uma API RESTful com Node.js conectada a um banco de dados relacional MySQL. A solução inclui aplicativos nativos para iOS (Swift) e Android (Kotlin com Jetpack Compose), juntamente com uma versão web construída com HTML, CSS e JavaScript, tudo hospedado na AWS. No desenvolvimento móvel, apliquei conceitos como DSA, debouncing e integração de API usando Retrofit e Gson.",
    myskills: "Minhas Habilidades 🧙‍♂️",
    skills1: "Linguagens & Frameworks",
    skills2: "Ferramentas & Plataformas",
    soft1: "Resolução de Problemas",
    soft2: "Adaptabilidade",
    soft3: "Colaboração em Equipe",
    soft4: "Comunicação",
    soft5: "Gestão de Tempo",
    soft6: "Motivado por Curiosidade",
    soft7: "Pensamento Estratégico",
    soft8: "Pensamento Crítico",
    soft9: "Autodisciplina",
    education: "Educação 👨‍🎓",
    education2: "Diploma de 2 anos, Programação de Computadores no Conestoga College, Canadá de 2023 - 2025 | GPA: 3.8/4.0 (87%)",
    contactme: "Me contate 💭",
    desc: "Aspirando iniciar uma carreira em tecnologia. Sinta-se à vontade para entrar em contato!",
    fullname: "Nome Completo",
    email: "Endereço de Email",
    message: "Sua Mensagem",
    message2: "Enviar Mensagem"
  },
};

const langToggleBtn = document.getElementById('langToggle');
const flagImg = langToggleBtn.querySelector('img');

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.getAttribute('data-i18n');
  if (translations[lang] && translations[lang][key]) {
    const textSpan = el.querySelector('.btn-text');
    if(textSpan) {
      textSpan.textContent = translations[lang][key];
    } else {
      el.textContent = translations[lang][key];
    }
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
