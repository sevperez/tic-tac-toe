// TESTS -- helpers.test.js

import * as helpers from "../";

describe("helpers", () => {
  describe("formatDate", () => {
    it("returns an empty string if passed an invalid date", () => {
      expect(helpers.formatDate("")).toEqual("");
    });
    
    it("returns a MM dd, yyyyy format date string", () => {
      const inputDate = "2018-06-25T01:16:00.478Z";
      const expectedOutput = "June 25, 2018";
      expect(helpers.formatDate(inputDate)).toEqual(expectedOutput);
    });
  });
});
