import paths from './brandPaths.js'

export default function BrandIcon({ name, color = '#fff' }) {
  const p = paths[name]
  if (!p) return null
  return (
    <svg fill={color} role="img" viewBox={p.viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {p.d.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
