import { mkdir, rm, writeFile, copyFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, services, categories, posts } from '../content/site-data.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const assetsDir = join(root, 'src/assets');

const blogImages = {
  'how-to-choose-ai-girlfriend-app': 'blog-buyers-guide.webp',
  'types-of-ai-companions': 'cat-best-overall.webp',
  'ai-girlfriend-privacy-safety': 'blog-privacy.webp',
  'why-memory-matters': 'blog-memory.webp',
  'free-vs-paid-ai-girlfriend-apps': 'cat-budget.webp',
  'ai-girlfriend-for-men-over-40': 'hero-phone.webp',
  'adult-roleplay-vs-emotional-companionship': 'cat-roleplay.webp',
  'reddit-sentiment-ai-girlfriend-apps': 'blog-reddit.webp',
};
const defaultBlogImages = ['blog-comparison.webp', 'blog-vs.webp', 'blog-reviews.webp', 'blog-future.webp', 'blog-buyers-guide.webp', 'blog-memory.webp', 'blog-privacy.webp', 'blog-reddit.webp', 'cat-conversation.webp', 'cat-voice-video.webp'];
function blogImageFor(post, index) {
  return blogImages[post.slug] ?? defaultBlogImages[index % defaultBlogImages.length];
}

const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const slugTitle = (slug) => categories.find((category) => category.slug === slug)?.title ?? slug;
const serviceBySlug = (slug) => services.find((service) => service.slug === slug);
const postBySlug = (slug) => posts.find((post) => post.slug === slug);
const pagePath = (path) => join(dist, path);

function layout({ title, description, path = '/', content, ogType = 'website', ogImage = '/assets/hero-main.webp', schema = '', noindex = false }) {
  const canonical = `https://${site.domain}${path}`;
  const ogImageFull = `https://${site.domain}${ogImage}`;
  const dateStr = `${site.year}-07-13`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImageFull}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${ogImageFull}">
  ${noindex ? '<meta name="robots" content="noindex,follow">' : ''}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
  ${schema}
</head>
<body>
  <header class="topbar">
    <nav class="wrap nav" aria-label="Main navigation">
      <a class="brand" href="/"><span class="logo">10</span><span>${site.name}</span></a>
      <div class="links">
        <a href="/#rankings">Rankings</a>
        <a href="/categories/">Categories</a>
        <a href="/blog/">Guides</a>
        <a href="/reviews/candy-ai/">#1 Pick</a>
      </div>
      <button class="hamburger" onclick="document.getElementById('mob').classList.toggle('open')" aria-label="Menu">&#9776;</button>
      <a class="btn secondary" href="/#comparison">Compare</a>
    </nav>
    <div id="mob" class="mobile-menu">
      <a href="/#rankings">Rankings</a>
      <a href="/categories/">Categories</a>
      <a href="/blog/">Guides</a>
      <a href="/#comparison">Compare</a>
      <a href="/reviews/candy-ai/">#1 Pick</a>
      <a href="/blog/ai-girlfriend-privacy-safety/">Privacy Guide</a>
    </div>
  </header>
  <main>${content}</main>
  <footer class="footer">
    <div class="wrap">
      <div><strong>${site.name}</strong><br>Adult AI companion reviews for ${site.year}. Rankings reflect editorial judgment, not sponsorship.</div>
      <div>18+ only. Use companion apps responsibly. <a href="/about/" style="text-decoration:underline">About</a> · <a href="/privacy-policy/" style="text-decoration:underline">Privacy Policy</a> · <a href="/blog/ai-girlfriend-privacy-safety/" style="text-decoration:underline">Privacy guide</a> · This site earns commissions from affiliate links. <a href="/disclosure/" style="text-decoration:underline">Full disclosure</a>.</div>
    </div>
  </footer>
