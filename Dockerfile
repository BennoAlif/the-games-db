FROM node:16-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*","./"]

COPY package*.json ./

# COPY
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install package.json dependencies
RUN npm install

# COPY
COPY . .

# Generate prisma client
RUN npx prisma generate

RUN npm run build

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD npm start