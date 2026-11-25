# Familie

En privat app for familien: handleliste, oppgaver med påminnelser, abonnementer, ønskeliste og
«I dag»-oversikt. Den virker på mobilen og kan legges på Hjem-skjermen som en vanlig app.

Appen bygges i trinn. Denne veiledningen dekker det som trengs **nå**: innlogging og selve
app-skallet. Senere trinn legger til flere punkter nederst.

---

## Oppsett, steg for steg

Du trenger tre gratis kontoer: **Supabase** (databasen), **Google Cloud** (for «Logg inn med
Google») og **Vercel** (der appen kjører). Det tar rundt 30 minutter.

> Navn på knapper og menyer kan endre seg litt over tid. Finner du ikke noe nøyaktig slik det
> står, se etter noe som ligner, eller spør Claude.

### 1. Lag databasen i Supabase

1. Gå til <https://supabase.com>, logg inn og trykk **New project**.
2. Gi prosjektet et navn (for eksempel `familie`), velg et passord til databasen (lagre det i
   passordbehandleren din), og velg regionen **Stockholm** eller **Frankfurt**.
3. Når prosjektet er klart: åpne **SQL Editor** i menyen til venstre.
4. Åpne filen `supabase/migrations/20261125000001_core.sql` her i GitHub, kopier hele innholdet,
   lim det inn i SQL Editor og trykk **Run**.
5. Åpne filen `supabase/setup-household.sql`, kopier innholdet inn i en ny SQL-fane, **bytt ut de
   to e-postadressene og navnene** med deres egne Google-adresser, og trykk **Run**.
   Bare disse to adressene får logge inn.

### 2. Lag Google-innlogging

1. Gå til <https://console.cloud.google.com> og lag et nytt prosjekt (for eksempel `familie`).
2. Åpne **APIs & Services → OAuth consent screen** (kan også hete **Google Auth Platform**).
   Fyll inn appnavn «Familie» og e-postadressen din. Velg brukertype **External**.
   Legg til begge e-postadressene deres som **Test users**.
3. Åpne **Credentials → Create credentials → OAuth client ID**. Velg **Web application**.
4. Under **Authorized redirect URIs** limer du inn adressen Supabase viser deg i steg 3.2
   nedenfor. Den ser slik ut: `https://DITT-PROSJEKT.supabase.co/auth/v1/callback`
5. Trykk **Create**. Kopier **Client ID** og **Client secret**.

### 3. Koble Google til Supabase

1. I Supabase: **Authentication → Sign In / Providers → Google**.
2. Slå på Google, lim inn **Client ID** og **Client secret** fra steg 2, og lagre.
   Her ser du også «Callback URL». Det er den du limer inn i Google i steg 2.4.

### 4. Legg appen ut på Vercel

1. Gå til <https://vercel.com>, logg inn med GitHub og trykk **Add New → Project**.
2. Velg dette GitHub-prosjektet og trykk **Import**.
3. Åpne **Environment Variables** før du trykker Deploy, og legg inn disse tre. Verdiene finner du
   i Supabase under **Project Settings → API Keys** (og **Data API** for adressen):

   | Navn | Hvor du finner verdien |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Prosjektadressen, `https://….supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Nøkkelen som starter med `sb_publishable_` |
   | `SUPABASE_SECRET_KEY` | Nøkkelen som starter med `sb_secret_`. Hemmelig, del den aldri. |

4. Trykk **Deploy**. Når det er ferdig, får du en adresse som `https://familie-xxx.vercel.app`.

### 5. Fortell Supabase hvor appen bor

1. I Supabase: **Authentication → URL Configuration**.
2. Sett **Site URL** til Vercel-adressen din, for eksempel `https://familie-xxx.vercel.app`.
3. Under **Redirect URLs**, legg til `https://familie-xxx.vercel.app/auth/callback`.

### 6. Prøv appen

Åpne Vercel-adressen på telefonen, logg inn med Google, og legg appen på Hjem-skjermen
(veiledningen ligger under **Mer → Installer appen**).

---

## Til utvikling (teknisk)

- Next.js (App Router) + TypeScript + Tailwind, Supabase (Postgres, Auth, Realtime), PWA.
- Kopier `.env.example` til `.env.local`, så `npm install` og `npm run dev`.
- Databaseendringer ligger i `supabase/migrations/` og kjøres i rekkefølge.
