require("dotenv").config();
const app = require("./app");
const connectdb = require("./db/mongodb");
const { dbConfig } = require("./config");
const SocketIo = require("socket.io");

const server = app.listen(5050, '0.0.0.0', () => {
  connectdb(dbConfig);
  console.log(`server on port ${5050}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Para desarrollo en Codespaces es mejor dejarlo abierto
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", async (socket) => {

  socket.on("init", (init) => {
    console.log(init);
    io.emit("init", init);
  });

  socket.on("selectTitle", (selectTitle) => {
    console.log(selectTitle);
    io.emit("selectTitle", selectTitle);
  });

  socket.on("sendStrike", (sendStrike) => {
    console.log(sendStrike);
    io.emit("sendStrike", sendStrike);
  });

  socket.on("sendValor", (sendValor) => {
    console.log(sendValor);
    io.emit("sendValor", sendValor);
  });

  socket.on("reset", (reset) => {
    console.log(reset);
    io.emit("reset", reset);
  });

  socket.on("nameTeam1", (nameTeam1) => {
    console.log(nameTeam1);
    io.emit("nameTeam1", nameTeam1);
  });

  socket.on("nameTeam2", (nameTeam2) => {
    console.log(nameTeam2);
    io.emit("nameTeam2", nameTeam2);
  });

  socket.on("selectTeam", (selectTeam) => {
    console.log(selectTeam);
    io.emit("selectTeam", selectTeam);
  });

  socket.on("sendPoints", (sendPoints) => {
    console.log("pachi",sendPoints);
    io.emit("sendPoints", sendPoints);
  });

  socket.on("screen", (screen) => {
    io.emit("screen", screen);
    console.log("screen");
  });

  socket.on("sendRes", (sendRes) => {
    io.emit("sendRes", sendRes);
    console.log(sendRes);
  });
  
  socket.on("sendVal", (sendVal) => {
    io.emit("sendVal", sendVal);
    console.log(sendVal);
  });

  socket.on("resetDuo", (resetDuo) => {
    io.emit("resetDuo", resetDuo);
    console.log(resetDuo);
  });

  socket.on("teamBottonSelect", (teamBottonSelect) => {
    io.emit("teamBottonSelect", teamBottonSelect);
    console.log(teamBottonSelect);
  });
});
