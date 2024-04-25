import {
  getPowerOfMinimumCubes,
  getSumOfValidGames,
} from "../../src/day2/kata2";
import path from "path";

const cubeConfiguration = { red: 12, green: 13, blue: 14 };

describe("Sum the number of valid games", () => {
  describe("Success", () => {
    test("should calculate correct sum from file with valid data for given file", () => {
      // values from given example
      const filePath = path.join(__dirname, "test.txt");
      expect(getSumOfValidGames(cubeConfiguration, filePath)).toBe(8);
    });

    test("should calculate correct sum from file with valid data for default file", () => {
      expect(getSumOfValidGames(cubeConfiguration)).toBe(2512);
    });
  });

  describe("Fail", () => {
    test("should throw error if file does not exist", () => {
      const filePath = path.join(__dirname, "foo.txt");
      expect(() => getSumOfValidGames(cubeConfiguration, filePath)).toThrow(
        "Failed to read the file for given file path"
      );
    });
  });
});

describe("getPowerOfMinimumCubes", () => {
  describe("Success", () => {
    test("should multiply minimum number of cubes", () => {
      // values from given example
      const filePath = path.join(__dirname, "test.txt");
      expect(getPowerOfMinimumCubes(filePath)).toBe(2286);
    });

    test("should calculate correct sum from file with valid data for default file", () => {
      expect(getPowerOfMinimumCubes()).toBe(67335);
    });
  });
});
