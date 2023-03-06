import { SlideQuery, SlideQueryResult } from "../../../src";
import SlideCollection from "../../../src/core/external/SlideCollection";

describe("SlideCollection", () => {
  describe("query", () => {
    it("should return an instance of SlideQueryResult", () => {
      const collection = new SlideCollection();
      expect(collection.query(SlideQuery.All)).toBeInstanceOf(SlideQueryResult);
    });
  });
});
