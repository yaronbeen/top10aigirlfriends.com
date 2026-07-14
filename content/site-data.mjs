export const site = {
  name: 'Top 10 AI Girlfriends',
  domain: 'top10aigirlfriends.com',
  description: 'Independent, adult-focused reviews of AI girlfriend apps, AI companions, roleplay chatbots, and virtual relationship platforms.',
  year: 2026,
};

// Weights: chat 30%, visuals 20%, memory 20%, privacy 15%, value 15%
function computeRating(scores) {
  const weighted = scores.chat * 0.30 + scores.visuals * 0.20 + scores.memory * 0.20 + scores.privacy * 0.15 + scores.value * 0.15;
  return (Math.round((weighted / 2) * 10) / 10).toFixed(1);
}

// Base date for staggering publication dates across content
const baseDate = new Date(`${2026}-06-01`);
function staggerDate(index, totalCount) {
  const spread = 42; // days to spread across (6 weeks)
  const dayOffset = Math.round((index / Math.max(totalCount - 1, 1)) * spread);
  const d = new Date(baseDate);
  d.setDate(d.getDate() + dayOffset);
  return d.toISOString().slice(0, 10);
}

const rawServices = [
  {
    rank: 1,
    name: 'Candy AI',
    slug: 'candy-ai',
    url: 'https://candy.ai/',
    tagline: 'Best overall AI girlfriend app for polished visuals, character variety, voice, images, and video.',
    bestFor: 'Best overall',
    price: 'From ~$5.99/mo (annual). Monthly and quarterly plans available. Promotions common.',
    freeTier: 'Limited free messages, no card required to start',
    maturity: 'Full NSFW on paid plans',
    categories: ['best-overall', 'realistic-visuals', 'voice-video', 'roleplay'],
    scores: { chat: 8.7, visuals: 9.6, memory: 8.2, privacy: 8.6, value: 8.4 },
    summary: 'Candy AI is the safest first recommendation because it feels like a complete product rather than a chatbot wrapped in a landing page. The character discovery flow, glossy design, custom companion builder, image generation, voice, and video support make it the broadest option for a user who wants one subscription to cover most use cases.',
    whyItWins: ['Strongest visual presentation in the category', 'Large catalog of prebuilt characters plus custom companion creation', 'Chat, image, voice, and video in one interface', 'Clear privacy positioning and discreet-billing messaging'],
    tradeoffs: ['Free use is limited', 'Visual features can consume credits quickly', 'Users focused only on deep conversation may prefer Kupid AI, Kindroid, or Replika'],
    reddit: 'Reddit roundups repeatedly call Candy AI smooth, customizable, and one of the strongest “AI girlfriend” vibes. The recurring criticism is that memory and long-session depth matter more than visuals, so Candy is best for users who value presentation and multimedia alongside chat.',
    review: 'For a privacy-conscious buyer who wants something that looks premium and does not require learning a complicated character-building culture, Candy AI is the easiest recommendation. It has the visual confidence of a modern entertainment app and the feature coverage of a mature companion platform. It is especially good for realistic images, occasional voice notes, and a private companion experience without hopping across multiple tools.',
  },
  {
    rank: 2,
    name: 'Kupid AI',
    slug: 'kupid-ai',
    url: 'https://www.kupid.ai/',
    tagline: 'Best for men who care more about natural conversation than endless galleries.',
    bestFor: 'Best conversation quality',
    price: 'From ~$3/mo. One of the lowest entry prices in the category.',
    freeTier: 'Usable free tier, no credit card required',
    maturity: 'Full NSFW on paid plans',
    categories: ['conversation', 'budget', 'best-overall'],
    scores: { chat: 9.4, visuals: 8.1, memory: 8.5, privacy: 8.0, value: 9.2 },
    summary: 'Kupid AI is the pick for users who get bored when a companion only looks good. Its reputation is built around more natural replies, smoother topic changes, and better value than many visual-first competitors.',
    whyItWins: ['Conversation quality is consistently praised in review roundups', 'Lower starting price than many premium competitors', 'Custom characters, images, and voice features', 'Good choice for users testing the category carefully'],
    tradeoffs: ['Visual polish is not as strong as Candy AI', 'Smaller cultural footprint than Replika or Character.AI', 'Feature details and pricing can shift by promotion'],
    reddit: 'Reddit discussions about the category often complain that many apps flatten after the first hour. Kupid AI is the type of app those users are looking for: less gimmick, more sustained chat.',
    review: 'If the reader imagines himself actually talking every night rather than only generating pictures, Kupid AI should be near the top of the list. It is not the flashiest recommendation, but the value proposition is strong: better conversation, less friction, and a price point that makes experimentation less painful.',
  },
  {
    rank: 3,
    name: 'DreamGF',
    slug: 'dreamgf',
    url: 'https://dreamgf.ai/',
    tagline: 'Best for creating a very specific visual type and fantasy profile.',
    bestFor: 'Best visual customization',
    price: 'From ~$5.99/mo. Free daily credits for returning users.',
    freeTier: 'Yes, limited daily credits',
    maturity: 'Full NSFW on paid plans',
    categories: ['realistic-visuals', 'roleplay'],
    scores: { chat: 8.0, visuals: 9.2, memory: 7.4, privacy: 7.8, value: 8.3 },
    summary: 'DreamGF is for users with a precise visual fantasy. It gives granular control over appearance, personality, and style, making it a strong option for men who want to design a companion rather than browse a prebuilt catalog.',
    whyItWins: ['Deep appearance customization', 'Good image quality when prompts are dialed in', 'Casual, fantasy-forward experience', 'Useful for users who value control over discovery'],
    tradeoffs: ['Character consistency across images can vary', 'Memory is not the main selling point', 'Voice quality is not generally considered category-leading'],
    reddit: 'Reddit comments commonly describe DreamGF as strong on customization and visuals but weaker on memory than the best conversation-first tools.',
    review: 'DreamGF is not trying to be the most emotionally sophisticated companion. Its promise is simpler: build the look and vibe you want, then explore from there. That makes it excellent for visual fantasy and less ideal for users who want a companion that slowly learns their life story.',
  },
  {
    rank: 4,
    name: 'CrushOn AI',
    slug: 'crushon-ai',
    url: 'https://crushon.ai/',
    tagline: 'Best huge character library for unfiltered roleplay and fast experimentation.',
    bestFor: 'Best character library',
    price: 'From ~$3.90/mo. ~100 free messages/day on free tier.',
    freeTier: 'Generous: ~100 messages/day free',
    maturity: 'Full NSFW, unfiltered',
    categories: ['roleplay', 'budget', 'anime-fantasy'],
    scores: { chat: 8.6, visuals: 6.9, memory: 7.5, privacy: 7.5, value: 9.0 },
    summary: 'CrushOn AI is strongest when you want to browse characters and start roleplay immediately. It became a popular alternative for users frustrated with stricter content filters elsewhere.',
    whyItWins: ['Massive library of community characters', 'Strong free-tier reputation', 'Good for roleplay, anime, celebrities, and fiction scenarios', 'Low friction for trying many different companion types'],
    tradeoffs: ['Less visual-first than Candy AI or DreamGF', 'Quality varies by character creator', 'Not the best choice for one polished, realistic companion'],
    reddit: 'Reddit users often mention CrushOn AI in the context of Character.AI alternatives, especially when discussing content filters and character variety.',
    review: 'CrushOn AI is for the browser, not the builder. If the reader wants to try ten different personalities before committing, it is a better fit than a highly curated app. If he wants premium visual realism, it should sit below Candy AI and DreamGF.',
  },
  {
    rank: 5,
    name: 'OurDream AI',
    slug: 'ourdream-ai',
    url: 'https://ourdream.ai/',
    tagline: 'Best multimedia sandbox for chat, images, video, and group-style companion play.',
    bestFor: 'Best multimedia companion',
    price: 'From ~$9.99/mo. Frequent promotions discount entry.',
    freeTier: 'Limited free messages',
    maturity: 'Full NSFW including video',
    categories: ['voice-video', 'realistic-visuals', 'roleplay'],
    scores: { chat: 8.0, visuals: 8.9, memory: 7.6, privacy: 7.7, value: 8.0 },
    summary: 'OurDream AI belongs high on the list because it treats multimedia as central rather than secondary. It is for users who want chat, pictures, short videos, and social-style discovery in one place.',
    whyItWins: ['Chat, image, and video are all part of the core experience', 'Community-made characters provide quick starts', 'Useful if visual variety matters as much as conversation', 'Strong fit for fantasy exploration'],
    tradeoffs: ['Long chats can feel more predictable than conversation-first apps', 'The full experience depends on paid credits', 'Less established than older players like Replika'],
    reddit: 'Reddit-style ranking posts tend to place OurDream near other visual and multimedia-first apps. The appeal is breadth; the caution is whether chats remain interesting long term.',
    review: 'OurDream AI is best for the user who does not want a text-only relationship. It gives the feeling of a media-rich companion world. That makes it exciting, but it also means a buyer should watch token usage and test conversation depth before upgrading heavily.',
  },
  {
    rank: 6,
    name: 'Replika',
    slug: 'replika',
    url: 'https://replika.com/',
    tagline: 'Best long-term emotional companion and memory-focused AI friend.',
    bestFor: 'Best emotional companion',
    price: 'Free tier available. Pro from ~$7.99/mo.',
    freeTier: 'Yes, free chat with limited features',
    maturity: 'NSFW on Pro only. Companion-first positioning.',
    categories: ['conversation', 'emotional-companion'],
    scores: { chat: 8.8, visuals: 7.1, memory: 9.2, privacy: 8.0, value: 7.8 },
    summary: 'Replika is the veteran of the AI companion world. It is less of a fantasy-image tool and more of a persistent companion that learns over time.',
    whyItWins: ['Long track record since 2017', 'Strong memory and emotional continuity', 'Good for loneliness, daily check-ins, and supportive conversation', 'More mainstream than many adult-first competitors'],
    tradeoffs: ['Not the strongest image-generation platform', 'Adult functionality has changed over time and depends on plan/policy', 'May feel too therapy-adjacent for users seeking fantasy entertainment'],
    reddit: 'The Replika subreddit contains intense long-term user stories, including both positive support experiences and concerns about attachment. That makes Replika powerful but emotionally complicated.',
    review: 'For older users who want a steady voice more than a flashy gallery, Replika deserves respect. It is the closest thing on this list to a durable AI friend. But if the buying intent is adult fantasy, Replika should not be the first click.',
  },
  {
    rank: 7,
    name: 'Kindroid',
    slug: 'kindroid',
    url: 'https://kindroid.ai/',
    tagline: 'Best for building one consistent custom companion with memory and personality depth.',
    bestFor: 'Best custom long-term companion',
    price: 'Free trial available. Paid plans from ~$14/mo depending on tier.',
    freeTier: 'Limited free trial',
    maturity: 'Full NSFW on paid plans',
    categories: ['conversation', 'emotional-companion'],
    scores: { chat: 8.9, visuals: 7.8, memory: 8.9, privacy: 8.1, value: 7.9 },
    summary: 'Kindroid is for users who want to craft a companion with a backstory, stable personality, and ongoing memory rather than swipe through a gallery.',
    whyItWins: ['Strong customization of companion identity', 'Good long-term continuity', 'Appeals to users who write detailed prompts and backstories', 'Selfie and voice features add texture without dominating the product'],
    tradeoffs: ['Less instantly flashy than Candy AI', 'Requires more setup effort', 'May overwhelm casual users who just want a quick start'],
    reddit: 'In broader AI companion discussions, users who care about persistence and depth tend to favor tools like Kindroid over shallow image-first apps.',
    review: 'Kindroid is the serious hobbyist pick. It rewards a user who knows what personality he wants and is willing to invest in setup. For buyers who value consistency over novelty, that setup cost pays off: less chaos, stronger continuity, and a companion that feels stable rather than disposable.',
  },
  {
    rank: 8,
    name: 'Character.AI',
    slug: 'character-ai',
    url: 'https://character.ai/',
    tagline: 'Best free SFW character-chat platform, but not an adult AI girlfriend site.',
    bestFor: 'Best free SFW option',
    price: 'Free unlimited messages. c.ai+ from ~$9.99/mo for priority.',
    freeTier: 'Very generous: unlimited free messages',
    maturity: 'SFW only. Strict content filters.',
    categories: ['conversation', 'budget', 'anime-fantasy'],
    scores: { chat: 8.7, visuals: 5.8, memory: 7.1, privacy: 7.7, value: 9.4 },
    summary: 'Character.AI remains important because so many people try it first. It has a huge character library and excellent free access, but strict adult-content filters mean it is not a direct substitute for adult AI girlfriend apps.',
    whyItWins: ['Huge free character ecosystem', 'Strong chat quality', 'No credit card needed to explore', 'Good for SFW companionship and fiction characters'],
    tradeoffs: ['Not suitable for NSFW use', 'Content filters can break immersion for romance use cases', 'Image and adult multimedia features are not the point'],
    reddit: 'Many Reddit AI companion discussions start from Character.AI and then branch into alternatives after users hit filters. It is a benchmark, not always the final destination.',
    review: 'Character.AI is a must-mention because it sets expectations for free chat quality. But on this site it should be framed honestly: great free SFW character chat, poor fit for users searching specifically for adult AI girlfriends.',
  },
  {
    rank: 9,
    name: 'GirlfriendGPT',
    slug: 'girlfriendgpt',
    url: 'https://girlfriendgpt.com/',
    tagline: 'Best simple fantasy chat for users who want direct girlfriend-style roleplay.',
    bestFor: 'Best simple fantasy chat',
    price: 'Free tier available. Premium from ~$9.99/mo.',
    freeTier: 'Yes, basic free access',
    maturity: 'NSFW available on paid tiers',
    categories: ['roleplay', 'anime-fantasy', 'budget'],
    scores: { chat: 8.0, visuals: 7.0, memory: 7.0, privacy: 7.2, value: 8.1 },
    summary: 'GirlfriendGPT is a straightforward option for flirty and fantasy girlfriend interactions. It is not the most premium product on this list, but simplicity can be a benefit.',
    whyItWins: ['Direct positioning around girlfriend-style chat', 'Easy to understand for beginners', 'Useful fantasy and roleplay categories', 'Freemium access'],
    tradeoffs: ['Less distinctive design than Candy AI', 'Not the top visual or memory pick', 'May feel basic compared with full multimedia platforms'],
    reddit: 'Reddit ranking posts mention GirlfriendGPT as simple, fun, and focused on fantasy girlfriend interactions rather than deep companion engineering.',
    review: 'GirlfriendGPT works as a middle-of-the-list recommendation: simple enough for beginners, adult enough for the niche, but not dominant on visuals, memory, or multimedia. It is worth testing if the top picks feel too elaborate.',
  },
  {
    rank: 10,
    name: 'Nectar AI',
    slug: 'nectar-ai',
    url: 'https://nectar.ai/',
    tagline: 'Best polished alternative for users who want attractive characters and multimedia extras.',
    bestFor: 'Best polished alternative',
    price: 'Free tier available. Premium from ~$9.99/mo.',
    freeTier: 'Limited free messages',
    maturity: 'NSFW available on paid tiers',
    categories: ['realistic-visuals', 'voice-video', 'roleplay'],
    scores: { chat: 7.9, visuals: 8.3, memory: 7.2, privacy: 7.4, value: 7.8 },
    summary: 'Nectar AI shows up in user rankings as a polished companion app with unique characters, attractive chat design, and multimedia extras.',
    whyItWins: ['Polished interface', 'Good character variety', 'Multimedia features broaden the experience', 'A reasonable alternative if Candy AI or DreamGF do not fit'],
    tradeoffs: ['Less consensus around category leadership', 'Pricing and feature limits should be checked before purchase', 'Not as established as Replika or Character.AI'],
    reddit: 'Reddit-style lists describe Nectar AI as polished, unique, and feature-rich, but it does not appear as consistently as Candy AI, DreamGF, CrushOn AI, or Replika.',
    review: 'Nectar AI is a useful tenth pick because it gives readers another modern, visual-first option without pretending it owns the category. It should be presented as a polished alternative worth testing after the obvious leaders.',
  },
];

