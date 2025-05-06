FROM node:20.17.0-alpine3.19 AS base

FROM base AS build-deps
RUN apk add --no-cache libc6-compat

RUN npm i -g corepack@latest

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

RUN pnpm add sharp

FROM base AS builder

ARG NEXT_UMAMI_ID
ENV NEXT_UMAMI_ID=$NEXT_UMAMI_ID

RUN npm i -g corepack@latest

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=build-deps /app/node_modules ./node_modules

COPY . .

RUN pnpm build

FROM base AS runner

ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ARG NEXT_UMAMI_ID
ENV NEXT_UMAMI_ID=$NEXT_UMAMI_ID

CMD ["node", "server.js"]