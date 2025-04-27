FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM node:22-slim
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev --production

COPY prisma ./prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]