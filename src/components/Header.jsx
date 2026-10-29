import BrandIcon from './BrandIcon.jsx'

const HEADER_LOGOS = [
  { key: 'spacexai', name: 'SpaceXAI', img: '/assets/logos/spacexsi.jpg' },
  { key: 'x', name: 'X', icon: 'x' },
  { key: 'cursor', name: 'Cursor', icon: 'cursor' },
  { key: 'grok', name: 'Grok', img: '/assets/logos/grok-avatar.jpg' },
  { key: 'tesla', name: 'Tesla', icon: 'tesla', color: '#e82127' },
]

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top">
        <img src="/assets/logos/pumpkin-bot.png" alt="Pumpkin Bot by SpaceXAI" />
        <span className="bt">
          <b>Pumpkin Bot</b>
          <small>Halloween on X · by SpaceXAI</small>
        </span>
      </a>
      <nav className="logos">
        {HEADER_LOGOS.map((l) => (
          <a key={l.key} className="hl" href={`#${l.key}`} title={l.name}>
            <span className="hlc">
              {l.img ? <img src={l.img} alt={l.name} /> : <BrandIcon name={l.icon} color={l.color} />}
            </span>
            <span className="hln">{l.name}</span>
          </a>
        ))}
      </nav>
    </header>
  )
}
