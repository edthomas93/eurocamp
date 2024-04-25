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

const calculateMinimumCubes = (
  configurations: CubeConfiguration[]
): CubeConfiguration => {
  return configurations.reduce(
    (acc, config) => {
      acc.red = Math.max(acc.red, config.red);
      acc.green = Math.max(acc.green, config.green);
      acc.blue = Math.max(acc.blue, config.blue);
      return acc;
    },
    { red: 0, green: 0, blue: 0 }
  );
};

const isGamePossible = (
  configurations: CubeConfiguration[],
  availableCubes: CubeConfiguration
): boolean => {
  const minCubes = calculateMinimumCubes(configurations);
  return (
    minCubes.red <= availableCubes.red &&
    minCubes.green <= availableCubes.green &&
    minCubes.blue <= availableCubes.blue
  );
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

export const getPowerOfMinimumCubes = (
  filePath = path.join(__dirname, "day2.txt")
): number => {
  const gameData = readGameData(filePath);
  const games = parseGames(gameData);
  return games.reduce((acc, game) => {
    const minCubes = calculateMinimumCubes(game.configurations);
    const power = minCubes.red * minCubes.green * minCubes.blue;
    return acc + power;
  }, 0);
};
