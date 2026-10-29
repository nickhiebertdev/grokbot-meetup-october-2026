# Converts the X API data captured for the static page into src/data/posts.json
import json, re, os, glob, html, random, importlib.util
from datetime import datetime
SRC='/workspace/pumpkin-bot'; OUT='/workspace/pumpkin-bot-react'
spec=importlib.util.spec_from_file_location('b',f'{SRC}/data/build.py')
# reuse company config + lookups without re-running page writing side effects being an issue (it rewrites identical index.html)
b=importlib.util.module_from_spec(spec); spec.loader.exec_module(b)
posts,users,media=b.posts,b.users,b.media

def segs(p, strip=False):
    nt=p.get('note_tweet'); text=nt['text'] if nt else p['text']
    urlmap={}
    for u in ((nt or {}).get('entities',{}).get('urls') or [])+(p.get('entities',{}).get('urls') or []): urlmap[u['url']]=u
    lead=[]
    if strip:
        m=re.match(r'^((?:@\w+\s+)+)',text)
        if m: lead=re.findall(r'@(\w+)',m.group(1)); text=text[m.end():]
    out=[]
    for tok in re.split(r'(https://t\.co/\w+|@\w+|#\w+)',text):
        if not tok: continue
        if tok.startswith('https://t.co/'):
            u=urlmap.get(tok)
            if u is None: continue
            exp=u.get('expanded_url','')
            if u.get('media_key') or re.search(r'x\.com/\w+/status/\d+/(photo|video)',exp) or '/i/article/' in exp: continue
            if re.search(r'(twitter|x)\.com/\w+/status/\d+',exp) and any(r['type']=='quoted' for r in p.get('referenced_tweets') or []): continue
            out.append({'t':'link','v':u.get('display_url',exp),'href':exp})
        elif tok.startswith('@'): out.append({'t':'mention','v':tok,'href':f'https://x.com/{tok[1:]}'})
        elif tok.startswith('#'): out.append({'t':'mention','v':tok,'href':f'https://x.com/hashtag/{tok[1:]}'})
        else: out.append({'t':'text','v':html.unescape(tok)})
    # trim whitespace at ends
    if out and out[0]['t']=='text': out[0]['v']=out[0]['v'].lstrip()
    if out and out[-1]['t']=='text': out[-1]['v']=out[-1]['v'].rstrip()
    out=[s for s in out if s['v']]
    return out, lead

def mfile(mk):
    fs=glob.glob(f'{SRC}/assets/media/{mk}.*')
    return '/assets/media/'+os.path.basename(fs[0]) if fs else (media.get(mk,{}).get('url') or media.get(mk,{}).get('preview_image_url'))
def mediaList(p):
    res=[]
    for k in p.get('attachments',{}).get('media_keys',[])[:4]:
        if k not in media and not glob.glob(f'{SRC}/assets/media/{k}.*'): continue
        m=media.get(k,{}); res.append({'type':m.get('type','photo'),'src':mfile(k),'alt':m.get('alt_text') or 'Post media'})
    return res
def author(u):
    fs=glob.glob(f"{SRC}/assets/avatars/{u['username']}.*")
    return {'name':u['name'],'username':u['username'],'avatar':'/assets/avatars/'+os.path.basename(fs[0]),'verified':u.get('verified_type') in ('business','government')}

def post(pid):
    p=posts[pid]; u=users[p['author_id']]
    is_reply=any(r['type']=='replied_to' for r in p.get('referenced_tweets') or [])
    s,lead=segs(p,is_reply)
    pm=p.get('public_metrics',{})
    o={'id':pid,'url':f"https://x.com/{u['username']}/status/{pid}",'author':author(u),
       'date':datetime.strptime(p['created_at'][:10],'%Y-%m-%d').strftime('%b %-d, %Y'),'createdAt':p['created_at'],
       'isReply':is_reply,'replyingTo':lead,'text':s,'media':mediaList(p),
       'metrics':{'replies':pm.get('reply_count'),'reposts':pm.get('retweet_count',pm.get('repost_count')),'likes':pm.get('like_count'),'views':pm.get('impression_count')}}
    a=p.get('article')
    if a:
        cm=a.get('cover_media')
        o['article']={'title':a.get('title',''),'preview':re.sub(r'\s+',' ',a.get('preview_text',''))[:150],'cover':mfile(cm) if cm and glob.glob(f'{SRC}/assets/media/{cm}.*') else None}
    for r in p.get('referenced_tweets') or []:
        if r['type']=='quoted' and r['id'] in posts:
            qp=posts[r['id']]; qu=users.get(qp.get('author_id'))
            qs,_=segs(qp)
            o['quote']={'url':f"https://x.com/{qu['username'] if qu else 'i'}/status/{qp['id']}",'author':{'name':qu['name'],'username':qu['username']} if qu else None,'text':qs,'media':mediaList(qp)}
    return o

logos={'spacexai':'/assets/logos/spacexsi.jpg','x':'/assets/logos/x.svg','cursor':'/assets/logos/cursor.svg','grok':'/assets/logos/grok-avatar.jpg','tesla':'/assets/logos/tesla.svg'}
companies=[]
for key,name,sub,logo,ids in b.COMPANIES:
    ids=ids[:9]
    companies.append({'key':key,'name':name,'subtitle':sub,'logo':logos[key],
      'accounts':sorted({'@'+users[posts[i]['author_id']]['username'] for i in ids}),'posts':[post(i) for i in ids]})

# footer strip — same seeded layout as the static page
random.seed(31); bots=[]; x=0
colors=[0,0,0,0,-12,12,22,-20,0,8]
while x<1440:
    sz=random.choice([34,42,50,58,66,78,90]); rot=random.randint(-22,22); hue=random.choice(colors); y=random.randint(0,18)
    sat=random.choice([1,1,1.15,0.9]); bri=random.choice([1,1,1.08,0.92])
    bots.append({'size':sz,'rotate':rot,'hue':hue,'saturate':sat,'brightness':bri,'lift':y}); x+=sz+random.randint(14,30)
json.dump({'companies':companies,'footerBots':bots},open(f'{OUT}/src/data/posts.json','w'),indent=1,ensure_ascii=False)
print(sum(len(c['posts']) for c in companies),'posts',len(bots),'bots')
