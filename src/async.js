/**
 * async.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
const _            = require('lodash');
const Bluebird     = require('bluebird');
const Unpromisify  = require('./util/unpromisify');


function async() {
  const Seneca = this;


  /**
   * Backups of vanilla seneca methods.
   */
  const __add = Seneca.add;
  const __act = Bluebird.promisify(Seneca.act);


  /**
   * Async version of Seneca.act().
   * Returns a promise and optionally accepts a callback.
   */
  Seneca.act = function(...args) {
    const params = _.dropRight(args, 1);
    const callback = _.last(args);

    /* If we don't have a callback, assume it's promisified call */
    if (typeof callback !== 'function') {
      return __act.call(this, ...args);
    }

    /* Otherwise, call without callback then nodeify */
    return __act
      .call(this, ...params)
      .nodeify(callback);
  };


  /**
   * Seneca.async() that optionally supports the Seneca.add()
   */
  Seneca.async = function(...args) {
    const pattern = _.dropRight(args, 1);
    const action  = _.last(args);

    /* Double check, just in case */
    if (typeof action !== 'function') {
      throw new Error('Action callback must be a function.');
    }

    /* Unpromisified actions MUSH have two arguments */
    if (action.length === 2) {
      return __add.call(this, ...pattern, action.bind(Seneca));
    }
    return __add.call(this, ...pattern, Unpromisify(action.bind(Seneca)));
  };


}
module.exports = async;
