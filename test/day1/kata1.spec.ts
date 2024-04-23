import { sumCalibrationValues } from "../../src/day1/kata1";
import path from "path";

describe("Calibration Value Sum Calculation", () => {
  describe("Success", () => {
    test("should calculate correct sum from file with valid data for default file", () => {
      expect(sumCalibrationValues()).toBe(54076);
    });

    test("should calculate correct sum from file with valid data for given file", () => {
      // values from given example
      const filePath = path.join(__dirname, "test.txt");
      expect(sumCalibrationValues(filePath)).toBe(281);
    });
  });

  describe("Fail", () => {
    test("should throw error if file does not exist", () => {
      const filePath = path.join(__dirname, "foo.txt");
      expect(() => sumCalibrationValues(filePath)).toThrow(
        "Failed to read the file for given file path"
      );
    });
  });
});
