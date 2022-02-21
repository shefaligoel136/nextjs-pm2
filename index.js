const express = require("express");
const { exec } = require("child_process");

const { path } = require("./path.json");

console.log(path);

const port = 8000;

const app = express();

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server: ${err}`);
  }
  console.log(`> Ready on http://localhost:${port}`);
  if (process.send) {
    process.send("ready");
    console.log("sent ready signal to PM2 at", new Date());
  }
});

app.get("/", (req, res) => {
  exec(
    `cd ${path} && npm run build && pm2 reload rebny-redesign`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        res.status(200).json(error);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        res.status(200).json({ name: stderr });
        return;
      }
      console.log(`success: ${stdout}`);
      res.status(200).json({ success: stdout });
    }
  );
  res.status(200).json({ success: true });
});

process.on("SIGINT", function () {
  console.log("> received SIGNIT signal");

  console.log("server closed");
  process.exit(0);
});