</body>
</html>`;
}

function scoreBars(service) {
  return `<div class="scorebox" aria-label="Scores for ${esc(service.name)}">
    ${Object.entries(service.scores).map(([name, score]) => `<div class="score"><span>${esc(name)}</span><strong>${score.toFixed(1)}</strong></div><div class="bar"><span style="width:${score * 10}%"></span></div>`).join('')}
  </div>`;
}

function serviceImage(service) {
  return `/assets/service-${service.slug}.webp`;
}
function categoryImage(category) {
  return `/assets/cat-${category.slug}.webp`;
}
function artCard(service, size = 'compact') {
  return `<div class="service-art ${size}" aria-label="${esc(service.name)} visual" style="background-image:url('${serviceImage(service)}')">
    <div class="art-overlay"></div>
    <span class="art-name">${esc(service.name)}</span>
    <span class="art-label">${esc(service.bestFor)}</span>
  </div>`;
}

function serviceCard(service) {
  return `<article class="rank-card">
    <div class="rank-num">${service.rank}</div>
    ${artCard(service)}
    <div>
      <p class="eyebrow">${esc(service.bestFor)}</p>
      <h3><a href="/reviews/${service.slug}/">${esc(service.name)}</a></h3>
      <div class="meta">
        <span class="pill">Rating ${service.rating}/5</span>
        <span class="pill">${esc(service.freeTier)}</span>
        <span class="pill">${esc(service.maturity)}</span>
      </div>
      <p class="verdict">${esc(service.summary)}</p>
      <div class="hero-actions"><a class="btn" href="/reviews/${service.slug}/">Read Review</a><a class="btn secondary" href="${service.url}" rel="nofollow sponsored noopener noreferrer" target="_blank">Visit Site</a></div>
    </div>
    <div>${scoreBars(service)}<p class="microcopy">Best-fit category: ${esc(service.bestFor)}</p></div>
  </article>`;
}

function homePage() {
  const top = services[0];
  return layout({
    title: `Top 10 AI Girlfriend Apps in ${site.year}: Ranked Reviews and Buying Guide`,
    description: site.description,
    content: `<section class="hero">
      <div class="wrap hero-grid">
        <div>
          <p class="eyebrow">${site.year} buyer guide &middot; Last updated July ${site.year}</p>
          <h1>The best AI girlfriend apps, ranked by what actually matters.</h1>
          <p class="lead">Rankings based on conversation quality, memory retention, image generation, voice and video features, privacy posture, pricing clarity, and whether the app stays interesting after the first week. 10 in-depth reviews. 8 use-case categories. ${posts.filter((p) => !p.slug.includes('-for-beginners') && !p.slug.includes('-with-good-memory') && !p.slug.includes('-with-realistic-photos') && !p.slug.includes('-with-voice-messages') && !p.slug.includes('-with-video-clips') && !p.slug.includes('-for-private-chat') && !p.slug.includes('-for-roleplay') && !p.slug.includes('-for-emotional-support') && !p.slug.includes('-without-too-many-paywalls') && !p.slug.includes('-for-mobile-web')).length} buyer guides.</p>
          <div class="hero-actions"><a class="btn" href="#rankings">See Top 10</a><a class="btn secondary" href="#methodology">How We Score</a></div>
        </div>
        <div class="hero-card" aria-label="Top picks preview">
          <img class="hero-img" src="/assets/hero-main.webp" alt="AI companion app interface concept" loading="eager">
        </div>
      </div>
    </section>
    <section class="section" id="methodology">
      <div class="wrap">
        <div class="section-head"><div><p class="eyebrow">Scoring methodology</p><h2>How we evaluate each app</h2></div><p>Every score is editorial judgment on a 1-10 scale across five axes, based on hands-on testing, public documentation review, and cross-referencing community sentiment.</p></div>
        <div class="cards">
          <div class="card"><img class="card-img" src="/assets/cat-conversation.webp" alt="Conversation quality" loading="lazy"><h3>Chat quality (weight: 30%)</h3><p>We run the same prompt sequence on every app: a casual opener, a personal detail to remember, a roleplay setup, and a follow-up the next day. We score natural tone, topic-switching, and whether replies feel scripted or repetitive after 10+ exchanges.</p></div>
          <div class="card"><img class="card-img" src="/assets/cat-realistic-visuals.webp" alt="Visual quality" loading="lazy"><h3>Visuals (weight: 20%)</h3><p>We generate multiple images of the same character and check consistency, detail, and whether the companion stays recognizable. Apps without image generation score lower here but can rank high overall on other axes.</p></div>
          <div class="card"><img class="card-img" src="/assets/blog-memory.webp" alt="Memory retention" loading="lazy"><h3>Memory (weight: 20%)</h3><p>We share a harmless preference on day one, then reference it on day three without a reminder. Apps that forget context lose points fast because continuity is what separates a companion from a chatbot.</p></div>
          <div class="card"><img class="card-img" src="/assets/blog-privacy.webp" alt="Privacy" loading="lazy"><h3>Privacy (weight: 15%)</h3><p>We check published privacy policies, billing descriptor names, account deletion flows, 2FA availability, and whether the service requires real identity. Apps that are vague about data retention or lack deletion controls score lower.</p></div>
          <div class="card"><img class="card-img" src="/assets/cat-budget.webp" alt="Value" loading="lazy"><h3>Value (weight: 15%)</h3><p>We compare what you get on each pricing tier: message limits, image credits, voice access, video support, and cancellation friction. Aggressive upsells and unclear token costs reduce the value score.</p></div>
        </div>
        <div class="notice" style="margin-top:20px"><strong>Transparency note:</strong> External "Visit Site" links may use affiliate tracking. Rankings reflect editorial judgment and are not influenced by affiliate status. Scores are updated when platforms ship major changes. Last full re-test: July ${site.year}.</div>
      </div>
    </section>
    <section class="section" id="rankings">
      <div class="wrap">
        <div class="section-head"><div><p class="eyebrow">Ranked list</p><h2>Top 10 AI girlfriend websites</h2></div><p>Each review includes the best use case, tradeoffs, user sentiment, pricing notes, and whether the product fits adult roleplay, emotional companionship, visuals, or budget testing. Ranking order reflects editorial weighting of use-case breadth and overall recommendation confidence, not a strict composite-score sort. <a href="/disclosure/">Full disclosure</a>.</p></div>
        <div class="ranking">${services.map(serviceCard).join('')}</div>
      </div>
    </section>
    <section class="section" id="comparison">
      <div class="wrap">
        <div class="section-head"><div><p class="eyebrow">Comparison</p><h2>Quick comparison table</h2></div><p>Use this table to shortlist three apps before testing free tiers.</p></div>
        <div class="table"><table><thead><tr><th>Rank</th><th>Service</th><th>Best For</th><th>Price</th><th>Free Tier</th><th>Chat</th><th>Visuals</th><th>Memory</th><th>Privacy</th><th>Value</th><th>Rating</th></tr></thead><tbody>${services.map((service) => `<tr><td>#${service.rank}</td><td><a href="/reviews/${service.slug}/">${esc(service.name)}</a></td><td>${esc(service.bestFor)}</td><td>${esc(service.price)}</td><td>${esc(service.freeTier)}</td><td>${service.scores.chat}</td><td>${service.scores.visuals}</td><td>${service.scores.memory}</td><td>${service.scores.privacy}</td><td>${service.scores.value}</td><td><strong>${service.rating}/5</strong></td></tr>`).join('')}</tbody></table></div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="section-head"><div><p class="eyebrow">Categories</p><h2>Find the right type of AI companion</h2></div><p>Different apps solve different problems: fantasy, conversation, visuals, emotional continuity, or budget testing.</p></div>
        <div class="cards">${categories.map((category) => `<a class="card" href="/categories/${category.slug}/"><img class="card-img" src="${categoryImage(category)}" alt="${esc(category.title)}" loading="lazy"><p class="eyebrow">Category</p><h3>${esc(category.title)}</h3><p>${esc(category.deck)}</p></a>`).join('')}</div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="section-head"><div><p class="eyebrow">Guides</p><h2>Deep-dive buying guides</h2></div><p>Evergreen explainers for users who are new to AI companions.</p></div>
        <div class="cards">${posts.slice(0, 6).map((post, i) => `<a class="card" href="/blog/${post.slug}/"><img class="card-img" src="/assets/${blogImageFor(post, i)}" alt="${esc(post.title)}" loading="lazy"><h3>${esc(post.title)}</h3><p>${esc(post.excerpt)}</p></a>`).join('')}</div>
      </div>
    </section>`
  });
}

const publisher = { "@type": "Organization", "name": site.name, "logo": { "@type": "ImageObject", "url": `https://${site.domain}/favicon.svg` } };

