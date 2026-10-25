FROM oven/bun:1

WORKDIR /home/app

COPY package.json bun.lock .

RUN bun ci --production

COPY *.js .

EXPOSE 8080
USER bun
CMD ["bun", "run", "start"]
