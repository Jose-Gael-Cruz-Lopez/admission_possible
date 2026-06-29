import { useRef, useState } from 'react';
import { Circle } from '../components/Circle';
import { Crumbs, navCrumbs } from '../components/Crumbs';

export default function Join() {
  const [label, setLabel] = useState('Join');
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formRef.current?.reset();
    setLabel('Thanks');
    window.setTimeout(() => setLabel('Join'), 1800);
  };

  return (
    <main className="interior">
      <div className="rule" />
      <Crumbs crumbs={navCrumbs('join')} />
      <div className="rule rule--mb" />

      <div className="join__wrap">
        <form className="join__card" onSubmit={onSubmit} noValidate ref={formRef}>
          <div className="join__row3">
            <div className="field">
              <label htmlFor="first">First name</label>
              <input id="first" type="text" name="first" />
            </div>
            <div className="vrule" />
            <div className="field">
              <label htmlFor="last">Last name</label>
              <input id="last" type="text" name="last" />
            </div>
            <div className="vrule" />
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" />
            </div>
          </div>
          <div className="field field--mt">
            <label htmlFor="grade">Grade level</label>
            <input id="grade" type="text" name="grade" placeholder="e.g. 11th grade" />
          </div>
          <div className="field field--mt">
            <label htmlFor="needs">What do you need help with?</label>
            <textarea id="needs" name="needs" rows={3} />
          </div>
          <Circle size="join" type="submit">
            {label}
          </Circle>
        </form>
      </div>
      <div className="join__email">hello@admissionpossible.org</div>
    </main>
  );
}
