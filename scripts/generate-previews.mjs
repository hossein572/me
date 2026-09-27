// Original, local preview artwork. No remote images or runtime rendering needed.
import { chromium as playwright } from 'playwright'
import chromium from '@sparticuz/chromium'
import sharp from 'sharp'
import { readFile } from 'node:fs/promises'

const font = (
  await readFile(
    'node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-latin-wght-normal.woff2',
  )
).toString('base64')
const base = `<style>@font-face{font-family:V;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;font-family:V,Arial,sans-serif;width:900px;height:640px;overflow:hidden;color:#263043}h1,h2,h3,p{margin:0}button{font-family:inherit;border:0}.stage{width:900px;height:640px;position:relative;overflow:hidden}.browser{position:absolute;background:white;border-radius:13px;box-shadow:0 30px 70px #33335318;overflow:hidden;border:1px solid #ffffffd0}.bar{height:29px;display:flex;align-items:center;padding:0 13px;gap:5px;border-bottom:1px solid #f0f0f7;background:#ffffff}.bar i{height:5px;width:5px;background:#e2e1e8;border-radius:50%}.url{position:absolute;width:100%;text-align:center;font-size:6px;color:#b1b0be;left:0}.muted{color:#9b9eac}.row{display:flex;align-items:center;justify-content:space-between}.pill{padding:6px 11px;border-radius:5px;font-size:8px;background:#f4f4f9;color:#838398}.label{font-size:8px;color:#89899a}.title{font-size:11px;font-weight:700}</style>`