function reviewSchema(service) {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": "SoftwareApplication", "name": service.name, "url": service.url, "applicationCategory": "LifestyleApplication" },
    "author": { "@type": "Organization", "name": site.name },
    "publisher": publisher,
    "reviewRating": { "@type": "Rating", "ratingValue": parseFloat(service.rating), "bestRating": 5, "worstRating": 1 },
    "reviewBody": service.review,
    "datePublished": service.datePublished,
    "dateModified": service.dateModified,
    "description": service.tagline,
    "image": `https://${site.domain}/assets/service-${service.slug}.webp`,
  })}</script>`;
}

function testAdvice(service) {
  const checks = [];
  if (service.scores.chat >= 8.5) checks.push(`Start with a casual conversation about a topic you care about — ${service.name} scores high on chat quality, so push it beyond small talk`);
  else checks.push(`Test a casual conversation first — ${service.name} is not primarily a chat app, so check whether the replies feel natural enough for your use case`);
  if (service.scores.memory >= 8.0) checks.push(`mention a specific preference on day one, then return the next day and reference it without reminding the app — ${service.name} should remember`);
  else checks.push(`share a personal preference and check back later — memory is not ${service.name}'s strongest axis, so manage expectations`);
  if (service.scores.visuals >= 8.0) checks.push(`generate several images of the same character and compare consistency before buying credits`);
  else checks.push(`if visuals matter to you, test image quality early — it is not ${service.name}'s main selling point`);
  checks.push(`read the cancellation terms on ${service.name}'s site before entering payment details`);
  return checks.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join('. ') + '.';
}

