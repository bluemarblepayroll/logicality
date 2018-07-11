/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var expect = require('chai').expect;
var Logic = require('../dist/logic.js').Logic;

describe('Logic#evaluation', () => {

  it('should evaluate boolean-only expressions', () => {
    let tests = [
      [ 'true',           null, true ],
      [ 'false',          null, false ],
      [ 'true && false',  null, false ],
      [ 'true && true',   null, true ]
    ];

    tests.forEach(x => {
      let result = Logic.evaluate(x[0], x[1]);
      expect(result).to.equal(x[2]);
    });
  });

  it('should evaluate and expressions', () => {
    let tests = [
      [ 'a && b', null,                   false ],
      [ 'a && b', {},                     false ],
      [ 'a && b', { a: true },            false ],
      [ 'a && b', { a: true, b: false },  false ],
      [ 'a && b', { a: false, b: false }, false ],
      [ 'a && b', { a: true, b: true },   true ],
    ];

    tests.forEach(x => {
      let result = Logic.evaluate(x[0], x[1]);
      expect(result).to.equal(x[2]);
    });
  });

  it('should evaluate and-or expressions', () => {
    let tests = [
      [ 'a && b || c',    { a: false, b: false, c: true },  true ],
      [ '(a && b) || c',  { a: false, b: false, c: true },  true ],
      [ 'a || b && c',    { a: false, b: false, c: true },  false ],
      [ 'a || (b && c)',  { a: false, b: false, c: true },  false ],
      [ '(a || b) && c',  { a: false, b: false, c: true },  false ]
    ];

    tests.forEach(x => {
      let result = Logic.evaluate(x[0], x[1]);
      expect(result).to.equal(x[2]);
    });
  });

});