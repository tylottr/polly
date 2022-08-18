# syntax=docker/dockerfile:1
FROM node:alpine AS build

# set image up
ARG NODE_ENV=production
WORKDIR /home/node/app

# install dependencies
COPY package*.json ./
RUN npm ci

# copy source
COPY . .

# finalise image
ARG MESSAGE="Mondo Cool"
ENV MESSAGE=${MESSAGE}

USER node

CMD npm start

EXPOSE 3000

HEALTHCHECK --start-period=30s --interval=10s --timeout=1s --retries=3  \
  CMD wget --no-verbose --tries 3 --spider http://127.0.0.1:3000/health || exit 1
