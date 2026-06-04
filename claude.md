# Happy Alpha — CLAUDE.md

## Product Vision
Happy Alpha: where smart money meets good vibes. ✨
An AI-powered investment intelligence platform that helps individual investors track smart money signals and build conviction on high-growth stocks.

## Target User
Cinthia — finance background, learning active investing, wants to track signals from smart investors like Serenity and build her own investment framework.

## Core Goal
Buy high-growth companies at prices below their true value, before the market realizes it — and beat the market doing it.

## Smart Money Sources
- Serenity (@aleabitoreddit) — AI supply chain investor, 38x YTD returns

## Investment Philosophy
- Serenity's style: growth investing, not traditional value investing
- Core question: Is this company's true growth potential larger than what the market currently expects?
- Focus on non-consensus information — what others haven't seen yet
- Track 2-3 smart money sources max — no over-diversification

## Three Core Products

### Product 1: Signal Monitor (Layer 1) — IN PROGRESS
Monitor Serenity's tweets, AI auto-classifies signals, sends email alerts
- n8n workflow created at: https://cinthialin.app.n8n.cloud/workflow/jtU7xqhfz2MD7OiA
- DataTable `serenity_tweets` created in n8n
- Gmail credential configured
- Anthropic API configured
- ❌ Tweet data source not resolved (X API free tier doesn't support search; needs $100/mo Basic plan or alternative)
- ✅ X notifications enabled for @aleabitoreddit as interim solution

### Product 2: Investment Learning (Layer 2) — NOT STARTED
Help understand financial instruments, support investment analysis, manage risk

### Product 3: Company Intelligence — NEXT TO BUILD
Systematically research companies Serenity follows.

## Company Research Framework
For each company, answer:
1. **Business Fundamentals** — business model, revenue model, key customers, industry trend, competitive moat, market share, pricing power, management quality, financial quality (FCF vs net income), burn rate
2. **Market Layer** — current valuation (P/E, P/S, EV/EBITDA), what's priced in, consensus vs non-consensus, analyst targets from major banks
3. **Serenity's Perspective** — her thesis, conviction level, price when she first mentioned it vs today
4. **Catalysts & Risks** — upcoming events, what could invalidate the thesis
5. **My Judgment** — conviction score (1-5), buy rationale, key risks

## Current Watchlist
- NBIS
- SIVE
- AMD

## UX Design Direction
- Reference: Claude.ai's UX philosophy — conversational, natural, not overwhelming
- User types a company name → Happy Alpha responds like a conversation, not a dashboard dump
- Information revealed on demand, not all at once
- Also reference: claude.com/solutions/financial-services for financial UX patterns
- Visual: Clean, minimal, premium feel. Emerald green accent. Dark theme.

## Tech Stack
- Frontend: Lovable (React) — connected to this GitHub repo
- Automation: n8n
- Database: Supabase
- AI: Claude API (claude-sonnet-4-6)
- Deployment: Railway
- Code: GitHub (Porter-Seattle/happy-alpha)

## Design Principles
- Information serves decisions, not the other way around
- Every feature must answer: "Does this help me build conviction?"
- Clean, beautiful, and a little bit of personality
- AI does: research synthesis, earnings analysis, market intelligence, risk assessment
- Human does: final conviction judgment, position sizing, buy/sell decision

## AIPM Learning Goals
- Understand where AI adds value vs where human judgment is irreplaceable
- Document every design decision and the reasoning behind it
- Build this as a portfolio piece for AIPM job applications

## Next Session TODO
1. Redesign Company Intelligence UI in Lovable
   - Conversational UX (like Claude.ai)
   - User inputs company name → AI generates full analysis
   - Reference Claude.ai interaction patterns
2. Connect Lovable to this GitHub repo
3. Test with real company (NBIS or SIVE)
