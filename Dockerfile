FROM node:12.20.2-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:1.18.0
COPY --from=build-step /app/dist/park-sa-mart-FrontEnd /usr/share/nginx/html