/**
 * async/wrap.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license 2015-16 (C) Ricepo LLC. All Rights Reserved.
 */
const _            = require('lodash');
const Debug        = require('debug')('vg:core:wrap');
const unpromisify  = require('./util/unpromisify');


function wrapAsync(...args) {
  const pattern = _.dropRight(args, 1);
  const action  = _.last(args);

  Debug(args[0]);

  return this.wrap(...pattern, unpromisify(action));
}
module.exports = wrapAsync;
