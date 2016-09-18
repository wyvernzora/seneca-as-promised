/**
 * async/act.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
const _            = require('lodash');
const Debug        = require('debug')('vg:core:act');
const Bluebird     = require('bluebird');



function actAsync(...args) {
  let cb = _.noop;

  Debug(args[0]);


  /*  */
  if (typeof _.last(args) === 'function') {
    cb = _.last(args);
    args = _.dropRight(args);
  }


  /* Promisify the original act, call it, and pass results back to callback */
  return Bluebird
    .fromNode(done => this.act(...args, done))
    .nodeify(cb);
}
module.exports = actAsync;
