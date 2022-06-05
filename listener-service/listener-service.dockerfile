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
ENV BROKER=kafka:29092
ENV TOPIC=mail
ENV MAIL_SERVICE_ADDRESS=http://mail-service:5002




CMD ["npm", "start"]