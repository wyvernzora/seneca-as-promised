/**
 * test/stub.spec.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
const target       = require('../src');
const Seneca       = require('seneca');


describe('stub', function() {

  beforeEach(function() {
    this.seneca = Seneca({ log: 'silent' });
    target(this.seneca);
  });

  it('should return a sinon spy', async function() {
    const stub = this.seneca.stub('ns:test', { foo: 'bar' });

    expect(stub)
      .to.be.a('function')
      .to.have.property('data');

    const response = await this.seneca.act('ns:test', { herp: 'derp' });
    expect(response)
      .to.deep.equal({ foo: 'bar' });

    expect(stub)
      .to.be.calledOnce;
    expect(stub.data())
      .to.deep.equal({ herp: 'derp', ns: 'test' });

  });

  it('should throw if stub is an Error', function() {
    this.seneca.stub('ns:test', new Error('test error'));

    const promise = this.seneca.act('ns:test', { });
    return expect(promise)
      .to.be.rejectedWith('test error');

  });

  it('should throw on data() if stub was never called', function() {
    const stub = this.seneca.stub('ns:test', { });
    expect(() => stub.data())
      .to.throw('Expected Seneca stub to be called once');
  });

});
