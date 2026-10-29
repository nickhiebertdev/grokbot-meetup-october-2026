import PostCard from './PostCard.jsx'
import PumpkinDecor from './PumpkinDecor.jsx'

export default function CompanyRow({ company }) {
  const posts = company.posts.slice(0, 9)
  // 3 columns, posts dealt left-to-right so each column stacks up to 3 posts
  const cols = [[], [], []]
  posts.forEach((p, i) => cols[i % 3].push(p))
  return (
    <section className={`row row-${company.key}`} id={company.key}>
      <PumpkinDecor />
      <div className="row-inner">
        <div className="row-head">
          <span className={`badge b-${company.key}`}>
            <img src={company.logo} alt={`${company.name} logo`} />
          </span>
          <div>
            <h2>{company.name}</h2>
            <p>
              {company.subtitle} · {posts.length} Halloween post{posts.length !== 1 ? 's' : ''} ·{' '}
              {company.accounts.join(', ')}
            </p>
          </div>
        </div>
        <div className="cols">
          {cols.map((col, i) => (
            <div className="col" key={i}>
              {col.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
