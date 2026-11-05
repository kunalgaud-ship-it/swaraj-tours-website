# Admin panel setup

The admin panel is at `/admin`. It can manage vehicle and route fares, booking enquiries, business contact details, packages, destinations, services, offers, FAQs, reviews, travel guides and route hubs.

Bookings contain customer contact details. The browser cannot read them directly: all admin API calls verify a Supabase Auth user whose server-controlled `app_metadata.role` is `admin`. The database tables have Row Level Security enabled and deny direct access to anonymous and signed-in browser users.

## 1. Create the database

Create a Supabase project, then run [`supabase/admin-schema.sql`](supabase/admin-schema.sql) in its SQL Editor. The site continues to work with its bundled content until this database is connected.

## 2. Create and approve the admin login

In Supabase Authentication, create a user with the admin's email and a strong password. Turn off public sign-ups so visitors cannot create accounts. Then run this SQL, replacing the email with that account's email:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'admin')
where email = 'admin@example.com';
```

Only `app_metadata` grants admin access; editable user profile metadata is not used for authorization.

## 3. Add environment variables

In the hosting provider's encrypted environment settings, set:

| Variable | Value | Used in |
| --- | --- | --- |
| `SUPABASE_URL` | Supabase Project URL | Server API |
| `SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` key | Server verifies admin sign-in |
| `SUPABASE_SECRET_KEY` | `sb_secret_...` key | Server only; database access |
| `VITE_SUPABASE_URL` | Same Project URL | Admin sign-in page |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Same publishable key | Admin sign-in page |

The `SUPABASE_SECRET_KEY` must stay in the host's server-only environment settings. Never place it in a `VITE_` variable or share it in chat. For local development, put values in the ignored `.env` file; do not commit that file.

## 4. Deploy and sign in

Redeploy the website after adding the variables, then open `https://YOUR_DOMAIN/admin` and sign in with the approved email and password. The project has a Vercel API layout (`api/` and `vercel.json`); the admin API needs a host that runs these serverless functions and protects server environment variables.

## Notes

- A booking is saved to the admin inbox when the Supabase server settings are present. Until then, the existing email booking flow continues, but enquiries are not stored in the panel.
- Public fare and content changes are read from the database when a visitor loads the site. Refresh the public page after saving.
- This first version edits existing image URLs/text in content records; it does not upload image files.
