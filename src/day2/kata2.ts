import path from "path";
import { readFileSync } from "fs";

type CubeConfiguration = {
  red: number;
  blue: number;
  green: number;
};

type Game = {
  id: number;
  configurations: CubeConfiguration[];
};

const readGameData = (filePath: string): string => {
  try {
    return readFileSync(filePath, "utf8");
  } catch (err: any) {
    throw new Error("Failed to read the file for given file path");
  }
};

const parseGames = (input: string): Game[] => {
  return input.split("\n").map((line) => {
    const [gameTitle, resultGroups] = line.split(": ");
    const id = parseInt(gameTitle.split(" ")[1]);
    const configurations = resultGroups.split("; ").map((result) => {
      const configuration: CubeConfiguration = { red: 0, green: 0, blue: 0 };
      result.split(", ").forEach((part) => {
        const [count, color] = part.split(" ");
        configuration[color as keyof CubeConfiguration] += parseInt(count);
      });
      return configuration;
    });
    return { id, configurations };
  });
};

const isGamePossible = (
  gameResults: CubeConfiguration[],
  availableCubes: CubeConfiguration
): boolean => {
  return gameResults.every((config) => {
    return (
      config.red <= availableCubes.red &&
      config.green <= availableCubes.green &&
      config.blue <= availableCubes.blue
    );
  });
};

export const getSumOfValidGames = (
  availableCubes: CubeConfiguration,
  filePath = path.join(__dirname, "day2.txt")
): number => {
  const gameData = readGameData(filePath);
  const games = parseGames(gameData);
  return games.reduce((acc, game) => {
    if (isGamePossible(game.configurations, availableCubes)) {
      return acc + game.id;
    }
    return acc;
  }, 0);
};
