require("dotenv").config();
const express = require("express");
const bunyan = require("bunyan");
const favicon = require("serve-favicon");
const loki = require("lokijs");
const randomstring = require("randomstring");

const bodyParser = require("body-parser");
const spawn = require("child_process").spawn;
const path = require("path");
const http = require("http");

const SALIEN_CHEAT_DIRECTORY = process.env.SALIEN_CHEAT_DIRECTORY;
const ACCESS_SECRET = process.env.SECRET;
const HTTP_PORT = process.env.HTTP_PORT;
const PRODUCTION = process.env.PRODUCTION;

const log = bunyan.createLogger({
  name: "WorkerLog",
  streams: [
    {
        level: "info",
        stream: process.stdout
    },
    {
      type: "rotating-file",
      path: path.join(path.dirname(__dirname), "logs", "worker.log"),
      period: "1d",
      count: 3
    }
  ]
});

const db = new loki("salien.db", {
  autosave: true,
  verbose: true
});
db.loadDatabase({}, (error) => {
  if (error) {
    log.error(error.message);
  } else {
    if (db.getCollection("users") === null) {
      db.addCollection("users", {
        unique: ["token"],
        indices: ["token"]
      });
    }
    log.info("lokijs has been loaded");
  }
});

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(path.join(__dirname, "..", "build", "favicon.ico")));

app.use(express.static(path.join(__dirname, "..", "build"), {maxAge: "1w"}));
app.get("/", (request, response) => {
  response.status(200)
    .type("text/html")
    .sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.all("/*", (request, response, next) => {
  const oneWeekInSeconds = 604800;
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET");
  response.header("Cache-Control", `maxAge=${oneWeekInSeconds}`);
  next();
});

app.get("/health", (request, response) => {
  response.status(200)
    .send("<h1>Server is up and running</h1>");
});

const validateSecret = (secret) => {
  return secret !== ACCESS_SECRET;
}

const tokenToProcess = new Map();
app.post("/api/serve", (request, response) => {
  log.info(`[ SERVE ] received request body ${JSON.stringify(request.body)}`);
  const token = request.body.token;
  const secret = request.body.secret;

  const userCollection = db.getCollection("users");
  const user = userCollection.findOne({token, secret});
  if (validateSecret(secret) && user === null) {
    response.send(401)
      .send("Incorrect token or secret");
    return;
  }

  if (!tokenToProcess.has(token)) {
    log.info(`[ SERVE ] starting new bot process for token: ${token}`);
    const options = {
      cwd: SALIEN_CHEAT_DIRECTORY,
      env: {
        TOKEN: token
      }
    };
    const cheat = spawn("php", ["cheat.php"], options);
    tokenToProcess.set(token, cheat);

    cheat.on("error", (error) => {
      log.error(error);
    });
    cheat.stdout.on("data", (data) => {
      io.emit(token, data.toString("utf-8"));
    });
    cheat.on("exit", (code, signal) => {
      io.emit(token, `Bot has stopped with code ${code} and signal ${signal}`);
      tokenToProcess.delete(token);
    });
  }

  io.emit(token, `Request for ${token} received. Please wait for the bot feed.`);

  response.status(200)
    .send();
});

app.post("/api/stop", (request, response) => {
  log.info(`[ STOP ] received request body ${JSON.stringify(request.body)}`);

  const token = request.body.token;
  const secret = request.body.secret;

  const userCollection = db.getCollection("users");
  const user = userCollection.findOne({token, secret});
  if (validateSecret(secret) && user === null) {
    response.status(401)
      .send("Invalid token or secret");
    return;
  }

  if (tokenToProcess.has(token)) {
    const cheat = tokenToProcess.get(token);
    cheat.kill();
    io.emit(token, `Termination for token ${token} bot has been sent.`);
  } else {
    io.emit(token, `No bot active for token ${token}.`);
  }

  response.status(200)
    .send();
});

app.post("/api/register", (request, response) => {
  log.info(`[ REGISTER ] received request body ${JSON.stringify(request.body)}`);

  const token = request.body.token;
  const secretUsed = request.body.secret;

  if (validateSecret(secretUsed)) {
    response.status(401)
      .send("Secret provided does not have permission to register other users");
    return;
  }

  if (tokenToProcess.has(token)) {
    tokenToProcess.get(token).kill();
    io.emit(token, `Termination for token ${token} has been sent`);
  }

  const userCollection = db.getCollection("users");
  const secret = randomstring.generate(40);
  const user = userCollection.findOne({token});
  if (user === null) {
    userCollection.insert({token, secret});
  } else {
    userCollection.update({token, secret});
  }
  io.emit(token, `Registration complete! Token: ${token} | Secret: ${secret}`);
})

io.on("disconnect", (socket) => {
  log.info("user disconnected");
});

server.listen(HTTP_PORT, "localhost", (error) => {
  if (error) {
    log.error(`Server failed to start on port ${HTTP_PORT}`);
  } else {
    log.info(`Server started on port ${HTTP_PORT}`);
  }
});
