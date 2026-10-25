const { describe, test, expect } = require('bun:test');
const request = require('supertest');
const ejs = require('ejs');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const app = require('../app');

const template = readFileSync(path.join(__dirname, '../views/hello.ejs'), 'utf8');

describe('Greeting template unit tests', () => {
  test('renders a name', () => {
    expect(ejs.render(template, { name: 'Bob' })).toBe('Hello, Bob!');
  });

  test('escapes HTML instead of inserting executable markup', () => {
    expect(ejs.render(template, { name: '<script>alert("hi")</script>' })).toBe(
      'Hello, &lt;script&gt;alert(&#34;hi&#34;)&lt;/script&gt;!',
    );
  });

  test('handles an empty name', () => {
    expect(ejs.render(template, { name: '' })).toBe('Hello, !');
  });
});

const maliciousUrl = '/name/%3Cscript%3Ealert("hi")%3C%2Fscript%3E';
const sanitizedHtml = 'Hello, &lt;script&gt;alert(&#34;hi&#34;)&lt;/script&gt;!';

describe('Test the app', () => {
  test('Get / should return Hello, World!', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
  test('Get /name/Bob should return Hello, Bob!', async () => {
    const response = await request(app).get('/name/Bob');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, Bob!');
  });
  test('Get /name should sanitize its input', async () => {
    const response = await request(app).get(maliciousUrl);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(sanitizedHtml);
  });
  test('unknown routes return 404', async () => {
    const response = await request(app).get('/does-not-exist');
    expect(response.statusCode).toBe(404);
  });
});
