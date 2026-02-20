Fullstack app with secured authentication (Next.js, Next-auth, Prisma, Postgres, Tailwind)

## Getting Started

### Local environment variables

Setup environment files in local

.env

```bash
DATABASE_URL="provide_railway_database_url" # https://railway.com > Create a project > Open the project > Variables > DATABASE_PUBLIC_URL. Starts with postgresql://postgres:*****/railway

RESEND_API_KEY=re_******  # Added by generating an API key on https://resend.com/api-keys

FROM_EMAIL="onboarding@resend.dev" # By default, a valid sender email provided by resend https://resend.com/docs/send-with-nextjs#send-emails-with-next-js, can be changed to another valid email
```

.env.local

```bash
NEXTAUTH_SECRET="provide_next_auth_secret" # Added by `npx auth`. Read more: https://cli.authjs.dev

NEXTAUTH_URL=http://localhost:3000

GITHUB_ID=provide_github_client_id # https://github.com/settings/developers > OAuth Apps > New Auth App

GITHUB_SECRET=4provide_github_client_secret # https://github.com/settings/developers > OAuth Apps > New Auth App

GOOGLE_CLIENT_ID=provide_google_client_id # https://console.cloud.google.com > APIs & Services > OAuth Consent Screen > Clients > Create client > Client Id. Need to setup a Authorized JavaScript origins URI (ex: http://localhost:3000) and an Authorized redirect URI (http://localhost:3000/api/auth/callback/google)

GOOGLE_CLIENT_SECRET=provide_google_client_secret # https://console.cloud.google.com > APIs & Services > OAuth Consent Screen > Clients > Create client > Client Secret. Need to setup a Authorized JavaScript origins URI (ex: http://localhost:3000) and an Authorized redirect URI (http://localhost:3000/api/auth/callback/google)
```

In production and deployed app, env variables are setup in Vercel project: Project Settings > Environment Variables

### Local Development

At least Node.js 22

Run:

```bash
npm install
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) to see the app
- Open http://localhost:51212 to see the schemas and migrations
- Open [http://localhost:3000](http://localhost:3000/api-docs) to see the available APIs

### Prisma

```bash
npx prisma migrate dev --name add_user_model   # create + apply migration (dev)
npx prisma migrate deploy                       # apply migrations in production
npx prisma generate                             # regenerate the TS client
npx prisma db push                              # push schema without creating a migration file (quick prototyping)
npx prisma migrate reset                        # ⚠️ wipes DB and reruns all migrations from scratch
```

## Lib/Technos

- Next.js: front-end + APIs
- Zod: schema validation
- Prisma: ORM
- Postgres: Database
- Tailwind: CSS
- Resend: API to send email to user
- Next-auth: API for secured auth

## Features

### User Authentication

- As a user, I want to be able to sign up with credentials (email+pw) or with an OAuth provider (Google and Github)
- As a user, I want to be able to sign in with credentials (email+pw) or with an OAuth provider (Google and Github)
- As a user, I want to be able to sign out
- As a user, if I signed up with credentials, I should not be able to sign in with an OAuth provider using the same email
- As a user, if I signed up with an OAuth provider, I should not be able to sign in with credentials
- As a user, I want to be able to reset my password if I signed up with credentials

## Deployment

- Next.js app on Vercel
- Postgres database on Railway