function reviewPage(service) {
  const related = categories.filter((category) => service.categories.includes(category.slug));
  return layout({
    title: `${service.name} Review ${site.year}: ${service.bestFor}, Pros, Cons, Reddit Notes`,
    description: service.tagline,
    path: `/reviews/${service.slug}/`,
    ogType: 'article',
    ogImage: `/assets/service-${service.slug}.webp`,
    schema: reviewSchema(service),
    content: `<section class="hero"><div class="wrap hero-grid"><div><p class="eyebrow">#${service.rank} &middot; ${site.year} review</p><h1>${esc(service.name)} Review</h1><p class="lead">${esc(service.tagline)}</p><div class="hero-actions"><a class="btn" href="${service.url}" rel="nofollow sponsored noopener noreferrer" target="_blank">Visit ${esc(service.name)}</a><a class="btn secondary" href="/#rankings">Back to Rankings</a></div></div><div class="review-hero-img"><img src="${serviceImage(service)}" alt="${esc(service.name)} visual concept" loading="eager"></div></div></section>
    <section class="section"><div class="wrap content-grid"><article class="article">
      <h2>Verdict</h2><p>${esc(service.review)}</p>
      <h2>At a glance</h2>
      <table class="inline-table"><tbody>
        <tr><td><strong>Best for</strong></td><td>${esc(service.bestFor)}</td></tr>
        <tr><td><strong>Price</strong></td><td>${esc(service.price)}</td></tr>
        <tr><td><strong>Free tier</strong></td><td>${esc(service.freeTier)}</td></tr>
        <tr><td><strong>Content policy</strong></td><td>${esc(service.maturity)}</td></tr>
        <tr><td><strong>Chat score</strong></td><td>${service.scores.chat}/10</td></tr>
        <tr><td><strong>Visuals score</strong></td><td>${service.scores.visuals}/10</td></tr>
        <tr><td><strong>Memory score</strong></td><td>${service.scores.memory}/10</td></tr>
        <tr><td><strong>Privacy score</strong></td><td>${service.scores.privacy}/10</td></tr>
        <tr><td><strong>Value score</strong></td><td>${service.scores.value}/10</td></tr>
      </tbody></table>
      <h2>Why ${esc(service.name)} ranks #${service.rank}</h2><ul>${service.whyItWins.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      <h2>Tradeoffs to consider</h2><ul>${service.tradeoffs.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      <h2>What users say</h2><p>${esc(service.reddit)}</p>
      <h2>Who should choose ${esc(service.name)}?</h2><p>${esc(service.summary)}</p>
      <h2>How to test ${esc(service.name)} before paying</h2><p>${esc(testAdvice(service))}</p>
      <p><a href="/#methodology">See our full scoring methodology</a> to understand how these scores are calculated.</p>
    </article><aside class="side"><div class="card"><p class="eyebrow">Overall rating</p><h3>${service.rating}/5</h3><p>${esc(service.price)}</p></div>${scoreBars(service)}<div class="card"><p class="eyebrow">Categories</p>${related.map((category) => `<p><a href="/categories/${category.slug}/">${esc(category.title)}</a></p>`).join('')}</div><div class="card"><p class="eyebrow">Buyer warning</p><p>Pricing and content policies change frequently. Verify current limits, renewal terms, and cancellation flow on the official site before subscribing.</p></div></aside></div></section>`
  });
}

