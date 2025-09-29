const chromeLauncher = require("chrome-launcher");
import { resolve } from "path";
import { existsSync, writeFileSync } from "fs";
import { mkdir } from "fs/promises";
import { RunnerResult } from "lighthouse";

const isProduction = process.env["isProduction"] === "true";

const opts = {
  output: "html",
  chromeFlags: [
    "--headless",
    "--no-sandbox",
    "--disable-extensions",
    "--disable-translate",
    "--disable-default-apps",
    "--no-first-run",
  ],
};

const coldThresholdsByCategory = {
  performance: 0.6,
  accessibility: 0.9,
  "best-practices": 0.9,
  seo: isProduction ? 1 : 0.5,
  pwa: 0,
};

const warmThresholdsByCategory = {
  performance: 0.8,
  accessibility: 0.9,
  "best-practices": 0.9,
  seo: isProduction ? 1 : 0.5,
  pwa: 0,
};

const totalScores = (runnerResults: RunnerResult[]) =>
  runnerResults.reduce(
    (totals, result) => {
      return Object.entries(result.lhr.categories).reduce(
        (subTotal, [categoryName, category]) => ({
          ...subTotal,
          [categoryName]: (subTotal[categoryName] || 0) + category.score,
        }),
        totals
      );
    },
    {} as Record<string, number>
  );

const averageScores = (scores: Record<string, number>, count: number) =>
  Object.entries(scores).reduce(
    (
      averageScores: Record<string, number>,
      [category, total]: [string, number]
    ) => ({
      ...averageScores,
      [category]: total / count,
    }),
    {}
  );

const measure = async (
  opts,
  reportsDirPath,
  url,
  maxIterations = 4,
  isCold = false
) => {
  const thresholdsByCategory = isCold
    ? coldThresholdsByCategory
    : warmThresholdsByCategory;
  const chrome = await chromeLauncher.launch({
    chromeFlags: opts.chromeFlags.concat(isCold ? ["--disable-cache"] : []),
  });
  opts.port = chrome.port;
  const { default: runner } = await import("lighthouse");
  const scores = [];
  for (let i = 0; i < maxIterations; i++) {
    scores.push(await runner(url, opts));
  }
  const averages = averageScores(totalScores(scores), maxIterations);
  console.log(
    `${isCold ? "Cold" : "Warm"} start thresholds:\n`,
    JSON.stringify(thresholdsByCategory, null, 2),
    `\nAveraged of ${maxIterations} runs\n`,
    JSON.stringify(averages, null, 2)
  );
  chrome.kill();
  scores.forEach((result, i) => {
    const individualPath = resolve(
      reportsDirPath,
      `.lighthouse-${isCold ? "cold" : "warm"}-${i + 1}-perf-${result.lhr.categories.performance.score}-.html`
    );
    writeFileSync(individualPath, result.report as string);
  });
  Object.keys(averages).forEach((categoryName) => {
    if (averages[categoryName] < thresholdsByCategory[categoryName]) {
      throw new Error(
        `Failed to meet ${categoryName} threshold. Score ${averages[categoryName]} does not meet threshold ${thresholdsByCategory[categoryName]}`
      );
    }
  });
};

const run = async (opts) => {
  const rootDir = resolve(process.cwd(), "..");
  const reportsDirPath = resolve(rootDir, ".lighthouse-runs");

  if (!existsSync(reportsDirPath)) {
    await mkdir(reportsDirPath);
  }

  const url = process.env["baseURL"];

  if (!url) {
    throw new Error("Environemnt variable baseURL is missing");
  }
  await measure(opts, reportsDirPath, url, 1, true);
  await measure(opts, reportsDirPath, url);
};

run(opts).catch((error) => {
  console.error(error);
  process.exit(1);
});
