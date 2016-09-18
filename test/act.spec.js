/**
 * test/async/act.spec.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
require('./.setup.js');
const test         = require('ava');


test('promise', async t => {

  t.context.add('name:a', (args, done) => done(null, args));

  const r = await t.context.actAsync('name:a', { foo: 'bar' });

  t.is(r.foo, 'bar');

});


test.cb('callback', t => {

  t.context.add('name:a', (args, done) => done(null, args));

  t.context.actAsync('name:a', { foo: 'bar' }, (err, res) => {

    t.is(res.foo, 'bar');

    t.end();

  });

});
