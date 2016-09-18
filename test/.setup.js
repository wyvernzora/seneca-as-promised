/**
 * test/.setup.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license 2015-16 (C) Ricepo LLC. All Rights Reserved.
 */
const test         = require('ava');

const Seneca       = require('seneca');
const core         = require('../src');


test.cb.beforeEach(t => {


  const instance = Seneca({ log: 'silent' });
  instance.use(core);

  t.context = instance;
  t.context.ready(t.end);

});
