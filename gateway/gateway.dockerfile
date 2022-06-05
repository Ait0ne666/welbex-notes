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
ENV AUTH_HOST=http://auth-service:5000
ENV NOTES_HOST=http://notes-service:5001


CMD ["npm", "start"]