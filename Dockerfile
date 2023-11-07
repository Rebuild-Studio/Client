
FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

FROM nginx:1.21-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

