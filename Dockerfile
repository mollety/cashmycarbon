# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Copy env file into build stage
COPY .env.production .env

# Build the app
RUN npm run build

# Stage 2: Use a smaller image to run the app
FROM node:18-alpine AS runner
WORKDIR /app

# Only copy necessary files from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port (optional, based on runtime)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
