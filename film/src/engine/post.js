// Post-processing: MSAA scene → depth of field → selective bloom → sub-frame accumulation → grade.
import * as THREE from 'three';
import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const QUAD_VS = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

export class Post {
  constructor(world) {
    const { W, H, IW, IH, ss } = world;
    this.world = world;
    const opts = { type: THREE.HalfFloatType, colorSpace: THREE.LinearSRGBColorSpace };
    this.sceneRT = new THREE.WebGLRenderTarget(IW, IH, { ...opts, samples: 4 });
    this.sceneRT.depthTexture = new THREE.DepthTexture(IW, IH);
    this.sceneRT.depthTexture.type = THREE.FloatType;
    this.dofRT = new THREE.WebGLRenderTarget(IW, IH, opts);
    this.accRT = new THREE.WebGLRenderTarget(IW, IH, { type: THREE.HalfFloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter }); // float32 blending is not available
    this.bloom = new UnrealBloomPass(new THREE.Vector2(IW, IH), 0.55, 0.6, 1.02);
    this.params = { focus: 10, aperture: 0, maxCoc: 10 * ss, bloom: 0.55, grain: 0.006, vignette: 0.22, exposure: 1 };

    this.dof = new FullScreenQuad(new THREE.ShaderMaterial({
      uniforms: {
        tColor: { value: this.sceneRT.texture },
        tDepth: { value: this.sceneRT.depthTexture },
        uRes: { value: new THREE.Vector2(IW, IH) },
        uNear: { value: 0.05 }, uFar: { value: 900 },
        uFocus: { value: 10 }, uAperture: { value: 0 }, uMaxCoc: { value: 14 },
      },
      vertexShader: QUAD_VS,
      fragmentShader: /* glsl */ `
        uniform sampler2D tColor, tDepth; uniform vec2 uRes; uniform float uNear, uFar, uFocus, uAperture, uMaxCoc;
        varying vec2 vUv;
        float lin(float d){ float z = d*2.0-1.0; return 2.0*uNear*uFar/(uFar+uNear - z*(uFar-uNear)); }
        float coc(vec2 uv){
          float z = lin(textureLod(tDepth, uv, 0.0).r);
          // thin-lens circle of confusion in pixels
          float c = uAperture * abs(z - uFocus) / max(z, 1e-3) * uRes.y;
          return min(c, uMaxCoc);
        }
        void main(){
          vec4 base = textureLod(tColor, vUv, 0.0);
          float c0 = coc(vUv);
          if (uAperture <= 0.0 || c0 < 0.6) { gl_FragColor = base; return; }
          vec3 acc = base.rgb; float wsum = 1.0;
          const int N = 40;
          float ga = 2.39996323;
          for (int i = 1; i < N; i++) {
            float r = sqrt(float(i)/float(N)) * uMaxCoc;
            float th = float(i)*ga;
            vec2 off = vec2(cos(th), sin(th)) * r / uRes;
            vec2 uv = vUv + off;
            float cs = coc(uv);
            // a sample contributes if its own blur reaches us (scatter-as-gather) and we are blurred enough
            float w = smoothstep(r-1.0, r+1.0, min(cs, c0*1.2+1.0));
            acc += textureLod(tColor, uv, 0.0).rgb * w; wsum += w;
          }
          gl_FragColor = vec4(acc/wsum, 1.0);
        }`,
    }));

    this.accum = new FullScreenQuad(new THREE.ShaderMaterial({
      uniforms: { tSrc: { value: this.dofRT.texture }, uW: { value: 0.25 } },
      vertexShader: QUAD_VS,
      fragmentShader: /* glsl */ `uniform sampler2D tSrc; uniform float uW; varying vec2 vUv;
        void main(){ gl_FragColor = vec4(texture2D(tSrc, vUv).rgb * uW, 1.0); }`,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    }));

    this.final = new FullScreenQuad(new THREE.ShaderMaterial({
      uniforms: {
        tAcc: { value: this.accRT.texture },
        uRes: { value: new THREE.Vector2(W, H) },
        uSrc: { value: new THREE.Vector2(IW, IH) },
        uScale: { value: ss },
        uFrame: { value: 0 },
        uGrain: { value: 0.018 },
        uVig: { value: 0.22 },
        uExp: { value: 1 },
      },
      vertexShader: QUAD_VS,
      fragmentShader: /* glsl */ `
        uniform sampler2D tAcc; uniform vec2 uRes, uSrc; uniform float uScale, uFrame, uGrain, uVig, uExp; varying vec2 vUv;
        // Lanczos-2, scaled to the output pixel: the supersampled image is reduced with a sharp filter
        float lz(float x){ x = abs(x); if (x < 1e-4) return 1.0; if (x >= 2.0) return 0.0; float p = 3.14159265 * x; return 2.0 * sin(p) * sin(p * 0.5) / (p * p); }
        vec3 downsample(){
          vec2 c = gl_FragCoord.xy * uScale - 0.5;   // output pixel centre, in source texel coordinates
          vec2 b = floor(c);
          vec3 acc = vec3(0.0); float ws = 0.0;
          for (int j = -4; j <= 5; j++) for (int i = -4; i <= 5; i++) {
            vec2 q = b + vec2(float(i), float(j));
            vec2 d = (q - c) / uScale;
            float w = lz(d.x) * lz(d.y);
            if (w == 0.0) continue;
            ivec2 tq = ivec2(clamp(q, vec2(0.0), uSrc - 1.0));
            acc += texelFetch(tAcc, tq, 0).rgb * w; ws += w;
          }
          return max(acc / ws, 0.0);
        }
        float h(vec2 p){ vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
        vec3 toSRGB(vec3 c){ c = max(c, 0.0); return mix(c*12.92, 1.055*pow(c, vec3(1.0/2.4)) - 0.055, step(0.0031308, c)); }
        void main(){
          vec3 c = (uScale > 1.0 ? downsample() : texture2D(tAcc, vUv).rgb) * uExp;
          // UI colours stay exact: values above white (bloom cores) are simply clipped
          c = min(c, vec3(1.0));
          vec2 q = vUv - 0.5; q.x *= uRes.x/uRes.y;
          float v = 1.0 - uVig * smoothstep(0.35, 1.05, length(q));
          c *= v;
          vec3 s = toSRGB(c);
          float g = h(gl_FragCoord.xy + vec2(uFrame*17.0, uFrame*31.0)) - 0.5;
          s += g * uGrain;
          gl_FragColor = vec4(s, 1.0);
        }`,
      depthTest: false,
      depthWrite: false,
    }));
  }

