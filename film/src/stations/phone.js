// Station 1: the phone. 3D body, claude.ai screen, the dictated words as 3D quads, the waveform as 3D bars.
import * as THREE from 'three';
import { Screen, roundedSlabGeometry, roundedRectShape } from '../engine/world.js';
import { FONT } from '../engine/canvas.js';
import { PH, phonePainter, voiceLevel } from '../ui/phone.js';
import { clamp, sp, lerp, inv, smoother, trackV } from '../engine/motion.js';
import { T } from '../timeline.js';

export const PHONE_W = 0.74; // screen width in world units
export const UPP = PHONE_W / PH.w; // world units per css px on the phone screen

export function makePhone(world, ctx, place) {
  const { copy, imgs } = ctx;
  const group = new THREE.Group();
  group.position.set(...place.pos);
  group.rotation.set(...(place.rot || [0, 0, 0]));
  world.add(group);

  const sw = PHONE_W, sh = PH.h * UPP;
  // One silhouette, as on a real phone: body, glass and screen share concentric corners (screen radius
  // + bezel), the body has a rounded edge and a visible thickness, the glass sits flush on its flat face.
  const bez = 0.024, depth = 0.058, edge = 0.012;
  const rScreen = 47 * UPP;
  const body = new THREE.Mesh(
    roundedSlabGeometry(sw + bez * 2, sh + bez * 2, rScreen + bez, depth, edge),
    new THREE.MeshPhysicalMaterial({ color: '#2a2d31', metalness: 0.6, roughness: 0.48, clearcoat: 0.15, clearcoatRoughness: 0.5, envMapIntensity: 0.6 }),
  );
  const front = body.geometry.userData.front;
  body.position.z = -front; // front face at z = 0
  group.add(body);
  // black glass, flush with the flat front, inside the rounded edge
  const gIn = bez - edge * 1.15;
  const glass = new THREE.Mesh(
    new THREE.ShapeGeometry(roundedRectShape(sw + gIn * 2, sh + gIn * 2, rScreen + gIn), 24),
    new THREE.MeshPhysicalMaterial({ color: '#030405', roughness: 0.35, metalness: 0, clearcoat: 0.2, envMapIntensity: 0.4 }),
  );
  glass.position.z = 0.0006;
  group.add(glass);
  // side buttons, set into the edge
  const btnMat = new THREE.MeshPhysicalMaterial({ color: '#2b2e31', metalness: 0.6, roughness: 0.5, envMapIntensity: 0.6 });
  for (const [x, y, h] of [[-1, 0.42, 0.11], [-1, 0.27, 0.11], [1, 0.33, 0.2]]) {
    const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.006, h - 0.012, 4, 10), btnMat);
    b.position.set(x * (sw / 2 + bez + 0.001), y * sh * 0.5 + 0.15, -front);
    group.add(b);
  }

  const painter = phonePainter(copy, imgs);
  const screen = new Screen(world, { w: sw, h: sh, px: PH.w, py: PH.h, dpr: 3, radius: 47, painter, name: 'phone' });
  screen.group.position.z = 0.0012;
  group.add(screen.group);

  // Phone-local position of a screen css-px point.
  const local = (px, py, z = 0.016) => new THREE.Vector3((px - PH.w / 2) * UPP, (PH.h / 2 - py) * UPP, z);
  const worldOf = (px, py, z) => group.localToWorld(local(px, py, z));

  // ── the dictated words, one quad each (static textures, crisp in macro) ──
  const words = copy.dictWords.map((w) => {
    const size = 140; // texture font size (css px)
    const m = document.createElement('canvas').getContext('2d');
    m.font = `500 ${size}px ${FONT.ui}`;
    const tw = Math.ceil(m.measureText(w).width) + 24;
    const th = Math.ceil(size * 1.32);
    const s = new Screen(world, {
      w: tw / size, h: th / size, px: tw, py: th, dpr: 1, radius: 0, name: 'word',
      painter: { key: () => 0, draw(pen) { pen.font(size, 500, FONT.ui).text(w, 12, th * 0.52, '#faf9f5'); } },
    });
    s.wordW = tw / size; // world width at "1 unit per font size"
    s.size = size;
    group.add(s.group);
    return s;
  });

  // Field layout (target): same wrapping as the phone painter's transcript (17 px, field width - 40).
  const fieldPos = [];
  {
    const m = document.createElement('canvas').getContext('2d');
    m.font = `500 17px ${FONT.ui}`;
    const maxW = 330 - 40;
    let x = 30, line = 0;
    copy.dictWords.forEach((w, i) => {
      const ww = m.measureText(w).width;
      if (i > 0 && x + ww > 30 + maxW) { x = 30; line++; }
      fieldPos.push([x, 684 + 8 + line * 23]);
      x += ww + m.measureText(' ').width;
    });
  }
  // Big layout: lines of words in a plane in front of the phone (phone-local units).
  const big = place.big; // { size, z, x0, y0, maxW, lh }
  const bigPos = [];
  {
    const m = document.createElement('canvas').getContext('2d');
    m.font = `500 100px ${FONT.ui}`;
    const sc = big.size / 100;
    let x = 0, line = 0;
    copy.dictWords.forEach((w, i) => {
      const ww = m.measureText(w).width * sc;
      if (i > 0 && x + ww > big.maxW) { x = 0; line++; }
      bigPos.push([big.x0 + x, big.y0 - line * big.lh]);
      x += ww + m.measureText(' ').width * sc;
    });
  }

  const lastY = Math.min(...bigPos.map((p) => p[1]));
  // centre of the big block (phone-local), used by the camera for the opening shot
  const bigCenter = [big.x0 + big.maxW * 0.48, (big.y0 + lastY) / 2, big.z];

  // ── waveform bars (3D) ──
  const nb = 9;
  const barGeo = new THREE.PlaneGeometry(1, 1);
  const barMat = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color('#d97757') }, uAspect: { value: 1 } },
    vertexShader: /* glsl */ `varying vec2 vUv; varying vec2 vS; void main(){ vUv=uv; vS = vec2(length(modelMatrix[0].xyz), length(modelMatrix[1].xyz)); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: /* glsl */ `uniform vec3 uColor; varying vec2 vUv; varying vec2 vS;
      void main(){ vec2 p=(vUv-0.5)*vS; float r=vS.x*0.5; vec2 q=abs(p)-vS*0.5+r; float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-r;
        float a=clamp(0.5-d/fwidth(d),0.0,1.0); if(a<0.01) discard; gl_FragColor=vec4(uColor*a,a);} `,
    transparent: true, premultipliedAlpha: true, depthWrite: false,
  });
  const bars = [];
  for (let i = 0; i < nb; i++) {
    const b = new THREE.Mesh(barGeo, barMat);
    b.renderOrder = 5;
    group.add(b);
    bars.push(b);
  }

  /** k = 0: big layout in front of the phone; k = 1: in the composer field. */
  function placeWords(t, k) {
    words.forEach((s, i) => {
      const t0 = T.wordsStart + i * T.wordStep;
      const rev = sp(t - t0, 'snap');
      const vis = t >= t0 - 0.01 && t < 54;
      // per-word stagger in the morph, earlier words first
      const kk = clamp(smoother(inv(i * 0.02, 0.75 + i * 0.02, k)));
      const [bx, by] = bigPos[i];
      const [fx, fy] = fieldPos[i];
      const fl = local(fx, fy, 0.018);
      const scBig = big.size; // world height of the font
      const scField = 17 * UPP;
      const sc = lerp(scBig, scField, kk);
      // anchor: left, vertical middle of the text line
      const x = lerp(bx, fl.x, kk), y = lerp(by, fl.y, kk), z = lerp(big.z, fl.z, kk);
      s.group.scale.setScalar(sc);
      s.group.position.set(x + (s.wordW * sc) / 2 - (12 / s.size) * sc, y + (s.mesh.geometry.parameters.height * sc) * 0.02, z);
      s.group.visible = vis && k < 0.999;
      // mask reveal: the word rises inside its own line box
      s.uniforms.uShift.value.set(0, (1 - rev) * s.py * 0.85);
      s.opacity = clamp(rev * 4);
    });
  }

  // The waveform is the caret of the dictation: it rides just after the newest word.
  const caretKeys = (() => {
    const m = document.createElement('canvas').getContext('2d');
    m.font = `500 100px ${FONT.ui}`;
    const sc = big.size / 100;
    const keys = [[0, [big.x0, big.y0]]];
    copy.dictWords.forEach((w, i) => {
      const ww = m.measureText(w).width * sc;
      keys.push([T.wordsStart + i * T.wordStep, [bigPos[i][0] + ww + big.size * 0.42, bigPos[i][1]]]);
    });
    return keys;
  })();

  function placeBars(t, k) {
    const wx = 12 + 366 - 108, wy = 664 + 118 - 30;
    // at the loop end the caret comes back where it starts (t = 0)
    const caret = t > 50 ? caretKeys[0][1] : trackV(t, caretKeys, 'snap');
    for (let i = 0; i < nb; i++) {
      const a = voiceLevel(t, i);
      const p0 = [caret[0] + i * big.barStep, caret[1], big.z];
      const fl = local(wx + i * 6 + 1.5, wy, 0.019);
      const kk = clamp(smoother(inv(0.0, 0.8, k)));
      const w = lerp(big.barW, 3 * UPP, kk);
      const h = lerp(big.barW * (1.2 + a * 5.5), (3 + a * 16) * UPP, kk);
      bars[i].scale.set(w, h, 1);
      bars[i].position.set(lerp(p0[0], fl.x, kk), lerp(p0[1], fl.y, kk), lerp(p0[2], fl.z, kk));
      bars[i].visible = k < 0.999 && (t < T.send || t > 50);
    }
  }

  return {
    group,
    screen,
    bigCenter,
    words,
    local,
    worldOf,
    update(t) {
      // The words and the bars fly into the field between reveal and reveal + 0.9 s.
      // At the loop end (54 → 56) the bars come back out of the field (the reverse move).
      let k;
      if (t < 50) k = clamp(inv(T.reveal - 0.3, T.reveal + 0.7, t));
      else k = 1 - clamp(inv(T.ret + 0.4, 56, t));
      placeWords(t, k);
      placeBars(t, k);
    },
  };
}
