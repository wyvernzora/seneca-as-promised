![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> Promise support for [Seneca.js][0] microservices

# seneca-as-promised
[![npm version][1]][2]
[![Build Status][3]][4]

- __Lead Maintainer:__ [Denis Luchkin-Zhou][5]
- __Sponsor:__ [Ricepo][6]


This plugin adds support for promises to Seneca, courtesy of [Bluebird][7].


## Install

To install, use npm

```sh
npm install seneca-as-promised
```

Add in your code

```js
require('seneca')()
  .use('seneca-as-promised');
```


## API

### `addAsync()`

Behaves exactly like `seneca.add()`, but supports promise-returning functions.

```js

seneca.addAsync('role:hex,color:red', async function(msg) {
  await someAsyncStuff();
  return { color: '#FF0000' };
});

```

Actions added via `addAsync()` have an additional `priorAsync` method in the
`this` context, which is a promisified version of `this.prior()`.



### `actAsync()`

Behaves exactly like `seneca.act()`, but returns a promise. Also supports
callbacks.

```js

const color = await seneca.actAsync('role:hex,color:red');

```


### `wrapAsync()`

Behaves exactly like `seneca.wrap()`, but supports promise-returning functions.

```js

seneca.wrapAsync('role:hex', async function(msg) {
  const color = await this.priorAsync(msg);
  color.format = 'css';

  return color;
});

```

Wrappers added via `wrapAsync()` have an additional `priorAsync` method in the
`this` context, which is a promisified version of `this.prior()`.


## License

Copyright (C) 2015-16, Denis Luchkin-Zhou. Licensed under [MIT][8]

[0]: https://github.com/senecajs/seneca
[1]: https://img.shields.io/npm/v/seneca-as-promised.svg?maxAge=2592000
[2]: https://www.npmjs.com/package/seneca-as-promised
[3]: https://img.shields.io/codeship/48da88b0-5fb5-0134-7be2-7a3a89611ccb/master.svg
[4]: https://codeship.com/projects/174421
[5]: https://github.com/jluchiji
[6]: https://ricepo.com
[7]: https://github.com/petkaantonov/bluebird
[8]: ./LICENSE
