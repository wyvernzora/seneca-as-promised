/**
 * test/util.spec.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
const Bluebird       = require('bluebird');
const unpromisify    = require('../src/util/unpromisify');


describe('unpromisify', function() {

  beforeEach(function() {
    this.callback = Sinon.spy();
    this.source   = Sinon.spy(function(arg) { return arg; });
  });

  it('should correctly wrap a function', function() {
    unpromisify(this.source)('test', this.callback);

    expect(this.source)
      .to.be.calledOnce;
    expect(this.source)
      .to.be.calledWith('test');
  });

  it('should produce a promise-returning function', function() {
    const promise = unpromisify(this.source)('test', this.callback);


    expect(promise)
      .to.be.an.instanceOf(Bluebird);
    return expect(promise)
      .to.become('test');
  });

  it('should produce a function accepting node-style callbacks', async function() {
    await unpromisify(this.source)('test', this.callback);

    expect(this.callback)
      .to.be.calledOnce;
  });

  it('should correctly handle calls without callback', function() {
    const promise = unpromisify(this.source)('test');

    expect(promise)
      .to.be.an.instanceOf(Bluebird);
    return expect(promise)
      .to.become('test');
  });

  it('should correctly handle a promise-returning function', function() {
    this.source = Sinon.spy(arg => Bluebird.resolve(arg));
    const promise = unpromisify(this.source)('test');

    expect(promise)
      .to.be.an.instanceOf(Bluebird);
    return expect(promise)
      .to.become('test');
  });

});
