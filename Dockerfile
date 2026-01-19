#################################
# 1) BUILD STAGE
#################################
FROM oven/bun:1 AS builder

WORKDIR /app

# Build stage - no build-time env vars needed
# Runtime environment variables are handled in runner stage via docker-compose

# source’u kopyala + bağımlılık yükle
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# build
RUN bun run build

#################################
# 2) RUNNER STAGE
#################################
FROM oven/bun:1-slim AS runner

WORKDIR /app

# Production dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Build çıktısını al
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

# PORT ayarı
ENV PORT=8080
EXPOSE 8080

# Production environment
ENV NODE_ENV=production

# Runtime environment variables will be provided by docker-compose.yml
# Do not set them here as they need to come from docker-compose environment section

CMD ["bun", "run", ".output/server/index.mjs"]