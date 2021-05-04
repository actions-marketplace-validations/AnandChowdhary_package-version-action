import { getInput, setFailed, setOutput } from "@actions/core";
import { getOctokit } from "@actions/github";
import { execSync } from "child_process";

const token = getInput("token") || process.env.GH_PAT || process.env.GITHUB_TOKEN;

export const run = async () => {
  if (!token) throw new Error("GitHub token not found");
  const octokit = getOctokit(token);
  const [owner, repo] = (process.env.GITHUB_REPOSITORY || "").split("/");
  const releases = await octokit.repos.listReleases({ owner, repo });
  const hash = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();

  if (releases.data.length) {
    const lastVersion = releases.data[0].name;
    setOutput("package-version", lastVersion);
    setOutput(
      "package-version-timestamp",
      `${lastVersion}-${Math.floor(new Date().getTime() / 1000)}`
    );
    setOutput("package-version-short-hash", `${lastVersion}-${hash}`);
    setOutput(
      "package-version-random",
      `${lastVersion}-${Math.random().toString(32).replace("0.", "")}`
    );
  }
  setOutput("short-hash", hash);
  setOutput("date-short-hash", `${new Date().toISOString().substr(0, 10)}-${hash}`);
  setOutput("date-time-short-hash", `${new Date().toISOString()}-${hash}`);
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
