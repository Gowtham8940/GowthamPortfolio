"use client";

import { useEffect, useRef } from "react";

// Soft animated noise field behind the hero, in raw WebGL (no library).
// Renders at half resolution, pauses off-screen, and draws one still frame
// when the visitor prefers reduced motion.
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform vec3 base; uniform vec3 tint;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*n(p); p*=2.03; a*=.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / r; vec2 q = uv * vec2(r.x/r.y, 1.) * 2.2;
  float f = fbm(q + vec2(t*.04, -t*.03) + fbm(q*1.3 - t*.02));
  float d = distance(uv, m);
  float glow = smoothstep(.45, 0., d) * .55;
  float band = smoothstep(.35, .95, f) * .55 + glow;
  vec3 c = mix(base, tint, band);
  c += (h(gl_FragCoord.xy + t) - .5) * .025;
  gl_FragColor = vec4(c, 1.);
}`;

const hex = (v) => {
  const s = v.trim().replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
};

export function NoiseField({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");
    const uM = gl.getUniformLocation(prog, "m");
    const uBase = gl.getUniformLocation(prog, "base");
    const uTint = gl.getUniformLocation(prog, "tint");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 };
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const colors = () => {
      const cs = getComputedStyle(document.documentElement);
      const dark = document.documentElement.classList.contains("dark");
      gl.uniform3fv(uBase, hex(cs.getPropertyValue("--canvas") || "#f3f4f6"));
      gl.uniform3fv(uTint, dark ? [0.12, 0.3, 0.22] : [0.78, 0.88, 0.82]);
    };
    const resize = () => {
      const s = 0.5;
      canvas.width = Math.max(1, canvas.clientWidth * s);
      canvas.height = Math.max(1, canvas.clientHeight * s);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
    };
    const frame = (now) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };
    const onMove = (e) => {
      const b = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - b.left) / b.width;
      mouse.ty = 1 - (e.clientY - b.top) / b.height;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    const mo = new MutationObserver(() => {
      colors();
      if (reduced) frame(performance.now());
    });

    colors();
    resize();
    frame(performance.now());
    io.observe(canvas);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}
