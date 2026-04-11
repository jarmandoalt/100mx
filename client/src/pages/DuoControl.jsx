import { getQ5 } from "../services/routes";
import { useEffect, useState } from "react";
import socket from "../socket/socket";

const DuoControl = () => {
  let [realData, setRealData] = useState([]),
    [selector, setSelector] = useState(0),
    [selector1, setSelector1] = useState(""),
    [selector2, setSelector2] = useState(""),
    [selector3, setSelector3] = useState(""),
    [selector4, setSelector4] = useState(""),
    [selector5, setSelector5] = useState(""),
    [selector6, setSelector6] = useState(""),
    [selector7, setSelector7] = useState(""),
    [selector8, setSelector8] = useState(""),
    [selector9, setSelector9] = useState(""),
    [selector10, setSelector10] = useState(""),
    [valor1, setValor1] = useState(0),
    [valor2, setValor2] = useState(0),
    [valor3, setValor3] = useState(0),
    [valor4, setValor4] = useState(0),
    [valor5, setValor5] = useState(0),
    [valor6, setValor6] = useState(0),
    [valor7, setValor7] = useState(0),
    [valor8, setValor8] = useState(0),
    [valor9, setValor9] = useState(0),
    [valor10, setValor10] = useState(0),
    [inicio, setInicio] = useState(false),
    [fase2, setFase2] = useState(false),
    [controlSend, setControlSend] = useState(0),
    [controlAllRes, setControlAllRes] = useState(false),
    [suma, setSuma] = useState(0);

  const getData5 = async () => {
    const response = await getQ5();
    if (response.status === 200) {
      setRealData(response.data.qt5);
    }
    setTimeout(() => {
      setInicio(true);
      socket.emit("init", {
        title: true,
      });
    }, 1000);
  };

  const handlerRes = (aux) => {
    switch (aux) {
      case 1:
        socket.emit("sendRes", {
          quest: 1,
          res: selector1,
        });
        setControlSend(1);
        break;
      case 2:
        socket.emit("sendRes", {
          quest: 2,
          res: selector2,
        });
        setControlSend(3);

        break;
      case 3:
        socket.emit("sendRes", {
          quest: 3,
          res: selector3,
        });
        setControlSend(5);

        break;
      case 4:
        socket.emit("sendRes", {
          quest: 4,
          res: selector4,
        });
        setControlSend(7);

        break;
      case 5:
        socket.emit("sendRes", {
          quest: 5,
          res: selector5,
        });
        setControlSend(9);
        break;
      default:
        break;
    }
  };

  const handlerPoints = (aux) => {
    switch (aux) {
      case 1:
        setSuma(valor1);

        socket.emit("sendVal", {
          quest: 1,
          sum: valor1,
          val: valor1,
        });

        setControlSend(2);

        break;
      case 2:
        setSuma(suma + valor2);

        socket.emit("sendVal", {
          quest: 2,
          sum: suma + valor2,
          val: valor2,
        });

        setControlSend(4);

        break;
      case 3:
        setSuma(suma + valor3);

        socket.emit("sendVal", {
          quest: 3,
          sum: suma + valor3,
          val: valor3,
        });

        setControlSend(6);

        break;
      case 4:
        setSuma(suma + valor4);

        socket.emit("sendVal", {
          quest: 4,
          sum: suma + valor4,
          val: valor4,
        });

        setControlSend(8);

        break;
      case 5:
        setSuma(suma + valor5);
        socket.emit("sendVal", {
          quest: 5,
          sum: suma + valor5,
          val: valor5,
        });

        setControlSend(10);

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(
      "valor1:",
      valor1,
      " valor2:",
      valor2,
      " valor3:",
      valor3,
      " valor4:",
      valor4,
      " valor5:",
      valor5
    );

    if (valor1 > 0 && valor2 > 0 && valor3 > 0 && valor4 > 0 && valor5 > 0) {
      setControlAllRes(true);
    }
  }, [selector1, selector2, selector3, selector4, selector5]);

  const handlerReset = () => {
    setFase2(false);
    setSuma(0);
    setSelector1("");
    setSelector2("");
    setSelector3("");
    setSelector4("");
    setSelector5("");
    setSelector6("");
    setSelector7("");
    setSelector8("");
    setSelector9("");
    setSelector10("");
    setValor1(0);
    setValor2(0);
    setValor3(0);
    setValor4(0);
    setValor5(0);
    setValor6(0);
    setValor7(0);
    setValor8(0);
    setValor9(0);
    setValor10(0);
    setControlAllRes(false);
    setControlSend(0);
    socket.emit("resetDuo", {
          reset: true
        });
  };

  return (
    <div id="divDuoControl">
      {inicio ? (
        <div id="controlDuo">
          {valor1 > 0 ? (
            <div>{fase2 ? <h1>Fase 2</h1> : <h1>Fase 1</h1>}</div>
          ) : (
            <div>
              <div>
                <button
                  onClick={() =>
                    selector === 0 ? null : setSelector(selector - 1)
                  }
                >
                  -
                </button>
              </div>
              <div>
                <h1>{selector}</h1>
              </div>
              <div>
                <button onClick={() => setSelector(selector + 1)}>+</button>
              </div>
            </div>
          )}
          <div>
            <div>
              <div>
                <h3>{realData[selector].title1}</h3>
              </div>
              <div>
                <div>
                  {selector1 === realData[selector].res1 ? (
                    <button className="select">
                      {realData[selector].res1} {realData[selector].valor1}
                    </button>
                  ) : selector6 === realData[selector].res1 ? (
                    <button className="select2">
                      {realData[selector].res1} {realData[selector].valor1}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (fase2) {
                          setSelector6(realData[selector].res1);
                          setValor6(realData[selector].valor1);
                        } else {
                          setSelector1(realData[selector].res1);
                          setValor1(realData[selector].valor1);
                        }
                      }}
                    >
                      {realData[selector].res1} {realData[selector].valor1}
                    </button>
                  )}
                  {selector1 === realData[selector].res2 ? (
                    <button className="select">
                      {realData[selector].res2} {realData[selector].valor2}
                    </button>
                  ) : selector6 === realData[selector].res2 ? (
                    <button className="select2">
                      {realData[selector].res2} {realData[selector].valor2}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (fase2) {
                          setSelector6(realData[selector].res2);
                          setValor6(realData[selector].valor2);
                        } else {
                          setSelector1(realData[selector].res2);
                          setValor1(realData[selector].valor2);
                        }
                      }}
                    >
                      {realData[selector].res2} {realData[selector].valor2}
                    </button>
                  )}
                  {selector1 === realData[selector].res3 ? (
                    <button className="select">
                      {realData[selector].res3} {realData[selector].valor3}
                    </button>
                  ) : selector6 === realData[selector].res3 ? (
                    <button className="select2">
                      {realData[selector].res3} {realData[selector].valor3}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (fase2) {
                          setSelector6(realData[selector].res3);
                          setValor6(realData[selector].valor3);
                        } else {
                          setSelector1(realData[selector].res3);
                          setValor1(realData[selector].valor3);
                        }
                      }}
                    >
                      {realData[selector].res3} {realData[selector].valor3}
                    </button>
                  )}
                  {selector1 === realData[selector].res4 ? (
                    <button className="select">
                      {realData[selector].res4} {realData[selector].valor4}
                    </button>
                  ) : selector6 === realData[selector].res4 ? (
                    <button className="select2">
                      {realData[selector].res4} {realData[selector].valor4}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (fase2) {
                          setSelector6(realData[selector].res4);
                          setValor6(realData[selector].valor4);
                        } else {
                          setSelector1(realData[selector].res4);
                          setValor1(realData[selector].valor4);
                        }
                      }}
                    >
                      {realData[selector].res4} {realData[selector].valor4}
                    </button>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Respuesta"
                    onChange={(e) => {
                      e.preventDefault();
                      if (fase2) {
                        setSelector6(e.target.value);
                      } else {
                        setSelector1(e.target.value);
                      }
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Puntos"
                    onChange={(e) => {
                      e.preventDefault();
                      let aux = Number.parseInt(e.target.value);
                      if (fase2) {
                        setValor6(aux);
                      } else {
                        setValor1(aux);
                      }
                    }}
                  />
                </div>
                <div>
                  {controlAllRes && controlSend === 0 ? (
                    <button onClick={() => handlerRes(1)}>
                      Mandar respuesta
                    </button>
                  ) : (
                    <button
                      className="disable"
                      style={{
                        backgroundColor: "#55518aff",
                        cursor: "not-allowed",
                        border: "none",
                        color: "gray",
                      }}
                    >
                      Mandar respuesta
                    </button>
                  )}

                  {controlSend === 1 ? (
                    <button onClick={() => handlerPoints(1)}>
                      Mandar puntos
                    </button>
                  ) : (
                    <button
                      className="disable"
                      style={{
                        backgroundColor: "#55518aff",
                        cursor: "not-allowed",
                        border: "none",
                        color: "gray",
                      }}
                    >
                      Mandar puntos
                    </button>
                  )}
                </div>
              </div>
            </div>
            {(valor1 > 0 && fase2 === false) || (valor1 > 0 && valor6 > 0) ? (
              <div>
                <div>
                  <h3>{realData[selector].title2}</h3>
                </div>
                <div>
                  <div>
                    {selector2 === realData[selector].res5 ? (
                      <button className="select">
                        {realData[selector].res5} {realData[selector].valor5}
                      </button>
                    ) : selector7 === realData[selector].res5 ? (
                      <button className="select2">
                        {realData[selector].res5} {realData[selector].valor5}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector7(realData[selector].res5);
                            setValor7(realData[selector].valor5);
                          } else {
                            setSelector2(realData[selector].res5);
                            setValor2(realData[selector].valor5);
                          }
                        }}
                      >
                        {realData[selector].res5} {realData[selector].valor5}
                      </button>
                    )}
                    {selector2 === realData[selector].res6 ? (
                      <button className="select">
                        {realData[selector].res6} {realData[selector].valor6}
                      </button>
                    ) : selector7 === realData[selector].res6 ? (
                      <button className="select2">
                        {realData[selector].res6} {realData[selector].valor6}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector7(realData[selector].res6);
                            setValor7(realData[selector].valor6);
                          } else {
                            setSelector2(realData[selector].res6);
                            setValor2(realData[selector].valor6);
                          }
                        }}
                      >
                        {realData[selector].res6} {realData[selector].valor6}
                      </button>
                    )}
                    {selector2 === realData[selector].res7 ? (
                      <button className="select">
                        {realData[selector].res7} {realData[selector].valor7}
                      </button>
                    ) : selector7 === realData[selector].res7 ? (
                      <button className="select2">
                        {realData[selector].res7} {realData[selector].valor7}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector7(realData[selector].res7);
                            setValor7(realData[selector].valor7);
                          } else {
                            setSelector2(realData[selector].res7);
                            setValor2(realData[selector].valor7);
                          }
                        }}
                      >
                        {realData[selector].res7} {realData[selector].valor7}
                      </button>
                    )}
                    {selector2 === realData[selector].res8 ? (
                      <button className="select">
                        {realData[selector].res8} {realData[selector].valor8}
                      </button>
                    ) : selector7 === realData[selector].res8 ? (
                      <button className="select2">
                        {realData[selector].res8} {realData[selector].valor8}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector7(realData[selector].res8);
                            setValor7(realData[selector].valor8);
                          } else {
                            setSelector2(realData[selector].res8);
                            setValor2(realData[selector].valor8);
                          }
                        }}
                      >
                        {realData[selector].res8} {realData[selector].valor8}
                      </button>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Respuesta"
                      onChange={(e) => {
                        e.preventDefault();
                        if (fase2) {
                          setSelector7(e.target.value);
                        } else {
                          setSelector2(e.target.value);
                        }
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Puntos"
                      onChange={(e) => {
                        e.preventDefault();
                        let aux = Number.parseInt(e.target.value);
                        if (fase2) {
                          setValor7(aux);
                        } else {
                          setValor2(aux);
                        }
                      }}
                    />
                  </div>
                  <div>
                    {controlSend === 2 ? (
                      <button onClick={() => handlerRes(2)}>
                        Mandar respuesta
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar respuesta
                      </button>
                    )}
                    {controlSend === 3 ? (
                      <button onClick={() => handlerPoints(2)}>
                        Mandar puntos
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar puntos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <h3>{realData[selector].title2}</h3>
                </div>
                <div>
                  <div>
                    {selector2 === realData[selector].res5 ? (
                      <button className="select">
                        {realData[selector].res5} {realData[selector].valor5}
                      </button>
                    ) : selector7 === realData[selector].res5 ? (
                      <button className="select2">
                        {realData[selector].res5} {realData[selector].valor5}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector7(realData[selector].res5);
                            setValor7(realData[selector].valor5);
                          } else {
                            setSelector2(realData[selector].res5);
                            setValor2(realData[selector].valor5);
                          }
                        }}
                      >
                        {realData[selector].res5} {realData[selector].valor5}
                      </button>
                    )}
                    {selector2 === realData[selector].res6 ? (
                      <button className="select">
                        {realData[selector].res6} {realData[selector].valor6}
                      </button>
                    ) : selector7 === realData[selector].res6 ? (
                      <button className="select2">
                        {realData[selector].res6} {realData[selector].valor6}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector7(realData[selector].res6);
                            setValor7(realData[selector].valor6);
                          } else {
                            setSelector2(realData[selector].res6);
                            setValor2(realData[selector].valor6);
                          }
                        }}
                      >
                        {realData[selector].res6} {realData[selector].valor6}
                      </button>
                    )}
                    {selector2 === realData[selector].res7 ? (
                      <button className="select">
                        {realData[selector].res7} {realData[selector].valor7}
                      </button>
                    ) : selector7 === realData[selector].res7 ? (
                      <button className="select2">
                        {realData[selector].res7} {realData[selector].valor7}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector7(realData[selector].res7);
                            setValor7(realData[selector].valor7);
                          } else {
                            setSelector2(realData[selector].res7);
                            setValor2(realData[selector].valor7);
                          }
                        }}
                      >
                        {realData[selector].res7} {realData[selector].valor7}
                      </button>
                    )}
                    {selector2 === realData[selector].res8 ? (
                      <button className="select">
                        {realData[selector].res8} {realData[selector].valor8}
                      </button>
                    ) : selector7 === realData[selector].res8 ? (
                      <button className="select2">
                        {realData[selector].res8} {realData[selector].valor8}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector7(realData[selector].res8);
                            setValor7(realData[selector].valor8);
                          } else {
                            setSelector2(realData[selector].res8);
                            setValor2(realData[selector].valor8);
                          }
                        }}
                      >
                        {realData[selector].res8} {realData[selector].valor8}
                      </button>
                    )}
                  </div>
                  <div id="divFalseInput">
                    <div>Respuesta</div>
                    <div>Puntos</div>
                  </div>
                  <div>
                    {controlSend === 2 ? (
                      <button onClick={() => handlerRes(2)}>
                        Mandar respuesta
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar respuesta
                      </button>
                    )}
                    {controlSend === 3 ? (
                      <button onClick={() => handlerPoints(2)}>
                        Mandar puntos
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar puntos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {(valor2 > 0 && fase2 === false) || (valor2 > 0 && valor7 > 0) ? (
              <div>
                <div>
                  <h3>{realData[selector].title3}</h3>
                </div>
                <div>
                  <div>
                    {selector3 === realData[selector].res9 ? (
                      <button className="select">
                        {realData[selector].res9} {realData[selector].valor9}
                      </button>
                    ) : selector8 === realData[selector].res9 ? (
                      <button className="select2">
                        {realData[selector].res9} {realData[selector].valor9}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector8(realData[selector].res9);
                            setValor8(realData[selector].valor9);
                          } else {
                            setSelector3(realData[selector].res9);
                            setValor3(realData[selector].valor9);
                          }
                        }}
                      >
                        {realData[selector].res9} {realData[selector].valor9}
                      </button>
                    )}
                    {selector3 === realData[selector].res10 ? (
                      <button className="select">
                        {realData[selector].res10} {realData[selector].valor10}
                      </button>
                    ) : selector8 === realData[selector].res10 ? (
                      <button className="select2">
                        {realData[selector].res10} {realData[selector].valor10}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector8(realData[selector].res10);
                            setValor8(realData[selector].valor10);
                          } else {
                            setSelector3(realData[selector].res10);
                            setValor3(realData[selector].valor10);
                          }
                        }}
                      >
                        {realData[selector].res10} {realData[selector].valor10}
                      </button>
                    )}
                    {selector3 === realData[selector].res11 ? (
                      <button className="select">
                        {realData[selector].res11} {realData[selector].valor11}
                      </button>
                    ) : selector8 === realData[selector].res11 ? (
                      <button className="select2">
                        {realData[selector].res11} {realData[selector].valor11}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector8(realData[selector].res11);
                            setValor8(realData[selector].valor11);
                          } else {
                            setSelector3(realData[selector].res11);
                            setValor3(realData[selector].valor11);
                          }
                        }}
                      >
                        {realData[selector].res11} {realData[selector].valor11}
                      </button>
                    )}
                    {selector3 === realData[selector].res12 ? (
                      <button className="select">
                        {realData[selector].res12} {realData[selector].valor12}
                      </button>
                    ) : selector8 === realData[selector].res12 ? (
                      <button className="select2">
                        {realData[selector].res12} {realData[selector].valor12}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector8(realData[selector].res12);
                            setValor8(realData[selector].valor12);
                          } else {
                            setSelector3(realData[selector].res12);
                            setValor3(realData[selector].valor12);
                          }
                        }}
                      >
                        {realData[selector].res12} {realData[selector].valor12}
                      </button>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Respuesta"
                      onChange={(e) => {
                        e.preventDefault();
                        if (fase2) {
                          setSelector8(e.target.value);
                        } else {
                          setSelector3(e.target.value);
                        }
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Puntos"
                      onChange={(e) => {
                        e.preventDefault();
                        let aux = Number.parseInt(e.target.value);
                        if (fase2) {
                          setValor8(aux);
                        } else {
                          setValor3(aux);
                        }
                      }}
                    />
                  </div>
                  <div>
                    {controlSend === 4 ? (
                      <button onClick={() => handlerRes(3)}>
                        Mandar respuesta
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar respuesta
                      </button>
                    )}
                    {controlSend === 5 ? (
                      <button onClick={() => handlerPoints(3)}>
                        Mandar puntos
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar puntos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <h3>{realData[selector].title3}</h3>
                </div>
                <div>
                  <div>
                    {selector3 === realData[selector].res9 ? (
                      <button className="select">
                        {realData[selector].res9} {realData[selector].valor9}
                      </button>
                    ) : selector8 === realData[selector].res9 ? (
                      <button className="select2">
                        {realData[selector].res9} {realData[selector].valor9}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector8(realData[selector].res9);
                            setValor8(realData[selector].valor9);
                          } else {
                            setSelector3(realData[selector].res9);
                            setValor3(realData[selector].valor9);
                          }
                        }}
                      >
                        {realData[selector].res9} {realData[selector].valor9}
                      </button>
                    )}
                    {selector3 === realData[selector].res10 ? (
                      <button className="select">
                        {realData[selector].res10} {realData[selector].valor10}
                      </button>
                    ) : selector8 === realData[selector].res10 ? (
                      <button className="select2">
                        {realData[selector].res10} {realData[selector].valor10}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector8(realData[selector].res10);
                            setValor8(realData[selector].valor10);
                          } else {
                            setSelector3(realData[selector].res10);
                            setValor3(realData[selector].valor10);
                          }
                        }}
                      >
                        {realData[selector].res10} {realData[selector].valor10}
                      </button>
                    )}
                    {selector3 === realData[selector].res11 ? (
                      <button className="select">
                        {realData[selector].res11} {realData[selector].valor11}
                      </button>
                    ) : selector8 === realData[selector].res11 ? (
                      <button className="select2">
                        {realData[selector].res11} {realData[selector].valor11}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector8(realData[selector].res11);
                            setValor8(realData[selector].valor11);
                          } else {
                            setSelector3(realData[selector].res11);
                            setValor3(realData[selector].valor11);
                          }
                        }}
                      >
                        {realData[selector].res11} {realData[selector].valor11}
                      </button>
                    )}
                    {selector3 === realData[selector].res12 ? (
                      <button className="select">
                        {realData[selector].res12} {realData[selector].valor12}
                      </button>
                    ) : selector8 === realData[selector].res12 ? (
                      <button className="select2">
                        {realData[selector].res12} {realData[selector].valor12}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector8(realData[selector].res12);
                            setValor8(realData[selector].valor12);
                          } else {
                            setSelector3(realData[selector].res12);
                            setValor3(realData[selector].valor12);
                          }
                        }}
                      >
                        {realData[selector].res12} {realData[selector].valor12}
                      </button>
                    )}
                  </div>

                  <div id="divFalseInput">
                    <div> Respuesta</div>
                    <div>Puntos</div>
                  </div>
                  <div>
                    {controlSend === 4 ? (
                      <button onClick={() => handlerRes(3)}>
                        Mandar respuesta
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar respuesta
                      </button>
                    )}
                    {controlSend === 5 ? (
                      <button onClick={() => handlerPoints(3)}>
                        Mandar puntos
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar puntos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {(valor3 > 0 && fase2 === false) || (valor3 > 0 && valor8 > 0) ? (
              <div>
                <div>
                  <h3>{realData[selector].title4}</h3>
                </div>
                <div>
                  <div>
                    {selector4 === realData[selector].res13 ? (
                      <button className="select">
                        {realData[selector].res13} {realData[selector].valor13}
                      </button>
                    ) : selector9 === realData[selector].res13 ? (
                      <button className="select2">
                        {realData[selector].res13} {realData[selector].valor13}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector9(realData[selector].res13);
                            setValor9(realData[selector].valor13);
                          } else {
                            setSelector4(realData[selector].res13);
                            setValor4(realData[selector].valor13);
                          }
                        }}
                      >
                        {realData[selector].res13} {realData[selector].valor13}
                      </button>
                    )}
                    {selector4 === realData[selector].res14 ? (
                      <button className="select">
                        {realData[selector].res14} {realData[selector].valor14}
                      </button>
                    ) : selector9 === realData[selector].res14 ? (
                      <button className="select2">
                        {realData[selector].res14} {realData[selector].valor14}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector9(realData[selector].res14);
                            setValor9(realData[selector].valor14);
                          } else {
                            setSelector4(realData[selector].res14);
                            setValor4(realData[selector].valor14);
                          }
                        }}
                      >
                        {realData[selector].res14} {realData[selector].valor14}
                      </button>
                    )}
                    {selector4 === realData[selector].res15 ? (
                      <button className="select">
                        {realData[selector].res15} {realData[selector].valor15}
                      </button>
                    ) : selector9 === realData[selector].res15 ? (
                      <button className="select2">
                        {realData[selector].res15} {realData[selector].valor15}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector9(realData[selector].res15);
                            setValor9(realData[selector].valor15);
                          } else {
                            setSelector4(realData[selector].res15);
                            setValor4(realData[selector].valor15);
                          }
                        }}
                      >
                        {realData[selector].res15} {realData[selector].valor15}
                      </button>
                    )}
                    {selector4 === realData[selector].res16 ? (
                      <button className="select">
                        {realData[selector].res16} {realData[selector].valor16}
                      </button>
                    ) : selector9 === realData[selector].res16 ? (
                      <button className="select2">
                        {realData[selector].res16} {realData[selector].valor16}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector9(realData[selector].res15);
                            setValor9(realData[selector].valor15);
                          } else {
                            setSelector4(realData[selector].res15);
                            setValor4(realData[selector].valor15);
                          }
                        }}
                      >
                        {realData[selector].res16} {realData[selector].valor16}
                      </button>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Respuesta"
                      onChange={(e) => {
                        e.preventDefault();
                        if (fase2) {
                          setSelector9(e.target.value);
                        } else {
                          setSelector4(e.target.value);
                        }
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Puntos"
                      onChange={(e) => {
                        e.preventDefault();
                        let aux = Number.parseInt(e.target.value);
                        if (fase2) {
                          setValor8(aux);
                        } else {
                          setValor4(aux);
                        }
                      }}
                    />
                  </div>
                  <div>
                    {controlSend === 6 ? (
                      <button onClick={() => handlerRes(4)}>
                        Mandar respuesta
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar respuesta
                      </button>
                    )}
                    {controlSend === 7 ? (
                      <button onClick={() => handlerPoints(4)}>
                        Mandar puntos
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar puntos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <h3>{realData[selector].title4}</h3>
                </div>
                <div>
                  <div>
                    {selector4 === realData[selector].res13 ? (
                      <button className="select">
                        {realData[selector].res13} {realData[selector].valor13}
                      </button>
                    ) : selector9 === realData[selector].res13 ? (
                      <button className="select2">
                        {realData[selector].res13} {realData[selector].valor13}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector9(realData[selector].res13);
                            setValor9(realData[selector].valor13);
                          } else {
                            setSelector4(realData[selector].res13);
                            setValor4(realData[selector].valor13);
                          }
                        }}
                      >
                        {realData[selector].res13} {realData[selector].valor13}
                      </button>
                    )}
                    {selector4 === realData[selector].res14 ? (
                      <button className="select">
                        {realData[selector].res14} {realData[selector].valor14}
                      </button>
                    ) : selector9 === realData[selector].res14 ? (
                      <button className="select2">
                        {realData[selector].res14} {realData[selector].valor14}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector9(realData[selector].res14);
                            setValor9(realData[selector].valor14);
                          } else {
                            setSelector4(realData[selector].res14);
                            setValor4(realData[selector].valor14);
                          }
                        }}
                      >
                        {realData[selector].res14} {realData[selector].valor14}
                      </button>
                    )}
                    {selector4 === realData[selector].res15 ? (
                      <button className="select">
                        {realData[selector].res15} {realData[selector].valor15}
                      </button>
                    ) : selector9 === realData[selector].res15 ? (
                      <button className="select2">
                        {realData[selector].res15} {realData[selector].valor15}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector9(realData[selector].res15);
                            setValor9(realData[selector].valor15);
                          } else {
                            setSelector4(realData[selector].res15);
                            setValor4(realData[selector].valor15);
                          }
                        }}
                      >
                        {realData[selector].res15} {realData[selector].valor15}
                      </button>
                    )}
                    {selector4 === realData[selector].res16 ? (
                      <button className="select">
                        {realData[selector].res16} {realData[selector].valor16}
                      </button>
                    ) : selector9 === realData[selector].res16 ? (
                      <button className="select2">
                        {realData[selector].res16} {realData[selector].valor16}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector9(realData[selector].res15);
                            setValor9(realData[selector].valor15);
                          } else {
                            setSelector4(realData[selector].res15);
                            setValor4(realData[selector].valor15);
                          }
                        }}
                      >
                        {realData[selector].res16} {realData[selector].valor16}
                      </button>
                    )}
                  </div>

                  <div id="divFalseInput">
                    <div> Respuesta </div>
                    <div>Puntos</div>
                  </div>
                  <div>
                    {controlSend === 6 ? (
                      <button onClick={() => handlerRes(4)}>
                        Mandar respuesta
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar respuesta
                      </button>
                    )}
                    {controlSend === 7 ? (
                      <button onClick={() => handlerPoints(4)}>
                        Mandar puntos
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar puntos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {(valor4 > 0 && fase2 === false) || (valor4 > 0 && valor9 > 0) ? (
              <div>
                <div>
                  <h3>{realData[selector].title5}</h3>
                </div>
                <div>
                  <div>
                    {selector5 === realData[selector].res17 ? (
                      <button className="select">
                        {realData[selector].res17} {realData[selector].valor17}
                      </button>
                    ) : selector10 === realData[selector].res17 ? (
                      <button className="select2">
                        {realData[selector].res17} {realData[selector].valor17}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector10(realData[selector].res17);
                            setValor10(realData[selector].valor17);
                          } else {
                            setSelector5(realData[selector].res17);
                            setValor5(realData[selector].valor17);
                          }
                        }}
                      >
                        {realData[selector].res17} {realData[selector].valor17}
                      </button>
                    )}
                    {selector5 === realData[selector].res18 ? (
                      <button className="select">
                        {realData[selector].res18} {realData[selector].valor18}
                      </button>
                    ) : selector10 === realData[selector].res18 ? (
                      <button className="select2">
                        {realData[selector].res18} {realData[selector].valor18}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector10(realData[selector].res18);
                            setValor10(realData[selector].valor18);
                          } else {
                            setSelector5(realData[selector].res18);
                            setValor5(realData[selector].valor18);
                          }
                        }}
                      >
                        {realData[selector].res18} {realData[selector].valor18}
                      </button>
                    )}
                    {selector5 === realData[selector].res19 ? (
                      <button className="select">
                        {realData[selector].res19} {realData[selector].valor19}
                      </button>
                    ) : selector10 === realData[selector].res19 ? (
                      <button className="select">
                        {realData[selector].res19} {realData[selector].valor19}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector10(realData[selector].res19);
                            setValor10(realData[selector].valor19);
                          } else {
                            setSelector5(realData[selector].res19);
                            setValor5(realData[selector].valor19);
                          }
                        }}
                      >
                        {realData[selector].res19} {realData[selector].valor19}
                      </button>
                    )}
                    {selector5 === realData[selector].res20 ? (
                      <button className="select">
                        {realData[selector].res20} {realData[selector].valor20}
                      </button>
                    ) : selector10 === realData[selector].res20 ? (
                      <button className="select2">
                        {realData[selector].res20} {realData[selector].valor20}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (fase2) {
                            setSelector10(realData[selector].res20);
                            setValor10(realData[selector].valor20);
                          } else {
                            setSelector5(realData[selector].res20);
                            setValor5(realData[selector].valor20);
                          }
                        }}
                      >
                        {realData[selector].res20} {realData[selector].valor20}
                      </button>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Respuesta"
                      onChange={(e) => {
                        e.preventDefault();
                        if (fase2) {
                          setSelector10(e.target.value);
                        } else {
                          setSelector5(e.target.value);
                        }
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Puntos"
                      onChange={(e) => {
                        e.preventDefault();
                        let aux = Number.parseInt(e.target.value);
                        if (fase2) {
                          setValor10(aux);
                        } else {
                          setValor5(aux);
                        }
                      }}
                    />
                  </div>
                  <div>
                    {controlSend === 8 ? (
                      <button onClick={() => handlerRes(5)}>
                        Mandar respuesta
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar respuesta
                      </button>
                    )}
                    {controlSend === 9 ? (
                      <button onClick={() => handlerPoints(5)}>
                        Mandar puntos
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar puntos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <h3>{realData[selector].title5}</h3>
                </div>
                <div>
                  <div>
                    {selector5 === realData[selector].res17 ? (
                      <button className="select">
                        {realData[selector].res17} {realData[selector].valor17}
                      </button>
                    ) : selector10 === realData[selector].res17 ? (
                      <button className="select2">
                        {realData[selector].res17} {realData[selector].valor17}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector10(realData[selector].res17);
                            setValor10(realData[selector].valor17);
                          } else {
                            setSelector5(realData[selector].res17);
                            setValor5(realData[selector].valor17);
                          }
                        }}
                      >
                        {realData[selector].res17} {realData[selector].valor17}
                      </button>
                    )}
                    {selector5 === realData[selector].res18 ? (
                      <button className="select">
                        {realData[selector].res18} {realData[selector].valor18}
                      </button>
                    ) : selector10 === realData[selector].res18 ? (
                      <button className="select2">
                        {realData[selector].res18} {realData[selector].valor18}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector10(realData[selector].res18);
                            setValor10(realData[selector].valor18);
                          } else {
                            setSelector5(realData[selector].res18);
                            setValor5(realData[selector].valor18);
                          }
                        }}
                      >
                        {realData[selector].res18} {realData[selector].valor18}
                      </button>
                    )}
                    {selector5 === realData[selector].res19 ? (
                      <button className="select">
                        {realData[selector].res19} {realData[selector].valor19}
                      </button>
                    ) : selector10 === realData[selector].res19 ? (
                      <button className="select">
                        {realData[selector].res19} {realData[selector].valor19}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector10(realData[selector].res19);
                            setValor10(realData[selector].valor19);
                          } else {
                            setSelector5(realData[selector].res19);
                            setValor5(realData[selector].valor19);
                          }
                        }}
                      >
                        {realData[selector].res19} {realData[selector].valor19}
                      </button>
                    )}
                    {selector5 === realData[selector].res20 ? (
                      <button className="select">
                        {realData[selector].res20} {realData[selector].valor20}
                      </button>
                    ) : selector10 === realData[selector].res20 ? (
                      <button className="select2">
                        {realData[selector].res20} {realData[selector].valor20}
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                        onClick={() => {
                          if (fase2) {
                            setSelector10(realData[selector].res20);
                            setValor10(realData[selector].valor20);
                          } else {
                            setSelector5(realData[selector].res20);
                            setValor5(realData[selector].valor20);
                          }
                        }}
                      >
                        {realData[selector].res20} {realData[selector].valor20}
                      </button>
                    )}
                  </div>

                  <div id="divFalseInput">
                    <div> Respuesta</div>
                    <div>Puntos</div>
                  </div>
                  <div>
                    {controlSend === 8 ? (
                      <button onClick={() => handlerRes(5)}>
                        Mandar respuesta
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar respuesta
                      </button>
                    )}
                    {controlSend === 9 ? (
                      <button onClick={() => handlerPoints(5)}>
                        Mandar puntos
                      </button>
                    ) : (
                      <button
                        className="disable"
                        style={{
                          backgroundColor: "#55518aff",
                          cursor: "not-allowed",
                          border: "none",
                          color: "gray",
                        }}
                      >
                        Mandar puntos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div>
              <div>
                <div id="menuFinal">
                  <h2>{suma}</h2>
                  {controlSend === 10 && fase2 === false ? (
                    <button
                      onClick={() => {
                        setFase2(true);
                        console.log("fase");
                      }}
                    >
                      Iniciar Segundo
                    </button>
                  ) : null}
                  
                  <button onClick={handlerReset}>Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button id="btnDatos" onClick={getData5}>
          Pedir datos
        </button>
      )}
    </div>
  );
};

export default DuoControl;
