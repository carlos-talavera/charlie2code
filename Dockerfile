FROM node:20.17.0-alpine3.19 AS base

FROM base AS build-deps
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

RUN pnpm add sharp

FROM base AS builder

ARG EMAILOCTOPUS_API_KEY
ENV EMAILOCTOPUS_API_KEY=$EMAILOCTOPUS_API_KEY

ARG EMAILOCTOPUS_LIST_ID
ENV EMAILOCTOPUS_LIST_ID=$EMAILOCTOPUS_LIST_ID

ARG NEXT_UMAMI_ID
ENV NEXT_UMAMI_ID=$NEXT_UMAMI_ID

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

ARG EMAILOCTOPUS_API_KEY
ENV EMAILOCTOPUS_API_KEY=$EMAILOCTOPUS_API_KEY

ARG EMAILOCTOPUS_LIST_ID
ENV EMAILOCTOPUS_LIST_ID=$EMAILOCTOPUS_LIST_ID

ARG NEXT_UMAMI_ID
ENV NEXT_UMAMI_ID=$NEXT_UMAMI_ID

CMD ["node", "server.js"]