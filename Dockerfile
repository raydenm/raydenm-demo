FROM node:18-alpine AS base

RUN npm config set registry https://registry.npmmirror.com

FROM base as builder
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM base as runner

COPY --from=builder /app/scripts/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
