/**
 * test/async.spec.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
const _            = require('lodash');
const async        = require('../src/async');


describe('act', function() {

  beforeEach(function() {
    this.act = Sinon.spy((...args) => _.last(args)());
    this.seneca = { act: this.act };

    async.call(this.seneca);
  });

  it('should overwrite seneca.act()', function() {
    expect(this.seneca.act)
      .to.be.a('function')
      .not.to.equal(this.act);
  });

  it('should call the underlying act', async function() {
    await this.seneca.act('ns:test', { foo: 'bar' });

    expect(this.act)
      .to.be.calledOnce
      .to.be.calledWith('ns:test', { foo: 'bar' });
  });

  it('should accept the callback if available', async function() {
    const cb = Sinon.spy();
    await this.seneca.act('ns:test', { bar: 'baz' }, cb);

    expect(this.act)
      .to.be.calledOnce
      .to.be.calledWith('ns:test', { bar: 'baz' });
    expect(cb)
      .to.be.calledOnce;
  });

});


describe('async', function() {

  beforeEach(function() {
    this.add = Sinon.spy();
    this.seneca = { act: function() { }, add: this.add };

    this.cb = Sinon.spy(i => i);
    async.call(this.seneca);
  });

  it('should add the seneca.async method', function() {
    expect(this.seneca.async)
      .to.be.a('function');
  });

  it('should call underlying add', async function() {
    this.seneca.async('ns:test', this.cb);

    expect(this.add)
      .to.be.calledOnce
      .to.be.calledWith('ns:test');
    const fn = this.add.firstCall.args[1];
    expect(fn)
      .to.be.a('function');

    const result = await fn('test');
    expect(result)
      .to.equal('test');
  });

  it('should throw if action is not a function', function() {

    expect(() => this.seneca.async('ns:test', { }))
      .to.throw('Action callback must be a function.');

  });

  it('should accept callback-style functions', function() {
    const cb = Sinon.spy((args, done) => done(args));
    this.seneca.async('ns:test', cb);

    expect(this.add)
      .to.be.calledOnce
      .to.be.calledWith('ns:test');
    const fn = this.add.firstCall.args[1];
    expect(fn)
      .to.be.a('function');
  });

});
