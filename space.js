/* Cielo 3D WebGL con Three.js. Si no hay conexión/soporte, usa Canvas 2D. */
const canvas = document.getElementById("space");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function init() {
  try {
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(62, 1, .1, 120);
    camera.position.z = 20;

    const count = window.innerWidth < 700 ? 830 : 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cool = new THREE.Color("#8f9ccc"), warm = new THREE.Color("#e7acdf");
    const temp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const j = i * 3;
      positions[j] = (Math.random() - .5) * 65;
      positions[j + 1] = (Math.random() - .5) * 38;
      positions[j + 2] = -Math.random() * 40;
      temp.copy(cool).lerp(warm, Math.random());
      colors[j] = temp.r; colors[j + 1] = temp.g; colors[j + 2] = temp.b;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ size: .075, vertexColors: true, transparent: true, opacity: .82, sizeAttenuation: true, depthWrite: false }));
    scene.add(stars);

    const orbGroup = new THREE.Group();
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 2), new THREE.MeshBasicMaterial({ color: 0x644278, wireframe: true, transparent: true, opacity: .18 }));
    orbGroup.add(core);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.2 + i * .42, .007, 3, 144), new THREE.MeshBasicMaterial({ color: i === 1 ? 0xaca3f7 : 0xe8acd8, transparent: true, opacity: i === 1 ? .2 : .14 }));
      ring.rotation.set(.35 + i * .8, i * .7, .4 + i * .6);
      orbGroup.add(ring);
    }
    orbGroup.position.set(8.5, .5, -8);
    scene.add(orbGroup);
    let mouseX = 0, mouseY = 0;
    window.addEventListener("pointermove", e => { mouseX = (e.clientX / innerWidth - .5) * 2; mouseY = (e.clientY / innerHeight - .5) * 2; }, { passive: true });
    function resize() { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight, false); }
    window.addEventListener("resize", resize); resize();
    const clock = new THREE.Clock();
    let previous = 0;
    function render() {
      const t = clock.getElapsedTime();
      const dt = t - previous; previous = t;
      if (!reduceMotion && dt < .2) {
        stars.rotation.y += dt * .003;
        stars.rotation.x += dt * .0007;
        orbGroup.rotation.y += dt * .037;
        orbGroup.rotation.z += dt * .015;
        camera.position.x += (mouseX * .28 - camera.position.x) * .022;
        camera.position.y += (-mouseY * .21 - camera.position.y) * .022;
      }
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      if (!reduceMotion) requestAnimationFrame(render);
    }
    render();
  } catch (error) {
    initCanvasFallback();
  }
}
function initCanvasFallback() {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const points = Array.from({ length: innerWidth < 700 ? 150 : 300 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + .3, alpha: .3 + Math.random() * .58, phase: Math.random() * 6 }));
  function paint(t = 0) {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const width = innerWidth, height = innerHeight;
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    points.forEach((p, i) => {
      ctx.globalAlpha = p.alpha * (.75 + .25 * Math.sin(t / 1300 + p.phase));
      ctx.fillStyle = i % 4 ? "#c7b6eb" : "#f4c4e0";
      ctx.beginPath(); ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (!reduceMotion) requestAnimationFrame(paint);
  }
  paint();
  window.addEventListener("resize", () => paint());
}
init();
