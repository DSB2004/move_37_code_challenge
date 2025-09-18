## Local Development Setup

### Prerequisites

Before proceeding with setup, ensure you have the following installed:

- **Git** (for version control)
- **Node.js** (LTS recommended)
- **npm** or **bun** (package manager)
- **PostgreSQL** (if running locally)
- **Redis** (if running locally)
- **Docker** (if using Docker)

---

#### Setup Rrepository

- Clone the repository

```bash
git clone https://github.com/DSB2004/move_37_code_challenge.git

cd /move_37_code_challenge
```

#### Setup Postgres and Redis

- If you have postgres and redis locally running on your system, skip this part

**Setting up with Docker**

`Postgres`

```bash
docker run --name assignment_db \
  -e POSTGRES_PASSWORD=12345678 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=my_database \
  -p 5432:5432 \
  -d postgres
```

`Redis`

```bash
docker run --name redis_db \
  -p 6379:6379 \
  -d redis
```

#### Setting Up Env

- Create a .env file in the root of the project.

- Use the .env.example file provided in the repository as a reference.

```bash
# .env
DATABASE_URL=postgres://postgres:12345678@localhost:5432/my_database
REDIS_URL=redis://localhost:6379/0
JWT_SECRET="<YOUR JWT TOKEN SECRET>"
APP_EMAIL="<YOUR EMAIL>"
APP_PASSWORD="<YOUR EMAIL APP PASSWORD>"
NODE_ENV="development"


```

### Starting Development Server

#### To install dependencies

```bash
# npm
npm install

# bun
bun i
```

#### To generate Prisma client

```bash
# npm
npm prisma generate

# bun
bun prisma generate
```

#### To migrate Database

```bash
# npm
npm prisma migrate reset

# bun
bun prisma migrate reset
```

#### To build

```bash
# npm
npm run build

#bun
bun run build

```

#### To start the development server

- `Supports auto reload`

```bash
# npm
npm run dev

# bun
bun run dev
```

#### To start background worker

```bash
# npm
npm run worker

#bun
bun run worker

```

#### To start the prod server

- `First build the application`

```bash
# npm
npm run start

#bun
bun run start

```
