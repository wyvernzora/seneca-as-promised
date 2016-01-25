/**
 * config.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 *
 * A volatile value store attached to Seneca instance.
 * Mostly intended for storing local, instance-only config data.
 */
const _            = require('lodash');


/**
 * Symbol that hides config details.
 */
const $$config     = Symbol();


/**
 * Export a Seneca plugin.
 */
function config() {
  const Seneca = this;


  /**
   * Initialize the config object.
   */
  Seneca[$$config] = { };


  /**
   * Volatile key-value store, similar to that of Hafiz.
   */
  Seneca.get = function(path, def = null) {
    return _.get(this[$$config], path) || def;
  };

  Seneca.set = function(path, value) {
    _.set(this[$$config], path, value);
  };


}
module.exports = config;
