FROM oven/bun:1.3.14

WORKDIR /home/bun/app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production

COPY *.js .
COPY views views

EXPOSE 8080

USER bun

CMD ["bun", "run", "start"]
