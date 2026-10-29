function BotStrip({ bots }) {
  return (
    <div className="strip">
      {bots.map((b, i) => (
        <img
          key={i}
          src="/assets/logos/pumpkin-bot.png"
          alt=""
          style={{
            width: b.size,
            transform: `rotate(${b.rotate}deg)`,
            filter: `hue-rotate(${b.hue}deg) saturate(${b.saturate}) brightness(${b.brightness}) drop-shadow(0 3px 0 rgba(0,0,0,.25))`,
            marginBottom: b.lift,
          }}
        />
      ))}
    </div>
  )
}

export default function Footer({ bots }) {
  return (
    <footer className="site-footer">
      <div className="fwrap">
        <div className="fbrand">
          <img src="/assets/logos/pumpkin-bot.png" alt="" />
          <div>
            <b>Pumpkin Bot</b>
            <span>Happy Halloween from SpaceXAI · X · Cursor · Grok · Tesla</span>
          </div>
        </div>
        <p className="fnote">
          All posts are public posts on X, linked to their originals. Pumpkin Bot mascot from{' '}
          <a href="https://x.com/benjitaylor/status/2112218561091661922" target="_blank" rel="noopener">
            @benjitaylor's Pumpkin Bot post
          </a>
          . Logos belong to their owners.
        </p>
      </div>
      {/* Two identical strips side by side, scrolled left → right in a seamless loop */}
      <div className="bots" aria-hidden="true">
        <div className="track">
          <BotStrip bots={bots} />
          <BotStrip bots={bots} />
        </div>
      </div>
    </footer>
  )
}