export const services = rawServices.map((service, index) => ({
  ...service,
  rating: computeRating(service.scores),
  datePublished: staggerDate(index, rawServices.length),
  dateModified: `${site.year}-07-13`,
}));

export const categories = [
  { slug: 'best-overall', title: 'Best Overall AI Girlfriend Apps', deck: 'Balanced picks for men who want strong chat, visuals, privacy, and value without overthinking the category.', intro: 'Start here if you want one confident recommendation instead of a rabbit hole.' },
  { slug: 'realistic-visuals', title: 'Best Realistic Visual AI Girlfriends', deck: 'Apps with the strongest image generation, visual customization, and polished character presentation.', intro: 'These tools are for users who care about how the companion looks as much as how she chats.' },
  { slug: 'conversation', title: 'Best AI Girlfriends for Conversation', deck: 'Conversation-first companions with better memory, tone, and long-session coherence.', intro: 'Reddit users repeatedly say novelty fades when memory fails. This category prioritizes depth over flash.' },
  { slug: 'roleplay', title: 'Best AI Girlfriend Roleplay Apps', deck: 'Fantasy, romance, and adult roleplay platforms with fewer restrictions and more character variety.', intro: 'Best for users who want scenarios, personas, and creative exploration.' },
  { slug: 'voice-video', title: 'Best AI Girlfriends With Voice and Video', deck: 'Media-rich services that go beyond text with voice notes, calls, videos, and generated scenes.', intro: 'Choose these if plain texting feels too flat.' },
  { slug: 'budget', title: 'Best Free and Budget AI Girlfriend Apps', deck: 'Useful free tiers and lower-cost subscriptions for testing before paying.', intro: 'Free rarely means unlimited in this market, but several options are good enough to evaluate before upgrading.' },
  { slug: 'anime-fantasy', title: 'Best Anime and Fantasy AI Girlfriends', deck: 'Character-library and fantasy-forward platforms for anime, game, and fiction-style companions.', intro: 'A good fit when realism is less important than character range and imagination.' },
  { slug: 'emotional-companion', title: 'Best Emotional AI Companions', deck: 'Companion-first platforms built around memory, support, and long-term continuity.', intro: 'These are more about daily presence and less about image generation.' },
];

