/* ═══════════════════════════════════════════════════════════════════
   NUESTRO UNIVERSO · CONFIGURACIÓN PERSONALIZABLE
   Modifica solamente este bloque para adaptar el regalo.
   Las fotos deben estar en assets/fotos/roblox-01.webp ... 06.jpg
   Si una foto no existe, se muestra una tarjeta artística.
   ═══════════════════════════════════════════════════════════════════ */
const CONFIG = {
  nombre: "Ashley",
  nombreReal: "Steven",
  nombreJuego: "Universe",
  nombreJuegoElla: "Rosita",
  fechaInicio: "2023-11-12T00:00:00", // Referencia para el contador. Confirma si fue la fecha oficial.
  firma: "Steven · Universe ♡",
  fraseFinal: "En un mundo de millones de jugadores, mi mejor coincidencia fue encontrar a Rosita. Gracias por hacer de mi vida un universo contigo.",
  recuerdos: [
    { titulo: "Nos conocimos jugando", etiqueta: "PRIMEROS ENCUENTROS", simbolo: "✧", foto: "assets/fotos/roblox-01.webp", resumen: "Un juego nos cruzó en el mismo camino.", detalle: "Nunca pensé que entre tantos juegos y tantas personas pudiera conocer a alguien tan especial. No sé en qué momento exacto cambió todo, pero me alegra muchísimo que nuestros caminos se cruzaran allí." },
    { titulo: "Universe & Rosita", etiqueta: "DOS NOMBRES · UNA HISTORIA", simbolo: "☾", foto: "assets/fotos/roblox-07.webp", resumen: "Así empezó nuestro pequeño universo.", detalle: "En los juegos yo era Universe y tú eras Rosita. Eran nombres detrás de una pantalla, pero la conexión era real. Hoy esos nombres todavía guardan una parte preciosa de nuestra historia." },
    { titulo: "12 de noviembre de 2023", etiqueta: "MI PRIMER MENSAJE DE AMOR", simbolo: "♡", foto: "assets/fotos/roblox-13.webp", resumen: "Aquel «¿quieres ser mi novia?». ", detalle: "En tu día especial te escribí todo lo que sentía y terminé haciendo una pregunta que llevaba tiempo guardando: «¿Quieres ser mi novia?». Fue un mensaje imperfecto, largo y muy mío. Por eso lo conservo exactamente como un recuerdo." },
    { titulo: "Tu voz y nuestras mañanas", etiqueta: "LAS COSAS SENCILLAS", simbolo: "✿", foto: "assets/fotos/vida-18.webp", resumen: "Lo más bonito también sucede en lo cotidiano.", detalle: "En aquella primera carta te decía que uno de mis momentos favoritos era escuchar tu voz por las mañanas. Los grandes regalos importan, pero esas pequeñas cosas también hacen única nuestra relación." },
    { titulo: "Las palabras de 2025", etiqueta: "APRENDER A QUERERNOS MEJOR", simbolo: "∞", foto: "assets/fotos/vida-20.webp", resumen: "Un amor que también necesita acciones.", detalle: "En 2025 te escribí sobre cuánto había cambiado mi forma de sentir y reconocí errores que quería reparar. Quiero conservar ese aprendizaje: demostrar amor con escucha, cuidado y presencia, además de palabras." },
    { titulo: "Hoy: un universo para ti", etiqueta: "12 DE NOVIEMBRE DE 2026", simbolo: "✦", foto: "assets/fotos/vida-01.webp", resumen: "Mi regalo de cumpleaños y aniversario.", detalle: "Hoy te dedico este lugar que construí para ti. Cada animación, cada recuerdo y cada estrella tiene una razón: quería regalarte algo que hablara de Ashley y Steven, pero también de Rosita y Universe." }
  ],
  estrellas: [
    { titulo: "La primera partida", texto: "El universo tenía millones de caminos; uno de ellos me llevó a conocerte en un juego." },
    { titulo: "Universe y Rosita", texto: "Nuestros nombres eran de juego, pero lo que comenzó a surgir entre nosotros era de verdad." },
    { titulo: "Una pregunta de 2023", texto: "«¿Quieres ser mi novia?» fue la pregunta con la que quise darle un nombre a lo que sentía." },
    { titulo: "Tu voz por la mañana", texto: "Todavía me gusta pensar en esas cosas pequeñas que vuelven especial cualquier día contigo." },
    { titulo: "Lo que aprendimos", texto: "Quiero demostrarte amor con acciones, no quedarme solamente en las palabras." },
    { titulo: "Mi estrella llamada Ashley", texto: "En todas las versiones de nuestra historia, hay alguien a quien volvería a buscar: a ti, Rosita." }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const SCENE_NAMES = ["EL COMIENZO", "NUESTRA HISTORIA", "NUESTRO UNIVERSO", "MI CARTA", "LAS SORPRESAS", "PARA SIEMPRE"];
let sceneIndex = 0;
let letterTimer = null;
let letterFinished = false;
let selectedLetter = 2;
let secrets = new Set();
let toastTimer = null;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setText(selector, value) { const el = $(selector); if (el) el.textContent = value; }
function bindConfig() {
  $$('[data-bind="nombre"]').forEach(el => { el.textContent = CONFIG.nombre; });
  $$('[data-bind="firma"]').forEach(el => { el.textContent = CONFIG.firma; });
  $$('[data-bind="saludo"]').forEach(el => { el.textContent = `${CONFIG.nombre.charAt(0).toUpperCase()}${CONFIG.nombre.slice(1)},`; });
  $$('[data-bind="final"]').forEach(el => { el.textContent = CONFIG.fraseFinal; });
  const start = new Date(CONFIG.fechaInicio);
  if (!isNaN(start.getTime())) {
    const formatted = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric" }).format(start);
    setText('[data-bind="fechaLarga"]', formatted);
  }
  $$('[data-bind="nombreJuego"]').forEach(el => { el.textContent = CONFIG.nombreJuego; });
  $$('[data-bind="nombreJuegoElla"]').forEach(el => { el.textContent = CONFIG.nombreJuegoElla; });
  $$('[data-bind="nombreReal"]').forEach(el => { el.textContent = CONFIG.nombreReal; });
  document.title = `Universe ♡ Rosita · Para ${CONFIG.nombre}`;
}

function goToScene(index) {
  const next = Math.max(0, Math.min(5, Number(index)));
  if (next === sceneIndex) {
    const currentScroll = document.querySelector(".scene.active .scene-scroll");
    if (currentScroll) currentScroll.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    return;
  }
  const scenes = $$(".scene");
  scenes[sceneIndex].classList.remove("active");
  scenes[sceneIndex].setAttribute("inert", "");
  scenes[sceneIndex].querySelector(".scene-scroll").scrollTop = 0;
  sceneIndex = next;
  scenes[sceneIndex].removeAttribute("inert");
  scenes[sceneIndex].classList.add("active");
  const nextScroll = scenes[sceneIndex].querySelector(".scene-scroll");
  if (nextScroll) nextScroll.scrollTop = 0;
  document.querySelectorAll(".chapter-dot").forEach((button, i) => {
    const active = i === sceneIndex;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  setText("#chapterNumber", String(next + 1).padStart(2, "0"));
  setText("#chapterName", SCENE_NAMES[next]);
  $("#progressFill").style.width = `${((next + 1) / 6) * 100}%`;
  $("#prevBtn").disabled = next === 0;
  $("#nextBtn").disabled = next === 5;
  if (next === 5) celebrate(85);
}
function initNavigation() {
  document.addEventListener("click", event => {
    const direct = event.target.closest("[data-go]");
    if (direct) { goToScene(direct.dataset.go); return; }
    if (event.target.closest("[data-next]")) goToScene(sceneIndex + 1);
    if (event.target.closest("[data-back]")) goToScene(sceneIndex - 1);
  });
  $("#prevBtn").addEventListener("click", () => goToScene(sceneIndex - 1));
  $("#nextBtn").addEventListener("click", () => goToScene(sceneIndex + 1));
  document.addEventListener("keydown", event => {
    if ($("#memoryDialog").open || $("#archiveDialog").open || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") { event.preventDefault(); goToScene(sceneIndex + 1); }
    if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); goToScene(sceneIndex - 1); }
  });
  let touchStart = null;
  $("#experience").addEventListener("touchstart", e => {
    if (e.touches.length !== 1 || e.target.closest(".memory-gallery,.surprise-card")) return;
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  $("#experience").addEventListener("touchend", e => {
    if (!touchStart || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 110 && Math.abs(dx) > Math.abs(dy) * 1.7) goToScene(sceneIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
}

function initGallery() {
  const gallery = $("#memoryGallery");
  CONFIG.recuerdos.forEach((memory, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    card.setAttribute("aria-label", `Leer recuerdo ${i + 1}: ${memory.titulo}`);
    card.innerHTML = `<span class="memory-photo-mark" aria-hidden="true"></span><span class="memory-top"><span class="memory-number"></span><span class="memory-symbol"></span></span><span class="memory-bottom"><small></small><h3></h3><p></p></span>`;
    $(".memory-photo-mark", card).textContent = memory.simbolo;
    $(".memory-number", card).textContent = String(i + 1).padStart(2, "0") + " / 06";
    $(".memory-symbol", card).textContent = memory.simbolo;
    $(".memory-bottom small", card).textContent = memory.etiqueta;
    $(".memory-bottom h3", card).textContent = memory.titulo;
    $(".memory-bottom p", card).textContent = memory.resumen;
    const img = new Image();
    img.onload = () => { card.style.setProperty("--photo", `url("${memory.foto.replaceAll('"', '%22')}")`); card.classList.add("has-photo"); };
    img.src = memory.foto;
    card.addEventListener("click", () => openMemory(memory));
    if (!reduceMotion) {
      card.addEventListener("pointermove", e => {
        if (e.pointerType === "touch") return;
        const b = card.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width - .5;
        const y = (e.clientY - b.top) / b.height - .5;
        card.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${-y * 6}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    }
    gallery.appendChild(card);
  });
  const rail = $("#timelineRail");
  CONFIG.recuerdos.forEach((memory, i) => {
    const point = document.createElement("button");
    point.type = "button";
    point.className = "timeline-point" + (i === 0 ? " selected" : "");
    point.innerHTML = `<span class="timeline-dot"></span><span class="timeline-number"></span><span class="timeline-text"></span>`;
    $(".timeline-number", point).textContent = String(i + 1).padStart(2, "0");
    $(".timeline-text", point).textContent = memory.titulo;
    point.setAttribute("aria-label", `Ir al recuerdo ${i + 1}: ${memory.titulo}`);
    point.addEventListener("click", () => {
      gallery.children[i].scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", inline: "center", block: "nearest" });
      $$(".timeline-point").forEach((node, j) => node.classList.toggle("selected", j === i));
    });
    rail.appendChild(point);
  });
  let scrollFrame = false;
  gallery.addEventListener("scroll", () => {
    if (scrollFrame) return;
    scrollFrame = true;
    requestAnimationFrame(() => {
      let closest = 0, distance = Infinity;
      const center = gallery.getBoundingClientRect().left + gallery.clientWidth / 2;
      [...gallery.children].forEach((card, i) => {
        const rectangle = card.getBoundingClientRect();
        const delta = Math.abs(rectangle.left + rectangle.width / 2 - center);
        if (delta < distance) { closest = i; distance = delta; }
      });
      $$(".timeline-point").forEach((node, j) => node.classList.toggle("selected", j === closest));
      scrollFrame = false;
    });
  }, {passive:true});
  $("#closeMemory").addEventListener("click", () => $("#memoryDialog").close());
  $("#memoryDialog").addEventListener("click", e => { if (e.target === $("#memoryDialog")) e.target.close(); });
}
function openMemory(memory) {
  setText("#modalKicker", memory.etiqueta);
  setText("#modalTitle", memory.titulo);
  setText("#modalText", memory.detalle);
  $("#modalMemoryImage").src = memory.foto;
  $("#modalMemoryImage").alt = memory.titulo;
  $("#memoryDialog").showModal();
}

function initStars() {
  $$("[data-star]").forEach(button => button.addEventListener("click", () => {
    const i = Number(button.dataset.star);
    const memory = CONFIG.estrellas[i];
    $$("[data-star]").forEach(point => point.classList.toggle("selected", point === button));
    const box = $("#universeMemory");
    box.style.opacity = "0";
    window.setTimeout(() => {
      setText(".universe-kicker", `ESTRELLA ${String(i + 1).padStart(2, "0")} / 06`);
      setText("#universeMemory h3", memory.titulo);
      setText("#universeMemory p", memory.texto);
      box.style.opacity = "1";
    }, reduceMotion ? 0 : 160);
  }));
}

function initLetter() {
  const buttons = $$("[data-letter]");
  const readButton = $("#readLetter");
  buttons.forEach(button => button.addEventListener("click", () => {
    selectedLetter = Number(button.dataset.letter);
    if (letterTimer !== null) { clearInterval(letterTimer); letterTimer = null; }
    letterFinished = false;
    buttons.forEach(tab => {
      const active = tab === button;
      tab.classList.toggle("selected", active);
      tab.setAttribute("aria-selected", String(active));
    });
    const letter = CARTAS[selectedLetter];
    setText("#letterYear", letter.fecha);
    setText("#letterTitle", letter.titulo);
    setText("#letterSalutation", letter.saludo);
    setText("#letterText", "Presiona «Leer esta carta» para descubrir sus palabras...");
    setText("#letterSignature", letter.firma);
    setText("#letterTopic", letter.etiqueta);
    $("#typingCaret").classList.remove("visible");
    readButton.innerHTML = 'Leer esta carta <span>✧</span>';
    $("#letterBodyScroll").scrollTop = 0;
  }));
  readButton.addEventListener("click", () => {
    if (letterTimer !== null) { clearInterval(letterTimer); letterTimer = null; completeLetter(); return; }
    if (letterFinished) { $("#letterBodyScroll").scrollTop = 0; return; }
    startMusic();
    readButton.innerHTML = 'Mostrar carta completa <span>✧</span>';
    const content = CARTAS[selectedLetter].texto;
    const text = $("#letterText");
    text.textContent = "";
    $("#typingCaret").classList.add("visible");
    if (reduceMotion) { completeLetter(); return; }
    let position = 0;
    letterTimer = window.setInterval(() => {
      position = Math.min(content.length, position + 11);
      text.textContent = content.slice(0, position);
      if (position >= content.length) { clearInterval(letterTimer); letterTimer = null; completeLetter(); }
    }, 18);
  });
  $("[data-letter='2']").click();
}
function completeLetter() {
  $("#letterText").textContent = CARTAS[selectedLetter].texto;
  $("#typingCaret").classList.remove("visible");
  $("#readLetter").innerHTML = 'Volver a leer desde arriba <span>♡</span>';
  letterFinished = true;
}

function registerSecret(id) {
  if (secrets.has(id)) return;
  secrets.add(id);
  setText("#secretCount", secrets.size + " / 4");
  if (secrets.size >= 4) {
    $("#secretStatus").hidden = true;
    $("#secretUnlocked").hidden = false;
    celebrate(45);
  }
}
function initSurprises() {
  $$(".surprise-card").forEach(button => button.addEventListener("click", () => {
    const id = Number(button.dataset.surprise);
    if (secrets.has(id)) return;
    button.classList.add("revealed");
    button.setAttribute("aria-pressed", "true");
    registerSecret(id);
  }));
}
function initSongGuess() {
  const buttons = $$("[data-song-guess]");
  const feedback = $("#songGuessFeedback");
  const result = $("#songGuessWin");
  if (!feedback || !result) return;
  let wrongAttempts = 0;
  buttons.forEach(button => button.addEventListener("click", () => {
    if (secrets.has(3)) return;
    if (Number(button.dataset.songGuess) !== 6) {
      wrongAttempts++;
      button.classList.add("guess-incorrect");
      feedback.textContent = wrongAttempts < 2
        ? "Esta también está en nuestra lista, pero hay otra que es solo nuestra. Intenta de nuevo ♡"
        : "Pista: su nombre habla de tener alguien especial con quien compartir el tiempo.";
      return;
    }
    buttons.forEach(item => {
      item.disabled = true;
      item.classList.toggle("guess-correct", item === button);
    });
    feedback.textContent = "¡Sí, Rosita! Esa es nuestra canción especial. ♡";
    result.hidden = false;
    registerSecret(3);
    celebrate(78);
    if (typeof setMusicTrack === "function") setMusicTrack(6, false);
    result.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }));
}

function initMemoryReveal() {
  const button = $("#revealMemory");
  const content = $("#memoryRevealContent");
  if (!button || !content) return;
  button.addEventListener("click", () => {
    content.hidden = false;
    button.hidden = true;
    button.setAttribute("aria-expanded", "true");
    celebrate(32);
  });
}

// Contador de años/meses calendario + días/horas/minutos/segundos reales.
function addMonthsClamped(start, count) {
  const year = start.getFullYear(), month = start.getMonth();
  const targetLastDay = new Date(year, month + count + 1, 0).getDate();
  return new Date(year, month + count, Math.min(start.getDate(), targetLastDay), start.getHours(), start.getMinutes(), start.getSeconds());
}
function updateCounter() {
  const start = new Date(CONFIG.fechaInicio);
  const now = new Date();
  if (isNaN(start.getTime()) || now < start) return;
  let monthsTotal = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  if (addMonthsClamped(start, monthsTotal) > now) monthsTotal--;
  const anchor = addMonthsClamped(start, monthsTotal);
  let secondsRemaining = Math.floor((now - anchor) / 1000);
  const parts = {
    years: Math.floor(monthsTotal / 12), months: monthsTotal % 12,
    days: Math.floor(secondsRemaining / 86400),
    hours: Math.floor(secondsRemaining / 3600) % 24,
    minutes: Math.floor(secondsRemaining / 60) % 60,
    seconds: secondsRemaining % 60
  };
  Object.entries(parts).forEach(([unit, value]) => {
    const el = $(`[data-unit="${unit}"]`);
    if (el) el.textContent = String(value).padStart(2, "0");
  });
}

// Solo los ocho temas que Steven seleccionó. La web reproduce enlaces oficiales
// sin volver a publicar archivos MP3 comerciales en un repositorio público.
const PLAYLIST = [
  { titulo: "Pista que me compartiste", artista: "Audio personal sin título confirmado", archivo: "assets/musica/01-recuerdo-especial.mp3" },
  { titulo: "Labios de Cereza 2", artista: "T3R Elemento", youtube: "nRsKRKaX3HY" },
  { titulo: "My Love Mine All Mine", artista: "Mitski", youtube: "CwGbMYLjIpQ" },
  { titulo: "Tu Sancho", artista: "Fuerza Regida", youtube: "PXSmPTX-SgM" },
  { titulo: "WILDFLOWER", artista: "Billie Eilish", youtube: "l08Zw-RY__Q" },
  { titulo: "Mama's Boy", artista: "Dominic Fike", youtube: "KSXP1DRnTKc" },
  { titulo: "Someone to Spend Time With", artista: "Los Retros", youtube: "KFjmq0rEyDw" },
  { titulo: "Dame Amor", artista: "Officialalex425", youtube: "N4IALVjPCDE" }
];
const audio = $("#customAudio");
let selectedTrack = 1;
let musicEnabled = false;
let videoTrack = null;

function musicFrame() {
  return $("#officialPlayerHost iframe");
}
function sendVideoCommand(command) {
  const frame = musicFrame();
  if (!frame || !frame.contentWindow) return;
  frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: command, args: [] }), "https://www.youtube-nocookie.com");
}
function updateMusicUI() {
  const item = PLAYLIST[selectedTrack];
  const counter = String(selectedTrack + 1).padStart(2, "0") + " / " + String(PLAYLIST.length).padStart(2, "0");
  setText("#musicTrackCount", counter + (musicEnabled ? " · REPRODUCTOR ABIERTO" : " · LISTA PARA ESCUCHAR"));
  setText("#musicTrackTitle", item.titulo);
  setText("#musicTrackArtist", item.artista);
  const play = $("#musicPlay");
  if (play) {
    play.textContent = musicEnabled ? "Ⅱ Pausar" : "▶ Escuchar";
    play.setAttribute("aria-label", musicEnabled ? "Pausar canción" : "Escuchar canción");
  }
  $$(".song-choice").forEach(button => {
    const active = Number(button.dataset.track) === selectedTrack;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const toggle = $("#soundToggle");
  toggle.setAttribute("aria-pressed", String(musicEnabled));
  toggle.setAttribute("aria-label", musicEnabled ? "Pausar música" : "Escuchar música");
  setText("#soundLabel", musicEnabled ? "Pausar" : "Música");
  const link = $("#musicOpenOfficial");
  if (item.youtube) {
    link.hidden = false;
    link.href = "https://www.youtube.com/watch?v=" + item.youtube;
  } else {
    link.hidden = true;
    link.removeAttribute("href");
  }
}
function setMusicTrack(index, playNow = false) {
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  const host = $("#officialPlayerHost");
  host.replaceChildren();
  host.hidden = true;
  videoTrack = null;
  selectedTrack = (index + PLAYLIST.length) % PLAYLIST.length;
  musicEnabled = false;
  updateMusicUI();
  if (playNow) startMusic();
}
async function startMusic() {
  if (musicEnabled) return;
  const item = PLAYLIST[selectedTrack];
  if (item.youtube) {
    const host = $("#officialPlayerHost");
    host.hidden = false;
    if (videoTrack !== selectedTrack || !musicFrame()) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + item.youtube + "?autoplay=1&playsinline=1&rel=0&enablejsapi=1";
      iframe.title = "Reproductor oficial: " + item.titulo;
      iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share");
      iframe.setAttribute("allowfullscreen", "");
      host.replaceChildren(iframe);
      videoTrack = selectedTrack;
    } else {
      sendVideoCommand("playVideo");
    }
    musicEnabled = true;
    updateMusicUI();
  } else {
    // El audio personal original solo suena si su archivo está disponible en esta instalación.
    audio.src = item.archivo;
    try {
      await audio.play();
      musicEnabled = true;
      updateMusicUI();
    } catch {
      audio.removeAttribute("src");
      musicEnabled = false;
      updateMusicUI();
      showToast("El audio personal todavía no está publicado. Escoge otra canción de la lista.");
    }
  }
}
function stopMusic() {
  audio.pause();
  sendVideoCommand("pauseVideo");
  musicEnabled = false;
  updateMusicUI();
}
function initMusic() {
  audio.loop = false;
  $("#soundToggle").addEventListener("click", () => musicEnabled ? stopMusic() : startMusic());
  $("#musicPlay").addEventListener("click", () => musicEnabled ? stopMusic() : startMusic());
  $("#musicPrevious").addEventListener("click", () => setMusicTrack(selectedTrack - 1, true));
  $("#musicNext").addEventListener("click", () => setMusicTrack(selectedTrack + 1, true));
  $$(".song-choice").forEach(button => button.addEventListener("click", () => setMusicTrack(Number(button.dataset.track), true)));
  audio.addEventListener("ended", () => setMusicTrack(selectedTrack + 1, true));
  updateMusicUI();
}

function showToast(message) {
  const toast = $("#toast"); toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3700);
}

// Lluvia de estrellas/confeti en canvas (sin librerías adicionales).
const particlesCanvas = $("#celebration");
const ctx = particlesCanvas.getContext("2d");
let particles = [], particlesAnimating = false;
const palette = ["#f9d8eb", "#eda8d6", "#fff4e0", "#a6a2ed", "#d7b5f7"];
function resizeCelebration() {
  const scale = Math.min(devicePixelRatio || 1, 2);
  particlesCanvas.width = Math.round(innerWidth * scale);
  particlesCanvas.height = Math.round(innerHeight * scale);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}
function celebrate(count = 100) {
  if (reduceMotion) return;
  resizeCelebration();
  for (let i = 0; i < count; i++) {
    particles.push({ x: Math.random() * innerWidth, y: -Math.random() * innerHeight * .65 - 20,
      vx: (Math.random() - .5) * 1.7, vy: 1.6 + Math.random() * 2.5,
      rot: Math.random() * 6, vr: (Math.random() - .5) * .12,
      size: 2 + Math.random() * 5, color: palette[Math.floor(Math.random() * palette.length)],
      life: 1 });
  }
  if (!particlesAnimating) { particlesAnimating = true; requestAnimationFrame(tickConfetti); }
}
function tickConfetti() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles = particles.filter(p => p.life > 0 && p.y < innerHeight + 18);
  particles.forEach(p => {
    p.x += p.vx + Math.sin(p.rot * 4) * .4;
    p.y += p.vy; p.rot += p.vr;
    if (p.y > innerHeight * .8) p.life -= .015;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.7); ctx.restore();
  });
  if (particles.length) requestAnimationFrame(tickConfetti);
  else { particlesAnimating = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

bindConfig();
initNavigation();
initGallery();
initStars();
initLetter();
initSurprises();
initMemoryReveal();
initSongGuess();
initMusic();
updateCounter();
window.setInterval(updateCounter, 1000);
$("#celebrateBtn").addEventListener("click", () => celebrate(180));
window.addEventListener("resize", resizeCelebration);
