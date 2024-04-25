import path from "path";
import { readFileSync } from "fs";

type CubeConfiguration = {
  red: number;
  blue: number;
  green: number;
};

const readGameData = (filePath: string): string => {
  try {
    return readFileSync(filePath, "utf8");
  } catch (err: any) {
    throw new Error("Failed to read the file for given file path");
  }
};

const isGamePossible = (
  resultGroups: string,
  availableCubes: CubeConfiguration
): boolean => {
  const resultsArray = resultGroups.split("; ");
  const maxRequiredCubes: CubeConfiguration = { red: 0, green: 0, blue: 0 };

  resultsArray.forEach((result) => {
    const currentCounts: CubeConfiguration = { red: 0, green: 0, blue: 0 };
    result.split(", ").forEach((part) => {
      const [count, color] = part.split(" ");
      currentCounts[color as keyof CubeConfiguration] += parseInt(count);
    });

    maxRequiredCubes.red = Math.max(maxRequiredCubes.red, currentCounts.red);
    maxRequiredCubes.green = Math.max(
      maxRequiredCubes.green,
      currentCounts.green
    );
    maxRequiredCubes.blue = Math.max(maxRequiredCubes.blue, currentCounts.blue);
  });

  return (
    maxRequiredCubes.red <= availableCubes.red &&
    maxRequiredCubes.green <= availableCubes.green &&
    maxRequiredCubes.blue <= availableCubes.blue
  );
};

const parseAndValidateGames = (
  input: string,
  availableCubes: CubeConfiguration
): number => {
  const lines = input.split("\n");

  let sumOfValidGameIds = 0;

  lines.forEach((line) => {
    const [gameTitle, resultGroups] = line.split(": ");
    const gameId = parseInt(gameTitle.split(" ")[1]);

    if (isGamePossible(resultGroups, availableCubes)) {
      sumOfValidGameIds += gameId;
    }
  });

  return sumOfValidGameIds;
};

export const getSumOfValidGames = (
  cubeConfiguration: CubeConfiguration,
  filePath = path.join(__dirname, "day2.txt")
): number => {
  const gameData = readGameData(filePath);
  return parseAndValidateGames(gameData, cubeConfiguration);
};