const corePosts = [
  {
    slug: 'how-to-choose-ai-girlfriend-app',
    title: 'How to Choose an AI Girlfriend App Without Wasting Money',
    excerpt: 'A practical buyer guide covering chat quality, image credits, privacy, memory, and adult content policies.',
    body: ['Start with your real use case. If you want conversation after work, pay more attention to memory and tone than image galleries. If you want fantasy visuals, check image quality, credit pricing, and consistency before subscribing.', 'The biggest mistake is buying the first app with impressive screenshots. Many platforms feel amazing for an hour and repetitive by day two. Test the free tier with the same prompts across several apps: a casual check-in, a personal detail to remember, a roleplay setup, and a follow-up the next day.', 'For privacy-conscious buyers, billing clarity matters. Use a secondary email, avoid sharing identifying personal details, read cancellation rules, and confirm how billing appears on statements. Treat AI companion apps like any other consumer AI product that stores sensitive conversations.'],
  },
  {
    slug: 'types-of-ai-companions',
    title: 'The Main Types of AI Companions: Girlfriend, Roleplay, Emotional Support, and Fantasy',
    excerpt: 'Not every AI companion is built for the same job. Here is the plain-English breakdown.',
    body: ['AI girlfriend apps usually combine flirtation, conversation, customization, and sometimes adult features. Roleplay apps focus on scenarios and characters. Emotional companion apps focus on memory, daily support, and continuity. Fantasy platforms focus on visuals, anime, celebrities, or fictional worlds.', 'The best category depends on what would make you return after the novelty wears off. If you want consistency, choose memory-first. If you want variety, choose character-library apps. If you want immersion, choose voice and video. If you want a polished all-rounder, start with Candy AI or Kupid AI.'],
  },
  {
    slug: 'ai-girlfriend-privacy-safety',
    title: 'AI Girlfriend Privacy and Safety: What Adult Users Should Know',
    excerpt: 'Private does not mean invisible. Here is how to use companion apps with adult judgment.',
    body: ['Most AI companion platforms store conversations, preferences, and account data. That does not mean they are scams, but it does mean you should behave as if anything you type could be retained by a third-party service.', 'Use a separate email address, avoid real names and workplace details, and do not share financial, medical, or family secrets. Check whether the service offers account deletion, two-factor authentication, discreet billing, and clear support channels.', 'AI companions can be enjoyable, comforting, and creative. They are not a replacement for professional care, human relationships, or legal/financial advice. Healthy use means keeping the fantasy clearly labeled as fantasy.'],
  },
  {
    slug: 'why-memory-matters',
    title: 'Why Memory Matters More Than Sexy Screenshots',
    excerpt: 'Reddit users keep saying the same thing: the first hour is easy, the second week is hard.',
    body: ['The first hour of an AI girlfriend app is usually designed to impress you. The real test is whether it remembers your preferences, keeps a consistent tone, and does not repeat the same lines after a few sessions.', 'Good memory creates the feeling of continuity. Bad memory breaks the illusion immediately. That is why Replika, Kindroid, and Kupid AI deserve attention even when visual-first apps look more exciting.', 'Before paying, tell the app a harmless personal preference, leave, return later, and ask a natural follow-up. If it forgets everything, treat it as entertainment rather than a long-term companion.'],
  },
  {
    slug: 'free-vs-paid-ai-girlfriend-apps',
    title: 'Free vs Paid AI Girlfriend Apps: What You Actually Get',
    excerpt: 'Free tiers are useful for testing, but image, voice, and video features cost real money to run.',
    body: ['Free tiers are best for judging tone, interface, and whether the app annoys you with paywalls. They are rarely the best way to experience image generation, voice, or video.', 'Paid plans usually unlock longer conversations, fewer queues, adult features, image credits, voice notes, and custom companions. The danger is not paying; the danger is paying before you know what you value.', 'A practical approach: test three apps for one week, use the same prompts, and only subscribe to the one you actually returned to without forcing yourself.'],
  },
  {
    slug: 'ai-girlfriend-for-men-over-40',
    title: 'Best AI Girlfriend Apps for Men Over 40',
    excerpt: 'A calmer guide for readers who want privacy, clarity, and less internet chaos.',
    body: ['Men over 40 often want different things from AI companion apps than younger users. The priorities tend to be privacy, ease of use, attractive design, adult tone, clear pricing, and a companion that does not feel like a meme.', 'Candy AI is the strongest polished all-rounder. Kupid AI is a better pick if conversation matters most. Replika and Kindroid fit users who want continuity and emotional presence. CrushOn AI is better for character variety but can feel more chaotic.', 'Avoid apps that make cancellation hard, hide pricing behind too many token layers, or feel designed only around novelty. The best app is the one you can use comfortably, privately, and without feeling manipulated by credits.'],
  },
  {
    slug: 'adult-roleplay-vs-emotional-companionship',
    title: 'Adult Roleplay vs Emotional Companionship: Know the Difference Before You Subscribe',
    excerpt: 'Two apps can both say “AI girlfriend” while solving completely different problems.',
    body: ['Adult roleplay apps optimize for fantasy, freedom, visuals, and scenario variety. Emotional companion apps optimize for memory, check-ins, and an ongoing sense of being known.', 'The mismatch creates disappointment. Someone seeking comfort may find a fantasy app shallow. Someone seeking explicit roleplay may find an emotional companion too restrained. Decide which experience you want before comparing prices.', 'If you are unsure, test one from each category: Candy AI or DreamGF for visual fantasy, Kupid AI for conversation, Replika or Kindroid for long-term companionship, and CrushOn AI for character-library roleplay.'],
  },
  {
    slug: 'reddit-sentiment-ai-girlfriend-apps',
    title: 'What Reddit Gets Right About AI Girlfriend Apps',
    excerpt: 'The most useful Reddit comments are not rankings. They are warnings about what gets boring.',
    body: ['Reddit discussions are messy, promotional, and sometimes contradictory. But a few themes show up again and again: memory matters, aggressive paywalls annoy users, and image quality alone does not keep people engaged.', 'A useful Reddit-informed test is simple: ask whether users still liked the app after a week. First impressions are cheap. Long-session coherence, consistent personality, and reasonable pricing are harder to fake.', 'This site uses Reddit as a sentiment signal, not as proof. Rankings should combine public reviews, product positioning, feature checks, and direct testing over time.'],
  },
];

