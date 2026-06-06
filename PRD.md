# Signet — Product Requirements Document

**Version:** 1.0  
**Date:** 2026-06-06  
**Author:** Cinthia Lin  
**Status:** In Progress

---

## 1. Problem Statement

Serenity (@aleabitoreddit) is one of the most-followed AI supply chain investors on X, having achieved 4,500%+ returns in 2024 with an 86% win rate. Her investment methodology — a five-layer reverse supply chain bottleneck analysis — has consistently identified undervalued AI semiconductor targets before the broader market.

**However, retail investors face three critical barriers to learning from her:**

1. **Information fragmentation:** She posts 10–20 tweets daily, with insights scattered across threads and replies
2. **No continuity:** Today's thesis connects to observations made months ago — connections that are impossible to track manually
3. **Framework gap:** Her supply chain analysis requires deep semiconductor industry knowledge that most retail investors do not have

> **Core Insight: Users want to become Serenity, but can't — so they need a tool to help them learn from her.**

---

## 2. Target User

**Demographics**
- Age: 25–40
- Location: United States, Canada, China
- Investment experience: Some US equities experience (individual stocks or ETFs)
- Risk profile: Aggressive / growth-oriented investor
- Background: Non-finance professional, no access to institutional research tools

**Behavioral Profile**
- Discovered Serenity through Xiaohongshu (RedNote), Twitter, or WeChat
- Attracted by her track record, wants to follow her investment framework
- Does not have time to manually track 10+ tweets per day
- Wants to learn her methodology and apply it independently — but doesn't know where to start

**Jobs To Be Done**

| Layer | Need | Priority |
|---|---|---|
| **See** | What did Serenity say today? | MVP |
| **Understand** | Why does she think that? What's the supply chain logic? | V2 |
| **Apply** | Find the next bottleneck stock independently | V3 |

---

## 3. Product Vision

> **Signet** — Turn Serenity's fragmented daily posts into a continuous, learnable, and actionable research system.

**What Signet is NOT:** A trading signal service or buy/sell recommendation tool  
**What Signet IS:** A research intelligence system that helps users understand and learn Serenity's investment framework

---

## 4. Competitive Landscape

| Product | What it does | What it's missing |
|---|---|---|
| PaiWork (Alpha派) | Daily tweet scrape → structured .md research files | Users must actively open it; not accessible to non-technical users |
| ZadAnthony's Skill | Serenity framework analysis engine | Requires Claude Code; no GUI; no historical data |
| TradingKey | Performance visualization of Serenity's picks | Results only — no process, no learning path |
| ChatGPT / Claude | General-purpose analysis | No Serenity historical data; no dedicated framework |

**Signet's Differentiation:**
> Real historical tweet data × Serenity's proprietary framework × Accessible GUI × Proactive delivery (users don't need to open anything)

---

## 5. MVP Scope — Signet Daily Newsletter

### Concept
A daily email digest sent automatically every morning at **8:00 AM ET**, summarizing Serenity's tweets from the previous 24 hours — structured, connected to historical context, and ready to read in under 5 minutes.

### Email Structure

**Subject:** `Signet Daily | Serenity's Views · [Date]`

**Section 1: Executive Summary**
- Total tweets / tweets with research value
- Companies mentioned
- One-sentence daily conclusion

**Section 2: Key Companies Today**
For each company:
- Company name + ticker
- What Serenity said today
- How it connects to her historical thesis
- Supply chain position (Layer 0–5)
- Conviction level

**Section 3: New / Updated Thesis**
- Any new investment arguments introduced
- Updates or modifications to existing theses

**Section 4: Claims to Verify**
- Data points or assertions that require independent validation

### Technical Architecture

```
Apify (daily tweet scrape)
    ↓
n8n (workflow orchestration)
    ↓
Claude API (analysis + newsletter generation using Serenity's 5-layer framework)
    ↓
Supabase (historical data storage — enables thesis continuity)
    ↓
Gmail (newsletter delivery)
```

### MVP Exclusions
- User registration / login system (use Google Form for email collection)
- Paid subscription
- Frontend dashboard (V2)
- Real-time stock price data

---

## 6. Success Metrics

**Target: 4 weeks post-launch**

| Metric | Goal |
|---|---|
| Newsletter subscribers | ≥ 10 |
| Email open rate | ≥ 40% |
| 7-day retention | ≥ 60% |
| Actionable user feedback received | ≥ 3 responses |

---

## 7. Roadmap

### V1 — MVP (Now)
- [x] Historical tweet data collection (1,600+ tweets)
- [ ] n8n daily scrape + analysis workflow
- [ ] Claude-powered newsletter generation
- [ ] Automated Gmail delivery
- [ ] Google Form subscription landing page

### V2 — Research System (Post-MVP validation)
- [ ] Signet web dashboard (React / Lovable)
- [ ] Serenity Investment Map — historical performance visualization
- [ ] Company profiles — full thesis timeline per company
- [ ] Supply chain map visualization
- [ ] 🎙️ **Podcast edition** — audio version of the daily research report (ElevenLabs / OpenAI TTS) for commute listening

### V3 — Learning Engine (Post-V2 validation)
- [ ] Company Intelligence — analyze any company using Serenity's 5-layer framework
- [ ] Custom watchlist
- [ ] Paid subscription tier

---

## 8. Open Questions

1. How to handle days when Serenity posts no tweets — skip newsletter or send a recap?
2. User acquisition channel: Xiaohongshu post? Twitter/X? WeChat groups?
3. Copyright considerations around summarizing/quoting Serenity's tweets
4. Should the newsletter link back to original tweets for transparency?

---

## 9. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Apify scraping blocked by Twitter/X | High | Multiple fallback scraping strategies |
| Serenity stops posting or account suspended | High | Expand to multiple investors over time |
| Claude API cost scales with subscriber growth | Medium | Optimize prompts; batch processing |
| Users treat newsletter as trading signals | Medium | Clear disclaimer in every email |
| Low open rates / subscriber churn | Medium | A/B test subject lines; gather feedback early |
