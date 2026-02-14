let currentPage = 0;
const pages = Array.from(document.querySelectorAll('.page'));
const totalPages = pages.length;
const book = document.querySelector('.book');
const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

function renderPages() {
  if (isMobile()) {
    pages.forEach((page) => {
      page.style.display = 'block';
    });
    book.style.transform = 'none';
    return;
  }

  pages.forEach((page, index) => {
    page.style.display = index === currentPage || index === currentPage + 1 ? 'block' : 'none';
  });
  book.style.transform = `rotateY(${Math.min(currentPage, totalPages - 2) * 4}deg)`;
}

function flipPage(direction) {
  if (isMobile()) {
    const target = direction > 0 ? Math.min(totalPages - 1, currentPage + 1) : Math.max(0, currentPage - 1);
    currentPage = target;
    pages[target].scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  currentPage += direction * 2;
  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalPages) currentPage = totalPages - 2;
  renderPages();
}

document.getElementById('prev-btn').addEventListener('click', () => flipPage(-1));
document.getElementById('next-btn').addEventListener('click', () => flipPage(1));

let touchStartX = 0;
book.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

book.addEventListener('touchend', (e) => {
  const deltaX = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(deltaX) < 35) return;
  flipPage(deltaX < 0 ? 1 : -1);
}, { passive: true });

const reasons = [
  'You know? Saat kamu menatap, bola matamu memantulkan cahaya yang cantik.',
  '"Ka ipori yang suka senyum" Aku yakin pasti mereka suka liat senyummu, termasuk aku😝.',
  'KERENNN hobinya uda gitu jago lagi, seorang mahakarya menciptakan karyanya.',
  'LUCUUUU dan balance. Kadang kayak anak kecil imut, kadang dewasa yang paham. Unik, menarik, ga ngebosenin.',
  'DERMAWAN BANGET? Jujur aku baru denger cerita kemaren, bener bener peri yang membawa kebahagiaan. Kamu uda berbuat baik ke orang yang tepat.',
  'Kayaknya semua humor masuk di you dehc, ga pernah gagal bikin ketawa. Ada recehnya, ada brainrotnya, ada absurdnya, tapi tetep tau batesan.',
  'Pinterrr & kritis. Pinter itu ga selalu soal akademis, tapi juga pinter dalam memahami orang, situasi, dan sudut pandang. You selalu mau mendalami ilmu.',
  'Bangga banget sama semua perjuangan kamu dari dulu. Kamu itu kuat, mandiri, dan slalu berusaha jadi lebih baik. Aku yakin kamu bisa capai apa pun yang kamu mau.',
  'Ini dia, cara you berpikir yang unik, kreatif, dan mau belajar. Kamu selalu punya cara pandang yang beda, dan itu bikin you jadi menarik banget buat diajak ngobrol serius.',
  'Prinsip perempuan anggun & kuat. Kamu punya prinsip yang jelas, and it makes you jadi sosok yang tegas tapi tetap anggun. Aku bener bener ngehargain itu.',
  'Music taste elittt. Mulai dari classic jazz sampe shoegaze. And i think kita punya selera yang mirip, my pleasure.',
  'Kamu punya ambisi yang tinggi, dan aku tau pasti you selalu berusaha di akademik maupun reputasi. Aku yakin kamu bisa capai apa pun yang kamu mau, i will always support you.',
  'Siapa bilang rambut you jeleg? Bagust banget malah, uda mah wangi, cocok juga di you. You tetap cantik.',
  'Kalau misal you manggil aku entah dimana, pasti aku bakal kenal sama suaramu. Suara khas yang kya anak kecil🥰🥰🥰',
  'Yang paling jelas ya karna kamu adalah kamu. Sosok asli vellya yang punya banyak hal menarik, unik, dan lovable.',
];

const popup = document.getElementById('reason-popup');
const reasonText = document.getElementById('reason-text');

document.querySelectorAll('.reason-card').forEach((card) => {
  card.addEventListener('click', () => {
    reasonText.textContent = reasons[Number(card.dataset.reason) - 1];
    popup.style.display = 'block';
  });
});

document.getElementById('popup-close').addEventListener('click', () => {
  popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === popup) popup.style.display = 'none';
});

document.getElementById('heart-button').addEventListener('click', () => {
  document.getElementById('surprise-message').classList.remove('hidden');
  createHeartBurst(window.innerWidth / 2, window.innerHeight * 0.65);
});

const music = document.getElementById('bg-music');
const toggle = document.getElementById('music-toggle');
let isPlaying = false;

toggle.addEventListener('click', async () => {
  if (isPlaying) {
    music.pause();
    toggle.textContent = '♪';
  } else {
    try {
      await music.play();
      toggle.textContent = '🔊';
    } catch {
      toggle.textContent = '♪';
    }
  }
  isPlaying = !isPlaying;
});

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.top = `${Math.random() * 100}%`;
  document.getElementById('sparkles').appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 2800);
}

function createHeartBurst(x, y) {
  for (let i = 0; i < 8; i += 1) {
    const burst = document.createElement('span');
    burst.textContent = '♥';
    burst.style.position = 'fixed';
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.style.color = '#ff4f9a';
    burst.style.pointerEvents = 'none';
    burst.style.zIndex = '1200';
    burst.style.transition = 'transform .8s ease, opacity .8s ease';
    document.body.appendChild(burst);

    const angle = (Math.PI * 2 * i) / 8;
    const dx = Math.cos(angle) * (45 + Math.random() * 25);
    const dy = Math.sin(angle) * (45 + Math.random() * 25);

    requestAnimationFrame(() => {
      burst.style.transform = `translate(${dx}px, ${dy}px) scale(1.25)`;
      burst.style.opacity = '0';
    });
    setTimeout(() => burst.remove(), 850);
  }
}

document.addEventListener('click', (event) => {
  if (event.target.closest('button, a, .popup-content')) return;
  createHeartBurst(event.clientX, event.clientY);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
document.querySelectorAll('.quick-nav a').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const idx = pages.indexOf(target);
      if (idx >= 0) currentPage = idx;
    }
  });
});

window.addEventListener('resize', renderPages);
setInterval(createSparkle, 430);
renderPages();