const keywordTopics = [
  ['best-ai-girlfriend-apps-2026', 'Best AI Girlfriend Apps in 2026', 'best AI girlfriend apps 2026', 'A search-focused guide to the strongest AI girlfriend apps for chat, images, memory, voice, video, and privacy.', 'best-overall', ['candy-ai', 'kupid-ai', 'dreamgf']],
  ['best-free-ai-girlfriend-apps', 'Best Free AI Girlfriend Apps to Try First', 'best free AI girlfriend apps', 'How to test free AI girlfriend apps before paying for credits, images, or voice features.', 'budget', ['character-ai', 'crushon-ai', 'kupid-ai']],
  ['free-ai-girlfriend-no-credit-card', 'Free AI Girlfriend Apps With No Credit Card: What to Expect', 'free AI girlfriend no credit card', 'A practical guide to no-card trials, message limits, privacy tradeoffs, and upgrade traps.', 'budget', ['character-ai', 'crushon-ai', 'girlfriendgpt']],
  ['ai-girlfriend-with-voice', 'Best AI Girlfriend Apps With Voice Messages and Calls', 'AI girlfriend with voice', 'Voice can make an AI companion feel more present, but quality and limits vary widely.', 'voice-video', ['candy-ai', 'kupid-ai', 'replika']],
  ['ai-girlfriend-with-video', 'Best AI Girlfriend Apps With Video Features', 'AI girlfriend with video', 'How video messages, generated clips, and live-style experiences differ across companion apps.', 'voice-video', ['candy-ai', 'ourdream-ai', 'nectar-ai']],
  ['ai-girlfriend-with-pictures', 'Best AI Girlfriend Apps That Send Pictures', 'AI girlfriend with pictures', 'What to check before paying for selfies, image credits, visual consistency, and realistic companion photos.', 'realistic-visuals', ['candy-ai', 'dreamgf', 'ourdream-ai']],
  ['realistic-ai-girlfriend-apps', 'Most Realistic AI Girlfriend Apps', 'realistic AI girlfriend apps', 'Realism is more than pretty images: chat flow, memory, voice, and consistency all matter.', 'realistic-visuals', ['candy-ai', 'dreamgf', 'kupid-ai']],
  ['ai-girlfriend-app-privacy', 'AI Girlfriend App Privacy: Questions to Ask Before You Sign Up', 'AI girlfriend app privacy', 'A privacy checklist for adult companion apps, including data retention, billing, account deletion, and sensitive chats.', 'emotional-companion', ['replika', 'kindroid', 'candy-ai']],
  ['discreet-billing-ai-girlfriend', 'Discreet Billing for AI Girlfriend Apps: What It Really Means', 'AI girlfriend discreet billing', 'Discreet billing is a claim, not a guarantee. Here is how cautious users should evaluate it.', 'budget', ['candy-ai', 'kupid-ai', 'dreamgf']],
  ['ai-girlfriend-memory', 'Best AI Girlfriend Apps for Memory and Long-Term Chat', 'AI girlfriend memory', 'Why memory determines whether an AI companion feels consistent after the first week.', 'conversation', ['replika', 'kindroid', 'kupid-ai']],
  ['ai-companion-loneliness', 'Can AI Companions Help With Loneliness?', 'AI companion loneliness', 'A balanced look at AI companions for loneliness, emotional support, and healthy boundaries.', 'emotional-companion', ['replika', 'kindroid', 'kupid-ai']],
  ['ai-girlfriend-for-men-over-40-guide', 'AI Girlfriend Apps for Men Over 40: A Practical Buyer Guide', 'AI girlfriend for men over 40', 'Privacy, ease of use, mature tone, and billing clarity matter more for older buyers.', 'best-overall', ['candy-ai', 'kupid-ai', 'replika']],
  ['character-ai-alternatives-ai-girlfriend', 'Character.AI Alternatives for AI Girlfriend Chat', 'Character AI alternatives AI girlfriend', 'Where to go when Character.AI feels too filtered or too SFW for romance and roleplay.', 'roleplay', ['crushon-ai', 'girlfriendgpt', 'nectar-ai']],
  ['character-ai-no-filter-alternatives', 'No-Filter Character.AI Alternatives: What to Know', 'Character AI no filter alternatives', 'Unfiltered roleplay apps can be fun, but memory, safety, and quality vary sharply.', 'roleplay', ['crushon-ai', 'girlfriendgpt', 'dreamgf']],
  ['candy-ai-alternatives', 'Best Candy AI Alternatives', 'Candy AI alternatives', 'Candy AI is the benchmark for polish, but some users may prefer conversation, budget, or deeper memory.', 'best-overall', ['kupid-ai', 'dreamgf', 'ourdream-ai']],
  ['dreamgf-alternatives', 'Best DreamGF Alternatives for Visual AI Companions', 'DreamGF alternatives', 'If DreamGF is not the right fit, compare other visual-first and multimedia companion platforms.', 'realistic-visuals', ['candy-ai', 'ourdream-ai', 'nectar-ai']],
  ['kupid-ai-vs-candy-ai', 'Kupid AI vs Candy AI: Which Should You Try First?', 'Kupid AI vs Candy AI', 'A use-case comparison between conversation-first and polished multimedia AI girlfriend apps.', 'best-overall', ['kupid-ai', 'candy-ai', 'replika']],
  ['dreamgf-vs-candy-ai', 'DreamGF vs Candy AI: Visual Customization or All-Around Polish?', 'DreamGF vs Candy AI', 'Both apps appeal to visual users, but they differ in polish, customization, and overall balance.', 'realistic-visuals', ['dreamgf', 'candy-ai', 'ourdream-ai']],
  ['replika-vs-ai-girlfriend-apps', 'Replika vs AI Girlfriend Apps: Emotional Companion or Fantasy App?', 'Replika vs AI girlfriend apps', 'Replika is still important, but it solves a different problem from adult visual companion sites.', 'emotional-companion', ['replika', 'kindroid', 'candy-ai']],
  ['best-ai-girlfriend-for-conversation', 'Best AI Girlfriend Apps for Real Conversation', 'best AI girlfriend for conversation', 'A chat-first guide for users who care about natural replies, topic flow, and long-session coherence.', 'conversation', ['kupid-ai', 'replika', 'kindroid']],
  ['best-ai-girlfriend-for-roleplay', 'Best AI Girlfriend Apps for Roleplay', 'best AI girlfriend for roleplay', 'How to compare fantasy scenarios, character libraries, content limits, and memory for roleplay.', 'roleplay', ['crushon-ai', 'girlfriendgpt', 'dreamgf']],
  ['anime-ai-girlfriend-apps', 'Best Anime AI Girlfriend Apps', 'anime AI girlfriend apps', 'Anime and fantasy users should prioritize character variety, prompt control, and roleplay depth.', 'anime-fantasy', ['crushon-ai', 'character-ai', 'girlfriendgpt']],
  ['ai-girlfriend-sexting-apps', 'AI Girlfriend Sexting Apps: Adult Buyer Checklist', 'AI girlfriend sexting apps', 'What adults should know about boundaries, privacy, content policies, and subscription traps.', 'roleplay', ['candy-ai', 'crushon-ai', 'girlfriendgpt']],
  ['nsfw-ai-chat-apps', 'NSFW AI Chat Apps: How to Compare Them Safely', 'NSFW AI chat apps', 'Search results are crowded with hype; this guide focuses on privacy, memory, pricing, and realistic expectations.', 'roleplay', ['crushon-ai', 'candy-ai', 'dreamgf']],
  ['uncensored-ai-girlfriend-chat', 'Uncensored AI Girlfriend Chat: What the Term Really Means', 'uncensored AI girlfriend chat', 'Uncensored can mean different things depending on platform policy, region, and paid tier.', 'roleplay', ['crushon-ai', 'girlfriendgpt', 'nectar-ai']],
  ['ai-girlfriend-image-generation', 'AI Girlfriend Image Generation: What Makes It Good?', 'AI girlfriend image generation', 'Image quality depends on consistency, prompt control, credit cost, and whether the character stays recognizable.', 'realistic-visuals', ['candy-ai', 'dreamgf', 'ourdream-ai']],
  ['ai-girlfriend-video-generation', 'AI Girlfriend Video Generation: Hype vs Reality', 'AI girlfriend video generation', 'Generated video can be impressive, but buyers should understand length, cost, realism, and limits.', 'voice-video', ['ourdream-ai', 'candy-ai', 'nectar-ai']],
  ['ai-girlfriend-voice-calls', 'AI Girlfriend Voice Calls: Are They Worth Paying For?', 'AI girlfriend voice calls', 'Voice calls add presence, but latency, voice quality, and personality consistency determine value.', 'voice-video', ['replika', 'kupid-ai', 'candy-ai']],
  ['virtual-girlfriend-apps', 'Virtual Girlfriend Apps vs AI Girlfriend Apps', 'virtual girlfriend apps', 'Modern AI girlfriend platforms combine chatbots, images, roleplay, and personalization into a broader virtual companion experience.', 'best-overall', ['candy-ai', 'dreamgf', 'replika']],
  ['ai-dating-chatbots', 'AI Dating Chatbots: What They Are and Who They Are For', 'AI dating chatbots', 'AI dating chatbots can be practice tools, fantasy apps, or emotional companions depending on design.', 'conversation', ['kupid-ai', 'replika', 'character-ai']],
  ['ai-relationship-bots', 'AI Relationship Bots: Companion, Fantasy, or Habit?', 'AI relationship bots', 'Relationship bots can feel supportive, entertaining, or addictive. Understanding the category helps users choose responsibly.', 'emotional-companion', ['replika', 'kindroid', 'kupid-ai']],
  ['custom-ai-girlfriend', 'How to Create a Custom AI Girlfriend', 'custom AI girlfriend', 'Customization works best when you define personality, tone, boundaries, memory, and visual style before chasing features.', 'realistic-visuals', ['dreamgf', 'candy-ai', 'kindroid']],
  ['ai-girlfriend-personality-types', 'AI Girlfriend Personality Types: Sweet, Flirty, Supportive, Fantasy, and More', 'AI girlfriend personality types', 'Choosing personality first prevents disappointment when the app looks good but feels wrong.', 'conversation', ['kupid-ai', 'kindroid', 'candy-ai']],
  ['ai-girlfriend-prompts', 'AI Girlfriend Prompts That Test Quality Fast', 'AI girlfriend prompts', 'Use a small prompt set to test memory, warmth, roleplay, boundaries, and consistency before subscribing.', 'conversation', ['kupid-ai', 'replika', 'kindroid']],
  ['ai-girlfriend-red-flags', 'AI Girlfriend App Red Flags Before You Pay', 'AI girlfriend app red flags', 'Watch for vague pricing, aggressive paywalls, weak cancellation flows, generic replies, and unsupported privacy claims.', 'budget', ['candy-ai', 'kupid-ai', 'dreamgf']],
  ['ai-girlfriend-cancellation', 'How to Avoid Subscription Problems With AI Girlfriend Apps', 'AI girlfriend cancellation', 'A practical cancellation and billing checklist for users testing adult companion apps.', 'budget', ['candy-ai', 'crushon-ai', 'replika']],
  ['ai-girlfriend-credit-pricing', 'AI Girlfriend Credits and Tokens Explained', 'AI girlfriend credits tokens', 'Image, voice, and video features often run on credits. Learn how token models affect real cost.', 'budget', ['candy-ai', 'dreamgf', 'ourdream-ai']],
  ['best-ai-companion-apps', 'Best AI Companion Apps: Girlfriend, Friend, Roleplay, and Support', 'best AI companion apps', 'A broader companion guide for users who are not sure whether they want romance, friendship, fantasy, or support.', 'emotional-companion', ['replika', 'kindroid', 'character-ai']],
  ['ai-girlfriend-vs-human-relationship', 'AI Girlfriend vs Human Relationship: Healthy Boundaries', 'AI girlfriend vs human relationship', 'AI companions can be enjoyable, but healthy use means understanding what they can and cannot replace.', 'emotional-companion', ['replika', 'kindroid', 'kupid-ai']],
  ['are-ai-girlfriend-apps-safe', 'Are AI Girlfriend Apps Safe?', 'are AI girlfriend apps safe', 'Safety depends on privacy practices, user behavior, billing clarity, and emotional boundaries.', 'emotional-companion', ['replika', 'candy-ai', 'kindroid']],
  ['ai-girlfriend-data-leaks', 'AI Girlfriend Data Leaks: Why Privacy Matters', 'AI girlfriend data leaks', 'Sensitive companion chats deserve extra caution because romantic and adult data can be uniquely personal.', 'emotional-companion', ['replika', 'kindroid', 'candy-ai']],
  ['ai-girlfriend-reddit-reviews', 'AI Girlfriend Reddit Reviews: How to Read Them Skeptically', 'AI girlfriend Reddit reviews', 'Reddit can reveal user frustrations, but it also contains promotion, astroturfing, and incomplete anecdotes.', 'best-overall', ['candy-ai', 'kupid-ai', 'dreamgf']],
  ['best-ai-girlfriend-reddit', 'Best AI Girlfriend According to Reddit: What to Trust', 'best AI girlfriend Reddit', 'The useful Reddit signal is not the ranking; it is repeated complaints about memory, filters, and paywalls.', 'best-overall', ['candy-ai', 'crushon-ai', 'replika']],
  ['ai-girlfriend-apps-for-android', 'Best AI Girlfriend Apps for Android and Mobile Web', 'AI girlfriend apps Android', 'Mobile users should compare app-store rules, web access, notifications, privacy, and payment flows.', 'budget', ['replika', 'character-ai', 'candy-ai']],
  ['ai-girlfriend-apps-for-ios', 'Best AI Girlfriend Apps for iPhone and iOS Users', 'AI girlfriend apps iOS', 'iOS users often face stricter app-store limits, so browser-based access can matter.', 'budget', ['replika', 'character-ai', 'kupid-ai']],
  ['browser-based-ai-girlfriend', 'Browser-Based AI Girlfriend Apps: Why Web Access Matters', 'browser based AI girlfriend', 'Web apps can be more discreet, easier to test, and less constrained by app-store policies.', 'budget', ['candy-ai', 'kupid-ai', 'dreamgf']],
  ['ai-girlfriend-no-sign-up', 'AI Girlfriend No Sign Up: Convenience vs Privacy', 'AI girlfriend no sign up', 'No-sign-up tools reduce friction, but serious memory and privacy controls usually require an account.', 'budget', ['character-ai', 'crushon-ai', 'girlfriendgpt']],
  ['best-ai-girlfriend-for-married-men', 'AI Girlfriend Apps for Married Men: Privacy and Boundaries', 'AI girlfriend married men', 'A frank guide to privacy, emotional boundaries, and why secrecy-sensitive use needs extra caution.', 'emotional-companion', ['replika', 'candy-ai', 'kindroid']],
  ['ai-girlfriend-for-social-anxiety', 'AI Girlfriend Apps and Social Anxiety: Helpful Practice or Avoidance?', 'AI girlfriend social anxiety', 'AI companions can provide low-pressure conversation practice, but they should not become the only social outlet.', 'emotional-companion', ['replika', 'kupid-ai', 'character-ai']],
  ['how-ai-girlfriends-work', 'How AI Girlfriends Work: Plain-English Explanation', 'how AI girlfriends work', 'AI girlfriends combine language models, character prompts, memory systems, media generation, and subscription layers.', 'conversation', ['replika', 'candy-ai', 'kupid-ai']],
  ['future-of-ai-girlfriends', 'The Future of AI Girlfriends: Voice, Video, Memory, and Avatars', 'future of AI girlfriends', 'The category is moving toward more persistent memory, richer voice, generated video, and possibly 3D or robot interfaces.', 'voice-video', ['candy-ai', 'ourdream-ai', 'replika']],
];

