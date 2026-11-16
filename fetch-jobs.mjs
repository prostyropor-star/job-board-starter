// Fetch live jobs from company career sites and build a tiny static job board.
// Usage: APIFY_TOKEN=... node fetch-jobs.mjs "keyword" [location]
import { writeFileSync } from 'node:fs';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set APIFY_TOKEN first (Apify Console > Settings > Integrations).');
    process.exit(1);
}
const [keyword = 'engineer', location] = process.argv.slice(2);

const input = {
    searchAllCompanies: true,
    keywords: [keyword],
    ...(location ? { locations: [location] } : {}),
    maxItems: 100,
    includeDescription: false,
};

const url = `https://api.apify.com/v2/acts/mistlike_potato~career-site-jobs-scraper/run-sync-get-dataset-items?token=${token}`;
console.log(`Searching live career sites for "${keyword}"${location ? ` in ${location}` : ''}...`);
const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input) });
if (!res.ok) {
    console.error(`Apify API error ${res.status}: ${await res.text()}`);
    process.exit(1);
}
const jobs = await res.json();
writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const salary = (j) => (j.salaryMin ? `${Math.round(j.salaryMin / 1000)}k-${Math.round(j.salaryMax / 1000)}k ${j.salaryCurrency}` : '');
const rows = jobs.map((j) => `<li><a href="${esc(j.applyUrl || j.url)}">${esc(j.title)}</a> <b>${esc(j.company)}</b> <span>${esc(j.location)}</span> <em>${esc(salary(j))}</em></li>`).join('\n');
writeFileSync('index.html', `<!doctype html><meta charset="utf-8"><title>${esc(keyword)} jobs</title>
<style>body{font:16px system-ui;max-width:900px;margin:40px auto;padding:0 16px}li{margin:10px 0}span,em{color:#666;margin-left:8px}</style>
<h1>${jobs.length} live "${esc(keyword)}" jobs</h1><ul>${rows}</ul>
<p>Data: <a href="https://apify.com/mistlike_potato/career-site-jobs-scraper">Career Site Jobs Scraper</a></p>`);
console.log(`Saved ${jobs.length} jobs to jobs.json and index.html`);