const nova = `${base}<div class="stage" style="background:#edeaf6"><div style="position:absolute;width:590px;height:590px;border:1px solid #dfdaef;border-radius:50%;top:25px;left:170px"></div><div class="browser" style="width:754px;height:501px;left:73px;top:77px;transform:rotate(-4deg)"><div class="bar"><i></i><i></i><i></i><span class="url">app.nova.design / overview</span></div><div style="display:flex;height:472px"><aside style="width:134px;background:#fcfbfe;border-right:1px solid #f0edf6;padding:24px 15px;flex-shrink:0"><div style="font-size:21px;font-weight:800;letter-spacing:-1px;color:#6e59a4">✳ nova<span style="color:#b6a5d5">.</span></div><p style="font-size:6px;color:#a2a0ad;margin-top:24px;margin-bottom:12px;letter-spacing:1px">WORKSPACE</p>${['◈ &nbsp; Overview', '▧ &nbsp; Analytics', '▤ &nbsp; Projects', '♧ &nbsp; Customers', '▥ &nbsp; Transactions'].map((x, i) => `<div style="font-size:9px;padding:11px 9px;margin-bottom:7px;border-radius:6px;${i === 0 ? 'background:#eee8f8;color:#8064ae;font-weight:600' : 'color:#90909f'}">${x}</div>`).join('')}<div style="margin-top:35px;background:#f1eef8;padding:11px;border-radius:7px;font-size:8px;line-height:1.9;color:#8c7fa5">Your workspace,<br>at a glance.<div style="background:#8871b7;border-radius:5px;color:white;padding:5px;margin-top:10px;text-align:center">Explore Pro ↗</div></div></aside><main style="padding:23px 23px;width:620px;background:#fdfdff"><div class="row"><div><h2 style="font-size:17px;letter-spacing:-.4px">A good day to grow 👋</h2><p style="font-size:8px;color:#a3a1b0;margin-top:4px">Here's what's happening with your business today.</p></div><span class="pill">↗ Export report</span></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:23px">${[
  ['Total revenue', '$48,250', '↗ 12.8%'],
  ['Active users', '2,840', '↗ 8.2%'],
  ['Total orders', '1,425', '↗ 6.4%'],
]
  .map(
    (a, i) =>
      `<div style="border:1px solid #edeaf3;border-radius:8px;padding:13px;background:${i === 0 ? '#f2eefb' : 'white'}"><div class="row"><span class="label">${a[0]}</span><span style="color:#b5a7cf;font-size:14px">${['▧', '♧', '◈'][i]}</span></div><h3 style="font-size:23px;letter-spacing:-.7px;margin-top:7px">${a[1]}</h3><p style="font-size:7px;color:#6f9f87;margin-top:3px">${a[2]} <span style="color:#aaa6b5">vs. last month</span></p></div>`,
  )
  .join(
    '',
  )}</div><div style="display:grid;grid-template-columns:1.8fr 1fr;gap:12px;margin-top:15px"><div style="border:1px solid #eceaf2;border-radius:8px;padding:15px;height:174px;background:white"><div class="row"><span class="title">Revenue overview</span><span style="font-size:7px;color:#aca6b9">This month ⌄</span></div><svg viewBox="0 0 325 120" style="width:100%;margin-top:10px"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#af92d8" stop-opacity=".3"/><stop offset="1" stop-color="#af92d8" stop-opacity="0"/></linearGradient></defs><g stroke="#f1eef6" stroke-dasharray="3 3"><path d="M0 15H325M0 45H325M0 75H325M0 105H325"/></g><path d="M0 95Q17 87 29 90T60 78T87 68T113 76T141 45T170 53T196 37T225 47T252 15T279 25T325 9V110H0Z" fill="url(#fill)"/><path d="M0 95Q17 87 29 90T60 78T87 68T113 76T141 45T170 53T196 37T225 47T252 15T279 25T325 9" stroke="#9676c1" stroke-width="2.5" fill="none"/><g fill="#b5afbf" font-size="6" font-family="Arial"><text x="0" y="120">MON</text><text x="55" y="120">TUE</text><text x="110" y="120">WED</text><text x="163" y="120">THU</text><text x="214" y="120">FRI</text><text x="264" y="120">SAT</text><text x="307" y="120">SUN</text></g></svg></div><div style="border:1px solid #eceaf2;border-radius:8px;padding:15px;background:white"><div class="title">Traffic sources</div><div style="height:96px;display:grid;place-items:center"><div style="height:75px;width:75px;background:conic-gradient(#9375bf 0% 58%,#c4b2dc 58% 83%,#eeebf6 83%);border-radius:50%;display:grid;place-items:center"><div style="height:55px;width:55px;border-radius:50%;background:white;display:grid;place-items:center;font-size:13px;font-weight:700">100%</div></div></div><div style="display:flex;gap:9px;justify-content:center;font-size:6px;color:#9e94ac"><span>● Direct</span><span>● Search</span><span>● Other</span></div></div></div><div style="margin-top:15px;background:white;border:1px solid #eeeaf4;border-radius:8px;padding:13px"><div class="row"><span class="title">Recent activity</span><span style="font-size:7px;color:#a398b6">View all ↗</span></div><div class="row" style="margin-top:12px;font-size:7px;color:#9691a4"><span>◉ &nbsp; Website redesign</span><span>Design</span><span style="color:#76a58b">● Completed</span><span>$2,450.00</span></div></div></main></div></div><div style="position:absolute;right:36px;bottom:39px;background:#ffffffed;border:1px solid white;box-shadow:0 10px 20px #71608612;border-radius:11px;padding:14px 19px;transform:rotate(5deg);display:flex;gap:12px;align-items:center"><span style="width:30px;height:30px;border-radius:8px;background:#eee8f8;color:#9478b8;display:grid;place-items:center">↗</span><div style="font-size:8px;color:#9c94ad">Made for clarity<strong style="display:block;font-size:11px;color:#5d4d79;margin-top:2px">Your business, simplified.</strong></div></div></div>`

