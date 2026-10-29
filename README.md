# grokbot-meetup-october-2026

🎃 **Pumpkin Bot: Halloween on X** — the meetup site. A static, 1440px-wide landing page of real Halloween posts from SpaceXAI, X, Cursor, Grok and Tesla people and official accounts on X.

Built with **React 18 + Vite**. Everything is static (post data in `src/data/posts.json`, images in `public/assets/`), so the page makes no calls to the X API at runtime.

## Project layout

```
index.html                 Vite entry
netlify.toml               Netlify build + publish settings
public/assets/             avatars, post media, logos, fonts (served as /assets/...)
scripts/export_posts.py    regenerates src/data/posts.json from the raw X API dumps
src/
  main.jsx, App.jsx, styles.css
  data/posts.json          38 posts grouped by company, plus the footer bot strip config
  components/
    Header.jsx             green 150px header: Pumpkin Bot logo + company logos
    CompanyRow.jsx         one row per company, 3 columns × up to 3 posts
    PumpkinDecor.jsx       pumpkin-shaped backdrop, stem, and mini pumpkins
    PostCard.jsx           text / image / video thumbnail / quote / article cards
    Footer.jsx             green footer with an endless left→right Pumpkin Bot strip
    BrandIcon.jsx, brandPaths.js   inline X / Cursor / Tesla marks
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs static site to dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Deploy to Netlify

`netlify.toml` already tells Netlify to run `npm run build` and publish `dist/` with Node 20. You can deploy in any of these three ways.

### 1. Drag and drop (no Git, no CLI)
1. Run `npm run build`, which creates `dist/`.
2. Go to https://app.netlify.com/drop, or open **Sites → Add new site → Deploy manually**.
3. Drag the `dist/` folder (or the contents of `pumpkin-bot-react-dist.zip`) onto the page. You get a `*.netlify.app` URL right away.

### 2. Connect a Git repo (auto-deploys on every push)
1. Push this folder to GitHub, GitLab, or Bitbucket. `node_modules` and `dist` are already ignored.
2. In Netlify, choose **Add new site → Import an existing project**, then pick the repo.
3. Netlify reads `netlify.toml` (build `npm run build`, publish `dist`), so just click **Deploy**.
4. From then on, every push to the main branch redeploys the site, and pull requests get preview URLs.

### 3. Netlify CLI
```bash
npm install
npm run build
npx netlify-cli login                       # one-time browser auth
npx netlify-cli deploy --dir=dist           # draft/preview URL
npx netlify-cli deploy --prod --dir=dist    # production
```
(If the CLI is installed globally, use `netlify deploy --prod --dir=dist`.)

Custom domain: in **Site settings → Domain management** you can add your domain. Netlify provisions HTTPS automatically.

## Updating posts
Edit `src/data/posts.json` directly, or regenerate it from the raw X API dumps with `python3 scripts/export_posts.py` (this needs the original `pumpkin-bot/data` folder). Put any new media files in `public/assets/media/`.

## Credits
All posts are public posts on X and link back to their originals. The Pumpkin Bot mascot comes from @benjitaylor's Pumpkin Bot post. Brand logos belong to their respective owners.
