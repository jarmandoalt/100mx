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
              <div><h1>{realData[selector].title1}</h1></div>
              <div>
                <button style={{backgroundColor: selector1 === realData[selector].res1 ? "rgb(80, 125, 248)" : selector6 === realData[selector].res1 ? "rgb(181, 80, 248)" : null, color: "whitesmoke" }} disabled={selector1 === realData[selector].res1 || selector6 === realData[selector].res1} > {realData[selector].res1} /{realData[selector].valor1} </button>
                <button disabled={selector1 === realData[selector].res2 || selector6 === realData[selector].res2} >{realData[selector].res2} /{realData[selector].valor2}</button>
                <button disabled={selector1 === realData[selector].res3 || selector6 === realData[selector].res3} >{realData[selector].res3} /{realData[selector].valor3}</button>
                <button disabled={selector1 === realData[selector].res4 || selector6 === realData[selector].res4} >{realData[selector].res4} /{realData[selector].valor4}</button>
              </div>
            </div>

            <div>
              <div><h1>{realData[selector].title2}</h1></div>
              <div>
                <button disabled={selector2 === realData[selector].res5 || selector7 === realData[selector].res5} > {realData[selector].res5} /{realData[selector].valor5} </button>
                <button disabled={selector2 === realData[selector].res6 || selector7 === realData[selector].res6} >{realData[selector].res6} /{realData[selector].valor6}</button>
                <button disabled={selector2 === realData[selector].res7 || selector7 === realData[selector].res7} >{realData[selector].res7} /{realData[selector].valor7}</button>
                <button disabled={selector2 === realData[selector].res8 || selector7 === realData[selector].res8} >{realData[selector].res8} /{realData[selector].valor8}</button>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div><h1>{realData[selector].title3}</h1></div>
              <div>
                <button disabled={selector3 === realData[selector].res9 || selector8 === realData[selector].res9} > {realData[selector].res9} /{realData[selector].valor9} </button>
                <button disabled={selector3 === realData[selector].res10 || selector8 === realData[selector].res10} >{realData[selector].res10} /{realData[selector].valor10}</button>
                <button disabled={selector3 === realData[selector].res11 || selector8 === realData[selector].res11} >{realData[selector].res11} /{realData[selector].valor12}</button>
                <button disabled={selector3 === realData[selector].res12 || selector8 === realData[selector].res12} >{realData[selector].res12} /{realData[selector].valor12}</button>
              </div>
            </div>
            <div>
              <div><h1>{realData[selector].title4}</h1></div>
              <div>
                <button disabled={selector4 === realData[selector].res13 || selector9 === realData[selector].res13} > {realData[selector].res13} /{realData[selector].valor13} </button>
                <button disabled={selector4 === realData[selector].res14 || selector9 === realData[selector].res14} >{realData[selector].res14} /{realData[selector].valor14}</button>
                <button disabled={selector4 === realData[selector].res15 || selector9 === realData[selector].res15} >{realData[selector].res15} /{realData[selector].valor15}</button>
                <button disabled={selector4 === realData[selector].res16 || selector9 === realData[selector].res16} >{realData[selector].res16} /{realData[selector].valor16}</button>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div><h1>{realData[selector].title5}</h1></div>
              <div>
                <button disabled={selector5 === realData[selector].res17 || selector10 === realData[selector].res17} > {realData[selector].res17} /{realData[selector].valor17} </button>
                <button disabled={selector5 === realData[selector].res18 || selector10 === realData[selector].res18} >{realData[selector].res18} /{realData[selector].valor18}</button>
                <button disabled={selector5 === realData[selector].res19 || selector10 === realData[selector].res19} >{realData[selector].res19} /{realData[selector].valor19}</button>
                <button disabled={selector5 === realData[selector].res20 || selector10 === realData[selector].res20} >{realData[selector].res20} /{realData[selector].valor20}</button>
              </div>
            </div>

            <div>

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
