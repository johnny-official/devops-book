const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(
    `Hello from pod ${process.env.POD_NAME || 'unknown'}!\nPod IP: ${process.env.POD_IP || 'unknown'}\nNode: ${process.env.NODE_NAME || 'unknown'}\n`,
  );
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
