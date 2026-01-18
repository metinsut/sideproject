# Bun'ı içeren base image
FROM oven/bun:latest

WORKDIR /app

# Bun ile bağımlılıkları yükle
COPY bun.lock bunfig.toml ./
RUN bun install

# Kodları kopyala
COPY . .

# TanStack Start build yap
RUN bun run build

# Port'u expose et
EXPOSE 3000
ENV PORT=3000

# Bun ile TanStack Start server'ı başlat
CMD ["bun", "run", "dist/server/index.mjs"]
