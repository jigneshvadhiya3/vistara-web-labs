import wordmark from '../assets/logo-dark.webp';
import mark from '../assets/v-mark.webp';

/** Full Vistara Web Labs wordmark (light-on-dark version). */
export default function Logo({ height = 40, className }) {
  return (
    <img
      src={wordmark}
      alt="Vistara Web Labs"
      height={height}
      width={Math.round(height * (511 / 150))}
      className={className}
      style={{ height, width: 'auto' }}
      decoding="async"
    />
  );
}

/** The V mark on its own. */
export function Mark({ size = 40, className }) {
  return <img src={mark} alt="" aria-hidden="true" width={size} height={size} className={className} style={{ width: size, height: 'auto' }} decoding="async" />;
}
