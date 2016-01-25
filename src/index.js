/**
 * index.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */


function promised() {
  const seneca = Object.getPrototypeOf(this);

  require('./async').call(seneca);
  require('./config').call(seneca);
  require('./stub').call(seneca);

}
module.exports = promised;
