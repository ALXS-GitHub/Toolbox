// The Toolbox logo in 3D, built from the site's logo.svg (64 × 64 grid): a rounded amber box, a darker lid
// band, a handle and a latch. Extruded, bevelled, lit like the rest of the world.
import * as THREE from 'three';
import { roundedRectShape } from '../engine/world.js';

/** Rounded rect from SVG coordinates (x, y, w, h, rx), y pointing down, in a 64 grid centred on (32, 32). */
function svgRect(x, y, w, h, rx) {
  const s = roundedRectShape(w, h, rx);
  const cx = x + w / 2 - 32, cy = 32 - (y + h / 2);
  return { shape: s, cx, cy };
}

export function makeToolboxLogo(size = 2.4) {
  const group = new THREE.Group();
  const k = size / 64;
  const inner = new THREE.Group();
  inner.scale.setScalar(k);
  group.add(inner);
  const mat = (color, emissive = 0.04) =>
    new THREE.MeshPhysicalMaterial({ color, metalness: 0.05, roughness: 0.55, clearcoat: 0.15, clearcoatRoughness: 0.5, envMapIntensity: 0.7, emissive: new THREE.Color(color).multiplyScalar(emissive) });
  const extrude = ({ shape, cx, cy }, depth, bevel, material, z = 0) => {
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 5, curveSegments: 16 });
    g.translate(cx, cy, z - depth / 2);
    const m = new THREE.Mesh(g, material);
    inner.add(m);
    return m;
  };
  const D = 16; // box depth in grid units
  // body (the bevel grows it back to the logo's outline)
  extrude(svgRect(7.2, 23.2, 49.6, 31.6, 5.8), D, 1.2, mat('#ffc107'));
  // lid band, slightly proud of the body
  extrude(svgRect(6.6, 22.4, 50.8, 10.2, 4.4), D + 1.6, 0.8, mat('#e0a800'));
  // latch on the front face
  extrude(svgRect(27.6, 29.6, 8.8, 7.8, 2.0), 2.2, 0.6, mat('#7a5a00', 0.02), D / 2 + 1.4);
  // handle: a rounded tube along the logo's path (v-6, quarter arcs r=4, h10)
  const path = new THREE.CurvePath();
  const P = (x, y) => new THREE.Vector3(x - 32, 32 - y, 0);
  path.add(new THREE.LineCurve3(P(23, 22.5), P(23, 16)));
  path.add(new THREE.QuadraticBezierCurve3(P(23, 16), P(23, 12), P(27, 12)));
  path.add(new THREE.LineCurve3(P(27, 12), P(37, 12)));
  path.add(new THREE.QuadraticBezierCurve3(P(37, 12), P(41, 12), P(41, 16)));
  path.add(new THREE.LineCurve3(P(41, 16), P(41, 22.5)));
  const handle = new THREE.Mesh(new THREE.TubeGeometry(path, 64, 2.25, 14, false), mat('#b07f00', 0.03));
  inner.add(handle);
  // round caps on the handle ends
  for (const x of [23, 41]) {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(2.25, 16, 12), handle.material);
    cap.position.copy(P(x, 22.5));
    inner.add(cap);
  }
  return { group, size, materials: inner.children.map((m) => m.material) };
}
