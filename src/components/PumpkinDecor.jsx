// Decorative pumpkin shapes drawn around each company row.

export function MiniPumpkin({ className, color = '#ff7a1a' }) {
  return (
    <svg className={`pk ${className}`} viewBox="0 0 120 110" aria-hidden="true">
      <path d="M58 22c-2-10 2-18 10-20l3 4c-6 3-7 9-6 16z" fill="#3c6b2a" />
      <ellipse cx="38" cy="64" rx="30" ry="40" fill={color} />
      <ellipse cx="82" cy="64" rx="30" ry="40" fill={color} />
      <ellipse cx="60" cy="64" rx="28" ry="43" fill={color} stroke="rgba(0,0,0,.12)" strokeWidth="2" />
    </svg>
  )
}

const MINIS = [
  ['p1', '#ff7a1a'],
  ['p2', '#ff9a2e'],
  ['p3', '#f26a0f'],
  ['p4', '#ffa53d'],
  ['p5', '#ff7a1a'],
  ['p6', '#f26a0f'],
]

export default function PumpkinDecor() {
  return (
    <>
      <div className="pumpkin-bg" aria-hidden="true">
        <svg className="lobes" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <ellipse cx="190" cy="300" rx="190" ry="296" />
          <ellipse cx="810" cy="300" rx="190" ry="296" />
          <ellipse cx="350" cy="300" rx="230" ry="300" />
          <ellipse cx="650" cy="300" rx="230" ry="300" />
          <ellipse className="mid" cx="500" cy="300" rx="260" ry="300" />
        </svg>
        <svg className="stem" viewBox="0 0 80 90">
          <path d="M30 90c0-30-6-60 14-86l14 8c-14 22-10 50-8 78z" fill="#3f6d26" />
          <path d="M50 30c12-14 26-14 30-6-10-2-18 2-26 12z" fill="#5c9a33" />
        </svg>
      </div>
      {MINIS.map(([cls, color]) => (
        <MiniPumpkin key={cls} className={cls} color={color} />
      ))}
    </>
  )
}
