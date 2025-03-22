# syntax=docker.io/docker/dockerfile:1

# Base image: Using Node.js 20 LTS with Alpine Linux for a minimal footprint
FROM node:20-alpine AS base

# Stage 1: Dependencies
FROM base AS deps
# Installing libc6-compat for Alpine Linux compatibility
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm and dependencies
RUN apk add --no-cache curl
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
ENV PATH="/root/.local/share/pnpm:$PATH"
RUN pnpm install --frozen-lockfile

# Stage 2: Building the application
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Setup environment for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Install pnpm for build
RUN apk add --no-cache curl
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
ENV PATH="/root/.local/share/pnpm:$PATH"

# Build the application
RUN pnpm build

# Stage 3: Production runtime
FROM base AS runner
WORKDIR /app

# Setup environment for production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files for running the application
COPY --from=builder /app/public ./public

# Set the correct permission for static files
RUN mkdir -p .next/standalone .next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Configure the server
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Command to run the application
CMD ["node", "server.js"]