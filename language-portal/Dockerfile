# language-portal: Docusaurus static site + Node practice server (Express + ws + @google/genai).
# Builder stage compiles both the static site (build/) and a self-contained server bundle (dist/server.js,
# all npm dependencies inlined by esbuild), so the runtime image needs no node_modules at all.

FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production \
    PORT=8080 \
    STATIC_DIR=build
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/dist ./dist
USER node
EXPOSE 8080
CMD ["node", "--enable-source-maps", "dist/server.js"]
