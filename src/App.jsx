import data from './data/posts.json'
import Header from './components/Header.jsx'
import CompanyRow from './components/CompanyRow.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const total = data.companies.reduce((n, c) => n + c.posts.length, 0)
  return (
    <div className="page">
      <Header companies={data.companies} />
      <main className="body" id="top">
        <div className="intro">
          <h1>Spooky season on X <span>🎃</span></h1>
          <p>
            {total} real Halloween posts from the people and official accounts behind SpaceXAI, X, Cursor, Grok
            and Tesla. Click any card to open it on X.
          </p>
        </div>
        {data.companies.map((c) => (
          <CompanyRow key={c.key} company={c} />
        ))}
      </main>
      <Footer bots={data.footerBots} />
    </div>
  )
}
