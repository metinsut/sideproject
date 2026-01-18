# Bun’ı içeren base image
FROM oven/bun:latest

WORKDIR /app

# Bun ile bağımlılıkları yükle
COPY bun.lock bunfig.toml ./
RUN bun install

# Kodları kopyala
COPY . .

# Nitro build yap
RUN bun run build

# Port’u expose et
EXPOSE 3000
ENV PORT=3000

# Bun ile Nitro output server’ı başlat
CMD ["bun", "run", ".output/server/index.mjs"]