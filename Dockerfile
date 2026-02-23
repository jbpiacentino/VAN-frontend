FROM node:20-alpine AS build
WORKDIR /app

ARG NUXT_APP_BASE_URL=/van/
ENV NUXT_APP_BASE_URL=${NUXT_APP_BASE_URL}
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NUXT_APP_BASE_URL=/van/

COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