const chair = `<svg viewBox="0 0 270 320" width="280" height="340"><defs><linearGradient id="back" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a4aa83"/><stop offset=".5" stop-color="#777f56"/><stop offset="1" stop-color="#535d3c"/></linearGradient><linearGradient id="seat" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#969f73"/><stop offset="1" stop-color="#656f48"/></linearGradient><linearGradient id="wood"><stop stop-color="#a68c6a"/><stop offset=".5" stop-color="#d3bb93"/><stop offset="1" stop-color="#a68c6a"/></linearGradient></defs><ellipse cx="140" cy="292" rx="99" ry="10" fill="#b8b39f" opacity=".22"/><path d="m68 201-12 86q1 6 7 4l23-83m109-1 21 77q2 6 7 1l-10-90M84 190l16 79q3 5 7-1l-7-71m68-5-4 85q1 5 6 0l17-83" fill="url(#wood)"/><path d="M63 173 51 78Q47 39 89 34l89-8q36-1 35 36l-2 94z" fill="#515c3b"/><path d="M58 173 47 80Q43 37 88 31l88-9q36-1 33 37l-4 94z" fill="url(#back)"/><path d="M55 174q8-19 38-22l92-8q20 0 35 17l13 26q4 16-19 22l-113 10q-38 2-42-22z" fill="#515b3d"/><path d="M53 169q8-16 38-18l91-8q20 1 34 14l15 24q4 13-20 18l-112 10q-37 1-41-16z" fill="url(#seat)"/><path d="M69 56q61-22 119-17" stroke="#b2b697" stroke-width="1" opacity=".4" fill="none"/><path d="m71 181 135-13" stroke="#c7cbb1" opacity=".25" fill="none"/></svg>`
const minimal = `${base}<div class="stage" style="background:#eae9e3"><div class="browser" style="width:755px;height:504px;left:75px;top:79px;transform:rotate(4deg);background:#f7f6f1"><div class="bar"><i></i><i></i><i></i><span class="url">minimal.studio / collection</span></div><div style="padding:24px 36px"><div class="row"><span style="font-size:19px;letter-spacing:-1.2px;font-weight:700;color:#5e6554">minimal<span style="color:#a3aa8e">.</span></span><div style="display:flex;gap:25px;font-size:8px;color:#95958a"><span>Collection</span><span>Our story</span><span>Journal</span></div><span style="font-size:10px;color:#808577">Search &nbsp; ◯ &nbsp; Bag (0)</span></div><div style="display:grid;grid-template-columns:1fr 1fr;align-items:center;height:315px;gap:20px"><div style="padding-left:7px"><span style="font-size:7px;letter-spacing:2px;color:#979a88">THOUGHTFULLY MADE, SLOWLY LIVED.</span><h1 style="font-family:Georgia,serif;font-weight:400;line-height:1.12;font-size:50px;letter-spacing:-2px;color:#555c48;margin-top:18px">A little less.<br>A lot more<br><i style="color:#899073">meaning.</i></h1><p style="font-size:8px;color:#919285;line-height:1.9;margin-top:16px">Timeless objects for considered spaces.<br>Made to be loved, designed to stay.</p><div style="display:inline-flex;align-items:center;gap:28px;background:#6a7459;color:#fff;padding:10px 14px;margin-top:19px;font-size:8px">Discover the collection <span>↗</span></div></div><div style="position:relative;height:300px;background:#edeee7;border-radius:48% 48% 0 0;display:grid;place-items:center;margin-top:6px">${chair}<div style="position:absolute;bottom:4px;right:15px;font-size:6px;letter-spacing:1px;color:#8f927f">THE EVERYDAY CHAIR — 01</div></div></div><div style="border-top:1px solid #e1e2d8;padding-top:18px;margin-top:13px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px">${[
  ['01', 'Made with intention', 'Natural materials. Honest craft.'],
  ['02', 'Built to last', 'Fewer things, better things.'],
  ['03', 'A lighter footprint', 'Thoughtful, from start to finish.'],
]
  .map(
    (x) =>
      `<div style="display:flex;gap:10px"><span style="color:#a4a891;font-size:9px">${x[0]}</span><div><strong style="font-size:9px;color:#777e66">${x[1]}</strong><p style="font-size:7px;color:#a3a493;margin-top:3px">${x[2]}</p></div></div>`,
  )
  .join(
    '',
  )}</div></div></div><div style="position:absolute;width:147px;height:102px;left:35px;bottom:34px;background:#fdfdf9;box-shadow:0 10px 25px #515d4417;border:1px solid #fff;border-radius:6px;padding:16px;transform:rotate(-6deg)"><span style="font-family:Georgia,serif;font-style:italic;color:#8e957b;font-size:18px">Less is lovely.</span><div style="margin-top:11px;display:flex;gap:6px">${['#747e5a', '#b8bda4', '#dedcca', '#d6c4ac', '#e9e7de'].map((c) => `<i style="height:13px;width:13px;background:${c};border-radius:50%"></i>`).join('')}</div><span style="font-size:6px;letter-spacing:1px;color:#aaa99a;display:block;margin-top:8px">A MORE CONSIDERED EVERYDAY.</span></div></div>`

