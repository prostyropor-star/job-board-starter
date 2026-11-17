# Live Job Board Starter

Build a job board from **live company career sites** in a few minutes. No scraping code to maintain.

This starter pulls fresh job postings from 34,000+ company job boards (Greenhouse, Lever, Ashby, SmartRecruiters, Personio, Recruitee, Teamtailor, Rippling, Gem, Breezy HR) through the [Career Site Jobs Scraper](https://apify.com/mistlike_potato/career-site-jobs-scraper) on Apify, and writes them to `jobs.json` and a simple static `index.html` page.

## Quick start

1. Create a free Apify account and copy your API token from **Settings → Integrations**.
2. Run:

```bash
export APIFY_TOKEN=your_token
node fetch-jobs.mjs "data engineer" Remote
```

3. Open `index.html` in your browser.

Node 18+ is required. There are no dependencies.

## What you get per job

`title`, `company`, `location`, `country`, `workplaceType` (remote/hybrid/onsite), `employmentType`, `salaryMin`/`salaryMax`/`salaryCurrency`, `postedAt`, `url`, `applyUrl` and the full description.

## Ideas

- **Daily job alerts:** schedule the Actor with `"onlyNew": true` and send the new jobs to Slack or email.
- **Niche job boards:** remote Rust jobs, climate jobs, jobs in Vienna... pick keywords and locations.
- **Hiring signals for sales:** see which companies hire for which roles.
- **Salary research:** compare published pay ranges.

## Want the company list without any API?

- **[Company Careers Directory](https://prostyropor.gumroad.com/l/jxsju)**: all 34,290 companies with careers page, hiring platform, public job-feed URL and open-job count (CSV + Excel).
- **[Job Board Starter Kit](https://prostyropor.gumroad.com/l/rbhdqp)**: the directory plus scripts that pull live jobs straight from the public feeds, no Apify account needed.

## Single-platform versions

- [Greenhouse Jobs Scraper](https://apify.com/mistlike_potato/greenhouse-jobs-scraper)
- [Lever Jobs Scraper](https://apify.com/mistlike_potato/lever-jobs-scraper)
- [Ashby Jobs Scraper](https://apify.com/mistlike_potato/ashby-jobs-scraper)
- [SmartRecruiters Jobs Scraper](https://apify.com/mistlike_potato/smartrecruiters-jobs-scraper)

## Cost

The Actor charges $1.50 per 1,000 jobs saved. Apify's free plan includes monthly credit, enough to try it.

## License

MIT
