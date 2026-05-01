# Use Playwright's built-in Chromium
FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY worker/package.json worker/pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY worker/src ./src
COPY worker/tsconfig.json ./

# Build
RUN pnpm build

# Run
CMD ["node", "dist/index.js"]