const serviceMap = Object.fromEntries(services.map((service) => [service.slug, service]));
const categoryMap = Object.fromEntries(categories.map((category) => [category.slug, category]));

const keywordPosts = keywordTopics.map(([slug, title, keyword, excerpt, categorySlug, serviceSlugs], index) => {
  const category = categoryMap[categorySlug];
  const linkedServices = serviceSlugs.map((serviceSlug) => serviceMap[serviceSlug]).filter(Boolean);
  const primary = linkedServices[0] ?? services[0];
  const secondary = linkedServices[1] ?? services[1];
  const tertiary = linkedServices[2] ?? services[2];
  return {
    slug,
    title,
    keyword,
    excerpt,
    relatedCategory: categorySlug,
    relatedServices: linkedServices.map((service) => service.slug),
    relatedPosts: [corePosts[index % corePosts.length].slug, corePosts[(index + 3) % corePosts.length].slug],
    body: [
      `People searching for "${keyword}" usually want a shortcut, but the right answer depends on the job. Some apps are built for realistic images, some for conversation, some for emotional continuity, and some for adult roleplay. A useful shortlist starts with the ${category.title.toLowerCase()} category, then compares ${primary.name}, ${secondary.name}, and ${tertiary.name}.`,
      `${primary.name} is the first app to check when you want ${primary.bestFor.toLowerCase()}. ${secondary.name} belongs in the comparison because it is strongest for ${secondary.bestFor.toLowerCase()}. ${tertiary.name} gives you another angle, especially if your priority is ${tertiary.bestFor.toLowerCase()}. Do not judge any of them from screenshots alone; test tone, memory, paywall timing, and whether the app still feels useful after a second session.`,
      `Before subscribing, run the same test prompts across at least two services. Ask for a normal conversation, share one harmless preference, try a roleplay setup if that matters to you, and return later to see whether the companion remembers context. For privacy-sensitive adult use, use a separate email, avoid real personal details, and verify cancellation and billing terms before entering payment details.`,
    ],
  };
});

