FROM node:16 as builder


WORKDIR /app


COPY package*.json ./


RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npm run build

FROM node:alpine


WORKDIR /app


COPY --from=builder /app/package*.json ./


RUN npm install  --only=production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV EMAIL_PASS=QDIzhK53J6FybHSN




CMD ["npm", "start"]