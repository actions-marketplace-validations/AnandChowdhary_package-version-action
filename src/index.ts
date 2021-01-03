import { setFailed, setOutput } from "@actions/core";
import { readFile } from "fs/promises";
import { join } from "path";
import { execSync } from "child_process";

export const run = async () => {
  const file = await readFile(join(".", "package.json"), "utf8");
  const pkg: { name: string; version: string } = JSON.parse(file);
  setOutput("package-version", `v${pkg.version}`);
  setOutput(
    "package-version-timestamp",
    `v${pkg.version}-${Math.floor(new Date().getTime() / 1000)}`
  );
  const hash = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  setOutput("short-hash", hash);
  setOutput("package-version-short-hash", `v${pkg.version}-${hash}`);
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
