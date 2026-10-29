# Full-page 1440px screenshot of the built site (run `npm run preview` first).
import sys
from playwright.sync_api import sync_playwright
url = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/'
out = sys.argv[2] if len(sys.argv) > 2 else 'screenshot.png'
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.goto(url); pg.wait_for_load_state('networkidle')
    pg.add_style_tag(content='.track,.brand img{animation:none!important}')
    pg.evaluate('document.fonts.ready')
    pg.wait_for_timeout(800)
    print(pg.evaluate('document.documentElement.scrollWidth'), pg.evaluate('document.documentElement.scrollHeight'))
    print('broken', pg.evaluate('[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)'))
    print('cards', pg.evaluate('document.querySelectorAll(".card").length'))
    pg.screenshot(path=out, full_page=True)
    b.close()
