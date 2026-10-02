/** Definición SVG del avatar de Saul (león tecnológico en escudo). Se monta una vez en el layout. */
export function LionDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="1.4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <linearGradient id="lmetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#eef0f2" /><stop offset=".45" stopColor="#9ea3aa" /><stop offset=".6" stopColor="#5d6168" /><stop offset="1" stopColor="#c3c7cc" /></linearGradient>
        <linearGradient id="lmane" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff3a22" /><stop offset=".5" stopColor="#a3140c" /><stop offset="1" stopColor="#3a0604" /></linearGradient>
        <symbol id="lion" viewBox="0 0 120 120">
          <path d="M60 4 104 20 104 62C104 88 84 106 60 116 36 106 16 88 16 62L16 20Z" fill="#0a0a0c" stroke="url(#lmetal)" strokeWidth="3" />
          <path d="M60 11 97 25 97 62C97 84 80 99 60 108 40 99 23 84 23 62L23 25Z" fill="none" stroke="#e3261b" strokeWidth="1.2" opacity=".75" />
          <g stroke="#0a0a0c" strokeWidth=".8" strokeLinejoin="round">
            <path d="M60 18 70 26 82 22 84 35 95 40 89 51 96 62 86 68 88 81 76 82 70 94 60 88 50 94 44 82 32 81 34 68 24 62 31 51 25 40 36 35 38 22 50 26Z" fill="url(#lmane)" />
            <path d="M60 18 70 26 60 32 50 26Z" fill="#ff4a2e" /><path d="M82 22 84 35 74 34 70 26Z" fill="#d1200f" /><path d="M38 22 50 26 46 34 36 35Z" fill="#d1200f" />
            <path d="M95 40 89 51 82 46 84 35Z" fill="#9b140b" /><path d="M25 40 36 35 38 46 31 51Z" fill="#9b140b" />
            <path d="M96 62 86 68 84 58 89 51Z" fill="#6a0d07" /><path d="M24 62 31 51 36 58 34 68Z" fill="#6a0d07" />
            <path d="M88 81 76 82 78 72 86 68Z" fill="#4a0805" /><path d="M32 81 34 68 42 72 44 82Z" fill="#4a0805" />
          </g>
          <path d="M41 33 46 26 50 36Z" fill="#2a2c31" stroke="url(#lmetal)" strokeWidth=".8" /><path d="M79 33 74 26 70 36Z" fill="#2a2c31" stroke="url(#lmetal)" strokeWidth=".8" />
          <path d="M60 30 74 35 81 50 76 68 68 80 60 84 52 80 44 68 39 50 46 35Z" fill="url(#lmetal)" />
          <path d="M60 30 74 35 66 50 60 44Z" fill="#f4f5f6" opacity=".55" /><path d="M60 30 46 35 54 50 60 44Z" fill="#fff" opacity=".35" />
          <path d="M39 50 54 50 50 64 44 68Z" fill="#7d8188" opacity=".7" /><path d="M81 50 66 50 70 64 76 68Z" fill="#5a5e65" opacity=".8" />
          <path d="M44 68 50 64 56 72 52 80Z" fill="#878b92" opacity=".6" /><path d="M76 68 70 64 64 72 68 80Z" fill="#4c5056" opacity=".8" />
          <path d="M42 49 56 51 55 54 44 53Z" fill="#141518" /><path d="M78 49 64 51 65 54 76 53Z" fill="#141518" />
          <path className="eye" d="M45 54 55 55.5 53.5 59 47 58Z" /><path className="eye" d="M75 54 65 55.5 66.5 59 73 58Z" />
          <path d="M60 50 64 64 60 66 56 64Z" fill="#c9ccd1" opacity=".9" /><path d="M53 66 67 66 60 74Z" fill="#141518" />
          <path d="M60 74 60 78M52 81 60 78 68 81" stroke="#141518" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 86 60 100" stroke="#e3261b" strokeWidth="1.5" /><circle cx="60" cy="101" r="1.8" fill="#ff4027" />
        </symbol>
      </defs>
    </svg>
  );
}

export const Lion = ({ size }: { size?: number }) => (
  <svg className="lion" width={size} height={size} aria-hidden="true"><use href="#lion" /></svg>
);
