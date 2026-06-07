'use client';

import { useEffect, useRef } from 'react';
import { TreePine } from 'lucide-react';

const ALL_VIDEOS = [
  '/video/10823026-hd_3840_2160_24fps.mp4',
  '/video/12114021-hd_1920_1080_30fps.mp4',
  '/video/12436802_3840_2160_60fps.mp4',
  '/video/13020377-hd_1920_1080_30fps.mp4',
  '/video/1327507-hd_1920_1080_30fps.mp4',
  '/video/13465525_1920_1080_60fps.mp4',
  '/video/13722896_2560_1440_60fps.mp4',
  '/video/15105578_3364_1440_24fps.mp4',
  '/video/17191112-uhd_3840_2160_24fps.mp4',
  '/video/4786571-hd_1920_1080_25fps.mp4',
  '/video/5152113-uhd_4096_2160_30fps.mp4',
];

const CLIP_DURATION_MS = 5000;
const FADE_MS = 800;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Hero() {
  const slotA    = useRef<HTMLVideoElement>(null);
  const slotB    = useRef<HTMLVideoElement>(null);
  const active   = useRef<0 | 1>(0);
  const idxRef   = useRef(0);
  const playlist = useRef<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wordRef  = useRef<HTMLImageElement>(null);
  const tagRef   = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let kill: (() => void) | undefined;
    void import('gsap').then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(wordRef.current,  { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', delay: 0.4 });
        gsap.fromTo(tagRef.current,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 1.05 });
        gsap.fromTo(arrowRef.current, { opacity: 0 }, {
          opacity: 1,
          duration: 0.6,
          ease: 'power1.out',
          delay: 1.9,
          onComplete: () => {
            gsap.to(arrowRef.current, { y: -10, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true });
          },
        });
      });
      kill = () => ctx.revert();
    });
    return () => kill?.();
  }, []);

  // Video carousel — 5 s per clip, randomized order
  useEffect(() => {
    const slots = [slotA, slotB];

    function playSlot(slot: 0 | 1, src: string) {
      const enterEl = slots[slot].current!;
      const exitEl  = slots[(1 - slot) as 0 | 1].current!;

      enterEl.src = src;
      enterEl.currentTime = 0;
      enterEl.load();
      enterEl.play().catch(() => {});

      // Crossfade
      requestAnimationFrame(() => {
        enterEl.style.opacity = '1';
        exitEl.style.opacity  = '0';
      });

      active.current = slot;

      // Schedule next clip after CLIP_DURATION_MS
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const nextIdx  = (idxRef.current + 1) % playlist.current.length;
        idxRef.current = nextIdx;
        playSlot((1 - slot) as 0 | 1, playlist.current[nextIdx]);
      }, CLIP_DURATION_MS);
    }

    // Shuffle on mount and start
    playlist.current = shuffle(ALL_VIDEOS);
    idxRef.current   = 0;
    playSlot(0, playlist.current[0]);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="hero-fs">

      {/* Background */}
      <div className="hero-fs-media" aria-hidden="true">
        <div className="hero-fs-gradient" />
        <video
          ref={slotA}
          className="hero-fs-video"
          muted
          playsInline
          preload="auto"
          style={{ opacity: 0, transition: `opacity ${FADE_MS}ms ease` }}
        />
        <video
          ref={slotB}
          className="hero-fs-video"
          muted
          playsInline
          preload="none"
          style={{ opacity: 0, transition: `opacity ${FADE_MS}ms ease` }}
        />
        <div className="hero-fs-overlay" />
      </div>

      {/* Centered wordmark */}
      <div className="hero-fs-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={wordRef}
          src="/vivaTTerra-logo-hero.svg"
          alt="vivaTTerra"
          className="hero-fs-logo"
          style={{ opacity: 0 }}
          draggable={false}
        />
        <p ref={tagRef} className="hero-fs-tagline" style={{ opacity: 0 }}>
          Gifts from living ecosystems.
        </p>
      </div>

      {/* Scroll cue */}
      <div ref={arrowRef} className="hero-fs-scroll-cue" style={{ opacity: 0 }} aria-hidden="true">
        <TreePine size={28} strokeWidth={1.25} style={{ transform: 'rotate(180deg)' }} />
      </div>

    </section>
  );
}
