# Pop launcher toolkit

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

A toolkit for creating plugins for the [Pop!\_OS launcher](https://github.com/pop-os/launcher) using Typescript.

## Install

```bash
npm install pop-launcher-toolkit
```

## Usage

See [Pop launcher README.md](https://github.com/pop-os/launcher#plugin-config) for more information on how to create these plugins.
They can be written in any language, this toolkit helps with the boilerplate of creating one in Typescript.

Here's a few plugins that I've personnaly created : [Jeusto/pop-launcher-plugins](https://github.com/Jeusto/pop-launcher-plugins).
You can check the [awesome-pop-launcher](https://github.com/lucas-dclrcq/awesome-pop-launcher) repo for even more examples.

All you have to do is extend the `PopPlugin` class and implement the functions that you need.
In the main function you can the simply initialize the plugin and call the `run()` and it will take care of the rest.

```ts
import { PopPlugin } from 'pop-launcher-toolkit';

async function main() {
  const plugin = await HelloWorldPlugin.init();
  plugin.run();
}

class HelloWorldPlugin extends PopPlugin {
  private constructor() {
    super();
  }

  static async init(): Promise<HelloWorldPlugin> {
    return new HelloWorldPlugin();
  }

  search(query: string) {}
  activate(index: number) {}
}

main();
```

## API

[] Todo

[build-img]: https://github.com/jeusto/pop-launcher-toolkit/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/jeusto/pop-launcher-toolkit/actions/workflows/release.yml
[npm-img]: https://img.shields.io/npm/v/pop-launcher-toolkit
[npm-url]: https://www.npmjs.com/package/pop-launcher-toolkit
[issues-img]: https://img.shields.io/github/issues/jeusto/pop-launcher-toolkit
[issues-url]: https://github.com/jeusto/pop-launcher-toolkit/issues
[codecov-img]: https://codecov.io/gh/jeusto/pop-launcher-toolkit/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/jeusto/pop-launcher-toolkit
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
