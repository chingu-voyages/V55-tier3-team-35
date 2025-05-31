# FinTrack

The student-friendly finance tracker that makes expense tracking and budget projection.

## Local Development

### 1. Pre-requisites

#### Install Docker

- Install the [Docker Desktop](https://www.docker.com/products/docker-desktop/) app on your local machine, and run the app.

- Install Docker via Docker CLI. For this method, Docker Compose must also be installed separately.

#### Verify installation

```bash
docker-compose --version
docker --version
```

#### Install Bun

Install [Bun](https://bun.sh/docs/installation) on your local machine.

### 2. Clone the repo

```bash
git clone gh repo clone chingu-voyages/V55-tier3-team-35
cd V55-tier3-team-35
```

### 3. Install dependencies

install shared dependencies, client, and server dependencies in one command

```bash
bun run install:all
```

### 4. Set Up Environment Variables

In the apps/server folder, create a .env file based on the env.example file and add the secret keys

### 5. 4. Prisma Setup (If DB schema was changed in Supabase)

Whenever changes are made directly in Supabase (e.g. new tables):

```bash
cd apps/server
bunx prisma db pull      # Pulls schema from Supabase into Prisma
bunx prisma generate     # Regenerates the Prisma client
```

### 6. Run the app in development

In the root of the project, run the following command to start the app in development mode:

```bash
docker-compose -f docker/docker-compose.dev.yml up --build
```

This command will build the Docker containers and start the application in development mode.

#### Accessing the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

### Stopping the Containers

To stop the running containers, press `CTRL + C` in the terminal or run:

```bash
docker-compose -f docker/docker-compose.dev.yml down
```

### Rebuilding the Containers

```bash
docker-compose -f docker/docker-compose.dev.yml up --build
```

### Viewing Logs

To view the logs of a specific container, use:

```bash
docker-compose -f docker/docker-compose.dev.yml logs -f [service-name]
```

Replace `[service-name]` with `backend` or `frontend` as applicable.

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team _before_ you start
coding!

- Syed Affan #1: [GitHub](http://github.com/affan880) / [LinkedIn](http://linkedin.com/in/syed-affan/)
- Dorene St.Marthe #2: [GitHub](https://github.com/Dorene-StMarthe) / [LinkedIn](https://www.linkedin.com/in/dorenestmarthe/)
- Steffi Saint-Pierre #3: [GitHub](https://github.com/stefley1509) / [LinkedIn](https://www.linkedin.com/in/steffisp/)
- Shaimaa #4: [GitHub](https://github.com/Shaimaa01) / [LinkedIn](https://www.linkedin.com/in/shaimaa-kamel-818bab31b/)
- Jack Li #5: [GitHub](https://github.com/jackli921) / [LinkedIn](https://www.linkedin.com/in/jackli0707/)
- Kuro #7: [GitHub](https://github.com/kayoMichael) / [LinkedIn](https://www.linkedin.com/in/michael-li-72115222b/)
