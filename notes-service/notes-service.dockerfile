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
ENV DB_STRING=postgres://admin:fibonachi@postgres_notes:5432/notes
ENV JWT_SECRET=pfksdppssd




CMD ["npm", "start"]