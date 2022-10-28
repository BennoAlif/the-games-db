FROM node:16-alpine AS builder
WORKDIR /app
COPY ["package.json", "package-lock.json*","./"]
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:16-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "run", "start:prod"]