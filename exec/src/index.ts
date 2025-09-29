import { exec as callbackExec } from "child_process";
import { promisify } from "util";

const exec = promisify(callbackExec);

export default async (command: string, verbose = true) => {
  const output = await exec(command);
  if (verbose) console.log(output.stdout);
  if (output.stderr) {
    if (verbose) console.error(output.stderr);
    throw new Error(output.stderr);
  }
  return output;
};