const longTailModifiers = [
  ['for-beginners', 'for Beginners', 'beginner guide'],
  ['with-good-memory', 'With Good Memory', 'memory and continuity'],
  ['with-realistic-photos', 'With Realistic Photos', 'realistic photos'],
  ['with-voice-messages', 'With Voice Messages', 'voice messages'],
  ['with-video-clips', 'With Video Clips', 'video clips'],
  ['for-private-chat', 'For Private Chat', 'private chat'],
  ['for-roleplay', 'For Roleplay', 'roleplay'],
  ['for-emotional-support', 'For Emotional Support', 'emotional support'],
  ['without-too-many-paywalls', 'Without Too Many Paywalls', 'paywall-light testing'],
  ['for-mobile-web', 'For Mobile Web', 'mobile web'],
];

const longTailBases = [
  ['candy-ai-alternatives', 'Candy AI Alternatives', 'best-overall', ['candy-ai', 'kupid-ai', 'dreamgf']],
  ['dreamgf-alternatives', 'DreamGF Alternatives', 'realistic-visuals', ['dreamgf', 'candy-ai', 'ourdream-ai']],
  ['kupid-ai-alternatives', 'Kupid AI Alternatives', 'conversation', ['kupid-ai', 'replika', 'kindroid']],
  ['replika-alternatives', 'Replika Alternatives', 'emotional-companion', ['replika', 'kindroid', 'kupid-ai']],
  ['crushon-ai-alternatives', 'CrushOn AI Alternatives', 'roleplay', ['crushon-ai', 'girlfriendgpt', 'character-ai']],
  ['best-ai-companion-apps', 'Best AI Companion Apps', 'emotional-companion', ['replika', 'kindroid', 'character-ai']],
  ['best-virtual-girlfriend-apps', 'Best Virtual Girlfriend Apps', 'best-overall', ['candy-ai', 'dreamgf', 'kupid-ai']],
  ['best-ai-roleplay-chatbots', 'Best AI Roleplay Chatbots', 'roleplay', ['crushon-ai', 'girlfriendgpt', 'dreamgf']],
  ['best-realistic-ai-companions', 'Best Realistic AI Companions', 'realistic-visuals', ['candy-ai', 'dreamgf', 'ourdream-ai']],
  ['best-ai-chatbot-girlfriend', 'Best AI Chatbot Girlfriend', 'conversation', ['kupid-ai', 'replika', 'candy-ai']],
];

