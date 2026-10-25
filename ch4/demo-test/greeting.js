// Existing behavior: keep this working while adding the new feature.
export function hello() {
  return 'Hello, World!';
}

// New contract: accept a non-empty string, trim it, and greet that name.
export function greet(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new TypeError('name must be a non-empty string');
  }
  return `Hello, ${name.trim()}!`;
}
