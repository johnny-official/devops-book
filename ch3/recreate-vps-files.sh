#!/usr/bin/env bash
set -euo pipefail

mkdir -p ch3/04-docker ch3/05-kubernetes

cat > ch3/04-docker/Dockerfile <<'EOF'
FROM node:21.7

WORKDIR /home/node/app

COPY app.js .

EXPOSE 8080

USER node

CMD ["node", "app.js"]
EOF

cat > ch3/04-docker/README.md <<'EOF'
# Dockerized Node.js App

This folder contains:

* `app.js`: A Node.js app that displays Kubernetes pod metadata and listens on port 8080.
* `Dockerfile`: Instructions to build a Docker image for the Node.js sample app.

For more information, see Chapter 3, "How to Manage Your Apps Using Orchestration Tools", of
[_Fundamentals of DevOps and Software Delivery_](https://www.fundamentals-of-devops.com) by Yevgeniy Brikman.

> [!IMPORTANT]
> This repo contains example code for learning and experimenting only, in conjunction with the book and blog post
> series. This code is _not_ designed for direct production usage. If you're looking for code you can use directly in
> production, check out the [Gruntwork Library](https://www.gruntwork.io/products/library).
EOF

cat > ch3/04-docker/app.js <<'EOF'
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello from pod ${process.env.POD_NAME || 'unknown'}!\nPod IP: ${process.env.POD_IP || 'unknown'}\nNode: ${process.env.NODE_NAME || 'unknown'}\n`);
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
EOF

cat > ch3/05-kubernetes/README.md <<'EOF'
# Kubernetes Deployment and Service

This folder contains:

* `sample-app-deployment.yml`: A Kubernetes `Deployment` for deploying a simple app that listens on port 8080.
* `sample-app-service.yml`: A Kubernetes `Service` to act as a load balancer for the apps in the `Deployment`.

For more information, see Chapter 3, "How to Manage Your Apps Using Orchestration Tools", of
[_Fundamentals of DevOps and Software Delivery_](https://www.fundamentals-of-devops.com) by Yevgeniy Brikman.

> [!IMPORTANT]
> This repo contains example code for learning and experimenting only, in conjunction with the book and blog post
> series. This code is _not_ designed for direct production usage. If you're looking for code you can use directly in
> production, check out the [Gruntwork Library](https://www.gruntwork.io/products/library).
EOF

cat > ch3/05-kubernetes/sample-app-deployment.yml <<'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sample-app-deployment
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: sample-app-pods
    spec:
      containers:
        - name: sample-app
          image: johnnydockeri/sample-app:latest
          ports:
            - containerPort: 8080
          env:
            - name: NODE_ENV
              value: production
            - name: POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
  selector:
    matchLabels:
      app: sample-app-pods
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 3
      maxUnavailable: 0
EOF

cat > ch3/05-kubernetes/sample-app-service.yml <<'EOF'
apiVersion: v1
kind: Service
metadata:
  name: sample-app-loadbalancer
spec:
  type: LoadBalancer
  selector:
    app: sample-app-pods
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
EOF

printf 'Recreated six files under ch3/04-docker and ch3/05-kubernetes.\n'
