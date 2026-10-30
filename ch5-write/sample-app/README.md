# Node.js and NPM Example

This folder contains:

* `app.js`: A Node.js "Hello, World" app that listens on port 8080.
* `package.json`: App metadata and optional npm shortcuts.
* `Dockerfile`: Instructions on how to package the Node.js app as a Docker image.

## Run locally

Only Node.js is required. There are no dependencies to install, so you do not need
npm, a package manager, or a `node_modules` folder.

```sh
node app.js
```

The app listens on port 8080 by default. To use another port:

```sh
PORT=3000 node app.js
```

If npm is already installed, `npm start` is an optional shortcut for `node app.js`.

## Run with Docker

```sh
./build-docker-image.sh
docker run --rm -p 8080:8080 sample-app:0.0.1
```

The image uses Node.js Alpine and runs the app directly, without a package install
or build step. Docker's Node base image includes npm, but this app does not use it.

For more information, see Chapter 4, "How to Version, Build, and Test Your Code", of [_Fundamentals of DevOps and 
Software Delivery_](https://www.fundamentals-of-devops.com) by Yevgeniy Brikman.

> [!IMPORTANT]  
> This repo contains example code for learning and experimenting only, in conjunction with the book and blog post
> series. This code is _not_ designed for direct production usage. If you're looking for code you can use directly in
> production, check out the [Gruntwork Library](https://www.gruntwork.io/products/library).
