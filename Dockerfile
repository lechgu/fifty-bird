FROM node:alpine AS build

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM lechgu/dab AS final

COPY --from=build /build/* /html/

ENV DIR=/html