function categoryIndexPage() {
  return layout({
    title: `AI Girlfriend Categories: Best Apps by Use Case in ${site.year}`,
    description: 'Browse AI girlfriend apps by use case: realistic visuals, conversation, roleplay, voice, video, free tiers, anime, and emotional companions.',
    path: '/categories/',
    content: `<section class="hero"><div class="wrap"><p class="eyebrow">Use-case rankings</p><h1>AI girlfriend categories</h1><p class="lead">The right AI companion depends on whether you want realistic visuals, long-term memory, adult roleplay, free chat, voice/video, or emotional companionship.</p></div></section><section class="section"><div class="wrap"><div class="cards">${categories.map((category) => `<a class="card" href="/categories/${category.slug}/"><img class="card-img" src="${categoryImage(category)}" alt="${esc(category.title)}" loading="lazy"><h3>${esc(category.title)}</h3><p>${esc(category.deck)}</p></a>`).join('')}</div></div></section>`
  });
}

function categoryPage(category) {
  const ranked = services.filter((service) => service.categories.includes(category.slug));
  return layout({
    title: `${category.title} in ${site.year}`,
    description: category.deck,
    path: `/categories/${category.slug}/`,
    content: `<section class="hero"><div class="wrap hero-grid"><div><p class="eyebrow">Category guide</p><h1>${esc(category.title)}</h1><p class="lead">${esc(category.intro)} ${esc(category.deck)}</p></div><div class="review-hero-img"><img src="${categoryImage(category)}" alt="${esc(category.title)}" loading="eager"></div></div></section><section class="section"><div class="wrap"><div class="ranking">${ranked.map(serviceCard).join('')}</div></div></section>`
  });
}

function blogIndexPage() {
  const indexedPosts = posts.filter((post) => !post.noindex);
  return layout({
    title: `AI Girlfriend Guides and Companion App Advice`,
    description: 'Long-form guides on AI girlfriend apps, privacy, memory, adult roleplay, emotional companions, and free vs paid plans.',
    path: '/blog/',
    content: `<section class="hero"><div class="wrap"><p class="eyebrow">${indexedPosts.length} indexed guides</p><h1>AI girlfriend guides</h1><p class="lead">Plain-English explainers for choosing, testing, and safely using AI companion apps. Long-tail support pages are kept out of the public guide index to keep this library useful.</p></div></section><section class="section"><div class="wrap"><div class="cards">${indexedPosts.map((post, i) => `<a class="card" href="/blog/${post.slug}/"><img class="card-img" src="/assets/${blogImageFor(post, i)}" alt="${esc(post.title)}" loading="lazy"><h3>${esc(post.title)}</h3><p>${esc(post.excerpt)}</p></a>`).join('')}</div></div></section>`
  });
}

