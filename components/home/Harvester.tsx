'use client';

import { useEffect, useRef } from 'react';

// Frame sequence extracted from /public/video/Hands-behind.mp4 (24fps, 1280px).
const FRAME_COUNT = 164;
const FRAME_W = 1280;
const FRAME_H = 720;
const frameUrl = (i: number) =>
  `/frames/hands/hands-${String(i + 1).padStart(4, '0')}.jpg`;

export default function Harvester() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll-scrubbed image sequence — adapted from GSAP's imageSequenceScrub
  // helper (https://gsap.com/docs/v3/HelperFunctions/helpers/imageSequenceScrub/).
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = ref.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = FRAME_W;
    canvas.height = FRAME_H;

    const images: HTMLImageElement[] = [];
    const playhead = { frame: 0 };
    let curFrame = -1;

    const render = () => {
      const frame = Math.round(playhead.frame);
      if (frame === curFrame) return;
      const img = images[frame];
      if (img && img.complete) {
        ctx.drawImage(img, 0, 0, FRAME_W, FRAME_H);
        curFrame = frame;
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      if (i === 0) img.onload = render; // paint the first frame as soon as it loads
      images.push(img);
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let kill: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        if (reduce) {
          render();
          return;
        }
        const gctx = gsap.context(() => {
          gsap.to(playhead, {
            frame: FRAME_COUNT - 1,
            ease: 'none',
            onUpdate: render,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }, section);
        kill = () => gctx.revert();
      }
    );

    return () => kill?.();
  }, [ref]);

  return (
    <section ref={ref} className="harvester-section">
      <canvas
        ref={canvasRef}
        className="harvester-canvas"
        role="img"
        aria-label="The hands behind the harvest"
      />
      <div className="harvester-overlay">
        <div className="harvester-overlay-inner">
          <h2 className="harvester-title">The Hands Behind the Harvest</h2>
          <p className="harvester-attr">
            <strong>Carmen Pecha</strong> &mdash; Harvester, Tacana I Indigenous
            Territory, Bolivia
          </p>
          <p className="harvester-quote">
            Wild açaí has been part of life in this territory for generations.
            Carmen is one of the people who makes this supply chain possible.
          </p>
        </div>
      </div>
    </section>
  );
}
