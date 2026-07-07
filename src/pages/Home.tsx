import { Circle } from '../components/Circle';
import { IntroFloat } from '../components/IntroFloat';
import { TeamCard } from '../components/TeamCard';
import { TEAM } from '../data/team';

export default function Home() {
  return (
    <main>
      {/* INTRO — floating-tiles scroll story */}
      <IntroFloat />

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="rule rule--mt" />
        <div className="hero__lead">
          <div className="label">Start here</div>
          <p className="hero__blurb">
            The college application, demystified. Where to apply, how to apply, and how to write the essays that get you
            in. Free, and built for the first in their family. Para todos.
          </p>
        </div>
      </section>

      {/* FOUNDING TEAM */}
      <section className="team">
        <div className="rule" />
        <div className="team__head">
          <div className="label">Founding team</div>
          <p className="team__intro">
            Built by first-gen students who walked this road. Meet the people behind the plan.
          </p>
        </div>
        <div className="team__cards">
          {TEAM.map((m) => (
            <TeamCard key={m.slug} name={m.name} photo={m.photo} to={`/team/${m.slug}`} tilt={m.tilt} />
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="strip">
        <div className="rule" />
        <div className="strip__grid">
          <div className="label">Built around</div>
          <div className="strip__logos">
            <span>QuestBridge</span>
            <span>Common App</span>
            <span>UC Application</span>
            <span>Coalition</span>
            <span>ApplyTexas</span>
            <span>CBCA</span>
          </div>
        </div>
        <div className="rule" />
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="manifesto__grid">
          <div className="label">Manifesto</div>
          <div className="vrule" />
          <div className="manifesto__lines">
            <div data-reveal="">They never said you couldn't. They just never showed you how.</div>
            <div data-reveal="">
              There's a rulebook for getting in. Some kids get it at the dinner table — we never did.
            </div>
            <div data-reveal="">We weren't underqualified. We were uninformed.</div>
            <div data-reveal="">
              You've read systems nobody explained your whole life. That's not the disadvantage. That's the skill.
            </div>
            <div data-reveal="">
              So we built the map we never got. Every essay, every list, every deadline. Free — help one, become one.
            </div>
          </div>
          <div />
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="cta">
        <div className="rule" />
        <div className="cta__inner">
          <h2 data-reveal="" className="cta__head">
            Let's make admission possible.
          </h2>
          <Circle to="/router" reveal>
            Start
          </Circle>
        </div>
        <div className="rule" />
      </section>
    </main>
  );
}
