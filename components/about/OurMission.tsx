'use client';

import type { ReactNode } from 'react';
import MissionMotion from './MissionMotion';
import { useI18n } from '@/lib/i18n';

/**
 * Our Mission — each section is a giant Poppins title anchored bottom-left with
 * its body text set top-right in Lato. Full-width color bands shift tone as you
 * scroll to ease the reader through the page.
 */

type Tone = 'cream' | 'sage' | 'clay' | 'forest' | 'ink';

function Row({
  index,
  title,
  tone,
  hero,
  bodyClass,
  children,
}: {
  index: string;
  title: ReactNode;
  tone: Tone;
  hero?: boolean;
  bodyClass?: string;
  children: ReactNode;
}) {
  const Title = hero ? 'h1' : 'h2';
  return (
    <section className={`mission-row tone-${tone}${hero ? ' mission-row--hero' : ''}`}>
      <div className="mission-row-inner">
        {/* Title first in the DOM so headings read in order; the grid areas place it visually. */}
        <Title className="mission-row-title">{title}</Title>
        <div className={`mission-row-body${bodyClass ? ` ${bodyClass}` : ''}`}>
          <span className="mission-row-index">{index}</span>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function OurMission() {
  const { lang, t, rich } = useI18n();

  return (
    // Keyed on language so MissionMotion re-splits and re-animates the new copy.
    <div className="mission" key={lang}>
      <MissionMotion />

      {/* ---------- HERO (giant-title format, dramatic dark open) ---------- */}
      <Row
        index={t('about.hero.index')}
        tone="ink"
        hero
        title={
          <>
            {t('about.hero.title')}{' '}
            <span className="title-sub">{t('about.hero.sub')}</span>
          </>
        }
      >
        <p>{t('about.hero.body')}</p>
      </Row>

      {/* ---------- BRIDGE ---------- */}
      <Row
        index=""
        tone="cream"
        title={
          <>
            {t('about.bridge.title')}{' '}
            <span className="title-sub">{t('about.bridge.sub')}</span>
          </>
        }
      >
        <p>{t('about.bridge.body')}</p>
      </Row>

      {/* ---------- ROWS ---------- */}
      <Row index="(01)" title={<span className="title-fit">{t('about.meaning.title')}</span>} tone="forest">
        <h3>{t('about.meaning.heading')}</h3>
        <p>{rich('about.meaning.p1')}</p>
        <p>{rich('about.meaning.p2')}</p>
        <p>{rich('about.meaning.p3')}</p>
      </Row>

      <Row index="(02)" title={t('about.work.title')} tone="sage">
        <h3>{t('about.work.heading')}</h3>
        <p>{t('about.work.body')}</p>
      </Row>

      <Row index="(03)" title={t('about.team.title')} tone="cream">
        <div className="people-grid">
          <article className="person-card">
            <div className="person-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Photo/founders/Fabrizio_profile_photo.webp" alt="Fabrizio Colombo Fiore" width={984} height={1025} loading="lazy" decoding="async" />
            </div>
            <h3 className="person-name">Fabrizio Colombo Fiore</h3>
            <p className="person-role">{t('about.team.role')}</p>
            <p className="person-creds">{t('about.team.fabrizio.creds')}</p>
            <p className="person-note">{t('about.team.fabrizio.quote')}</p>
          </article>

          <article className="person-card">
            <div className="person-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Photo/founders/Ammar-founder-photo.webp" alt="Ammar Sathar" width={900} height={900} loading="lazy" decoding="async" />
            </div>
            <h3 className="person-name">Ammar Sathar</h3>
            <p className="person-role">{t('about.team.role')}</p>
            <p className="person-creds">{t('about.team.ammar.creds')}</p>
          </article>
        </div>
      </Row>

      <Row index="(04)" title={t('about.problem.title')} tone="ink">
        <p>{t('about.problem.body')}</p>
      </Row>

      <Row
        index="(05)"
        title={
          <span className="title-long">
            <span>{t('about.agro.title1')}</span> <span>{t('about.agro.title2')}</span>{' '}
            <span>{t('about.agro.title3')}</span>
          </span>
        }
        tone="cream"
      >
        <p>{rich('about.agro.body')}</p>
        <figure className="row-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Photo/agroforestry-canopy.jpg"
            alt={t('about.agro.photoAlt')}
            width={768}
            height={1024}
            loading="lazy"
            draggable={false}
          />
        </figure>
      </Row>

      <Row index="(06)" title={t('about.question.title')} tone="clay" bodyClass="story-body">
        <p className="story-context">{t('about.question.p1')}</p>
        <p className="story-context">
          {t('about.question.p2')}
          <sup className="cite-ref">
            <a href="#cite-1" aria-label={t('about.question.ref', { n: 1 })}>1</a>{' '}
            <a href="#cite-2" aria-label={t('about.question.ref', { n: 2 })}>2</a>{' '}
            <a href="#cite-3" aria-label={t('about.question.ref', { n: 3 })}>3</a>
          </sup>
        </p>
        <p className="story-context">{t('about.question.p3')}</p>
        <p className="story-question">{rich('about.question.p4')}</p>
        <p className="story-insight">{t('about.question.p5')}</p>
        <p className="story-context">{t('about.question.p6')}</p>
        <p className="story-closing">{rich('about.question.p7')}</p>

        <ol className="citations">
          <li id="cite-1">
            {rich('about.cite1')}{' '}
            <a
              href="https://doi.org/10.1371/journal.pone.0033305"
              target="_blank"
              rel="noreferrer"
            >
              doi.org/10.1371/journal.pone.0033305
            </a>
          </li>
          <li id="cite-2">
            {rich('about.cite2')}{' '}
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/mercury-and-health"
              target="_blank"
              rel="noreferrer"
            >
              who.int
            </a>
          </li>
          <li id="cite-3">
            {rich('about.cite3')}{' '}
            <a
              href="https://www.cdc.gov/niosh/topics/mercury/default.html"
              target="_blank"
              rel="noreferrer"
            >
              cdc.gov
            </a>
          </li>
        </ol>
      </Row>

    </div>
  );
}
