const { test, expect } = require('bun:test');
const { once } = require('node:events');
const app = require('../app');

test('local HTTP performance smoke test', async () => {
  const server = app.listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const url = `http://127.0.0.1:${server.address().port}/`;

    async function request() {
      const start = performance.now();
      const response = await fetch(url);
      const body = await response.text();
      expect(response.status).toBe(200);
      expect(body).toBe('Hello, World!');
      return performance.now() - start;
    }

    // Warm up so initialization has less influence on the measurements.
    for (let i = 0; i < 10; i++) await request();

    // ponytail: local smoke test only; use a dedicated load tool for realistic traffic.
    const concurrency = 5;
    const requestsPerWorker = 20;
    const durations = [];
    const start = performance.now();
    await Promise.all(
      Array.from({ length: concurrency }, async () => {
        for (let i = 0; i < requestsPerWorker; i++) {
          durations.push(await request());
        }
      }),
    );
    const elapsed = performance.now() - start;
    durations.sort((a, b) => a - b);
    const p95 = durations[Math.ceil(durations.length * 0.95) - 1];
    console.log(`Requests: ${durations.length}, concurrency: ${concurrency}`);
    console.log(`Throughput: ${(durations.length / (elapsed / 1000)).toFixed(1)} requests/sec`);
    console.log(`p95 latency: ${p95.toFixed(1)} ms`);

    // Generous smoke-test budget, not a production performance guarantee.
    expect(p95).toBeLessThan(1000);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    });
  }
}, 15000);
