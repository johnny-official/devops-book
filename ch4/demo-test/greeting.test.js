import { describe, test, expect } from 'bun:test';
import { hello, greet } from './greeting.js';

describe('existing behavior', () => {
  test('hello still returns the original greeting', () => {
    expect(hello()).toBe('Hello, World!');
  });
});

describe('new personalized greeting', () => {
  test('greets the supplied name', () => {
    expect(greet('Bob')).toBe('Hello, Bob!');
  });

  test('removes surrounding spaces from the name', () => {
    expect(greet('  Alice  ')).toBe('Hello, Alice!');
  });

  test.each(['', '   ', null, 42])('rejects invalid name %j', (name) => {
    expect(() => greet(name)).toThrow('name must be a non-empty string');
  });
});
