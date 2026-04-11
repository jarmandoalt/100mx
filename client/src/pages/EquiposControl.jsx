import { getQ100 } from "../services/routes";
import { useEffect, useState, useRef } from "react";
import socket from "../socket/socket";

const EquiposControl = () => {
  // ==================== ESTADO GENERAL ====================
  const [realData, setRealData] = useState([]);
  const [inicio, setInicio] = useState(0);
  const [suma, setSuma] = useState(0);

  // ==================== ESTADO DE EQUIPOS ====================
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [selectTeam, setSelectTeam] = useState(true);
  const [selectTeamButton, setSelectTeamButton] = useState(true);
  const [readyTeams, setReadyTeams] = useState(false);

  // ==================== ESTADO DEL JUEGO ====================
  const [selector, setSelector] = useState(0);
  const [initGame, setInitGame] = useState(true);
  const [strike, setStrike] = useState(0);
  const [modoLibre, setModoLibre] = useState(false);

  // ==================== ESTADO DE RESPUESTAS ====================
  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);
  const [q4, setQ4] = useState(false);
  const [q5, setQ5] = useState(false);

  const estaProcesando = useRef(false);

  // ==================== FUNCIONES DE DATOS ====================
  const getData100 = async () => {
    const response = await getQ100();
    if (response.status === 200) {
      setRealData(response.data.qt100);
    }
    setTimeout(() => {
      setInicio(1);
      socket.emit("init", {
        title: true,
      });
    }, 1000);
  };

  // ==================== FUNCIONES DE SELECTOR DE PREGUNTA ====================
  const handleSelectQuestion = (e) => {
    const selectedIndex = parseInt(e.target.value);
    setSelector(selectedIndex);
    socket.emit("selectTitle", {
      title: selectedIndex,
    });
  };

  // ==================== FUNCIONES DE PUNTOS ====================
  const sendValors = (number, puntos) => {
    if (modoLibre) {
      setTimeout(() => {
        socket.emit("sendValor", {
          number: number,
          puntos: "---",
        });
      }, 1500);
    } else {
      if (suma === 0) {
        setSuma(puntos);
      } else {
        setSuma(suma + puntos);
      }
      setTimeout(() => {
        socket.emit("sendValor", {
          number: number,
          puntos: suma + puntos,
        });
        setSelectTeamButton(false);
      }, 300);
    }
  };

  const sendStrike = () => {
    if (strike === 3) {
      setStrike(0);
    } else {
      setStrike(strike + 1);
    }
  };

  const sendPointsTeam = () => {
    setModoLibre(true);
    socket.emit("sendPoints", {
      team: selectTeam,
      suma: suma,
    });
  };

  // ==================== FUNCIONES DE EQUIPOS ====================
  const handlerNameTeam1 = (e) => {
    e.preventDefault();
    setTeam1(e.target.value);
  };

  const handlerNameTeam2 = (e) => {
    e.preventDefault();
    setTeam2(e.target.value);
  };

  const handlerSelectTeam = () => {
    if (selectTeam) {
      setSelectTeam(false);
      socket.emit("selectTeam", {
        team: false,
      });
    } else {
      setSelectTeam(true);
      socket.emit("selectTeam", {
        team: true,
      });
    }
  };

  const handlerReady = () => {
    setReadyTeams(true);
  };

  // ==================== FUNCIONES DE RESET ====================
  const reset = () => {
    setSuma(0);
    setStrike(0);
    setInitGame(true);
    setModoLibre(false);
    setQ1(false);
    setQ2(false);
    setQ3(false);
    setQ4(false);
    setQ5(false);
    setSelectTeamButton(true);
    socket.emit("reset", {
      reset: true,
    });
  };

  // ==================== FUNCIONES DE EVENTOS ====================
  
  const detectarBoton = (e) => {
    // 1. Evitamos que el click derecho abra el menú
    
    if (e.button === 2) {
      e.preventDefault();
    }

    // 2. Control de repetición (Debounce lógico)
    if (estaProcesando.current) return;

    // 3. Identificamos qué botón de tu ratón viejo se pulsó
    // e.button === 0 (Izquierdo), e.button === 2 (Derecho)
    if (e.button === 0 || e.button === 2) {
      estaProcesando.current = true;
      
      console.log(`Enviando botón ${e.button} al servidor...`);
      
      // Enviamos la info por socket
      socket.emit("teamBottonSelect", { 
        team: e.button === 0 ? 1 : 2,
        timestamp: Date.now() 
      });

      // 4. Liberamos el candado después de 200ms para evitar el "rebote" físico
      setTimeout(() => {

        estaProcesando.current = false;
        setInitGame(false);

      }, 200);
    }
  };

  // ==================== EFECTOS ====================
  useEffect(() => {
    socket.emit("sendStrike", {
      strike: strike,
    });
  }, [strike]);

  useEffect(() => {
    socket.emit("nameTeam1", {
      name: team1,
    });
  }, [team1]);

  useEffect(() => {
    socket.emit("nameTeam2", {
      name: team2,
    });
  }, [team2]);

  // ==================== RENDER ====================

  return (
    <div id="divEquiposControl">
      
      {readyTeams ? ( //si readyTeam es false muestra los inputs para agregar los nombres de los equipos, si es true muestra los botones para seleccionar el equipo
        <div>
          {selectTeam ? (
            <button className="uno btn">{team1}</button>
          ) : (
            <button className="uno" onClick={handlerSelectTeam}>
              {team1}
            </button>
          )}
          {selectTeam ? (
            <button className="dos" onClick={handlerSelectTeam}>
              {team2}
            </button>
          ) : (
            <button className="dos btn">{team2}</button>
          )}
        </div>
      ) : (
        <div className="divInputsTeam">
          <div>
            <h1>Agrega los nombres de los equipos</h1>
          </div>
          <div>
           <div>
            <input
              type="text"
              name="team2"
              placeholder="team1"
              autoComplete="off"
              onChange={handlerNameTeam1}
            />
           </div>
           <div>
            <input
              type="text"
              name="team1"
              placeholder="team2"
              autoComplete="off"
              onChange={handlerNameTeam2}
            />
           </div>
           <div>
            <button onClick={handlerReady}>Aceptar</button>
           </div>
          </div>
          
        </div>
      )}





      <div>
        {inicio == 0 && readyTeams ? (
          <button id="btnDatos" onClick={getData100}>Pedir datos</button>
        ) : (
          readyTeams === false ? null :
          <div>
            <div>
              <button style={{ cursor: "pointer" }} onClick={reset}>
                Reset
              </button>
              {modoLibre ? (
                <button
                  style={{ backgroundColor: "green", cursor: "not-allowed" }}
                >
                  Modo Libre
                </button>
              ) : null}
            </div>
            {initGame === false ? (
              <div>
                <button onClick={sendStrike}>Strike {strike}</button>
              </div>
            ) : null}
            {initGame ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <label htmlFor="questionSelect" style={{ fontSize: "18px", fontWeight: "bold" }}>Selecciona pregunta:</label>
                <select
                  id="questionSelect"
                  value={selector}
                  onChange={handleSelectQuestion}
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "2px solid #333",
                    cursor: "pointer",
                    backgroundColor: "white",
                    minWidth: "250px"
                  }}
                >
                  {realData.map((question, index) => (
                    <option key={index} value={index}>
                      {index + 1}. {question.title}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <label style={{ fontSize: "18px", fontWeight: "bold" }}>Pregunta:</label>
                <select
                  disabled
                  value={selector}
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "2px solid #5953a8ff",
                    backgroundColor: "#5953a8ff",
                    color: "white",
                    cursor: "not-allowed",
                    minWidth: "250px"
                  }}
                >
                  <option>{selector + 1}. {realData[selector]?.title}</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {inicio === 0 ? null : (
        <div>
          <div>
            <h1>{realData[selector].title}</h1>
          </div>
          {initGame === false ? (
            <div>
              {q1 ? (
                <button className="not">{realData[selector].res1}</button>
              ) : (
                <button
                  onClick={() => {
                    sendValors(1, realData[selector].valor1);
                    setQ1(true);
                  }}
                >
                  {realData[selector].res1}
                </button>
              )}
              {q2 ? (
                <button className="not">{realData[selector].res2}</button>
              ) : (
                <button
                  onClick={() => {
                    sendValors(2, realData[selector].valor2);
                    setQ2(true);
                  }}
                >
                  {realData[selector].res2}
                </button>
              )}
              {q3 ? (
                <button className="not">{realData[selector].res3}</button>
              ) : (
                <button
                  onClick={() => {
                    sendValors(3, realData[selector].valor3);
                    setQ3(true);
                  }}
                >
                  {realData[selector].res3}
                </button>
              )}
              {q4 ? (
                <button className="not">{realData[selector].res4}</button>
              ) : (
                <button
                  onClick={() => {
                    sendValors(4, realData[selector].valor4);
                    setQ4(true);
                  }}
                >
                  {realData[selector].res4}
                </button>
              )}
              {q5 ? (
                <button className="not">{realData[selector].res5}</button>
              ) : (
                <button
                  onClick={() => {
                    sendValors(5, realData[selector].valor5);
                    setQ5(true);
                  }}
                >
                  {realData[selector].res5}
                </button>
              )}
            </div>
          ) : (
            selectTeamButton ? 
            <button id="btnTitle" onClick={() => sendValors(0, 0)}>
              {" "}
              Mostrar Titulo{" "}
            </button> : 
            <button id="btnTitle" onMouseDown={detectarBoton} 
              onContextMenu={(e) => e.preventDefault()}>
              {" "}
              Botonera{" "}
            </button>
          )}
        </div>
      )}
      <div>
        {suma > 0 ? (
          modoLibre ? null : (
            <button onClick={sendPointsTeam}>
              Mandar puntos a equipo {suma}
            </button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default EquiposControl;
