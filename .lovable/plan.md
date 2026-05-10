# Dynamic Portfolio + Admin Dashboard — Build Plan

This is a very large scope (DB schema, auth, admin CRUD for 9 sections, image editor, multi-image galleries, site settings, etc.). Trying to ship it all in a single pass would almost certainly produce broken pieces. I'll break it into **4 milestones**, each independently working and testable. You approve, I ship Milestone 1, you verify, then we proceed.

## Milestone 1 — Foundation (Cloud + Schema + Auth + Dynamic Public Site)

**Backend (Lovable Cloud / Supabase):**
- Enable Lovable Cloud
- Create all tables: `identity`, `stats`, `experience`, `projects`, `project_images`, `skills`, `education`, `current_study`, `certifications`, `user_roles`, `site_settings`
- RLS: public SELECT, admin-only write via `has_role()` security definer function
- Storage buckets: `avatars`, `project-images`, `cv-files`, `certificates` (public)
- Seed tables with your current portfolio data (so site looks identical post-migration)

**Public site:**
- `usePortfolioData()` hook fetching from Supabase with React Query
- Replace `portfolio.ts` imports across all sections with live data
- Loading skeletons + error boundaries
- Typewriter effect in Hero (`identity.typewriter_titles`)
- "Open to Work" badge driven by `site_settings`
- Zero hardcoded content remaining

**Auth:**
- `/admin` login page (email + password, "Remember me")
- Role check against `user_roles`; non-admins see "Access Denied"
- You'll create your admin user in the Cloud Users panel, I'll give you a SQL snippet to grant the `admin` role

## Milestone 2 — Admin Dashboard Shell + Identity/Hero/Stats/Site Settings

- `/admin/dashboard` layout: collapsible sidebar, top bar with avatar/logout, "View Live Site" button, dark theme
- Identity & Hero panel: all fields, typewriter titles tag input, **avatar editor** (crop/rotate/zoom via `react-image-crop`), CV PDF uploader (10MB cap, replace/delete)
- Stats panel: inline edit + drag-reorder
- Site Settings panel: color pickers (writes CSS variables), section visibility toggles, footer text, Open-to-Work toggle
- Toast notifications, confirmation dialogs, validation, char counters

## Milestone 3 — Projects (the big one) + Experience + Skills

- Projects panel: card grid, add/edit modal, tag-input tech stack, featured toggle
- **Multi-image uploader** for `project_images`: drag-drop, per-image progress, set-cover, captions, drag-reorder, delete
- Public Projects: filters (All/Featured/Tech), search, project detail modal with image carousel + lightbox
- Experience panel: full CRUD + logo upload + "currently working" toggle
- Skills panel: grouped by category, proficiency slider, animated bars on public site

## Milestone 4 — Education + Current Learning + Certifications + Polish

- Education / Current Learning / Certifications panels (full CRUD + image uploads)
- Animated progress bars (circular for current learning)
- Final polish pass: scroll animations via Intersection Observer, lazy image loading, mobile responsiveness audit on admin, real-time subscription for instant admin→public sync

---

## Technical notes

- **Stack additions:** `react-image-crop`, `@dnd-kit/sortable` (drag-reorder), `react-type-animation` (typewriter), `@tanstack/react-query` (already installed)
- **RLS pattern:** `app_role` enum + `user_roles` table + `has_role(uuid, app_role)` security-definer function (per Lovable best practices — avoids recursive RLS)
- **Storage policies:** public read, authenticated admin write/delete
- **Image limits enforced client-side:** 5MB images / 10MB PDFs, jpg/png/webp/pdf only
- **Existing static `portfolio.ts`** will be deleted at the end of Milestone 1 once the live data path is verified

---

## What I need from you

1. **Approve this plan** (or tell me to combine/split milestones)
2. After Milestone 1 ships: create your admin user via the Cloud → Users panel — I'll give you the exact SQL to grant `admin` role
3. Confirm: OK to **delete `src/data/portfolio.ts`** and `public/Robert_Kamal_CV.pdf` after seeding the DB? (CV will live in Storage)

Reply "go" (or "go with changes: …") and I'll start Milestone 1.