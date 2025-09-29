import { readdir } from "fs/promises";
import { extname, resolve } from "path";
import exec from "exec";

const run = async () => {
  const blueprintsDirectory = resolve(__dirname, "..");
  const outputDirectory = resolve(
    blueprintsDirectory,
    "..",
    "docs",
    "assets",
    "blueprints"
  );

  const files = await readdir(resolve(blueprintsDirectory, "src"));
  const promises = files
    .filter((file) => extname(file) === ".d2")
    .map((d2File) =>
      exec(
        `d2 ${resolve(
          blueprintsDirectory,
          "src",
          d2File
        )} ${outputDirectory}/${d2File.replace(".d2", ".png")}`,
        false
      )
    );
  await Promise.all(promises);
};

run()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    if (error.message.startsWith("success: successfully compiled ")) {
      process.exit(0);
    } else {
      console.error(error);
      process.exit(1);
    }
  });
