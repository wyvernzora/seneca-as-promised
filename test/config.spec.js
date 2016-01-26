/**
 * test/config.spec.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
const config       = require('../src/config');


describe('get / set', function() {

  beforeEach(function() {
    this.seneca = { };
    config.call(this.seneca);
  });

  it('should set config value', function() {
    const path = 'foo.bar.test';
    const value = { 'hello': 'world' };

    this.seneca.set(path, value);
    const result = this.seneca.get(path);

    expect(result)
      .to.deep.equal(value);
  });

  it('should use default value', function() {
    const path = 'foo.bar.test';
    const value = { 'hello': 'world' };

    const result = this.seneca.get(path, value);

    expect(result)
      .to.deep.equal(value);
  });

});
