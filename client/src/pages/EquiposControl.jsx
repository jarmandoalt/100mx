import { getQ100 } from "../services/routes";
import { useEffect, useState } from "react";
import socket from "../socket/socket";


const EquiposControl = () => {
  let [realData, setRealData] = useState([]),
    [selector, setSelector] = useState(0),
    [inicio, setInicio] = useState(0),
    [initGame, setInitGame] = useState(true),
    [selectTeam, setSelectTeam] = useState(true),
    [team2, setTeam2] = useState(""),
    [team1, setTeam1] = useState(""),
    [readyTeams, setReadyTeams] = useState(false),
    [strike, setStrike] = useState(0),
    [modoLibre, setModoLibre] = useState(false),
    [q1, setQ1] = useState(false),
    [q2, setQ2] = useState(false),
    [q3, setQ3] = useState(false),
    [q4, setQ4] = useState(false),
    [q5, setQ5] = useState(false),
    [suma, setSuma] = useState(0);

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

  const selectorTitleMenos = () => {
    setSelector(selector - 1);
    socket.emit("selectTitle", {
      title: selector - 1,
    });
  };

  const selectorTitleMas = () => {
    setSelector(selector + 1);
    socket.emit("selectTitle", {
      title: selector + 1,
    });
  };

  const sendValors = (number, puntos) => {
    if (modoLibre) {
      setTimeout(() => {
        socket.emit("sendValor", {
          number: number,
          puntos: "---",
        });
      }, 1500);
    } else {
      if (number === 0) {
        setInitGame(false);
      }

      if (suma === 0) {
        setSuma(puntos);
      } else {
        setSuma(suma + puntos);
      }
      console.log(suma);

      setTimeout(() => {
        socket.emit("sendValor", {
          number: number,
          puntos: suma + puntos,
        });
      }, 1500);
    }
  };

  const sendStrike = () => {
    if (strike === 3) {
      setStrike(0);
    } else {
      setStrike(strike + 1);
    }
  };

  useEffect(() => {
    socket.emit("sendStrike", {
      strike: strike,
    });
  }, [strike]);

  const handlerNameTeam1 = (e) => {
    e.preventDefault();
    setTeam1(e.target.value);
  };

  const handlerNameTeam2 = (e) => {
    e.preventDefault();
    setTeam2(e.target.value);
    socket.emit("nameTeam2", {
      name: team2,
    });
  };

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

  const handlerReady = () => {
    setReadyTeams(true);
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

  const sendPointsTeam = () => {
    setModoLibre(true);
    socket.emit("sendPoints", {
      team: selectTeam,
      suma: suma,
    });
  };

  const reset = () => {
    setSuma(0);
    setStrike(0);
    setInitGame(true);
    setModoLibre(false);
    socket.emit("reset", {
      reset: true,
    });
    setQ1(false);
    setQ2(false);
    setQ3(false);
    setQ4(false);
    setQ5(false);
  };

  const handleMouseDown = (event) => {
    if (event.button === 0) {
      console.log("izquierdo");
    } else if (event.button === 1) {
      console.log("derecho");
    }
  };

  return (
    <div id="divEquiposControl" onMouseDown={handleMouseDown}>
      {readyTeams ? (
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
      )}

      <div>
        {inicio == 0 && readyTeams ? (
          <button id="btnDatos" onClick={getData100}>Pedir datos</button>
        ) : (
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
              <button onMouseDown={handleMouseDown}> Select</button>
            </div>
            {initGame === false ? (
              <div>
                <button onClick={sendStrike}>Strike {strike}</button>
              </div>
            ) : null}
            {initGame ? (
              <div>
                <button
                  onClick={() =>
                    selectorTitleMenos(realData[selector - 1].title)
                  }
                >
                  -
                </button>
                <h1> {selector} </h1>
                <button
                  onClick={() => selectorTitleMas(realData[selector + 1].title)}
                >
                  +
                </button>
              </div>
            ) : (
              <div>
                <button
                  style={{
                    backgroundColor: "#5953a8ff",
                    cursor: "not-allowed",
                    border: "none",
                  }}
                >
                  -
                </button>
                <h1> {selector} </h1>
                <button
                  style={{
                    backgroundColor: "#5953a8ff",
                    cursor: "not-allowed",
                    border: "none",
                  }}
                >
                  +
                </button>
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
            <button id="btnTitle" onClick={() => sendValors(0, 0)}>
              {" "}
              Mostrar Titulo{" "}
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
