/**
 * stub.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 *
 * Testing utilities.
 */
const _            = require('lodash');


function stub() {
  const Seneca = this;

  /* Require global.Sinon */
  /* istanbul ignore if */
  if (!global.Sinon) { return; }


  /**
   * Stub a seneca action, returning the provided object.
   * If provided object is an Error, it is thrown instead.
   */
  Seneca.stub = function(pattern, value) {

    const _stub = global.Sinon.spy(function(args, done) {
      if (value instanceof Error) {
        done(value, null);
      } else {
        done(null, value);
      }
    });
    this.add(pattern, _stub);

    _stub.data = function() {
      if (!this.calledOnce) {
        throw new Error('Expected Seneca stub to be called once');
      }
      return _.omit(this.firstCall.args[0], 'meta$', 'tx$');
    };

    return _stub;
  };

}
module.exports = stub;
