# Logicality

[![Build Status](https://travis-ci.org/bluemarblepayroll/logicality.svg?branch=master)](https://travis-ci.org/bluemarblepayroll/logicality)

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
let record = { visible: false, admin: true };
let visible =  Logic.evaluate('visible || admin', record); // resolves to true.
````

### Plugging in Immutable.JS

The above example works just fine using Logic's default object value resolver, but you can also pass in a custom function that will serve as resolver.  That way you could use dot notation for value resolution.  For example:

````
let resolver = (value, input) => input && value && !!input.get(value.toString().split('.'));
let record = Immutable.fromJS({ visible: false, settings: { admin: true } });
let visible =  Logic.evaluate('visible || settings.admin', record, resolver); // resolves to true.
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

To compile the TypeScript source down to native JavaScript, run:

````
npm run build
````

or:

````
yarn run build
````

### Running Tests

To execute the test suite first compile the solution then run:

````
npm run test
````

or:

````
yarn run test
````

## License

This project is MIT Licensed.
