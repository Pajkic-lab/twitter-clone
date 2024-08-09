# Notice

# App will be dockerized as sun as platform onRender starts supporting docker compose files

https://feedback.render.com/features/p/support-docker-compose

<!--  -->

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

SET ENV [ DEV, STAGING, PROD]:

- Create env file from .env.example for all the env, read the comment inside env.example file.

- to set chosen env run command run command < pnpm run [dev | staging | prod]:set > e.g. < pnpm run dev:set >

  - staging can be run locally and remotely [ pnpm run staging:set-local | staging:set-remote ]

- to run app in chosen environment run command < pnpm run [dev | staging | prod] > e.g. < pnpm run dev >
