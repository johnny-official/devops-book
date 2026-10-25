const http = require('http');

// Only validated EC2 IDs are interpolated into the HTML.
const instanceId = /^i-[0-9a-f]+$/.test(process.env.INSTANCE_ID || '')
  ? process.env.INSTANCE_ID
  : 'local';

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC2 Instance Viewer</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #eef2f6; color: #172033; margin: 0; padding: 2rem; }
    main { max-width: 36rem; margin: 10vh auto; padding: 2rem; background: white; border-radius: 1rem; }
    code { display: block; padding: 1rem; background: #eef2f6; overflow-wrap: anywhere; font-size: 1.2rem; }
    a { display: inline-block; margin-top: 1rem; color: #1749a6; }
  </style>
</head>
<body>
  <main>
    <h1>Hello Johnny Tran 2 SUPER!</h1>
    <p>This page was served by EC2 instance:</p>
    <code>${instanceId}</code>
    <a href="/">Refresh instance information</a>
    <p>The load balancer may select the same instance again.</p>
  </main>
</body>
</html>`);
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