  /** Renders one sub-frame and adds it to the accumulator. */
  sub(i, n) {
    const { renderer, scene, camera } = this.world;
    const p = this.params;
    renderer.setRenderTarget(this.sceneRT);
    renderer.setClearColor(0x000000, 1);
    renderer.clear(true, true, true);
    renderer.render(scene, camera);
    const du = this.dof.material.uniforms;
    du.uNear.value = camera.near;
    du.uFar.value = camera.far;
    du.uFocus.value = p.focus;
    du.uAperture.value = p.aperture;
    du.uMaxCoc.value = p.maxCoc;
    renderer.setRenderTarget(this.dofRT);
    this.dof.render(renderer);
    this.bloom.strength = p.bloom;
    if (p.bloom > 0) this.bloom.render(renderer, null, this.dofRT, 0, false);
    renderer.setRenderTarget(this.accRT);
    if (i === 0) {
      renderer.setClearColor(0x000000, 1);
      renderer.clear(true, false, false);
    }
    this.accum.material.uniforms.uW.value = 1 / n;
    this.accum.render(renderer);
  }

  present(frame) {
    const { renderer } = this.world;
    const u = this.final.material.uniforms;
    u.uFrame.value = frame % 997;
    u.uGrain.value = this.params.grain;
    u.uVig.value = this.params.vignette;
    u.uExp.value = this.params.exposure;
    renderer.setRenderTarget(null);
    this.final.render(renderer);
  }
}
