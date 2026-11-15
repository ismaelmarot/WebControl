create table applications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  url text not null,
  enabled boolean default true,
  updated_at timestamp with time zone default now()
);

alter table applications enable row level security;

create policy "Public can read own application" on applications
  for select using ( true );

create policy "Admins full access" on applications
  using ( true )
  with check ( true );