-- Private booking inbox and editable public site settings for Swaraj Cab.
-- Run this in the Supabase SQL Editor before deploying the admin panel.

create table if not exists public.site_config (
  id smallint primary key check (id = 1),
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_config (id, config)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  booking_ref text not null unique,
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  trip_type text not null,
  pickup_city text not null,
  drop_city text not null,
  pickup_date text not null,
  pickup_time text not null,
  return_date text,
  selected_car_id text not null,
  vehicle_name text not null,
  passengers integer not null check (passengers between 1 and 50),
  estimated_fare numeric,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists booking_requests_created_at_idx
  on public.booking_requests (created_at desc);
create index if not exists booking_requests_status_idx
  on public.booking_requests (status);

alter table public.site_config enable row level security;
alter table public.booking_requests enable row level security;

-- No direct browser access. The Vercel API uses the server-only Supabase secret key.
revoke all on public.site_config from anon, authenticated;
revoke all on public.booking_requests from anon, authenticated;
grant all on public.site_config to service_role;
grant all on public.booking_requests to service_role;
