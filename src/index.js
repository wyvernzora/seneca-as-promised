/**
 * index.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */


function promise(options) {

  this.decorate('actAsync', require('./act'));
  this.decorate('addAsync', require('./add'));
  this.decorate('wrapAsync', require('./wrap'));

}
module.exports = promise;
