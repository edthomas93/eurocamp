import { readFileSync } from "fs";
import path from "path";

const numberObject: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const readDocument = (filePath: string): string => {
  try {
    return readFileSync(filePath, "utf8");
  } catch (err: any) {
    throw new Error("Failed to read the file for given file path");
  }
};

const convertMatch = (input: string): number => {
  if (input.length > 1) {
    return numberObject[input];
  }
  return parseInt(input);
};

const calculateCalibrationSum = (document: string[]): number => {
  let totalSum = 0;
  document.forEach((line) => {
    const matches = line.match(
      /(one|two|three|four|five|six|seven|eight|nine|\d)/gi
    );

    if (matches) {
      const firstMatch = matches[0];
      const lastMatch = matches[matches.length - 1];

      const firstNumber = convertMatch(firstMatch);
      const lastNumber = convertMatch(lastMatch);

      const twoDigitNumber = parseInt(`${firstNumber}${lastNumber}`);
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
