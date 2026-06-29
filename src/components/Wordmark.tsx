interface WordmarkProps {
  white?: boolean;
  large?: boolean;
}

// "(Ad)mission Possible" — "(Ad)" in electric blue, rest in ink (or white).
export function Wordmark({ white, large }: WordmarkProps) {
  const cls = 'wordmark' + (white ? ' wordmark--white' : '') + (large ? ' wordmark--lg' : '');
  return (
    <div className={cls}>
      <span className="accent">(Ad)</span>mission Possible
    </div>
  );
}
