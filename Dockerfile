# syntax=docker/dockerfile:1
FROM node:20-alpine as angular
WORKDIR /ng-app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
ARG name
COPY --from=angular /ng-app/dist/ndd-teste-interface/browser /usr/share/nginx/html
EXPOSE 80