function postSchema(post) {
  const postIndex = posts.indexOf(post);
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": { "@type": "Organization", "name": site.name },
    "publisher": publisher,
    "image": `https://${site.domain}/assets/${blogImageFor(post, postIndex)}`,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified,
  })}</script>`;
}

function postPage(post) {
  const postIndex = posts.indexOf(post);
  const linkedServices = (post.relatedServices ?? ['candy-ai', 'kupid-ai', 'dreamgf']).map(serviceBySlug).filter(Boolean);
  const linkedPosts = (post.relatedPosts ?? ['how-to-choose-ai-girlfriend-app', 'free-vs-paid-ai-girlfriend-apps']).map(postBySlug).filter(Boolean);
  const linkedCategory = categories.find((category) => category.slug === post.relatedCategory) ?? categories[0];
  return layout({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}/`,
    ogType: 'article',
    ogImage: `/assets/${blogImageFor(post, postIndex)}`,
    schema: postSchema(post),
    noindex: post.noindex ?? false,
    content: `<section class="hero"><div class="wrap hero-grid"><div><p class="eyebrow">Guide${post.keyword ? ` &middot; ${esc(post.keyword)}` : ''}</p><h1>${esc(post.title)}</h1><p class="lead">${esc(post.excerpt)}</p></div><div class="review-hero-img"><img src="/assets/${blogImageFor(post, posts.indexOf(post))}" alt="${esc(post.title)}" loading="eager"></div></div></section><section class="section"><div class="wrap content-grid"><article class="article">${post.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}<h2>Recommended next step</h2><p>Compare the current top-ranked services on the <a href="/#rankings">homepage ranking</a>, browse the <a href="/categories/${linkedCategory.slug}/">${esc(linkedCategory.title)}</a> category, and test two or three free tiers before subscribing.</p><h2>Related reviews</h2><ul>${linkedServices.map((service) => `<li><a href="/reviews/${service.slug}/">${esc(service.name)} review</a> - ${esc(service.bestFor)}</li>`).join('')}</ul><h2>Related guides</h2><ul>${linkedPosts.map((relatedPost) => `<li><a href="/blog/${relatedPost.slug}/">${esc(relatedPost.title)}</a></li>`).join('')}</ul></article><aside class="side"><div class="card"><p class="eyebrow">Related category</p><h3><a href="/categories/${linkedCategory.slug}/">${esc(linkedCategory.title)}</a></h3><p>${esc(linkedCategory.deck)}</p></div><div class="card"><p class="eyebrow">Popular reviews</p>${linkedServices.map((service) => `<p><a href="/reviews/${service.slug}/">${esc(service.name)}</a></p>`).join('')}</div><div class="card"><p class="eyebrow">Start here</p><p><a href="/blog/how-to-choose-ai-girlfriend-app/">How to choose without wasting money</a></p><p><a href="/blog/ai-girlfriend-privacy-safety/">Privacy and safety guide</a></p></div></aside></div></section>`
  });
}

