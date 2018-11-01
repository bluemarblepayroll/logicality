/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect } from "chai";
import * as Logic from "../lib/logic";

// Uncomment these lines if you want to output log data.
// import { on } from '../lib/util/logger';
// on();

const testEvaluate = (tests) => {
  tests.forEach((testData) => {
    const [expression, bindings, expectedResult] = testData;

    const result = Logic.evaluate(expression, bindings);
    expect(result).to.equal(expectedResult,
      `Failed on: '${expression}' with bindings of ${JSON.stringify(bindings)}`);
  });
};

describe("Logic#evaluate", () => {

  it("should evaluate boolean-only expressions", () => {
    const tests = [
      [ "true",           null, true  ],
      [ "false",          null, false ],
      [ "true && false",  null, false ],
      [ "true && true",   null, true  ],
    ];

    testEvaluate(tests);
  });

  it("should evaluate using standard JavaScript truthy and falsy rules", () => {
    const tests = [
      [ "a", { a: null },      false ],
      [ "a", { a: undefined }, false ],
      [ "a", { a: false },     false ],
      [ "a", { a: true },       true ],
      [ "a", { a: NaN },       false ],
      [ "a", { a: 0 },         false ],
      [ "a", { a: 1 },         true  ],
      [ "a", { a: "" },        false ],
      [ "a", { a: " " },       true  ],
    ];

    testEvaluate(tests);
  });

  it('should evaluate "and" expressions', () => {
    const tests = [
      [ "a && b", null,                   false ],
      [ "a && b", {},                     false ],
      [ "a && b", { a: true },            false ],
      [ "a && b", { a: true, b: false },  false ],
      [ "a && b", { a: false, b: false }, false ],
      [ "a && b", { a: true, b: true },   true  ],
    ];

    testEvaluate(tests);
  });

  it('should evaluate "and-or" expressions', () => {
    const tests = [
      [ "a && b || c",    { a: false, b: false, c: true },  true  ],
      [ "(a && b) || c",  { a: false, b: false, c: true },  true  ],
      [ "a || b && c",    { a: false, b: false, c: true },  false ],
      [ "a || (b && c)",  { a: false, b: false, c: true },  false ],
      [ "(a || b) && c",  { a: false, b: false, c: true },  false ],
    ];

    testEvaluate(tests);
  });

  it('should evaluate "not" expressions', () => {
    const tests = [
      [ "!a",         { a: false },            true  ],
      [ "!a && !b",   { a: false, b: false },  true  ],
      [ "!a && b",    { a: false, b: false },  false ],
      [ "a && !b",    { a: false, b: false },  false ],
      [ "!(a && b)",  { a: false, b: false },  true  ],
    ];

    testEvaluate(tests);
  });

  it("should treat question marks as a valid part of a value token", () => {
    const tests = [
      [ "a?",       { "a?": true },             true  ],
      [ "!a?",      { "a?": true },             false ],
      [ "a? && b?", { "a?": true, "b?": true }, true  ],
      [ "a && b?",  { "a": true, "b?": true },    true  ],
    ];

    testEvaluate(tests);
  });

});
