import { setFailed, setOutput } from "@actions/core";
import { readFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

export const run = async () => {
  const file = readFileSync(join(".", "package.json"), "utf8");
  const pkg: { name: string; version: string } = JSON.parse(file);
  setOutput("package-version", `v${pkg.version}`);
  setOutput(
    "package-version-timestamp",
    `v${pkg.version}-${Math.floor(new Date().getTime() / 1000)}`
  );
  const hash = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  setOutput("short-hash", hash);
  setOutput("package-version-short-hash", `v${pkg.version}-${hash}`);
  setOutput("package-version-random", `v${pkg.version}-${Math.random().toString(32).replace("0.", "")}`);
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
