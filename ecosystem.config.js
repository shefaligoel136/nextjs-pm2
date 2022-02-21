const { path } = require("./path.json");

module.exports = {
  apps: [
    {
      name: "rebny-redesign",
      cwd: path,
      script: `${path}/node_modules/.bin/next`,
      args: "start",
      instances: 2,
      exec_mode: "cluster",
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 15000,
      shutdown_with_message: true,
    },
  ],
};


