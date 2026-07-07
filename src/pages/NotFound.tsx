import { Circle } from '../components/Circle';

export default function NotFound() {
  return (
    <main className="interior">
      <div className="rule" />

      <h1 className="center-statement" data-reveal="">
        This page didn't make the cut.
      </h1>

      <p className="callout" data-reveal="">
        The link you followed leads nowhere — but the path to college still does. Let's get you back on it.
      </p>

      <div className="section-cta">
        <Circle to="/">Back to the start</Circle>
      </div>
    </main>
  );
}
