const assert = require('assert');
const { collect } = require('../src');

describe('collect()', function () {
    it('should return an empty success when given an empty collection', function (done) {
        collect([])
            .then(({ successes, failures }) => {
                assert.equal(successes.length, 0);
                assert.equal(failures.length, 0);
            })
            .then(() => done())
            .catch(e => done(e));
    });
    it('should properly sort successes and failures', async function () {
        const { successes, failures } = await collect([
            Promise.resolve('foo'),
            Promise.reject('bar'),
            Promise.resolve('baz')
        ]);
        assert.deepEqual(successes, ['foo', 'baz']);
        assert.deepEqual(failures, ['bar']);
    });
    it('should reject the result promise if there are any failures and failure is requested', async function () {
        return await assert.rejects(collect([
            Promise.resolve('foo'),
            Promise.reject('bar'),
            Promise.resolve('baz')
        ], true));
    });
    it('should succeed with no failures even if failure is requested', async function () {
        const promises = [
            'foo',
            'bar',
            'baz'
        ].map(v => Promise.resolve(v));
        return await assert.doesNotReject(collect(promises), true);
    })
})
