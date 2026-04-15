import socket from "../socket/socket";
import { getQ100 } from "../services/routes";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import DigitDisplay from "./DigitDisplay";
import Modal from 'react-bootstrap/Modal';
import max  from "../../public/maximize.svg";
import min  from "../../public/minimize.svg";

const Equipos = () => {
  const [realData, setRealData] = useState([]),
    [inicio, setInicio] = useState(0),
    [selectorTitle, setSelectorTitle] = useState(true),
    [selector, setSelector] = useState(0),
    [selector1, setSelector1] = useState(true),
    [selector2, setSelector2] = useState(true),
    [selector3, setSelector3] = useState(true),
    [selector4, setSelector4] = useState(true),
    [strike, setStrike] = useState(0),
    [seeStrike, setSeeStrike] = useState(false),
    [selectTeam, setSelectTeam] = useState(0),
    [team2, setTeam2] = useState(""),
    [team1, setTeam1] = useState(""),
    [sumaTeam2, setSumaTeam2] = useState(0),
    [sumaTeam1, setSumaTeam1] = useState(0),
    [selector5, setSelector5] = useState(true),
    [suma, setSuma] = useState(0),
    [isFullscreen, setIsFullscreen] = useState(false);


  const getData100 = async () => {
    const response = await getQ100();
    if (response.status === 200) {
      setRealData(response.data.qt100);
    }
    setTimeout(() => {
      setInicio(1);
    }, 200);
  };

  const handleSumaTeam1 = (suma1) => {
    setSumaTeam1(sumaTeam1 + suma1);
  };

  const handleSumaTeam2 = (suma2) => {
    setSumaTeam2(sumaTeam2 + suma2);
  };

  useEffect(() => {
    socket.on("init", () => {
      getData100();
    });

    socket.on("selectTitle", (selectTitle) => {
      setSelector(selectTitle.title);
    });

    socket.on("teamBottonSelect", (teamBottonSelect) => {
      if (teamBottonSelect.team == 1) {
        console.log(team1);
      } else {
        console.log(team2);
      }
    });

    socket.on("sendStrike", (sendStrike) => {
      setStrike(sendStrike.strike);
      setSeeStrike(true);

      setTimeout(() => {
        setSeeStrike(false);
      }, 5000);
    });

    socket.on("sendValor", (sendValor) => {
      setSuma(sendValor.puntos);

      switch (sendValor.number) {
        case 1:
          setSelector1(false);
          break;
        case 2:
          setSelector2(false);
          break;
        case 3:
          setSelector3(false);
          break;
        case 4:
          setSelector4(false);
          break;
        case 5:
          setSelector5(false);
          break;
        case 0:
          setSelectorTitle(false);
          break;
        default:
          break;
      }
    });

    socket.on("reset", () => {
      setSelectorTitle(true);
      setSelector1(true);
      setSelector2(true);
      setSelector3(true);
      setSelector4(true);
      setSelector5(true);
      setSelectTeam(0);
      setSuma(0);
      setStrike(0);
    });

    socket.on("nameTeam1", (nameTeam1) => {
      setTeam1(nameTeam1.name);
    });

    socket.on("nameTeam2", (nameTeam2) => {
      setTeam2(nameTeam2.name);
    });

    socket.on("selectTeam", (selectTeam) => {
      setSelectTeam(selectTeam.team);
    });

    socket.on("sendPoints", (sendpoints) => {
      if (sendpoints.team == true) {
        handleSumaTeam1(sendpoints.suma);
      }

      if (sendpoints.team == false) {
        handleSumaTeam2(sendpoints.suma);
      }
    });

    return () => socket.off("teamBottonSelect");

  }, [Socket, handleSumaTeam1, handleSumaTeam2]);

  const numStr = suma.toString().padStart(3, '0');

  // useEffect para escuchar cambios en el estado de pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = () => {
    if (isFullscreen) {
      // Si ya está en pantalla completa, sal del modo
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    } else {
      // Si no, entra en pantalla completa
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
        document.documentElement.msRequestFullscreen();
      }
    }
  };

  return (
    <>
    <div id="divEquipos">
      <div>
        <div>
          {selectTeam === true ? (
            <div>
              <h1 className="select">{team1}</h1>
              {
              inicio === 1 ? <h1 className="select">{sumaTeam1}</h1> : null
              }
            </div>
          ) : (
            <div >
              <h1>{team1}</h1>
              {
              inicio === 1 ? <h1>{sumaTeam1}</h1> : null
              }
              
            </div>
          )}
        </div>
        { 
          inicio === 0 ? null :
          <div>
            {/* <h1>{suma}</h1> */}
            <div className="number-board">
              <DigitDisplay digitValue={numStr[0]} />
              <DigitDisplay digitValue={numStr[1]} />
              <DigitDisplay digitValue={numStr[2]} />
            </div>

          </div>}
        <div>
          {selectTeam === false ? (
            <div>
              <h1 className=" select">{team2}</h1>
              {
              inicio === 1 ? <h1 className="select">{sumaTeam2}</h1> : null
               }
            </div>
          ) : (
            <div >
              <h1>{team2}</h1>
              {
              inicio === 1 ? <h1>{sumaTeam2}</h1> : null
               }
            </div>
          )}
        </div>
      </div>
      {inicio === 0 ? (
        <div>
          {selectorTitle ? (
            <div>
              <h1>------------ ------ --------------</h1>
            </div>
          ) : (
            <div>
              <h1>{realData[selector].title}</h1>
            </div>
          )}

          <div>
            {selector1 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res1}</h2>
                <h2>{realData[selector].valor1}</h2>
              </div>
            )}

            {selector2 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res2}</h2>
                <h2>{realData[selector].valor2}</h2>
              </div>
            )}
            {selector3 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res3}</h2>
                <h2>{realData[selector].valor3}</h2>
              </div>
            )}
            {selector4 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res4}</h2>
                <h2>{realData[selector].valor4}</h2>
              </div>
            )}
            {selector5 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res5}</h2>
                <h2>{realData[selector].valor5}</h2>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {selectorTitle ? (
            <div>
              <h1>------------ ------ --------------</h1>
            </div>
          ) : (
            <div>
              <h1>{realData[selector].title}</h1>
            </div>
          )}

          <div>
            {selector1 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res1}</h2>
                <h2>{realData[selector].valor1}</h2>
              </div>
            )}

            {selector2 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res2}</h2>
                <h2>{realData[selector].valor2}</h2>
              </div>
            )}
            {selector3 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res3}</h2>
                <h2>{realData[selector].valor3}</h2>
              </div>
            )}
            {selector4 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res4}</h2>
                <h2>{realData[selector].valor4}</h2>
              </div>
            )}
            {selector5 ? (
              <div>
                <h2>-------------</h2>
                <h2>--</h2>
              </div>
            ) : (
              <div>
                <h2>{realData[selector].res5}</h2>
                <h2>{realData[selector].valor5}</h2>
              </div>
            )}
          </div>
        </div>
      )}
<button id="btnScreen" onClick={handleToggleFullscreen}>
      {isFullscreen ? <img src={min}></img> : <img src={max}></img>}
    </button>
    <Modal
    id="modalStrike"
        show={seeStrike}
        onHide={() => setSeeStrike(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        
        <Modal.Body>
         {
          strike == 1 ? (
          <div id="divStrike">
            <h1>X</h1>
          </div>
        ) : strike == 2 ? (
          <div id="divStrike">
            <h1>X X</h1>
          </div>
        ) : strike == 3 ? (
          <div id="divStrike">
            <h1>X X X</h1>{" "}
          </div>
        ) : null
         }
        </Modal.Body>
      </Modal>
      
    </div>
  </>
  );
};

export default Equipos;
