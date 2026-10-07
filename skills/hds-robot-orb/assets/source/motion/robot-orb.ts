import * as THREE from "three";

/** Original procedural head. No external scene, model or texture is loaded. */
export function mountRobotOrb(host: HTMLElement): () => void {
  const facing = document.documentElement.dir === "rtl" ? -1 : 1;
  const canvas = host.querySelector<HTMLCanvasElement>("canvas");
  if (!canvas) return () => {};
  const mobile = matchMedia("(max-width: 600px)").matches;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
  camera.position.set(0, 0.1, 7.9);
  const head = new THREE.Group();
  scene.add(head);
  head.rotation.set(-0.025, -0.13 * facing, -0.035 * facing);
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(1.9, mobile ? 40 : 72, mobile ? 28 : 48),
    new THREE.MeshPhysicalMaterial({
      color: "#f6f3fa",
      metalness: 0.08,
      roughness: 0.27,
      clearcoat: 0.8,
      clearcoatRoughness: 0.22,
    }),
  );
  head.add(shell);
  scene.add(new THREE.HemisphereLight("#fff5ff", "#61516e", 1.7));
  const key = new THREE.DirectionalLight("#ffffff", 3.6);
  key.position.set(-3, 5, 6);
  scene.add(key);
  const violet = new THREE.DirectionalLight("#ad68ff", 3.4);
  violet.position.set(-4, 1, -2);
  scene.add(violet);
  const pink = new THREE.DirectionalLight("#fc85cc", 2.7);
  pink.position.set(3, 3, -2);
  scene.add(pink);
  const amber = new THREE.DirectionalLight("#ffb36d", 3.8);
  amber.position.set(4, -1, -1);
  scene.add(amber);

  const visorCanvas = document.createElement("canvas");
  visorCanvas.width = 1024;
  visorCanvas.height = 640;
  const context = visorCanvas.getContext("2d")!;
  const outer = context.createLinearGradient(0, 0, 1024, 640);
  outer.addColorStop(0, "#d8d1e4");
  outer.addColorStop(0.5, "#706776");
  outer.addColorStop(1, "#efd6c1");
  context.fillStyle = outer;
  context.beginPath();
  context.roundRect(0, 0, 1024, 640, 160);
  context.fill();
  const glass = context.createLinearGradient(0, 0, 250, 640);
  glass.addColorStop(0, "#303039");
  glass.addColorStop(0.55, "#0d0d16");
  glass.addColorStop(1, "#241c2c");
  context.fillStyle = glass;
  context.beginPath();
  context.roundRect(18, 18, 988, 604, 145);
  context.fill();
  context.strokeStyle = "#ffffff20";
  context.lineWidth = 7;
  context.beginPath();
  context.moveTo(190, 62);
  context.bezierCurveTo(420, 35, 650, 40, 840, 65);
  context.stroke();
  const visorTexture = new THREE.CanvasTexture(visorCanvas);
  visorTexture.colorSpace = THREE.SRGBColorSpace;
  const panel = new THREE.PlaneGeometry(3.25, 1.95, 40, 28);
  const positions = panel.attributes.position;
  for (let index = 0; index < positions.count; index++) {
    const x = positions.getX(index),
      y = positions.getY(index);
    positions.setZ(index, Math.sqrt(2.005 ** 2 - x * x - y * y));
  }
  panel.computeVertexNormals();
  head.add(
    new THREE.Mesh(
      panel,
      new THREE.MeshPhysicalMaterial({
        map: visorTexture,
        transparent: true,
        alphaTest: 0.1,
        roughness: 0.3,
        metalness: 0.12,
        clearcoat: 0.9,
      }),
    ),
  );

  const eyeShape = new THREE.Shape();
  const w = 0.37,
    h = 0.63,
    r = 0.16;
  eyeShape.moveTo(-w / 2 + r, -h / 2);
  eyeShape.lineTo(w / 2 - r, -h / 2);
  eyeShape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  eyeShape.lineTo(w / 2, h / 2 - r);
  eyeShape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  eyeShape.lineTo(-w / 2 + r, h / 2);
  eyeShape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  eyeShape.lineTo(-w / 2, -h / 2 + r);
  eyeShape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  const eyeGeometry = new THREE.ShapeGeometry(eyeShape, 12);
  const eyeMaterial = new THREE.MeshBasicMaterial({
    color: "#e4baff",
    toneMapped: false,
  });
  const eyes = [-0.61, 0.61].map((x) => {
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(x, 0.1, 2.06);
    eye.rotation.y = x * 0.24;
    head.add(eye);
    return eye;
  });
  const smile = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.23, -0.49, 2.045),
    new THREE.Vector3(0, -0.6, 2.075),
    new THREE.Vector3(0.23, -0.49, 2.045),
  );
  head.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(smile, 24, 0.012, 6, false),
      new THREE.MeshBasicMaterial({
        color: "#c98acb",
        transparent: true,
        opacity: 0.65,
        toneMapped: false,
      }),
    ),
  );
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = glowCanvas.height = 128;
  const glowContext = glowCanvas.getContext("2d")!;
  const gradient = glowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "#d59eff80");
  gradient.addColorStop(1, "#d59eff00");
  glowContext.fillStyle = gradient;
  glowContext.fillRect(0, 0, 128, 128);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  const glows = eyes.map((eye) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.5,
      }),
    );
    sprite.position.copy(eye.position);
    sprite.position.z += 0.02;
    sprite.scale.set(0.85, 1.05, 1);
    head.add(sprite);
    return sprite;
  });
  let visible = true,
    alive = true,
    raf = 0,
    last = 0;
  let lookX = 0,
    lookY = 0;
  const gazeStops = [
    [-0.85, 0.5],
    [0.7, 0.3],
    [0, -0.45],
    [-0.6, -0.1],
    [0.35, 0.65],
    [0, 0],
  ] as const;
  const start = performance.now();
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
  resize.observe(host);
  const frame = (time: number) => {
    if (!alive || !visible || document.hidden) {
      raf = 0;
      return;
    }
    raf = requestAnimationFrame(frame);
    if (time - last < 33) return;
    last = time;
    // The first animation-frame timestamp can precede setup within the same frame.
    const t = Math.max(0, (time - start) / 1000);
    const [targetX, targetY] =
      gazeStops[Math.floor(t / 2.4) % gazeStops.length];
    lookX += (targetX * facing - lookX) * 0.12;
    lookY += (targetY - lookY) * 0.12;
    head.rotation.y = -0.13 * facing + lookX * 0.12;
    head.rotation.x = -0.025 - lookY * 0.08;
    head.position.y = Math.sin(t * 0.8) * 0.045;
    const cycle = (t + 1.5) % 2.7;
    const blink =
      cycle < 0.22
        ? Math.max(0.035, 1 - Math.sin((cycle / 0.22) * Math.PI))
        : 1;
    eyes.forEach((eye, index) => {
      eye.scale.y = blink;
      eye.position.x = (index ? 0.61 : -0.61) + lookX * 0.13;
      eye.position.y = 0.1 + lookY * 0.09;
      glows[index].position.x = eye.position.x;
      glows[index].position.y = eye.position.y;
      glows[index].material.opacity = 0.5 * blink;
    });
    renderer.render(scene, camera);
    host.dataset.ready = "true";
    host.dataset.blink = blink < 0.35 ? "closed" : "open";
    host.dataset.look = `${lookX.toFixed(2)},${lookY.toFixed(2)}`;
  };
  const resume = () => {
    if (visible && !document.hidden && !raf && alive)
      raf = requestAnimationFrame(frame);
  };
  const intersection = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    if (!visible) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else resume();
  });
  intersection.observe(host);
  document.addEventListener("visibilitychange", resume);
  const onContextLost = (event: Event) => {
    event.preventDefault();
    host.removeAttribute("data-ready");
    cancelAnimationFrame(raf);
    raf = 0;
    alive = false;
  };
  canvas.addEventListener("webglcontextlost", onContextLost);
  resume();
  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    resize.disconnect();
    intersection.disconnect();
    document.removeEventListener("visibilitychange", resume);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      }
      if (object instanceof THREE.Sprite) object.material.dispose();
    });
    visorTexture.dispose();
    glowTexture.dispose();
    renderer.dispose();
    host.removeAttribute("data-ready");
  };
}
