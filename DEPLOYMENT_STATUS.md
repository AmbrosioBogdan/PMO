# 🚀 PMO Deployment Guide - Status & Next Steps

## ✅ Completato

### Local Development
- **Frontend**: http://localhost:3001 ✓
- **Backend API**: http://localhost:3000 ✓
- **Worker**: Running ✓
- **Dashboard**: http://localhost:3001/dashboard ✓
- **Database**: Supabase configured ✓

### Builds
- Frontend production build: ✓ `frontend/.next`
- Backend production build: ✓ `backend/.next`
- GitHub Actions workflow: ✓ `.github/workflows/deploy.yml`

### Code Quality
- CORS headers: ✓ Enabled
- Environment variables: ✓ Configured
- API endpoints working: ✓
  - `GET /api/health` → OK
  - `GET /api/messages` → OK

---

## 🔌 Per Attivare WhatsApp

### Passo 1: Apri il Dashboard
1. Vai a http://localhost:3001/dashboard
2. Clicca il bottone **"Connect WhatsApp"**

### Passo 2: Scansiona QR Code
1. Si aprirà **WhatsApp Web** in una finestra Playwright
2. **Scansiona il QR code** con il tuo telefono
3. **Conferma la connessione**

### Passo 3: Inizia a Messaggiare
- I messaggi appariranno nel dashboard
- Puoi inviare messaggi direttamente da PMO
- Sincronizzazione automatica

---

## 🌐 Deploy su Vercel (Production)

### Opzione 1: GitHub Actions (Automatico - CONSIGLIATO)
Il workflow `.github/workflows/deploy.yml` deployerà automaticamente su Vercel quando fai push su main.

**Per attivare:**
1. Va su https://github.com/AmbrosioBogdan/PMO/settings/secrets/actions
2. Aggiungi questi secrets:
   - `VERCEL_TOKEN`: Il tuo token Vercel
   - `VERCEL_ORG_ID`: ID organizzazione Vercel
   - `VERCEL_PROJECT_ID_FRONTEND`: ID del progetto frontend
   - `VERCEL_PROJECT_ID_BACKEND`: ID del progetto backend

3. Fai un push: `git push`
4. Vercel deployerà automaticamente

### Opzione 2: Deploy Manuale con CLI
```bash
# Frontend
cd frontend
vercel deploy --prod

# Backend
cd ../backend
vercel deploy --prod
```

---

## 📊 Architettura Corrente

```
PMO (Monorepo)
├── Frontend (Next.js)
│   ├── Dashboard principale
│   ├── WhatsApp connection UI
│   └── Messages view
├── Backend (Next.js API)
│   ├── GET /api/health
│   ├── GET /api/messages
│   └── POST /api/messages
├── Worker (Playwright)
│   └── WhatsApp Web automation
└── Supabase
    ├── Database
    ├── Authentication
    └── Real-time sync
```

---

## 🔑 Variabili d'Ambiente Necessarie

### Per Production (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://gfkdgoulkygrzsdphghu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
OPENROUTER_API_KEY=sk-or-v1-...
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Per Development (Locale)
Già configurate in `/home/bogdan/PMO/.env.local` e copiate nei package

---

## 🎯 Prossimi Passi

1. **Connetti WhatsApp** via dashboard
2. **Testa i messaggi** nella UI
3. **Deploy su Vercel** usando GitHub Actions
4. **Configura le variabili** su Vercel dashboard
5. **Monitora i deployment** su Vercel

---

## 🐛 Troubleshooting

### WhatsApp non si connette
- Assicurati che Playwright sia installato: `npm install`
- Controlla che il worker sia in esecuzione nei logs

### Backend API non risponde
- Verifica le Supabase credentials in `.env.local`
- Controlla che il backend sia in running: `pnpm dev`

### Build fallisce
- Cancella `.next`: `rm -rf frontend/.next backend/.next`
- Ricostruisci: `npm run build`

---

## 📞 Contatti Utili

- **Supabase Dashboard**: https://app.supabase.com
- **Vercel Dashboard**: https://vercel.com
- **GitHub Actions**: https://github.com/AmbrosioBogdan/PMO/actions
- **Repository**: https://github.com/AmbrosioBogdan/PMO

---

*Documento generato: 2026-05-01 11:30 UTC*
