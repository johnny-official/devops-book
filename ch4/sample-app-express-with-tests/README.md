# Express.js and Automated Tests Example

This folder contains:

- `app.js`: An Express.js "Hello, World" app.
- `app.test.js`: Automated integration tests for `app.js`.
- `server.js`: Fires up the app in `app.js` to listen on port 8080.
- [package.json](package.json): Bun scripts and dependencies for the app.
- [bun.lock](bun.lock): Locked dependency versions for reproducible installs.
- [Dockerfile](Dockerfile): Instructions on how to package the Bun app as a Docker image.

## Run locally

Install Bun 1.3.14 or later, then run:

```sh
bun install --frozen-lockfile
bun run start
```

The app listens on http://localhost:8080.

## Test

```sh
bun test
```

Tests use Bun's built-in test runner and Supertest.

## Build the Docker image

```sh
bun run dockerize
```

For more information, see Chapter 4, "How to Version, Build, and Test Your Code", of [_Fundamentals of DevOps and
Software Delivery_](https://www.fundamentals-of-devops.com) by Yevgeniy Brikman.

> [!IMPORTANT]  
> This repo contains example code for learning and experimenting only, in conjunction with the book and blog post
> series. This code is _not_ designed for direct production usage. If you're looking for code you can use directly in
> production, check out the [Gruntwork Library](https://www.gruntwork.io/products/library).
