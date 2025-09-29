import { existsSync } from "fs";
import { mkdir, copyFile, writeFile, readFile } from "fs/promises";
import path from "path";

const run = async () => {
  const apiDir = path.resolve(__dirname, "..");
  const outputDir = path.resolve(apiDir, "out");

  if (!existsSync(outputDir)) {
    await mkdir(outputDir);
  }
  const packageJSON = await readFile(path.resolve(apiDir, "package.json"), {
    encoding: "utf-8",
  });
  await writeFile(
    path.resolve(outputDir, "package.json"),
    packageJSON.replace("out/dist/*.js", "dist/*.js"),
    {
      encoding: "utf-8",
    }
  );

  await copyFile(
    path.resolve(apiDir, "host.json"),
    path.resolve(outputDir, "host.json")
  );
  await copyFile(
    path.resolve(apiDir, ".funcignore"),
    path.resolve(outputDir, ".funcignore")
  );
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
