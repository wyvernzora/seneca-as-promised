/**
 * util/unpromisify.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

const _            = require('lodash');
const Bluebird     = require('bluebird');

/**
 * unpromisify(1)
 *
 * @description                Wraps a promise-returning function into a
 *                             universal function that returns a promise AND
 *                             accepts a node-style callback.
 * @param          {fn}        promise-returning function to wrap.
 * @returns        {Function}  Node-style callback-accepting function.
 */
function unpromisify(fn) {
  return function(...args) {
    let callback = function() { };

    /* If last argument is a callback, separate it out */
    if (typeof _.last(args) === 'function') {
      callback = _.last(args);
      args     = _.take(args, args.length - 1);
    }

    /* Call the function and wrap the promise */
    return Bluebird
      .try(() => { return fn(...args); })
      .nodeify(callback);
  };
}
module.exports = unpromisify;
