/* CHATBOT "PREGÚNTALE A LANA" */
(function chatbot() {
  const fab = document.getElementById("chatFab");
  const win = document.getElementById("chatWindow");
  const closeBtn = document.getElementById("chatClose");
  const messages = document.getElementById("chatMessages");
  const chipsBox = document.getElementById("chatChips");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  if (!fab || !win) return;

  /* Cada regla se evalúa en orden; gana la primera que coincida. */
  const KB = [
    {
      keys: ["quien es", "quien fue", "vida", "biografia", "lana", "rhoades"],
      reply: "<strong>Lana Rhoades</strong> es una personalidad estadounidense de internet, modelo y creadora de contenido. Su perfil público ha evolucionado hacia redes, lifestyle y proyectos propios. Puedes revisar el <a href=\"#biografia\">perfil</a> de esta página."
    },
    {
      keys: ["proyectos", "trabajo", "hace", "obras"],
      reply: "Sus áreas públicas incluyen redes sociales, moda, entrevistas, podcast y proyectos de marca personal. Mira la sección <a href=\"#obras\">Proyectos</a>."
    },
    {
      keys: ["instagram", "redes", "sociales", "perfil"],
      reply: "Su <a href=\"https://www.instagram.com/lanarhoades/\" target=\"_blank\" rel=\"noopener\">Instagram público</a> es la referencia más directa para publicaciones actuales."
    },
    {
      keys: ["imagenes", "fotos", "fotografias", "galeria", "ver"],
      reply: "Puedes consultar <a href=\"https://www.google.com/search?tbm=isch&q=Lana+Rhoades+editorial\" target=\"_blank\" rel=\"noopener\">imágenes editoriales públicas</a>. Revisa siempre permisos, créditos y contexto antes de reutilizarlas."
    },
    {
      keys: ["entrevista", "entrevistas", "youtube", "podcast"],
      reply: "En la sección <a href=\"#video\">Entrevista</a> encontrarás una búsqueda de conversaciones públicas sobre su trayectoria y proyectos."
    },
    {
      keys: ["privacidad", "limites", "responsable", "contenido"],
      reply: "Este sitio se limita a información pública y evita material íntimo o explícito. Respeta la privacidad, la edad mínima de cada plataforma y los derechos de autor."
    },
    {
      keys: ["juego", "jugar", "memoria"],
      reply: "Ve a <a href=\"#juego\">Memoria Lana</a> y encuentra las seis parejas de temas y pistas."
    },
    {
      keys: ["hola", "buenas", "hey", "saludos", "hi"],
      reply:
        "¡Hola! Soy el bot de este sitio. Puedo contarte sobre la <strong>trayectoria</strong> de Lana, sus <strong>proyectos</strong>, imágenes públicas y entrevistas. ¿Qué quieres saber?"
    },
    {
      keys: ["gracias", "genial", "perfecto"],
      reply: "¡Con gusto! Si quieres saber algo más sobre Lana, aquí estoy."
    }
  ];

  const FALLBACK =
    "No tengo esa información. Prueba preguntarme por <em>su vida</em>, <em>proyectos</em>, <em>Instagram</em>, <em>imágenes</em>, <em>entrevistas</em> o <em>privacidad</em>.";

  const CHIPS = [
    "¿Quién es Lana?",
    "Proyectos",
    "Instagram",
    "Imágenes públicas",
    "Entrevistas",
    "Privacidad"
  ];

  /* ---------- Utilidades ---------- */
  // Quita tildes y pasa a minúsculas para comparar sin errores
  const normalize = (s) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function answerFor(text) {
    const q = normalize(text);
    for (const rule of KB) {
      if (rule.keys.some((k) => q.includes(k))) return rule.reply;
    }
    return FALLBACK;
  }

  function addMessage(html, who) {
    const div = document.createElement("div");
    div.className = "chat-msg " + who; // "bot" o "user"
    div.innerHTML = html;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function botReply(text) {
    // Burbuja "escribiendo…" y respuesta con retraso natural
    const typing = addMessage('<span class="typing"><i></i><i></i><i></i></span>', "bot");
    setTimeout(() => {
      typing.innerHTML = answerFor(text);
      messages.scrollTop = messages.scrollHeight;
    }, 550 + Math.random() * 450);
  }

  function send(text) {
    if (!text.trim()) return;
    addMessage(text.replace(/</g, "&lt;"), "user");
    botReply(text);
  }

  /* ---------- Chips de sugerencias ---------- */
  CHIPS.forEach((label) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = label;
    b.addEventListener("click", () => send(label));
    chipsBox.appendChild(b);
  });

  /* ---------- Abrir / cerrar ---------- */
  let greeted = false;
  function openChat() {
    win.hidden = false;
    fab.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => win.classList.add("open"));
    if (!greeted) {
      greeted = true;
      setTimeout(() => {
        addMessage(
          "¡Hola! Pregúntame por la <strong>trayectoria</strong> de Lana, sus <strong>proyectos</strong>, " +
          "sus <strong>imágenes públicas</strong> o sus <strong>entrevistas</strong>. " +
          "También puedes tocar una sugerencia aquí abajo.",
          "bot"
        );
      }, 350);
    }
    input.focus();
  }
  function closeChat() {
    win.classList.remove("open");
    fab.setAttribute("aria-expanded", "false");
    setTimeout(() => { win.hidden = true; }, 300);
  }

  fab.addEventListener("click", () => (win.hidden ? openChat() : closeChat()));
  closeBtn.addEventListener("click", closeChat);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    send(input.value);
    input.value = "";
  });
})();
