/**
 * util/unpromisify.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
const _            = require('lodash');
const Bluebird     = require('bluebird');



/**
 * Custom unpromisifier in order to support .wrap() and .prior()
 */
function unpromisify(fn) {

  return function(...args) {
    let callback = function() { };

    /* If last argument is a callback, separate it out */
    if (typeof _.last(args) === 'function') {
      callback = _.last(args);
      args     = _.take(args, args.length - 1);
    }

    /* Construct the Senecajs context */
    const context = { };
    Object.setPrototypeOf(context, this);

    /* Bind and promisify the prior$ function */
    context.priorAsync = Bluebird
      .promisify(this.prior)
      .bind(this);
    context.prior$ = context.priorAsync; // NOTE Lecacy alias

    /* Call the function and wrap the promise */
    return Bluebird
      .try(() => fn.call(context, ...args))
      .nodeify(callback);
  };

}
module.exports = unpromisify;
