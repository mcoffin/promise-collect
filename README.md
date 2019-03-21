# promise-collect

Similar to `async.each`, but for promises, and without failing fast.

# Usage

```javascript
const assert = require('assert');
const { collect } = require('promise-collect');

const { successes, failures } = await collect([
	Promise.resolve('foo'),
	Promise.reject('bar'),
	Promise.resolve('baz')
]);
assert.deepEqual(successes, ['foo', 'baz']);
assert.deepEqual(failures, ['bar']);
```
