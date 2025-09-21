# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.19.0-alpine3.22@sha256:d2166de198f26e17e5a442f537754dd616ab069c47cc57b889310a717e0abbf9

FROM node:${NODE_VERSION} AS base
WORKDIR /usr/src/app
RUN npm i -g pnpm@10
RUN apk add --no-cache openssl
COPY nx.json tsconfig.base.json package.json pnpm-lock.yaml ./
EXPOSE 3000

FROM base AS dev-deps
RUN pnpm install --frozen-lockfile
COPY apps/server/src/modules/prisma ./apps/server/src/modules/prisma
RUN pnpm prisma generate --schema=./apps/server/src/modules/prisma/schema.prisma

FROM base AS development
COPY --from=dev-deps /usr/src/app/node_modules ./node_modules
COPY apps/server ./apps/server
COPY libs ./libs
CMD ["pnpm", "nx", "serve", "server", "--configuration=development"]
    