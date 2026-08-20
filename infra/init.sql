create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists otp_codes (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists otp_codes_email_idx on otp_codes (email);

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references users(id) on delete cascade,
  title text not null,
  description text not null default '',
  price integer not null check (price >= 0),
  category text not null,
  condition text not null,
  status text not null default 'available' check (status in ('available','reserved','sold')),
  created_at timestamptz not null default now()
);
create index if not exists listings_status_idx on listings (status);
create index if not exists listings_seller_idx on listings (seller_id);
create index if not exists listings_search_idx
  on listings using gin (to_tsvector('simple', title || ' ' || description));

create table if not exists listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  s3_key text not null,
  position integer not null default 0
);
create index if not exists listing_images_listing_idx on listing_images (listing_id);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  buyer_id uuid not null references users(id) on delete cascade,
  seller_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (listing_id, buyer_id)
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists messages_conversation_idx on messages (conversation_id, created_at);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  buyer_id uuid not null references users(id) on delete cascade,
  seller_id uuid not null references users(id) on delete cascade,
  payment_status text not null default 'off_platform' check (payment_status in ('pending','off_platform','paid')),
  created_at timestamptz not null default now()
);
