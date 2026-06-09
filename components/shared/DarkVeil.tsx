'use client';

import { useEffect, useRef } from 'react';

interface DarkVeilProps {
  className?: string;
  style?: React.CSSProperties;
}

const VERT = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  vec3 hsl2rgb(float h, float s, float l) {
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    h = mod(h, 1.0) * 6.0;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    vec3 rgb = vec3(0.0);
    if (h < 1.0)      rgb = vec3(c, x, 0.0);
    else if (h < 2.0) rgb = vec3(x, c, 0.0);
    else if (h < 3.0) rgb = vec3(0.0, c, x);
    else if (h < 4.0) rgb = vec3(0.0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0.0, c);
    else               rgb = vec3(c, 0.0, x);
    return rgb + (l - 0.5 * c);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float t = uTime * 0.12;

    vec2 warpUv = uv;
    warpUv.x += 0.05 * sin(uv.y * 4.0 + t * 0.7);
    warpUv.y += 0.05 * sin(uv.x * 3.0 + t * 0.5);

    float n  = noise(warpUv * 3.0 + t * 0.15);
    float n2 = noise(warpUv * 6.0 - t * 0.1);
    float v  = (sin(n * 3.0 + n2 * 2.0 + t) + 1.0) * 0.5;

    float hue   = 0.28 + 0.06 * sin(t * 0.4) + 0.04 * v;
    float sat   = 0.4 + 0.1 * v;
    float light = 0.08 + 0.06 * v;

    vec3 col = hsl2rgb(hue, sat, light);

    float scan = 0.92 + 0.08 * step(0.5, fract(gl_FragCoord.y * 0.5));
    col *= scan;

    float grain = (hash(gl_FragCoord.xy * 0.01 + t) - 0.5) * 0.015;
    col += grain;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

export default function DarkVeil({ className = '', style }: DarkVeilProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let destroyed = false;
    let cleanupFn = () => { destroyed = true; };

    void import('ogl').then(({ Renderer, Program, Mesh, Geometry }) => {
      if (destroyed) return;

      const renderer = new Renderer({
        canvas,
        alpha: false,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio, 1.5),
      });
      const gl = renderer.gl;
      gl.clearColor(0.11, 0.095, 0.14, 1);

      const geometry = new Geometry(gl, {
        position: {
          size: 2,
          data: new Float32Array([-1, -1, 3, -1, -1, 3]),
        },
      });

      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: [canvas.offsetWidth, canvas.offsetHeight] },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });

      const start = performance.now();
      const tick = () => {
        if (destroyed) return;
        raf = requestAnimationFrame(tick);
        program.uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render({ scene: mesh });
      };
      raf = requestAnimationFrame(tick);

      cleanupFn = () => {
        destroyed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    });

    return () => cleanupFn();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}
