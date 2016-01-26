# Seneca-as-promised
Promise support for Seneca.js, as well as other useful stuff.

*At this point the project is still in development*

# Getting Started

```js
const Seneca = require('seneca')();
Seneca.use('as-promised');
```

In order to add an async task, use the following:

```js
async function task() {
  return { foo: 'bar' };
}

Seneca.async('role:test,cmd:task', task);
```

Seneca.act is monkey patched to support both promises and callbacks:

```js
async function task() {
  await Seneca.act('role:test,cmd:task', { });
}
```

In addition to that, seneca-as-promised provides a simple way to attach stuff to the seneca instance:

```js
Seneca.set('foo.bar', { herp: 'derp' });
Seneca.get('foo.bar.herp'); // 'derp'
```

When `global.Sinon` is defined, seneca-as-promised also adds `Seneca.stub`, which stubs a seneca task using Sinon.js:

```js
const stub = Seneca.stub('role:test,cmd:stub', { foo: 'bar' });
await Seneca.act('role:test,cmd:stub', { herp: 'derp' }); // { foo: 'bar' }

stub.data(); // { role: 'test', cmd: 'stub', herp: 'derp' }
```

If value provided to `Seneca.stub` is an `Error`, then it will be thrown instead
of being returned.
