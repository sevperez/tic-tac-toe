// TESTS -- helpers.test.js

import * as helpers from "../";

describe("helpers", () => {
  describe("formatDate", () => {
    it("returns an empty string if passed an invalid date", () => {
      expect(helpers.formatDate("")).toEqual("");
    });
    
    it("returns a MM dd, yyyyy format date string", () => {
      let inputDateStr = "2018-06-25T01:16:00.478Z";
      
      // adjust inputDateStr with timezone offset in testing environment
      let inputDate = new Date(inputDateStr);
      const off = inputDate.getTimezoneOffset();
      inputDate.setMinutes(inputDate.getMinutes() + inputDate.getTimezoneOffset());
      inputDateStr = inputDate.toISOString();
      
      const expectedOutput = "June 25, 2018";
      expect(helpers.formatDate(inputDateStr)).toEqual(expectedOutput);
    });
  });
});
