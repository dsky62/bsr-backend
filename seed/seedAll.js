const { exec } = require("child_process");

const scripts = [
  "insertPlayers.js",
  "insertTeams.js",
  "insertEvents.js",
  "insertRankings.js",
  "insertNews.js",
  "insertCamps.js",
  "insertCoaches.js",
  "insertPartners.js",
  "insertStaff.js",
  "insertFAQ.js"
];

function runScript(index) {
  if (index >= scripts.length) {
    console.log("\nAll seed scripts completed successfully.");
    return;
  }

  const script = scripts[index];
  console.log(`\nRunning ${script}...`);

  exec(`node ${script}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running ${script}:`, error.message);
      return;
    }

    console.log(stdout);
    if (stderr) console.error(stderr);

    runScript(index + 1);
  });
}

runScript(0);

