/**
 * test/async/wrap.spec.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license 2015-16 (C) Ricepo LLC. All Rights Reserved.
 */
require('./.setup.js');
const test         = require('ava');


test(async t => {

  t.context.addAsync('name:a,test:b', async args => args);
  t.context.wrapAsync('name:a', async function(args) {
    args.bar = 'baz';
    return this.prior$(args);
  });

  const r = await t.context.actAsync('name:a,test:b', { foo: 'bar' });

  t.is(r.bar, 'baz');

});
