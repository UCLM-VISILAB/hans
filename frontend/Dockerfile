# syntax=docker/dockerfile:1

FROM node:20.11 AS build-react-app
ARG API_ORIGIN
ARG WS_MQTT

ENV REACT_APP_API_ORIGIN=${API_ORIGIN}
ENV REACT_APP_WS_MQTT=${WS_MQTT}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force
COPY public/ ./public
COPY src/ ./src
RUN npm run build

FROM nginx
COPY --from=build-react-app /app/build /www
EXPOSE 80