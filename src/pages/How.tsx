import { Fragment } from 'react';
import { Circle } from '../components/Circle';
import { Crumbs } from '../components/Crumbs';
import { navCrumbs } from '../data/nav';
import { Icon } from '../components/Icon';
import { Slash } from '../components/Slash';
import type { IconName } from '../types';

const STEPS: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'route', title: 'Route', desc: 'Answer a few questions. We map your situation and your path.' },
  { icon: 'write', title: 'Learn & write', desc: 'Produce-as-you-learn modules turn your story into essays.' },
  { icon: 'list', title: 'Build your list', desc: 'A balanced college list across fit and finances.' },
  { icon: 'apply', title: 'Apply', desc: 'We route you to QuestBridge, UC, Common App, and more.' },
  { icon: 'submit', title: 'Submit', desc: 'Deadlines, drafts, and next steps in one calm place.' },
];

export default function How() {
  return (
    <main className="interior">
      <div className="rule" />
      <Crumbs crumbs={navCrumbs('how')} />
      <div className="rule" />

      <div className="page-intro">
        <h1 className="page-intro__title" data-reveal="">
          How it works
        </h1>
        <p className="page-intro__lede" data-reveal="">
          Five steps from where you are to where you're going. Answer a few questions, and we map the rest with you.
        </p>
      </div>

      {/* Each step is preceded by a slash divider (5 slashes, no trailing). */}
      <div className="how__track">
        {STEPS.map((s) => (
          <Fragment key={s.title}>
            <Slash variant="how" animated />
            <div className="how__step">
              <Icon name={s.icon} className="step-icon" />
              <div data-reveal="" className="how__step-title">
                {s.title}
              </div>
              <div className="how__step-desc">{s.desc}</div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="how__foot">
        <div className="label">Our process</div>
        <div />
      </div>
      <div className="rule rule--mt-sm" />

      <div className="section-cta">
        <Circle to="/router">Get my plan</Circle>
      </div>
    </main>
  );
}
