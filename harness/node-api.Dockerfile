# Builds one cell of the section-4 Node fixture: app version x Node version.
ARG NODE=22
FROM node:${NODE}-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY tsconfig.json ./
COPY src ./src
RUN npx tsc -p tsconfig.json
EXPOSE 7130
