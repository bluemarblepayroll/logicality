/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const expect = require('chai').expect;
const Logic = require('../dist/logic.js');
const Logger = require('../dist/util/logger.js');

// Uncomment this line if you want to output log data.
// Logger.on();

const testEvaluate = (tests) => {
  tests.forEach((testData) => {
    const [expression, bindings, expectedResult] = testData;

    let result = Logic.evaluate(expression, bindings)
    expect(result).to.equal(expectedResult,
      `Failed on: '${expression}' with bindings of ${JSON.stringify(bindings)}`);
  });
};

describe('Logic#evaluate', () => {

  it('should evaluate boolean-only expressions', () => {
    let tests = [
      [ 'true',           null, true  ],
      [ 'false',          null, false ],
      [ 'true && false',  null, false ],
      [ 'true && true',   null, true  ]
    ];

    testEvaluate(tests);
  });

  it('should evaluate using standard JavaScript truthy and falsy rules', () => {
    let tests = [
      [ 'a', { a: null },      false ],
      [ 'a', { a: undefined }, false ],
      [ 'a', { a: false },     false ],
      [ 'a', { a: true },       true ],
      [ 'a', { a: NaN },       false ],
      [ 'a', { a: 0 },         false ],
      [ 'a', { a: 1 },         true  ],
      [ 'a', { a: '' },        false ],
      [ 'a', { a: ' ' },       true  ],
    ];

    testEvaluate(tests);
  });


  it('should evaluate "and" expressions', () => {
    let tests = [
      [ 'a && b', null,                   false ],
      [ 'a && b', {},                     false ],
      [ 'a && b', { a: true },            false ],
      [ 'a && b', { a: true, b: false },  false ],
      [ 'a && b', { a: false, b: false }, false ],
      [ 'a && b', { a: true, b: true },   true  ]
    ];

    testEvaluate(tests);
  });

  it('should evaluate "and-or" expressions', () => {
    let tests = [
      [ 'a && b || c',    { a: false, b: false, c: true },  true  ],
      [ '(a && b) || c',  { a: false, b: false, c: true },  true  ],
      [ 'a || b && c',    { a: false, b: false, c: true },  false ],
      [ 'a || (b && c)',  { a: false, b: false, c: true },  false ],
      [ '(a || b) && c',  { a: false, b: false, c: true },  false ]
    ];

    testEvaluate(tests);
  });

  it('should evaluate "not" expressions', () => {
    let tests = [
      [ '!a',         { a: false },            true  ],
      [ '!a && !b',   { a: false, b: false },  true  ],
      [ '!a && b',    { a: false, b: false },  false ],
      [ 'a && !b',    { a: false, b: false },  false ],
      [ '!(a && b)',  { a: false, b: false },  true  ]
    ];

    testEvaluate(tests);
  });

  it('should treat question marks as a valid part of a value token', () => {
    let tests = [
      [ 'a?',       { 'a?': true },             true  ],
      [ '!a?',      { 'a?': true },             false ],
      [ 'a? && b?', { 'a?': true, 'b?': true }, true  ],
      [ 'a && b?',  { a: true, 'b?': true },    true  ]
    ];

    testEvaluate(tests);
  });

});
