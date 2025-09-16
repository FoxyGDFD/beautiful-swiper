FROM node:24-alpine AS app

WORKDIR /app

COPY package*.json .
RUN npm i

COPY . ./



FROM app AS development

WORKDIR /app

CMD [ "npm", "run", "dev" ]


FROM app AS production

WORKDIR /app

RUN npm run build
ENTRYPOINT [ "cp", "-r", "/app/dist/.", "/dist" ]