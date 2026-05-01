# Deployment Guide

## Prerequisites

- Vercel account (for frontend & backend)
- Fly.io account (for worker)
- Supabase project
- GitHub repository

## Frontend Deployment (Vercel)

### 1. Connect Repository

```bash
vercel link
```

### 2. Configure Environment

In Vercel dashboard:
- Go to Settings → Environment Variables
- Add all variables from `.env.example`

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 3. Deploy

```bash
cd frontend
vercel deploy --prod
```

Or push to main branch for automatic deployment.

---

## Backend Deployment (Vercel)

### 1. Create New Project

```bash
cd backend
vercel link
```

Choose different project name than frontend.

### 2. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENROUTER_API_KEY=...
GROQ_API_KEY=...
NODE_ENV=production
```

### 3. Deploy

```bash
vercel deploy --prod
```

---

## Worker Deployment (Fly.io)

### 1. Install Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
```

### 2. Authenticate

```bash
fly auth login
```

### 3. Create Fly App

```bash
cd worker
fly launch
```

Choose:
- App name: `pmo-worker`
- Region: `fra` (Frankfurt) or closest to you
- Database: No

### 4. Set Environment Variables

```bash
fly secrets set OPENROUTER_API_KEY=sk-or-v1-...
fly secrets set SUPABASE_URL=...
fly secrets set SUPABASE_ANON_KEY=...
```

### 5. Deploy

```bash
fly deploy
```

### 6. Monitor

```bash
fly logs
fly status
```

---

## Database Migrations

### Create Backup

```bash
# Supabase CLI
supabase db pull
```

### Run Migrations

On new environment, run SQL from [SETUP.md](./SETUP.md) to create tables.

---

## Domain Setup

### Frontend

1. In Vercel dashboard: Domains → Add
2. Add your domain (e.g., `messaging.your-domain.com`)
3. Update DNS records

### Backend

1. Create subdomain: `api.your-domain.com`
2. In Vercel: Domains → Add
3. Configure DNS

---

## SSL/HTTPS

All services have automatic SSL:
- ✅ Vercel (automatic)
- ✅ Fly.io (automatic)
- ✅ Supabase (automatic)

---

## Monitoring & Logs

### Vercel

```bash
vercel logs
```

### Fly.io

```bash
fly logs -a pmo-worker
```

### Supabase

Visit dashboard → Logs → check API logs

---

## Rollback

### Vercel

1. Go to Deployments
2. Click on previous deployment
3. Promote to Production

### Fly.io

```bash
fly releases
fly rollback VERSION_NUMBER
```

---

## Performance Optimization

### Frontend
- Enable image optimization
- Compress assets
- Use CDN (Vercel does this)

### Backend
- Enable database indexing
- Cache API responses
- Monitor database performance

### Worker
- Optimize Playwright selectors
- Add error recovery
- Monitor memory usage

---

## Cost Optimization

| Service | Free Tier | Estimated Cost |
|---------|-----------|-----------------|
| **Vercel** | 100 GB bandwidth | $20/mo |
| **Fly.io** | 3 shared-cpu-1x VMs | $15/mo |
| **Supabase** | Up to 500k | $25/mo |
| **OpenRouter** | Pay per API call | $10-50/mo |
| **Total** | ~$70-100/mo | |

---

## CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm type-check
      - run: pnpm lint
```

---

## Troubleshooting

### Vercel Build Fails

```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing env vars
# - TypeScript errors
# - Module not found
```

### Fly.io Connection Issues

```bash
fly ssh console -a pmo-worker
# Check logs, test WhatsApp connection
```

### Database Connection Errors

```
Error: connect ECONNREFUSED
```

Solution:
- Check `DATABASE_URL` in environment
- Ensure IP is whitelisted in Supabase
- Test with `psql` command

---

## Support

- Vercel Docs: https://vercel.com/docs
- Fly.io Docs: https://fly.io/docs
- Supabase Docs: https://supabase.com/docs
