<div align="center">
  <h1>Movie API - v 1.0</h1>
  <p>Backend for movies reviews. Includes RBAC</p>  
</div>

## Quick Start Guide

### Using Docker + Docker Compose:

Run the following commands:

```
$ docker build -t movie-api .
$ docker-compose up
```

### Run project in dev mode:

Create .env file

```
DATABASE_URL="postgresql://postgres:<usuario>@localhost:5432/movies?schema=public"
JWT_SECRET = "zjP9h6ZI5LoSKCRj"
PORT = 3000
```

Copy an paste the following commands

```
yarn
npx prisma db generate
npx prisma db seed
yarn start dev
```

## Test Endpoints:

Open http://localhost:3000/api

1. Got to auth > Try it out > complete email and password > Execute
2. Copy the token
3. Press on any lock or Autorize on the top pf the page > Paste the token
4. You can try any endpoint

default admin user: admin@admin.com / Juan1234

## About

- Author: Juan Pablo Bizantino
- Date: March 2024

## Frameworks & Libraries

- NestJS 14
- Prisma ORM
- passport-jwt
- date-fns
- joi
- bcrypt
- class-transformer
- class-validator
- swagger (Endpoints documentation)

## Misc

- npx prisma format
- npx prisma db generate
- npx prisma db seed
- prisma db push
