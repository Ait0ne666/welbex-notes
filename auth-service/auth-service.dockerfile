FROM node:16 as builder


WORKDIR /app


COPY package*.json ./


RUN npm install

COPY . .


RUN npm run build




FROM node:alpine


WORKDIR /app


COPY --from=builder /app/package*.json ./


RUN npm install  --only=production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV DB_STRING=postgres://admin:fibonachi@postgres:5432/notes
ENV REFRESH_SECRET=psdaojspodj
ENV JWT_SECRET=pfksdppssd
ENV BROKER=kafka:29092
ENV TOPIC=mail




CMD ["npm", "start"]