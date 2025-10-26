import assert from "assert";
import { binarySearch } from "./binarysearch.js";

describe("binarySearch", function () {
  
  describe("searching", function () {
    let data = [];
    before(function () {
      // create an array of all numbers from 1 to 100
      for(let i=1; i <= 100; i++) {
        data[i-1] = i;
      }
    });

    describe("find first", function () {
      it("should return found @ index 0", function () {
        const result = binarySearch(1, data);
        assert.equal(result.found, true);
        assert.equal(result.index, 0);
      });
    });

    describe("find last", function () {
      it("should return found @ index 99", function () {
        const result = binarySearch(100, data);
        assert.equal(result.found, true);
        assert.equal(result.index, 99);
      });
    });
    

    describe("find middle", function () {
      it("should return found @ index 49", function () {
        const result = binarySearch(50, data);
        assert.equal(result.found, true);
        assert.equal(result.index, 49);
      });
    });

    describe("not found", function () {
      it("should return not found @ index -1", function () {
        const result = binarySearch(241, data);
        assert.equal(result.found, false);
        assert.equal(result.index, -1);
      });
    });
    
  });

  describe("iterations - sorted data", function () {
    let data = [];
    before(function () {
      // create an array of all numbers from 1 to 100
      for(let i=1; i <= 100; i++) {
        data[i-1] = i;
      }
    });

    describe("find middle (50)", function () {
      it("should return found @ index 49 in 1 iteration", function () {
        const result = binarySearch(50, data);
        assert.equal(result.found, true);
        assert.equal(result.index, 49);
        assert.equal(result.iterations, 1);
      });
    });

    describe("find quarter (25)", function () {
      it("should return found @ index 24 in 2 iterations", function () {
        const result = binarySearch(25, data);
        assert.equal(result.found, true);
        assert.equal(result.index, 24);
        assert.equal(result.iterations, 2);
      });
    });
    
    describe("find first", function () {
      it("should return found @ index 0 in 6 iterations", function () {
        const result = binarySearch(1, data);
        assert.equal(result.found, true);
        assert.equal(result.index, 0);
        assert.equal(result.iterations, 6);
      });
    });

    describe("find worst (middle-1)", function () {
      it("should return found @ index 48 in 7 iterations", function () {
        const result = binarySearch(49, data);
        assert.equal(result.found, true);
        assert.equal(result.index, 48);
        assert.equal(result.iterations, 7);
      });
    });

     describe("find last", function () {
      it("should return found @ index 99 in 7 iterations", function () {
        const result = binarySearch(100, data);
        assert.equal(result.found, true);
        assert.equal(result.index, 99);
        assert.equal(result.iterations, 7);
      });
    });

    describe("not found - too large", function () {
      it("should return not found @ index -1 in 7 or fewer iterations", function () {
        const result = binarySearch(241, data);
        assert.equal(result.found, false);
        assert.equal(result.index, -1);
        assert.ok(result.iterations <= 7);
      });
    });

    describe("not found - removed", function () {
      it("should return not found @ index -1 in 7 or fewer iterations", function () {
        // remove random value from data
        const index = Math.floor(Math.random()*data.length);
        const value = data[index];
        data.splice(index, 1);
        // and search for it
        const result = binarySearch(value, data);
        assert.equal(result.found, false);
        assert.equal(result.index, -1);
        assert.ok(result.iterations <= 7);
      });
    });
  
  });


});