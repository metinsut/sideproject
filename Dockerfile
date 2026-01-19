# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-slim AS runner

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install production dependencies only
RUN bun install --frozen-lockfile --production

# Copy built application from builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

# Expose port (Cloud Run uses PORT env variable)
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application (Cloud Run expects server to listen on $PORT)
CMD ["bun", "run", ".output/server/index.mjs"]
