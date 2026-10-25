# Tiny Bun TDD example

TDD means test-driven development: define expected behavior in a test before implementing that behavior.

No installation or dependencies are needed beyond Bun. Open a terminal in this directory and run the [test command](greeting.test.js:1):

    bun test ./greeting.test.js

## Files

- [greeting.js](greeting.js): existing greeting plus the new personalized greeting.
- [greeting.test.js](greeting.test.js): runnable behavior specifications.
- [red-phase.log](red-phase.log): actual output captured before implementation.

## The cycle we performed

| Step           | Action                                                                   | Actual result                                    |
| -------------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
| 1. Placeholder | Export the new function, but make it throw “Not implemented.”            | The module loads, but the feature is unfinished. |
| 2. Tests       | Specify a named greeting, whitespace trimming, and invalid-input errors. | Expectations exist before the implementation.    |
| 3. Red         | Run all tests in this directory.                                         | 1 existing test passed; 6 new cases failed.      |
| 4. Green       | Validate input and return the personalized greeting.                     | All 7 cases passed.                              |
| 5. Refactor    | Combine duplicate validation branches without changing the contract.     | All 7 cases still passed.                        |

## Read one test

The [named-greeting test](greeting.test.js:11) has three ideas:

1. Input: Bob.
2. Action: call the greeting function.
3. Expected output: Hello, Bob!

The [existing-behavior test](greeting.test.js:5) is a regression check: adding the new feature must not break the original greeting.

The [invalid-input cases](greeting.test.js:19) require a specific error message. An unrelated error is not enough to pass. That is why the placeholder failed even though it also threw an error.

## Replay the red phase yourself

Temporarily replace only the body of the [personalized greeting function](greeting.js:7) with a thrown error whose message is “Not implemented: personalized greeting.” Keep the original greeting and tests unchanged.

Run the test command again: expect 1 pass and 6 failures. Undo that temporary edit and rerun: expect 7 passes.

## Why refactoring comes last

First make the behavior correct, then simplify its structure. We combined the two validation branches into one [guard](greeting.js:8). The left side checks the input type first; short-circuit evaluation skips the string operation if the type is invalid.

Passing tests provide evidence for the behaviors covered here, not proof of correctness for every possible future requirement.

Reflection exercise: predict what happens if whitespace trimming is removed. The whitespace test should fail while the ordinary-name test can still pass.

Skipped: a web server, package manifest, mocks, and extra test frameworks. Add them only when the behavior being tested actually needs them.
