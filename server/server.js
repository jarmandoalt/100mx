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

let prizes = ["Tequila", "$100", "Pelota"];

io.on("connection", async (socket) => {
  // Enviar premios actuales al conectarse
  socket.emit('update-prizes', prizes);

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

// Escuchar cuando el admin actualiza la lista
  socket.on('set-prizes', (newPrizes) => {
    if (Array.isArray(newPrizes) && newPrizes.length > 0) {
      prizes = newPrizes;
      console.log('Premios actualizados:', newPrizes);
    }
    io.emit('update-prizes', prizes);
  });

  // Manejador para obtener los premios en cualquier momento
  socket.on('get-prizes', () => {
    socket.emit('update-prizes', prizes);
  });

  // En tu servidor, dentro de io.on('connection', ...)
socket.on('spin-request', () => {
    if (prizes.length === 0) {
      console.log('No hay premios para girar');
      io.emit('spin-error', 'No hay premios disponibles');
      return;
    }
    // Calculamos el índice ganador en el servidor para que todos vean lo mismo
    const winningIndex = Math.floor(Math.random() * prizes.length);
    console.log("Girando... índice ganador:", winningIndex);
    
    // IMPORTANTE: io.emit envía a TODOS los clientes conectados
    io.emit('start-spin', {
        index: winningIndex,
        prizesCount: prizes.length
    });
});

  // Manejador para iniciar giro continuo
  socket.on('start-continuous-spin', () => {
    console.log('Iniciando giro continuo');
    io.emit('start-continuous-spin');
  });

  // Manejador para detener giro
  socket.on('stop-spin', () => {
    console.log('Deteniendo giro');
    io.emit('stop-spin');
  });

  // Manejador para resultado del giro manual
  socket.on('manual-spin-result', (data) => {
    console.log('Resultado del giro manual:', data);
    // Solo retransmitir el resultado sin activar animación
    io.emit('manual-spin-result', data);
  });

});
