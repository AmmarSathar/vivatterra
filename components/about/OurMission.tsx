import type { ReactNode } from 'react';
import MissionMotion from './MissionMotion';

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
  children,
}: {
  index: string;
  title: ReactNode;
  tone: Tone;
  hero?: boolean;
  children: ReactNode;
}) {
  const Title = hero ? 'h1' : 'h2';
  return (
    <section className={`mission-row tone-${tone}${hero ? ' mission-row--hero' : ''}`}>
      <div className="mission-row-inner">
        <div className="mission-row-body">
          <span className="mission-row-index">{index}</span>
          {children}
        </div>
        <Title className="mission-row-title">{title}</Title>
      </div>
    </section>
  );
}

export default function OurMission() {
  return (
    <div className="mission">
      <MissionMotion />

      {/* ---------- HERO (giant-title format, dramatic dark open) ---------- */}
      <Row
        index="Our Mission"
        tone="ink"
        hero
        title={
          <>
            If you&apos;re here, your attention matters.{' '}
            <span className="title-sub">Let&apos;s talk about why.</span>
          </>
        }
      >
        <p>
          Understanding VivaTTerra begins with a pause; a moment to reflect on how our
          attention, choices, and the economic systems that shape our living world.
        </p>
      </Row>

      {/* ---------- BRIDGE ---------- */}
      <Row
        index=""
        tone="cream"
        title={
          <>
            Agroforestry just makes sense.{' '}
            <span className="title-sub">Think about it.</span>
          </>
        }
      >
        <p>
          Land where trees, food, and local livelihoods are flourishing because the
          ecosystem and economy are working together.
        </p>
      </Row>

      {/* ---------- ROWS ---------- */}
      <Row index="(01)" title={<span className="title-fit">Meaning behind &lsquo;VivaTTerra&rsquo;</span>} tone="forest">
        <h3>VivaTTerra… what does this mean?</h3>
        <p>
          The name is rooted in Latin; <em>vivat</em>, meaning &ldquo;long live&rdquo; or
          &ldquo;may it live,&rdquo; and <em>terra</em>, meaning &ldquo;earth,&rdquo;
          &ldquo;land,&rdquo; or &ldquo;soil.&rdquo; Jointly, it means{' '}
          <em>let the land live</em>.
        </p>
        <p>
          The meaning holds deep significance for VivaTTerra, acting as the operating
          principle behind every sourcing decision, every supplier relationship, and every
          product we bring to market.
        </p>
        <p>
          The double <strong>TT</strong> is symbolic of grafting, a horticultural technique
          in which two plant stems are joined so they grow as one. A symbol of mutual
          flourishing, it reflects the ethos of VivaTTerra. Natural land is both an
          ecosystem and an economy: producers sustain the land that makes these foods
          possible, while consumer choices help sustain the people and practices that keep
          it healthy.
        </p>
      </Row>

      <Row index="(02)" title="Our work" tone="sage">
        <h3>Relationships first, expansion second.</h3>
        <p>
          As a small, operationally focused team, we are bootstrapping the work to build
          the trust, partnerships, and product integrity needed for an innovative
          marketplace where healthy ecosystems and prosperous rural livelihoods reinforce
          one another through transparency, traceability, strong producer relationships,
          and more informed consumer choices.
        </p>
      </Row>

      <Row index="(03)" title="The Problem" tone="ink">
        <p>
          When land is treated primarily as a resource for extraction, supply chains
          become organized around volume, price, and standardization, rewarding maximum
          output at minimum cost. The result: producers end up with no agency, and
          consumers are disconnected from the systems behind their purchase.
        </p>
      </Row>

      <Row index="(04)" title="Agroforestry benefits" tone="cream">
        <p>
          Agroforestry produces food while revitalizing the natural systems of the land;
          building healthier soils, storing carbon, protecting water, supporting
          biodiversity, and making landscapes more resilient to drought, heat, and
          erosion.
        </p>
      </Row>

      <Row index="(05)" title="The Question That Started VivaTTerra" tone="clay">
        <p>
          My name is Fabrizio, and VivaTTerra grew from an interest in turning overlooked
          ecological and economic value into viable, resilient market opportunities.
        </p>
        <p>
          The idea began in 2022 while I was conducting research in Madre de Dios, in the
          Peruvian Amazon. There, small-scale gold mining is an important source of income
          for many families, yet the use of mercury in extraction contaminates surrounding
          soils, waterways, and food systems. Research in the region has found elevated
          mercury exposure among communities living near mining areas.
          <sup className="cite-ref">
            <a href="#cite-1" aria-label="Reference 1">1</a>{' '}
            <a href="#cite-2" aria-label="Reference 2">2</a>{' '}
            <a href="#cite-3" aria-label="Reference 3">3</a>
          </sup>
        </p>
        <p>
          At the same time, I saw the extraordinary abundance of the forest: fruits, nuts,
          oils, medicinal plants, fibers, and other resources capable of supporting local
          livelihoods without requiring the land to be cleared.
        </p>
        <p>
          That raised a simple question:{' '}
          <strong>
            if the land is so rich, why are the strongest economic incentives still tied to
            its extraction?
          </strong>
        </p>
        <p>
          The problem is not a lack of resources or entrepreneurship. It is that markets for
          many forest products remain fragmented and too limited to compete with established
          extractive industries. VivaTTerra was created around the belief that markets can
          instead reward stewardship &mdash; making standing, productive ecosystems
          economically valuable to the people who depend on them.
        </p>
        <p>
          In late 2025, I was introduced to Samay O2 &ndash; Amazon Recovery, a non-profit
          supporting the conservation of land through agroforestry systems and the
          processing infrastructure that supports them. Thanks to Samay O2, we are able to
          offer 100% pure a&ccedil;a&iacute; powder as our inaugural offering.
        </p>
        <p>
          <strong>A&ccedil;a&iacute; is just the beginning.</strong> The broader vision is a
          marketplace for products that increase the economic value of living landscapes,
          creating a positive feedback loop between the wellbeing of local communities and
          the ecosystems they call home.
        </p>

        <ol className="citations">
          <li id="cite-1">
            Ashe, K. (2012). Elevated mercury concentrations in humans of Madre de
            Dios, Peru. <em>PLoS ONE</em>, 7(3), e33305.{' '}
            <a
              href="https://doi.org/10.1371/journal.pone.0033305"
              target="_blank"
              rel="noreferrer"
            >
              doi.org/10.1371/journal.pone.0033305
            </a>
          </li>
          <li id="cite-2">
            World Health Organization. <em>Mercury and Health.</em>{' '}
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/mercury-and-health"
              target="_blank"
              rel="noreferrer"
            >
              who.int
            </a>
          </li>
          <li id="cite-3">
            Centers for Disease Control and Prevention.{' '}
            <em>Mercury Exposure and Health Effects.</em>{' '}
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

      <Row index="(06)" title="Meet the team" tone="sage">
        <div className="people-grid">
          <article className="person-card">
            <div className="person-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Photo/founders/Fabrizio_profile_photo.webp" alt="Fabrizio Colombo Fiore" />
            </div>
            <h4 className="person-name">Fabrizio Colombo Fiore</h4>
            <p className="person-role">Co-Founder</p>
            <p className="person-creds">
              B.Sc. Agricultural &amp; Environmental Economics (McGill) · M.Sc.
              Energy &amp; Climate Change Economics and Sustainable Finance
              (Barcelona School of Economics)
            </p>
            <p className="person-note">
              &ldquo;Mindfulness shapes how I relate with the world; informing how I think,
              make decisions, and take action.&rdquo;
            </p>
          </article>

          <article className="person-card">
            <div className="person-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Photo/founders/Ammar-founder-photo.webp" alt="Ammar Sathar" />
            </div>
            <h4 className="person-name">Ammar Sathar</h4>
            <p className="person-role">Co-Founder</p>
            <p className="person-creds">
              B.Eng. Electrical Engineering (Concordia) · Embedded Software Developer
            </p>
          </article>
        </div>
      </Row>

    </div>
  );
}
