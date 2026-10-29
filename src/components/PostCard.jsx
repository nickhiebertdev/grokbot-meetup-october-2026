const ext = { target: '_blank', rel: 'noopener' }

function num(n) {
  if (n === null || n === undefined) return ''
  if (n >= 1_000_000) return `${(n / 1e6).toFixed(1)}M`.replace('.0M', 'M')
  if (n >= 1000) return `${(n / 1e3).toFixed(1)}K`.replace('.0K', 'K')
  return String(n)
}

/** Renders text segments; inside quotes (already a link) mentions become spans. */
function RichText({ segments, links = true }) {
  return segments.map((s, i) => {
    const parts = s.v.split('\n')
    const content = parts.flatMap((part, j) => (j ? [<br key={`b${j}`} />, part] : [part]))
    if (s.t === 'text') return <span key={i}>{content}</span>
    const cls = s.t === 'mention' ? 'mention' : 'lnk'
    return links ? (
      <a key={i} className={s.t === 'mention' ? 'mention' : undefined} href={s.href} {...ext}>
        {content}
      </a>
    ) : (
      <span key={i} className={cls}>
        {content}
      </span>
    )
  })
}

const PlayBadge = () => (
  <>
    <span className="play">
      <svg viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
    <span className="mtype">VIDEO</span>
  </>
)

function Media({ items, href, links = true }) {
  if (!items?.length) return null
  const n = Math.min(items.length, 4)
  return (
    <div className={`media n${n}`}>
      {items.slice(0, 4).map((m, i) => {
        const inner = (
          <>
            <img src={m.src} alt={m.alt} />
            {m.type === 'video' && <PlayBadge />}
            {m.type === 'animated_gif' && <span className="mtype">GIF</span>}
          </>
        )
        return links ? (
          <a key={i} className="m" href={href} {...ext}>
            {inner}
          </a>
        ) : (
          <div key={i} className="m">
            {inner}
          </div>
        )
      })}
    </div>
  )
}

function Quote({ quote }) {
  if (!quote) return null
  return (
    <a className="quote" href={quote.url} {...ext}>
      <div className="qh">
        {quote.author ? (
          <>
            <b>{quote.author.name}</b> <span>@{quote.author.username}</span>
          </>
        ) : (
          <b>Quoted post</b>
        )}
      </div>
      <div className="qt">
        <RichText segments={quote.text} links={false} />
      </div>
      <Media items={quote.media} href={quote.url} links={false} />
    </a>
  )
}

function Article({ article, href }) {
  if (!article) return null
  return (
    <a className="article" href={href} {...ext}>
      {article.cover && <img src={article.cover} alt="Article cover" />}
      <div className="ab">
        <span className="atag">ARTICLE</span>
        <b>{article.title}</b>
        <p>{article.preview}…</p>
      </div>
    </a>
  )
}

const ICONS = {
  reply: (
    <path
      d="M1.75 10c0-4.42 3.58-8 8-8h4.37c4.48 0 8.13 3.64 8.13 8.13 0 2.96-1.6 5.68-4.19 7.11l-8.06 4.46v-3.69h-.07c-4.49.1-8.18-3.51-8.18-8.01z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  ),
  rt: (
    <path
      d="M4.5 3.88l4.43 4.14-1.37 1.46L5.5 7.55V16c0 1.1.9 2 2 2H13v2H7.5c-2.21 0-4-1.79-4-4V7.55L1.44 9.48.07 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.21 0 4 1.79 4 4v8.45l2.06-1.93 1.37 1.46-4.43 4.14-4.43-4.14 1.37-1.46 2.06 1.93V8c0-1.1-.9-2-2-2z"
      fill="currentColor"
    />
  ),
  like: (
    <path
      d="M12 21.6s-9-5.2-9-11.6A5 5 0 0 1 12 6.9 5 5 0 0 1 21 10c0 6.4-9 11.6-9 11.6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  ),
  view: <path d="M3 21V11h3v10H3zm6 0V3h3v18H9zm6 0V8h3v13h-3z" fill="currentColor" />,
}
const Icon = ({ k }) => <svg viewBox="0 0 24 24">{ICONS[k]}</svg>

const Verified = () => (
  <svg className="vf" viewBox="0 0 22 22">
    <path
      fill="#e2b719"
      d="M20.4 11c0-1.3-.8-2.4-1.9-2.9.3-1.2 0-2.6-.9-3.5-.9-.9-2.3-1.2-3.5-.9C13.6 2.6 12.4 1.8 11 1.8s-2.6.8-3.1 1.9c-1.2-.3-2.6 0-3.5.9-.9.9-1.2 2.3-.9 3.5C2.4 8.6 1.6 9.7 1.6 11s.8 2.4 1.9 2.9c-.3 1.2 0 2.6.9 3.5.9.9 2.3 1.2 3.5.9.5 1.1 1.7 1.9 3.1 1.9s2.6-.8 3.1-1.9c1.2.3 2.6 0 3.5-.9.9-.9 1.2-2.3.9-3.5 1.1-.5 1.9-1.6 1.9-2.9z"
    />
    <path fill="#fff" d="M9.6 15.1 6 11.5l1.4-1.4 2.2 2.2 5-5 1.4 1.4z" />
  </svg>
)

const XMark = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M18.9 1.2h3.7l-8 9.2 9.4 12.4h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.2H4.3l13.3 17.4z"
    />
  </svg>
)

export default function PostCard({ post }) {
  const { author, url, metrics: m } = post
  const profile = `https://x.com/${author.username}`
  const plainLen = post.text.reduce((n, s) => n + s.v.length, 0)
  const long = plainLen > 420
  const lead = post.replyingTo || []

  return (
    <article className="card">
      <header className="ch">
        <a href={profile} {...ext}>
          <img className="av" src={author.avatar} alt={author.name} />
        </a>
        <div className="who">
          <a className="nm" href={profile} {...ext}>
            {author.name}
            {author.verified && <Verified />}
          </a>
          <span className="hd">
            @{author.username} · {post.date}
          </span>
        </div>
        <a className="xl" href={url} {...ext} title="Open on X">
          <XMark />
        </a>
      </header>

      {lead.length > 0 ? (
        <div className="replying">
          Replying to{' '}
          {lead.slice(0, 2).map((h, i) => (
            <span key={h}>
              {i > 0 && ' '}
              <a className="mention" href={`https://x.com/${h}`} {...ext}>
                @{h}
              </a>
            </span>
          ))}
          {lead.length > 2 && ` +${lead.length - 2}`}
        </div>
      ) : (
        post.isReply && <div className="replying">Reply in thread</div>
      )}

      {post.text.length > 0 && (
        <>
          <div className={`text${long ? ' long' : ''}`}>
            <RichText segments={post.text} />
          </div>
          {long && (
            <a className="more" href={url} {...ext}>
              Read the full post on X
            </a>
          )}
        </>
      )}

      <Media items={post.media} href={url} />
      <Article article={post.article} href={url} />
      <Quote quote={post.quote} />

      <footer className="cf">
        <div className="metrics">
          <span>
            <Icon k="reply" />
            {num(m.replies)}
          </span>
          <span>
            <Icon k="rt" />
            {num(m.reposts)}
          </span>
          <span>
            <Icon k="like" />
            {num(m.likes)}
          </span>
          {m.views ? (
            <span>
              <Icon k="view" />
              {num(m.views)}
            </span>
          ) : null}
        </div>
        <a className="view" href={url} {...ext}>
          View on X →
        </a>
      </footer>
    </article>
  )
}
