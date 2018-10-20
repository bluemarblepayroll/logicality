/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// tslint:disable-next-line:no-namespace
export namespace Logger {
  let turnedOn = false;

  export function on() {
    turnedOn = true;
  }

  export function off() {
    turnedOn = false;
  }

  export function log(msg) {
    // tslint:disable-next-line:no-console
    if (turnedOn && console && console.log) {
      // tslint:disable-next-line:no-console
      console.log(`[LOG] ${msg}`);
    }
  }
}