const extraKeywordTopics = longTailBases.flatMap(([baseSlug, baseTitle, categorySlug, serviceSlugs], baseIndex) =>
  longTailModifiers.map(([modifierSlug, modifierTitle, keywordTail], modifierIndex) => {
    const slug = `${baseSlug}-${modifierSlug}`;
    const title = `${baseTitle} ${modifierTitle}`;
    const keyword = `${baseTitle.toLowerCase()} ${keywordTail}`;
    const category = categoryMap[categorySlug];
    const linkedServices = serviceSlugs.map((serviceSlug) => serviceMap[serviceSlug]).filter(Boolean);
    const primary = linkedServices[0] ?? services[0];
    const secondary = linkedServices[1] ?? services[1];
    const tertiary = linkedServices[2] ?? services[2];
    const index = baseIndex * longTailModifiers.length + modifierIndex;
    return {
      slug,
      title,
      keyword,
      noindex: true,
      excerpt: `A focused comparison of ${keyword} across privacy, chat quality, memory, visuals, price friction, and practical adult use.`,
      relatedCategory: categorySlug,
      relatedServices: linkedServices.map((service) => service.slug),
      relatedPosts: [keywordPosts[index % keywordPosts.length].slug, corePosts[index % corePosts.length].slug],
      body: [
        `This long-tail guide exists because searches for "${keyword}" usually hide a specific buying concern. The reader is not just asking which app is popular; he wants to know which choice fits a real use case without wasting money or exposing private information. Start with the ${category.title.toLowerCase()} category, then compare ${primary.name}, ${secondary.name}, and ${tertiary.name}.`,
        `${primary.name} is the default benchmark for this query because it is strongest for ${primary.bestFor.toLowerCase()}. ${secondary.name} is worth comparing when your priority shifts toward ${secondary.bestFor.toLowerCase()}. ${tertiary.name} rounds out the shortlist when you want a different balance of chat, visuals, memory, or roleplay.`,
        `Use a same-prompt test before paying: one normal conversation, one memory check, one boundary or roleplay check, and one return visit after a break. If the app forgets context, pushes credits too aggressively, or hides cancellation details, treat the free tier as the answer and move on.`,
      ],
    };
  })
);

export const posts = [...corePosts, ...keywordPosts, ...extraKeywordTopics].map((post, index, allPosts) => ({
  ...post,
  datePublished: staggerDate(index, allPosts.length),
  dateModified: `${site.year}-07-13`,
}));
