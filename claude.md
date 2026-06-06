# Signet — CLAUDE.md

## Product Vision
**Turn Serenity's fragmented daily posts into a continuous, learnable, and actionable research system.**

Signet is NOT a trading signal service. It IS a research intelligence system that helps users understand and learn Serenity's investment framework.

Core insight: Users want to become Serenity, but can't — so they need a tool to help them learn from her.

## Product Name
**Signet** — named in the tradition of Medallion Fund (Renaissance Technologies). A signet ring is a mark of authority and earned distinction. The name also echoes "signal."
GitHub repo: Porter-Seattle/Signet

## Target User
- Age 25-40, based in US/Canada/China
- Has basic US equities experience (individual stocks or ETFs)
- Aggressive/growth-oriented investor
- Non-finance background, no institutional research tools
- Discovered Serenity through Xiaohongshu, Twitter, or WeChat
- Wants to learn her methodology but doesn't know where to start

## Serenity's Investment Framework (5-Layer Reverse Methodology)
Serenity (@aleabitoreddit) — AI supply chain investor, 4500%+ returns in 2024, 86% win rate.

**The 5 Layers (work backwards from end demand):**
- Layer 0: End demand (hyperscaler capex, AI model requirements)
- Layer 1: System integration (who builds the final product)
- Layer 2: Key components (optical modules, power systems)
- Layer 3: Critical parts (lasers, chips, substrates)
- Layer 4: Foundry/manufacturing (who fabricates)
- Layer 5: Materials (raw materials, precursors)

**Good choke point criteria (all must apply):**
✅ Monopoly or duopoly — controls both volume and pricing
✅ Market cap under $2B with massive downstream market
✅ Designed-in by multiple customers (switching cost 12-24 months)
✅ Mass production starting 2026-2027, not yet in revenue
✅ No: excessive dilution, single customer dependency, pure software, already large cap

**Red flags (any one = skip):**
❌ Unlimited share issuance / dilution
❌ Single large customer dependency
❌ Technology too far out (2028+ with no visibility)
❌ Pure software, no hard choke point
❌ Market cap already too large for asymmetry

## Competitive Landscape
| Product | What it does | What's missing |
|---|---|---|
| PaiWork (Alpha派) | Daily tweet → .md research files | Users must open it; non-technical users can't use it |
| ZadAnthony Skill | Serenity framework analysis | Requires Claude Code; no GUI; no historical data |
| TradingKey | Performance visualization | Results only, no process or learning path |

**Signet's edge: Real historical data × Serenity's framework × Accessible GUI × Proactive delivery**

## Product Roadmap

### V1 MVP — Signet Daily Newsletter (ACTIVE BUILD)
Automated daily email every morning at 8:00 AM ET summarizing Serenity's previous 24hrs of tweets.

**Email structure:**
1. Executive Summary (tweet count, companies, one-sentence conclusion)
2. Key Companies Today (what she said, supply chain layer, conviction level, historical connection)
3. New/Updated Thesis
4. Claims to Verify

**Tech pipeline:** Apify → n8n → Claude API → Supabase → Gmail

**Current status:**
- ✅ n8n workflow "Signet Daily Newsletter" built
- ✅ Gmail credential connected
- ✅ Anthropic credential connected
- ✅ Schedule: daily 12:00 UTC (8:00 AM ET)
- ⚠️ Testing in progress — verifying email delivery
- [ ] Google Form subscription page
- [ ] First 10 subscribers

### V2 — Research System (post-MVP)
- Signet web dashboard
- Serenity Investment Map (historical performance visualization with bar charts)
- Company profiles with full thesis timeline
- Supply chain map visualization
- 🎙️ Podcast edition (ElevenLabs/OpenAI TTS for commute listening)

### V3 — Learning Engine (post-V2)
- Company Intelligence with 5-layer framework analysis
- Custom watchlist
- Paid subscription tier

## Success Metrics (MVP — 4 weeks)
- Newsletter subscribers: ≥ 10
- Email open rate: ≥ 40%
- 7-day retention: ≥ 60%
- Actionable user feedback: ≥ 3 responses

## Tech Stack
- Frontend: Lovable (React) → GitHub Porter-Seattle/Signet
- Backend: Railway (signet-production-7507.up.railway.app)
- Database: Supabase (qhtwtlzsdquymajbzdha.supabase.co)
- AI: Claude API (claude-sonnet-4-5)
- Automation: n8n (cinthialin.app.n8n.cloud)
- Scraping: Apify (apidojo/tweet-scraper)
- SSH: configured for git push to Porter-Seattle/Signet

## Data Assets
- 1,606 tweets from @aleabitoreddit (March–May 2026)
- Apify scraping: use `searchTerms: ["from:aleabitoreddit"]` with `start`/`end` date params
- Next scrape needed: 2024-01-01 to 2026-03-01 (Serenity's early investment history — AXTI 9x case)

## Known Investment Theses (from tweet analysis)
| Company | Ticker | Serenity's Thesis | Supply Chain Layer |
|---|---|---|---|
| Sivers Semiconductors | $SIVE | CPO InP laser arrays, switching cost 12-24mo, Win Semi capacity locked | L3 |
| Applied Optoelectronics | $AAOI | 800G optical transceivers, added at $28 | L2 |
| AXT Inc | $AXTI | InP substrate global #2 (35%), 9x return case study | L5 |
| Nebius Group | $NBIS | Strongest neocloud | — |
| Raspberry Pi | $RPI | AI cheap alternative, small cap large TAM | — |
| XFAB | $XFAB | Only US high-volume SiC pure-play foundry | L4 |
| FLNC | $FLNC | AI data center power transition | L2 |

## Design Principles
- Information serves decisions, not the other way around
- Every feature must answer: "Does this help me learn Serenity's framework?"
- Clean, beautiful, premium feel — boutique research firm aesthetic
- AI does: research synthesis, framework application, claim verification
- Human does: final conviction judgment, position sizing, buy/sell decision

## AIPM Portfolio Notes
This project is being built as a portfolio piece for AIPM job applications.
Key decisions to document:
- Why newsletter before dashboard (push > pull for user engagement)
- Why Serenity's framework (proven alpha, learnable, structured)
- Real friction encountered: Apify `until` param not working, Gmail popup blocked, Claude output structure mismatch
- How friction was resolved: documented in git commit history

## Company Intelligence (existing feature — Railway backend)
- API: POST /api/company-intelligence (streaming JSON)
- Supabase tables: companies, company_analyses, my_judgments
- ✅ End-to-end tested with NBIS
- ⚠️ Known issues: Claude uses training data (not real-time); My Judgment not connected to Supabase
