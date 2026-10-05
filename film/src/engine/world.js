// The 3D world: renderer, camera, environment, and the "screen" primitive that carries a painted UI.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Pen } from './canvas.js';

export class World {
  /** W × H: the output (canvas) size. ss: supersampling factor, the scene renders at W·ss × H·ss. */
  constructor(canvas, W, H, ss = 1) {
    this.W = W;
    this.H = H;
    this.ss = ss;
    this.IW = Math.round(W * ss);
    this.IH = Math.round(H * ss);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(W, H, false);
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.autoClear = false; // the post chain clears explicitly (sub-frame accumulation)
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // we encode in the final pass
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, W / H, 0.25, 600); // near/far kept tight: no z-fighting in wide shots
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = this.env;
    this.screens = [];
    this.updaters = [];
    this.maxAniso = this.renderer.capabilities.getMaxAnisotropy();
  }

  add(obj) {
    this.scene.add(obj);
    return obj;
  }

  onUpdate(fn) {
    this.updaters.push(fn);
  }

  update(t) {
    for (const fn of this.updaters) fn(t);
    for (const s of this.screens) {
      s.syncSlab();
      s.refresh(t);
    }
  }
}

const SCREEN_VS = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SCREEN_FS = /* glsl */ `
  uniform sampler2D map;
  uniform vec2 uSize;      // canvas size in css px
  uniform vec4 uRect;      // visible rect in css px: x, y, w, h
  uniform float uRadius;   // corner radius in css px
  uniform float uOpacity;
  uniform float uFade;
  uniform float uBright;
  uniform vec3 uTint;
  uniform float uTintK;
  uniform vec2 uShift;     // content offset in css px (mask reveals)
  varying vec2 vUv;
  float sdRound(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  void main() {
    vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uSize;
    vec2 c = uRect.xy + uRect.zw * 0.5;
    float d = sdRound(p - c, uRect.zw * 0.5, uRadius);
    float aa = fwidth(d);
    float a = clamp(0.5 - d / max(aa, 1e-4), 0.0, 1.0) * uOpacity * uFade;
    if (a <= 0.001) discard;
    vec2 sp = p - uShift;
    vec2 suv = vec2(sp.x / uSize.x, 1.0 - sp.y / uSize.y);
    vec4 tex = texture2D(map, suv);
    if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) tex = vec4(0.0);
    // premultiplied texture: rgb already carries tex.a
    vec3 col = tex.rgb * uBright;
    col = mix(col, uTint * tex.a, uTintK);
    gl_FragColor = vec4(col * a, a * tex.a);
  }
`;

/**
 * A flat screen whose content is painted on a canvas each time its content changes.
 * Sizes: `w`×`h` in world units, `px`×`py` in css pixels, painted at `dpr`.
 */
export class Screen {
  constructor(world, { w, h, px, py, dpr = 2, radius = 16, painter, slab = 0, slabColor = '#0c1417', name = '', order = 0 }) {
    this.world = world;
    this.name = name;
    this.w = w;
    this.h = h;
    this.px = px;
    this.py = py;
    this.dpr = dpr;
    this.painter = painter;
    this.canvas = document.createElement('canvas');
    this.canvas.width = Math.round(px * dpr);
    this.canvas.height = Math.round(py * dpr);
    this.ctx = this.canvas.getContext('2d', { alpha: true, willReadFrequently: true }); // CPU raster: glyph rendering independent of history
    this.pen = new Pen(this.ctx);
    this.tex = this.makeTex();
    this.uniforms = {
      map: { value: this.tex },
      uSize: { value: new THREE.Vector2(px, py) },
      uRect: { value: new THREE.Vector4(0, 0, px, py) },
      uRadius: { value: radius },
      uOpacity: { value: 1 },
      uFade: { value: 1 },
      uBright: { value: 1 },
      uTint: { value: new THREE.Color(0, 0, 0) },
      uTintK: { value: 0 },
      uShift: { value: new THREE.Vector2(0, 0) },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: SCREEN_VS,
      fragmentShader: SCREEN_FS,
      transparent: true,
      premultipliedAlpha: true,
      // the interface always wins the depth test against its own plate, even far from the camera
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -8,
      depthWrite: true,
    });
    this.group = new THREE.Group();
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), this.material);
    this.mesh.renderOrder = order;
    this.group.add(this.mesh);
    if (slab > 0) {
      this.slabDepth = slab;
      this.slab = roundedSlab(w, h, (radius / px) * w, slab, slabColor);
      this.slab.position.z = -this.slab.userData.front - 0.002;
      this.group.add(this.slab);
      this.slabKey = '';
    }
    this.lastT = null;
    this.state = {};
    world.screens.push(this);
  }

  makeTex() {
    const tex = new THREE.CanvasTexture(this.canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.premultiplyAlpha = true;
    tex.anisotropy = this.world.maxAniso;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }

  /** Visible rect in css px (for morphing a screen out of a smaller box). */
  setRect(x, y, w, h, r) {
    this.uniforms.uRect.value.set(x, y, w, h);
    if (r !== undefined) this.uniforms.uRadius.value = r;
  }

  /**
   * The plate always matches the visible rect: same size, same corner radius, under the same centre.
   * Rebuilt (never stretched) when the rect changes, so its corners stay round.
   */
  syncSlab() {
    if (!this.slab) return;
    const u = this.uniforms.uRect.value;
    const sx = this.w / this.px, sy = this.h / this.py;
    const w = u.z * sx, h = u.w * sy, r = this.uniforms.uRadius.value * sx;
    const key = `${w.toFixed(4)},${h.toFixed(4)},${r.toFixed(4)}`;
    if (key !== this.slabKey) {
      this.slabKey = key;
      this.slab.geometry.dispose();
      this.slab.geometry = roundedSlabGeometry(w, h, r, this.slabDepth);
    }
    const cx = (u.x + u.z / 2 - this.px / 2) * sx, cy = (this.py / 2 - (u.y + u.w / 2)) * sy;
    this.slab.position.set(this.mesh.position.x + cx, this.mesh.position.y + cy, -this.slab.geometry.userData.front - 0.002);
    this.slab.material.opacity = this.uniforms.uOpacity.value * this.uniforms.uFade.value;
  }

  set opacity(v) {
    this.uniforms.uOpacity.value = v;
    if (this.slab) this.slab.material.opacity = v;
  }

  get visible() {
    return this.group.visible && this.uniforms.uOpacity.value > 0.001;
  }

  /** Texture density (canvas px per css px). The canvas is resized; the next refresh repaints it. */
  setDpr(d) {
    this.dpr = d;
    this.canvas.width = Math.round(this.px * d);
    this.canvas.height = Math.round(this.py * d);
    this.lastT = null;
  }

  refresh(t) {
    if (!this.visible || !this.painter) return;
    // A painter can map a quiet interval to one canonical time: the content is drawn at that time,
    // so a frame never depends on which frame was rendered before it. Times are snapped to the frame
    // (1/60 s): the sub-frames of one frame share one paint, the interface itself never smears.
    let key = this.painter.key ? this.painter.key(t, this) : t;
    if (typeof key !== 'number') throw new Error(`${this.name}: key must be a time`);
    key = Math.round(key * 60) / 60;
    if (key === this.lastT) return;
    this.lastT = key;
    t = key;
    const c = this.ctx;
    // full reset: no 2D state (font, spacing, alignment, dashes…) may leak from the previous paint
    c.reset();
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.painter.draw(this.pen, t, this);
    // a fresh texture every time: each upload takes the same path as a first upload (mipmaps included),
    // so the GPU result never depends on what this texture held before
    this.tex.dispose();
    this.tex = this.makeTex();
    this.uniforms.map.value = this.tex;
  }
}

