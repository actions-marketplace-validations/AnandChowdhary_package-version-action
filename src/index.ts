import { getInput, setFailed, setOutput } from "@actions/core";
import { getOctokit } from "@actions/github";
import { execSync } from "child_process";

const token = getInput("token") || process.env.GH_PAT || process.env.GITHUB_TOKEN;

export const run = async () => {
  if (!token) throw new Error("GitHub token not found");
  const octokit = getOctokit(token);
  const [owner, repo] = (process.env.GITHUB_REPOSITORY || "").split("/");
  const releases = await octokit.repos.listReleases({ owner, repo });
  const lastVersion = releases.data[0].name;

  setOutput("package-version", `v${lastVersion}`);
  setOutput(
    "package-version-timestamp",
    `v${lastVersion}-${Math.floor(new Date().getTime() / 1000)}`
  );
  const hash = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  setOutput("short-hash", hash);
  setOutput("package-version-short-hash", `v${lastVersion}-${hash}`);
  setOutput(
    "package-version-random",
    `v${lastVersion}-${Math.random().toString(32).replace("0.", "")}`
  );
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
