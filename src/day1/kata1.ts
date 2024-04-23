import { readFileSync } from "fs";
import path from "path";

const readDocument = (filePath: string): string => {
  try {
    return readFileSync(filePath, "utf8");
  } catch (err: any) {
    throw new Error("Failed to read the file for given file path");
  }
};

const calculateCalibrationSum = (document: string[]): number => {
  let totalSum = 0;
  document.forEach((line) => {
    const digits = line.match(/\d/g);
    if (digits) {
      const firstDigit = digits[0];
      const lastDigit = digits[digits.length - 1];
      const twoDigitNumber = parseInt(firstDigit + lastDigit);
      totalSum += twoDigitNumber;
    }
  });
  return totalSum;
};

export const sumCalibrationValues = (
  filePath = path.join(__dirname, "day1.txt")
): number => {
  const documentContents = readDocument(filePath);
  const documentArray = documentContents.split("\n");
  return calculateCalibrationSum(documentArray);
};
