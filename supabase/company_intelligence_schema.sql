-- Company Intelligence: Supabase schema
-- Run this in your Supabase SQL editor

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  ticker text not null unique,
  name text,
  created_at timestamptz default now()
);

create table if not exists company_analyses (
  id uuid primary key default gen_random_uuid(),
  ticker text not null references companies(ticker) on delete cascade,
  analysis jsonb not null,         -- full structured analysis object
  raw_markdown text,               -- streamed markdown from Claude
  model text default 'claude-sonnet-4-6',
  created_at timestamptz default now()
);

-- Index for fast lookups by ticker
create index if not exists idx_company_analyses_ticker on company_analyses(ticker);
create index if not exists idx_company_analyses_created on company_analyses(ticker, created_at desc);

-- My Judgment: user's own conviction notes per ticker
create table if not exists my_judgments (
  id uuid primary key default gen_random_uuid(),
  ticker text not null,
  conviction_score int check (conviction_score between 1 and 5),
  buy_rationale text,
  key_risks text,
  updated_at timestamptz default now()
);

create unique index if not exists idx_my_judgments_ticker on my_judgments(ticker);
