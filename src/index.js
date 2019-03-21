const { Either, Left, Right } = require('./either');

/**
 * iterates over an array of promises, returning a single promise with an object that contains all success and all failure values (optionally failing if errors are present
 *
 * @param arr Array of promises to iterate over
 * @param failWithFailures if true and errors are present, the returned promise will be a failure
 */
exports.collect = function collect(arr, failWithFailures = false) {
    const allSuccess = arr.map(p => p.then(v => new Right(v)).catch(e => new Left(e)));
    return Promise.all(allSuccess)
        .then(function (values) {
            const ret = {
                successes: [],
                failures: []
            };
            values.forEach(v => {
                if (v.isLeft) {
                    ret.failures.push(v.value)
                } else {
                    ret.successes.push(v.value)
                }
            });
            if (failWithFailures && ret.failures.length > 0) {
                return Promise.reject(ret);
            } else {
                return ret;
            }
        });
}
