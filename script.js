// Inicialización de Three.js para animación de fondo (adaptado al tema acuático)
let scene, camera, renderer, bubbles = [];
function initThreeJS() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg-canvas"),
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Crear burbujas (simula agua y ambiente acuático)
  for (let i = 0; i < 200; i++) {
    const geometry = new THREE.SphereGeometry(0.03, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const bubble = new THREE.Mesh(geometry, material);
    bubble.position.set(
      THREE.MathUtils.randFloatSpread(100),
      THREE.MathUtils.randFloatSpread(100),
      THREE.MathUtils.randFloatSpread(100)
    );
    scene.add(bubble);
    bubbles.push(bubble);
  }
}

function animateThreeJS() {
  requestAnimationFrame(animateThreeJS);
  // Mover las burbujas
  bubbles.forEach(bubble => {
    bubble.position.y += 0.005;
    if (bubble.position.y > 50) {
      bubble.position.y = -50;
    }
  });
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Inicializar Three.js
initThreeJS();
animateThreeJS();

// Efecto de salpicadura de agua al hacer clic en botones
document.querySelectorAll(".btn-neon, .sub-btn").forEach(button => {
  button.addEventListener("click", event => {
    createWaterSplash(event.clientX, event.clientY);
    // Reproducir sonido de agua
    document.getElementById("audio").play();
  });
});

function createWaterSplash(x, y) {
  const splash = document.createElement("div");
  splash.classList.add("splash");
  const size = Math.random() * 30 + 20;
  splash.style.width = `${size}px`;
  splash.style.height = `${size}px`;
  splash.style.left = `${x - size / 2}px`;
  splash.style.top = `${y - size / 2}px`;
  document.body.appendChild(splash);
  setTimeout(() => splash.remove(), 500);
}

// Manejo de secciones y contenido dinámico
const flotantesBtn = document.getElementById("flotantesBtn");
const terrestresBtn = document.getElementById("terrestresBtn");
const flotantesSections = document.getElementById("flotantes-sections");
const terrestresSections = document.getElementById("terrestres-sections");
const contentDisplay = document.getElementById("content-display");
const contentTitle = document.getElementById("content-title");
const contentDescription = document.getElementById("content-description");
const contentMedia = document.getElementById("content-media");

flotantesBtn.addEventListener("click", () => {
  flotantesSections.classList.toggle("hidden");
  terrestresSections.classList.add("hidden");
  contentDisplay.classList.add("hidden");
});

terrestresBtn.addEventListener("click", () => {
  terrestresSections.classList.toggle("hidden");
  flotantesSections.classList.add("hidden");
  contentDisplay.classList.add("hidden");
});

// Función para mostrar contenido dinámico de cada subsección
function showContent(title, description, mediaArray) {
  contentTitle.textContent = title;
  contentDescription.textContent = description;
  contentMedia.innerHTML = mediaArray
    .map(media => {
      // Si la extensión es video, se mostrará video; si es imagen, se mostrará imagen.
      if (media.endsWith(".mp4")) {
        return `<video controls><source src="assets/videos/${media}" type="video/mp4">Tu navegador no soporta el video.</video>`;
      } else {
        return `<img src="assets/images/${media}" alt="${title}">`;
      }
    })
    .join("");
  contentDisplay.classList.remove("hidden");
}

// Eventos para subsecciones
document.getElementById("piscinasBtn").addEventListener("click", () => {
  showContent(
    "Piscinas",
    "Disfruta de nuestras increíbles piscinas flotantes, ideales para refrescarte y divertirte.",
    ["piscina1.jpg", "piscina2.jpg", "piscina-video.mp4"]
  );
});
document.getElementById("playasBtn").addEventListener("click", () => {
  showContent(
    "Playas",
    "Relájate en nuestras playas flotantes, donde la diversión y la tranquilidad se unen.",
    ["playa1.jpg", "playa2.jpg"]
  );
});
document.getElementById("kamikazeBtn").addEventListener("click", () => {
  showContent(
    "Kamikaze Jump Gigante",
    "Atrévete a vivir el salto más extremo de nuestro parque acuático.",
    ["kamikaze1.jpg", "kamikaze-video.mp4"]
  );
});
document.getElementById("urbanoBtn").addEventListener("click", () => {
  showContent(
    "Parque Acuático Urbano Móvil",
    "Un parque que se adapta a la ciudad, llevando diversión a donde vayas.",
    ["urbano1.jpg", "urbano2.jpg"]
  );
});

// Chat en tiempo real (envía mensaje al backend y muestra respuesta)
const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  appendMessage("user", message);
  // Enviar mensaje al endpoint del backend
  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userMessage: message })
  })
    .then((res) => res.json())
    .then((data) => {
      appendMessage("bot", data.botResponse);
    })
    .catch((err) => console.error(err));
  userInput.value = "";
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "bot-msg";
  msg.textContent = text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Botón de gamificación (recompensa)
document.querySelector(".btn-recompensa").addEventListener("click", () => {
  alert("¡Felicidades! Has ganado 100 monedas virtuales para AQUAZONE.");
});

// Botón "Empezar": desplaza a la sección de introducción
document.getElementById("start-btn").addEventListener("click", () => {
  window.scrollTo({
    top: document.querySelector(".main-attractions").offsetTop,
    behavior: "smooth"
  });
});
