# Logicality

[![npm version](https://badge.fury.io/js/%40bluemarblepayroll%2Flogicality.svg)](https://badge.fury.io/js/%40bluemarblepayroll%2Flogicality) [![Build Status](https://travis-ci.org/bluemarblepayroll/logicality.svg?branch=master)](https://travis-ci.org/bluemarblepayroll/logicality) [![Maintainability](https://api.codeclimate.com/v1/badges/fbb0d5a6bac07afc7c2f/maintainability)](https://codeclimate.com/github/bluemarblepayroll/logicality/maintainability) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A common problem that many frameworks have is the ability to give developers an expressive
intermediary scripting language or DSL. Logicality helps solve this problem by providing a simple
boolean expression evaluator.  That way, your developers can create simple scripts for dynamically
resolving boolean values such as:

* a
* b
* a && b
* a || b
* a && b || c
* (a && b) || (c && d)
* (a && b) || (c && (d || e && f))

## Credit

Deep inspiration was taken from [this set of articles](https://ruslanspivak.com/lsbasi-part7/).
Here, the author gives details around the theory and practical implementation of creating a basic
language processor and compiler.

## Installation

This library could be consumed as either a pure TypeScript library or as its trans-compiled ES2015 JavaScript counterpart.

To install through NPM:

````
npm install --save @bluemarblepayroll/logicality
````

To install through Yarn:

````
yarn add @bluemarblepayroll/logicality
````

## Examples

### A simple object-based example.

Consider a case where some content should be displayed if it is marked as visible or if the user is an administrator. You can express this as:

````
visible || admin
````

Now you can bind and evaluate this expression against passed in objects:

````
import { evaluate } from '@bluemarblepayroll/logicality';

let record = { visible: false, admin: true };
let expression = 'visible || admin';

let visible =  evaluate(expression, record); // resolves to true.
````

### What is truthy and falsy?

Logicality uses the same rules for deciding which values are true or false as JavaScript. As a reminder, JavaScript considers the following six things to be false:

* false
* undefined
* null
* NaN (not a number)
* 0 (the number, not the string)
* "" (the empty string)

Everything evaluates to true.

### Plugging in Immutable.JS

The above example works just fine using Logic's default object value resolver, but you can also pass in a custom function that will serve as resolver.  That way you could use dot notation for value resolution.  For example:

````
let record = Immutable.fromJS({ visible: false, settings: { admin: true } });
let expression = 'visible || settings.admin';

let resolver = (value, input) => input && value && !!input.get(value.toString().split('.'));

let visible =  evaluate(expression, record, resolver); // resolves to true.
````

## Contributing

### Development Environment Configuration

Basic steps to take to get this repository compiling:

1. Install [Node.js](https://nodejs.org) (check package.json for versions supported.)
2. Install Yarn package manager (npm install -g yarn)
3. Clone the repository (git clone git@github.com:bluemarblepayroll/logicality.git)
4. Navigate to the root folder (cd logicality)
5. Install dependencies (yarn)

### Compiling

To compile the TypeScript source to JavaScript, run:

````
yarn run build
````

You can also run the TypeScript compiler in watch mode with (start developing):

```
yarn run start
```

### Running Tests

To execute the test suite run:

````
yarn run test
````

### Linting

````
yarn run lint
````

### Publishing

Note: ensure you have proper authorization before trying to publish new versions.

After code changes have successfully gone through the Pull Request review process then the following steps should be followed for publishing new versions:

1. Merge Pull Request into master
2. Update package.json [version number](https://semver.org/)
3. Update CHANGELOG.md
4. Push master to remote and ensure CI builds master successfully
5. Build the project locally: `yarn run build`
6. Perform a dry run: `npm publish --access public --dry-run`.  Inspect packaging, ensure all files (including dist) are included.
7. Publish package to NPM: `npm publish --access public`
8. Tag master with new version: `git tag <version>`
9. Push tags remotely: `git push origin --tags`

## License

This project is MIT Licensed.
