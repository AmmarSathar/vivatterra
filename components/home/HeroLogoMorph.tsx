'use client';

import { useEffect, useRef } from 'react';

// TT region in vivaTTerra-logo-hero.svg (viewBox 0 0 2000 800)
// TT-logo-2f2840.svg has the same viewBox and places the TT at the same origin
const TT_SX = 861, TT_SY = 283, TT_SW = 265, TT_SH = 227;
const SVG_W = 2000, SVG_H = 800;
const NAV_H = 72;

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Pre-render the TT SVG at 2× and recolor all opaque pixels to white.
// Done once on load so draw() has no per-frame filter overhead.
function prepareWhiteTT(ttImg: HTMLImageElement): HTMLCanvasElement {
  const scale = 2;
  const oc = document.createElement('canvas');
  oc.width = TT_SW * scale;
  oc.height = TT_SH * scale;
  const ctx = oc.getContext('2d')!;
  ctx.scale(scale, scale);
  ctx.drawImage(ttImg, TT_SX, TT_SY, TT_SW, TT_SH, 0, 0, TT_SW, TT_SH);
  const id = ctx.getImageData(0, 0, oc.width, oc.height);
  const d = id.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] > 0) { d[i] = d[i + 1] = d[i + 2] = 255; } // keep alpha, set RGB to white
  }
  ctx.putImageData(id, 0, 0);
  return oc;
}

export default function HeroLogoMorph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('hero-canvas-active');

    const dpr = window.devicePixelRatio || 1;
    let fullImg: HTMLImageElement | null = null;
    let whiteTT: HTMLCanvasElement | null = null;
    const state = { entrance: 0, scroll: 0 };
    let cancelled = false;
    let gCtx: { revert: () => void } | null = null;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      draw();
    }

    function draw() {
      if (!canvas || !fullImg) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, vw, vh);

      // Full hero logo — tracks hero position as it scrolls out
      const logoW = Math.min(0.92 * vw, 1400);
      const logoH = logoW * (SVG_H / SVG_W);
      const logoX = (vw - logoW) / 2;
      // scrollY at progress p ≈ p × vh, so logo viewport center drops by p×vh
      const logoCenterY = vh / 2 - state.scroll * vh;
      const logoY = logoCenterY - logoH / 2;

      // Nav TT target — centered in the transparent header
      const navTTH = NAV_H * 0.38;
      const navTTW = navTTH * (TT_SW / TT_SH);
      const navTTX = vw / 2 - navTTW / 2;
      const navTTY = NAV_H / 2 - navTTH / 2;

      const dissolve = easeInOut(state.scroll);

      // Full logo: fades out in first ~40% of scroll range
      const logoAlpha = state.entrance * Math.max(0, 1 - dissolve * 2.5);
      if (logoAlpha > 0.005) {
        ctx.globalAlpha = logoAlpha;
        ctx.drawImage(fullImg, 0, 0, SVG_W, SVG_H, logoX, logoY, logoW, logoH);
      }

      // White TT at nav: fades in during second half of scroll range
      const ttAlpha = state.entrance * Math.max(0, (dissolve - 0.35) / 0.65);
      if (ttAlpha > 0.005 && whiteTT) {
        ctx.globalAlpha = ttAlpha;
        ctx.drawImage(whiteTT, 0, 0, whiteTT.width, whiteTT.height, navTTX, navTTY, navTTW, navTTH);
      }

      ctx.restore();
    }

    // Load hero SVG + TT SVG in parallel, then set up animations
    void Promise.all([
      loadImg('/vivaTTerra-logo-hero.svg'),
      loadImg('/TT-logo-2f2840.svg'),
    ]).then(([heroImg, ttImg]) => {
      if (cancelled) return;
      fullImg = heroImg;
      whiteTT = prepareWhiteTT(ttImg);
      resize();

      void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([{ gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);

          const heroEl = document.querySelector('.hero-fs');
          if (!heroEl) return;

          gCtx = gsap.context(() => {
            // Entrance: fade full logo in
            gsap.to(state, {
              entrance: 1,
              duration: 1.3,
              delay: 0.4,
              ease: 'power3.out',
              onUpdate: draw,
            });

            // Scroll: morph full logo → white TT at nav
            ScrollTrigger.create({
              trigger: heroEl,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.3,
              onUpdate: (self) => {
                state.scroll = self.progress;
                draw();
              },
            });
          });
        },
      );
    }).catch(() => {
      // SVG load failed — canvas stays empty, DOM elements remain accessible
    });

    window.addEventListener('resize', resize);

    return () => {
      cancelled = true;
      document.body.classList.remove('hero-canvas-active');
      gCtx?.revert();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 98 }}
      aria-hidden="true"
    />
  );
}