const phone = (content, style) =>
  `<div style="width:226px;height:467px;background:#fff;border:5px solid #fff;outline:1px solid #dce4f3;box-shadow:0 20px 35px #5474a01c;border-radius:32px;position:absolute;overflow:hidden;${style}"><div style="height:29px;padding:8px 17px 0;display:flex;justify-content:space-between;font-size:7px;font-weight:700;color:#4c5f7f"><span>9:41</span><span style="height:10px;width:49px;position:absolute;left:84px;top:4px;border-radius:10px;background:#253449"></span><span>▪ ▴ ▰</span></div>${content}<div style="position:absolute;bottom:7px;left:78px;width:60px;height:3px;background:#c5cede;border-radius:5px"></div></div>`
const flow = `${base}<div class="stage" style="background:#e5edf9"><div style="position:absolute;width:590px;height:590px;border:1px solid #d8e3f4;border-radius:50%;top:30px;left:130px"></div><div style="position:absolute;width:465px;height:465px;border:1px solid #d8e3f4;border-radius:50%;top:90px;left:190px"></div><div style="position:absolute;left:48px;top:48px;color:#6986b4;font-size:19px;font-weight:800;letter-spacing:-1px">≈ flow<span style="color:#acbfde">.</span><span style="display:block;font-size:6px;letter-spacing:1px;font-weight:400;margin-top:5px">MAKE MONEY MAKE SENSE.</span></div>${phone(
  `<div style="padding:13px 16px"><div class="row"><div style="font-size:7px;color:#94a0b6">Good morning,<strong style="display:block;color:#344c70;font-size:13px;margin-top:2px">Alex Morgan <span style="font-size:12px">☀</span></strong></div><div style="width:28px;height:28px;border-radius:50%;background:#e3ecfa;display:grid;place-items:center;font-size:10px;color:#8aa4cd">AM</div></div><div style="margin-top:17px;padding:16px;background:linear-gradient(125deg,#658fde,#3e6bbf);border-radius:13px;color:#fff"><span style="font-size:7px;opacity:.7">TOTAL BALANCE</span><h2 style="font-size:26px;letter-spacing:-1px;margin-top:5px">$12,840<span style="font-size:18px;opacity:.75">.50</span></h2><div class="row" style="font-size:7px;margin-top:21px"><span style="opacity:.7">•••• &nbsp; 4829</span><span style="font-size:11px;letter-spacing:1px;font-weight:600">VISA</span></div></div><div style="display:flex;justify-content:space-between;margin-top:16px">${[
    ['↗', 'Send'],
    ['↙', 'Request'],
    ['+', 'Add money'],
    ['⋯', 'More'],
  ]
    .map(
      (x) =>
        `<div style="text-align:center;font-size:6px;color:#94a1b7"><span style="width:32px;height:32px;border-radius:10px;background:#eff4fc;color:#7194ce;display:grid;place-items:center;font-size:17px;margin-bottom:5px">${x[0]}</span>${x[1]}</div>`,
    )
    .join(
      '',
    )}</div><div class="row" style="margin-top:22px"><strong style="font-size:10px;color:#4e6383">Recent activity</strong><span style="font-size:6px;color:#94a8c6">See all</span></div>${[
    ['◈', 'Figma Pro', 'Subscription', '−$15.00', '#eeeafa'],
    ['↙', 'Freelance project', 'Income', '+$850.00', '#e8f4ec'],
    ['♧', 'Morning coffee', 'Food & drinks', '−$4.50', '#f8eee4'],
  ]
    .map(
      (x) =>
        `<div class="row" style="margin-top:14px"><div style="display:flex;align-items:center;gap:9px"><span style="width:26px;height:26px;border-radius:8px;background:${x[4]};display:grid;place-items:center;color:#8296af;font-size:11px">${x[0]}</span><div><strong style="font-size:8px;color:#65738c">${x[1]}</strong><p style="font-size:6px;color:#a1adbe;margin-top:2px">${x[2]}</p></div></div><span style="font-size:8px;color:${x[3][0] === '+' ? '#6a9b85' : '#6c7c95'}">${x[3]}</span></div>`,
    )
    .join(
      '',
    )}</div><div style="position:absolute;bottom:19px;left:0;right:0;display:flex;justify-content:space-evenly;font-size:15px;color:#c3cddd;border-top:1px solid #f4f6fa;padding-top:10px"><span style="color:#7699d3">⌂</span><span>▥</span><span>▣</span><span>◯</span></div>`,
  `left:180px;top:117px;transform:rotate(-9deg);z-index:2`,
)}${phone(
  `<div style="padding:12px 16px"><div class="row"><span style="font-size:17px;color:#8094b0">‹</span><strong style="font-size:12px;color:#4e6383">Your spending</strong><span style="font-size:15px;color:#8094b0">⋯</span></div><div style="display:flex;justify-content:center;gap:6px;margin-top:20px">${['Week', 'Month', 'Year'].map((x, i) => `<span style="font-size:7px;padding:6px 14px;border-radius:5px;background:${i === 1 ? '#e9f0fe' : '#f8faff'};color:${i === 1 ? '#5d86c9' : '#a7b1c2'}">${x}</span>`).join('')}</div><div style="height:170px;display:grid;place-items:center"><div style="width:132px;height:132px;border-radius:50%;background:conic-gradient(#658dda 0 43%,#9ab6e6 43% 71%,#c5d4ee 71% 89%,#eef3fc 89%);display:grid;place-items:center;transform:rotate(-80deg)"><div style="height:107px;width:107px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;flex-direction:column;transform:rotate(80deg)"><span style="font-size:7px;color:#a2aec2">Total spent</span><strong style="font-size:23px;letter-spacing:-.8px;color:#4f6486;margin-top:3px">$2,450</strong><span style="font-size:6px;color:#7ba18e;margin-top:3px">↓ 8% from last month</span></div></div></div><div style="font-size:10px;color:#647793;font-weight:600">By category</div>${[
    ['Shopping', '43%', '$1,053', '#658dda'],
    ['Food & drinks', '28%', '$686', '#9ab6e6'],
    ['Transport', '18%', '$441', '#c5d4ee'],
    ['Others', '11%', '$270', '#dfe7f6'],
  ]
    .map(
      (x) =>
        `<div style="margin-top:15px"><div class="row" style="font-size:7px;color:#8a9ab1"><span><i style="display:inline-block;height:5px;width:5px;border-radius:50%;background:${x[3]};margin-right:4px"></i>${x[0]}</span><span style="color:#687d9e">${x[2]}</span></div><div style="height:3px;background:#f2f5fb;border-radius:3px;margin-top:7px"><div style="width:${x[1]};background:${x[3]};height:100%;border-radius:3px"></div></div></div>`,
    )
    .join('')}</div>`,
  `left:451px;top:57px;transform:rotate(10deg);`,
)}<div style="position:absolute;right:35px;bottom:44px;background:#fffffff2;box-shadow:0 10px 20px #466f9f13;padding:13px 17px;border-radius:10px;display:flex;align-items:center;gap:11px;transform:rotate(-5deg)"><span style="height:29px;width:29px;border-radius:50%;background:#e7f3ed;color:#6fa58c;display:grid;place-items:center">✓</span><div style="font-size:7px;color:#91a1b8">A little more clarity.<strong style="display:block;font-size:11px;color:#5a749c;margin-top:3px">A lot more peace of mind.</strong></div></div></div>`

const browser = await playwright.launch(
  process.env.USE_BUNDLED_CHROMIUM === '1'
    ? {
        executablePath: await chromium.executablePath(),
        args: chromium.args.filter(
          (arg) => !['--single-process', '--disable-web-security'].includes(arg),
        ),
        headless: true,
      }
    : { headless: true },
)
const page = await browser.newPage({ viewport: { width: 900, height: 640 }, deviceScaleFactor: 1 })
for (const [name, html] of Object.entries({ nova, minimal, flow })) {
  await page.setContent(html, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  const buffer = await page.screenshot()
  await sharp(buffer).webp({ quality: 87 }).toFile(`public/images/${name}.webp`)
  console.log(`Created ${name}.webp`)
}
await browser.close()
