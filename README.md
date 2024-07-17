# Notice

# App will be dockerized as sun as platform onRender starts supporting docker compose files

SET DEV:

- Create .env.development file in root dir, read the comment from .env.example

- to set development run command pnpm run dev:set

- to run development run command pnpm run dev

SET STAGING:

- Create .env.staging file in root dir, read the comment from .env.example

- to set staging run command pnpm run staging:set-local for local and staging:set-remote for actions

- to run staging run command pnpm run staging

SET PROD:

- Create .env.production file in root dir, read the comment from .env.example

- to set prod run command pnpm run prod:set

- to run prod run command pnpm run prod

ENVs are not the same do to difference in platforms, onrender, github actions...
this will be resolved when onRender starts supporting docker compose: https://feedback.render.com/features/p/support-docker-compose