function sitemap() {
  const indexedPosts = posts.filter((post) => !post.noindex);
  const urls = [
    { url: '/', lastmod: `${site.year}-07-13` },
    { url: '/categories/', lastmod: `${site.year}-07-13` },
    { url: '/blog/', lastmod: `${site.year}-07-13` },
    { url: '/about/', lastmod: `${site.year}-07-13` },
    { url: '/privacy-policy/', lastmod: `${site.year}-07-13` },
    { url: '/disclosure/', lastmod: `${site.year}-07-13` },
    ...services.map((service) => ({ url: `/reviews/${service.slug}/`, lastmod: service.dateModified })),
    ...categories.map((category) => ({ url: `/categories/${category.slug}/`, lastmod: `${site.year}-07-13` })),
    ...indexedPosts.map((post) => ({ url: `/blog/${post.slug}/`, lastmod: post.dateModified })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((entry) => `  <url><loc>https://${site.domain}${entry.url}</loc><lastmod>${entry.lastmod}</lastmod></url>`).join('\n')}
</urlset>`;
}

async function write(path, html) {
  const target = pagePath(path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await copyFile(join(root, 'src/styles.css'), join(dist, 'styles.css'));

// Copy all assets
const distAssets = join(dist, 'assets');
await mkdir(distAssets, { recursive: true });
try {
  const assetFiles = (await readdir(assetsDir)).filter((f) => f.endsWith('.webp'));
  await Promise.all(assetFiles.map((file) => copyFile(join(assetsDir, file), join(distAssets, file))));
  console.log(`Copied ${assetFiles.length} WebP asset files`);
} catch { console.log('No assets directory found, skipping'); }
await write('index.html', homePage());
await write('categories/index.html', categoryIndexPage());
await write('blog/index.html', blogIndexPage());
await Promise.all(services.map((service) => write(`reviews/${service.slug}/index.html`, reviewPage(service))));
await Promise.all(categories.map((category) => write(`categories/${category.slug}/index.html`, categoryPage(category))));
await Promise.all(posts.map((post) => write(`blog/${post.slug}/index.html`, postPage(post))));
await write('sitemap.xml', sitemap());
await write('robots.txt', `User-agent: *\nAllow: /\nSitemap: https://${site.domain}/sitemap.xml\n`);
await write('CNAME', site.domain);
await write('about/index.html', layout({
  title: 'About Top 10 AI Girlfriends',
  description: 'Who runs Top 10 AI Girlfriends, how reviews are produced, and how the site is monetized.',
  path: '/about/',
  content: `<section class="hero"><div class="wrap"><h1>About This Site</h1><p class="lead">Top 10 AI Girlfriends is an independent review site for adult AI companion apps, built for readers who care about privacy, clarity, pricing, and practical buying advice.</p></div></section><section class="section"><div class="wrap"><article class="article"><h2>What we review</h2><p>We review AI girlfriend apps, AI companion platforms, roleplay chatbots, emotional companion apps, and multimedia virtual relationship tools. The site focuses on adult buyers, but it does not host adult content directly.</p><h2>How reviews are produced</h2><p>Reviews are structured around five evaluation axes: chat quality, visual quality, memory retention, privacy posture, and value. Scores are calculated automatically from those axes using the public methodology on the homepage. Ranking order also considers use-case breadth and overall recommendation confidence.</p><h2>How the site makes money</h2><p>Some outbound links are affiliate links. If you click a Visit Site button and subscribe, we may earn a commission at no extra cost to you. Affiliate status does not determine ranking order.</p><h2>Important limits</h2><p>Pricing, content policies, and free-tier limits change frequently in this category. We provide approximate pricing and buying guidance, but you should verify terms on the official provider website before subscribing.</p></article></div></section>`,
}));
await write('privacy-policy/index.html', layout({
  title: 'Privacy Policy',
  description: 'Privacy policy for Top 10 AI Girlfriends.',
  path: '/privacy-policy/',
  content: `<section class="hero"><div class="wrap"><h1>Privacy Policy</h1><p class="lead">This page explains what this review site collects and how visitors should think about privacy when using outbound links.</p></div></section><section class="section"><div class="wrap"><article class="article"><h2>Information we collect</h2><p>This static website does not require an account, does not ask for your name, and does not collect payment details. If analytics or advertising tools are added later, this policy should be updated before deployment.</p><h2>Affiliate links</h2><p>Outbound Visit Site links may include affiliate tracking parameters. Those destination websites may receive information about your click and may set their own cookies or tracking technologies. We add <code>noreferrer</code> to sponsored links to reduce referrer leakage from this site.</p><h2>Server logs</h2><p>Like most websites, the hosting provider may log basic request data such as IP address, browser, requested URL, and timestamp for security and operations.</p><h2>Adult privacy reminder</h2><p>When you leave this site for an AI companion platform, that service controls its own privacy policy, billing descriptor, account deletion rules, and data retention practices. Read those policies before sharing sensitive personal information.</p><h2>Contact</h2><p>For privacy or editorial questions, use the contact method that will be added after deployment.</p></article></div></section>`,
}));
await write('disclosure/index.html', layout({
  title: 'Affiliate Disclosure',
  description: 'How this site earns money and how rankings are determined.',
  path: '/disclosure/',
  content: `<section class="hero"><div class="wrap"><h1>Affiliate Disclosure</h1><p class="lead">Transparency about how this site is monetized.</p></div></section><section class="section"><div class="wrap"><article class="article"><h2>How we earn money</h2><p>Some links on this site are affiliate links. When you click a "Visit Site" button and sign up for a service, we may earn a commission at no extra cost to you. This is how the site covers hosting, research, and testing costs.</p><h2>How rankings are determined</h2><p>Rankings reflect editorial judgment based on hands-on testing across five scored axes: chat quality (30% weight), visual quality (20%), memory retention (20%), privacy posture (15%), and value (15%). Ranking order incorporates use-case breadth and editorial assessment beyond a strict composite-score sort. Affiliate relationships do not influence ranking position.</p><h2>Pricing accuracy</h2><p>Prices shown are approximate and were last verified in July ${site.year}. Promotions, regional pricing, and plan changes can alter actual costs. Always verify current pricing on the service's official website before subscribing.</p><h2>Content</h2><p>This site reviews apps that may include adult content. All visitors must be 18 years or older. Reviews describe product positioning and features; this site does not host adult content directly.</p></article></div></section>`,
}));
await write('contact/index.html', layout({
  title: 'Contact',
  description: 'Send a message to the team behind Top 10 AI Girlfriends.',
  path: '/contact/',
  content: `<section class="hero"><div class="wrap"><h1>Contact</h1><p class="lead">Have a question, found an error, or want to partner? Send a message.</p></div></section><section class="section"><div class="wrap"><article class="article"><form id="contactForm" style="max-width:600px"><div style="margin-bottom:16px"><label style="display:block;font-weight:600;margin-bottom:8px">Your Email</label><input type="email" name="email" required style="width:100%;padding:10px;border:1px solid #444;background:#1a1a1a;color:#fff;border-radius:4px"></div><div style="margin-bottom:16px"><label style="display:block;font-weight:600;margin-bottom:8px">Name (optional)</label><input type="text" name="name" style="width:100%;padding:10px;border:1px solid #444;background:#1a1a1a;color:#fff;border-radius:4px"></div><div style="margin-bottom:16px"><label style="display:block;font-weight:600;margin-bottom:8px">Message</label><textarea name="message" required rows="6" style="width:100%;padding:10px;border:1px solid #444;background:#1a1a1a;color:#fff;border-radius:4px;font-family:inherit"></textarea></div><button type="submit" id="submitBtn" style="background:#ff4fb8;color:#fff;padding:12px 24px;border:none;border-radius:4px;cursor:pointer;font-weight:600">Send Message</button><div id="status" style="margin-top:16px;padding:12px;border-radius:4px;display:none"></div></form><script>
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const status = document.getElementById('status');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  
  try {
    const formData = new FormData(e.target);
    const payload = {
      email: formData.get('email'),
      name: formData.get('name'),
      message: formData.get('message'),
    };
    console.log('Sending contact form:', payload);
    
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    console.log('Response status:', res.status);
    const data = await res.json();
    console.log('Response data:', data);
    
    if (res.ok) {
      status.textContent = '✓ Message sent! We\'ll get back to you soon.';
      status.style.background = '#1a1a1a';
      status.style.borderLeft = '4px solid #4ade80';
      status.style.color = '#4ade80';
      status.style.display = 'block';
      e.target.reset();
    } else {
      throw new Error(data.error || 'Failed to send');
    }
  } catch (err) {
    console.error('Contact form error:', err);
    status.textContent = '✗ Error sending message. Please try again.';
    status.style.background = '#1a1a1a';
    status.style.borderLeft = '4px solid #ef4444';
    status.style.color = '#ef4444';
    status.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
});
</script></article></div></section>`,
}));
await write('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#ff4fb8"/><stop offset="1" stop-color="#9b5cff"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g)"/><text x="32" y="40" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" font-weight="900" fill="white">10</text></svg>`);

console.log(`Built ${1 + services.length + categories.length + posts.length + 3} pages into ${dist}`);