/** Rounded-rect outline centred on the origin. */
export function roundedRectShape(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, (3 * Math.PI) / 2, false);
  return s;
}

/**
 * A rounded plate whose outline is exactly w × h with corner radius r, bevel included: the shape is inset
 * by the bevel and the bevel grows it back, so plate and screen share one silhouette. Front face at z = front.
 */
export function roundedSlabGeometry(w, h, r, depth, bevel) {
  r = Math.max(0.002, Math.min(r, w / 2, h / 2));
  const b = Math.min(bevel ?? depth * 0.45, r * 0.6);
  const g = new THREE.ExtrudeGeometry(roundedRectShape(w - 2 * b, h - 2 * b, r - b), {
    depth, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelOffset: 0, bevelSegments: 6, curveSegments: 18,
  });
  g.userData.front = depth + b;
  return g;
}

/** A plate behind a screen, so windows have an edge when seen at an angle. */
export function roundedSlab(w, h, r, depth, color = '#0c1417') {
  const m = new THREE.MeshPhysicalMaterial({ color, metalness: 0.35, roughness: 0.62, clearcoat: 0.1, clearcoatRoughness: 0.6, envMapIntensity: 0.55, transparent: true });
  const mesh = new THREE.Mesh(roundedSlabGeometry(w, h, r, depth), m);
  mesh.userData.front = mesh.geometry.userData.front;
  return mesh;
}

/** Soft shadow quad: a blurred rounded rect, multiplied under floating cards. */
export function shadowQuad(w, h, soft = 0.25, strength = 0.55) {
  const mat = new THREE.ShaderMaterial({
    uniforms: { uSize: { value: new THREE.Vector2(w, h) }, uSoft: { value: soft }, uK: { value: strength } },
    vertexShader: SCREEN_VS,
    fragmentShader: /* glsl */ `
      uniform vec2 uSize; uniform float uSoft; uniform float uK; varying vec2 vUv;
      float sdRound(vec2 p, vec2 b, float r){ vec2 q=abs(p)-b+r; return length(max(q,0.0))+min(max(q.x,q.y),0.0)-r; }
      void main(){
        vec2 full = uSize + vec2(uSoft*4.0);
        vec2 p = (vUv-0.5)*full;
        float d = sdRound(p, uSize*0.5, uSoft*0.5);
        float a = 1.0 - smoothstep(-uSoft, uSoft*1.6, d);
        gl_FragColor = vec4(0.0,0.0,0.0, a*uK);
      }`,
    transparent: true,
    depthWrite: false,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w + soft * 4, h + soft * 4), mat);
  return m;
}

/** Background dome: deep night with slow, large colored light pools (no gradient behind titles). */
export function makeDome() {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uBase: { value: new THREE.Color('#04090b') },
      uA: { value: new THREE.Color('#0d3b3a') },
      uB: { value: new THREE.Color('#3a1d14') },
      uDirA: { value: new THREE.Vector3(-0.6, 0.5, -0.6).normalize() },
      uDirB: { value: new THREE.Vector3(0.7, -0.2, -0.7).normalize() },
      uKA: { value: 0.6 },
      uKB: { value: 0.35 },
    },
    vertexShader: /* glsl */ `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uBase,uA,uB,uDirA,uDirB; uniform float uKA,uKB; varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        float a = pow(max(dot(d,uDirA),0.0), 5.0);
        float b = pow(max(dot(d,uDirB),0.0), 6.0);
        vec3 col = uBase + uA*a*uKA + uB*b*uKB;
        col *= 0.85 + 0.15*smoothstep(-0.6, 0.6, d.y);
        gl_FragColor = vec4(col,1.0);
      }`,
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(300, 48, 32), mat);
  m.renderOrder = -10;
  return m;
}
