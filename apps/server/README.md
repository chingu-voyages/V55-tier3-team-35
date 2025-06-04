## Running the server locally

1. run `bun install` to install independencies
2. run `bun run dev` to start the server

## Running Github Actions

1. install [act](https://nektosact.com/installation/index.html) and verify using `act --version`
2. install [docker desktop] and verify using `docker --version`
3. add `.env` to ./apps/server folder and populate secrets according to `.env.example`
4. run `act` in ./apps/server
