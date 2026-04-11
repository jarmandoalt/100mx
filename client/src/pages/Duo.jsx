import { useEffect, useState } from "react";
import DigitDisplay from "./DigitDisplay";
import { getQ5 } from "../services/routes";
import { Socket } from "socket.io-client";
import socket from "../socket/socket";

const Duo = () => {
  const [selectorTitle, setSelectorTitle] = useState(true),
    [selector1, setSelector1] = useState(true),
    [selector2, setSelector2] = useState(true),
    [selector3, setSelector3] = useState(true),
    [selector4, setSelector4] = useState(true),
    [selector5, setSelector5] = useState(true),
    [selector6, setSelector6] = useState(true),
    [selector7, setSelector7] = useState(true),
    [selector8, setSelector8] = useState(true),
    [selector9, setSelector9] = useState(true),
    [selector10, setSelector10] = useState(true),
    [selectorNum1, setSelectorNum1] = useState(true),
    [selectorNum2, setSelectorNum2] = useState(true),
    [selectorNum3, setSelectorNum3] = useState(true),
    [selectorNum4, setSelectorNum4] = useState(true),
    [selectorNum5, setSelectorNum5] = useState(true),
    [selectorNum6, setSelectorNum6] = useState(true),
    [selectorNum7, setSelectorNum7] = useState(true),
    [selectorNum8, setSelectorNum8] = useState(true),
    [selectorNum9, setSelectorNum9] = useState(true),
    [selectorNum10, setSelectorNum10] = useState(true),
    [title, setTitle] = useState(""),
    [res1, setRes1] = useState(""),
    [res2, setRes2] = useState(""),
    [res3, setRes3] = useState(""),
    [res4, setRes4] = useState(""),
    [res5, setRes5] = useState(""),
    [res6, setRes6] = useState(""),
    [res7, setRes7] = useState(""),
    [res8, setRes8] = useState(""),
    [res9, setRes9] = useState(""),
    [res10, setRes10] = useState(""),
    [val1, setVal1] = useState(0),
    [val2, setVal2] = useState(0),
    [val3, setVal3] = useState(0),
    [val4, setVal4] = useState(0),
    [val5, setVal5] = useState(0),
    [val6, setVal6] = useState(0),
    [val7, setVal7] = useState(0),
    [val8, setVal8] = useState(0),
    [val9, setVal9] = useState(0),
    [val10, setVal10] = useState(0),
    [selector, setSelector] = useState(0),
    [suma, setSuma] = useState(0),
    [realData, setRealData] = useState([]),
    [inicio, setInicio] = useState(false);

    const getData5 = async () => {
        const response = await getQ5();
        if (response.status === 200) {
          setRealData(response.data.qt5);
        }
        setTimeout(() => {
          setInicio(true);
        }, 1000);
    };

     useEffect(() => {
    socket.on("init", () => {
      getData5();
    });

  }, [Socket]);

  const numStr = suma.toString().padStart(3, "0");


  useEffect(() => {
    socket.on("sendRes", (sendRes) => {
      switch (sendRes.quest) {
        case 1:
          setRes1(sendRes.res)
          setTimeout(() => {
            setSelector1(false)
          }, 100);
          break;
          case 2:
          setRes2(sendRes.res)
          setTimeout(() => {
            setSelector2(false)
          }, 100);
          break;
          case 3:
          setRes3(sendRes.res)
          setTimeout(() => {
            setSelector3(false)
          }, 100);
          break;
          case 4:
          setRes4(sendRes.res)
          setTimeout(() => {
            setSelector4(false)
          }, 100);
          break;
          case 5:
          setRes5(sendRes.res)
          setTimeout(() => {
            setSelector5(false)
          }, 100);
          break;
        default:
          break;
      }
    });

    socket.on("sendVal", (sendVal) => {
      setSuma(sendVal.sum)
      switch (sendVal.quest) {
        case 1:
          setVal1(sendVal.val)
          setTimeout(() => {
            setSelectorNum1(false)
          }, 100); 
          break;
          case 2:
          setVal2(sendVal.val)
          setTimeout(() => {
            setSelectorNum2(false)
          }, 100);
          break;
          case 3:
          setVal3(sendVal.val)
          setTimeout(() => {
            setSelectorNum3(false)
          }, 100);
          break;
          case 4:
          setVal4(sendVal.val)
          setTimeout(() => {
            setSelectorNum4(false)
          }, 100);
          break;
          case 5:
          setVal5(sendVal.val)
          setTimeout(() => {
            setSelectorNum5(false)
          }, 100);
          break;
        default:
          break;
      }
    });

    socket.on("resetDuo", () => {
      setRes1("");
      setRes2("");
      setRes3("");
      setRes4("");
      setRes5("");
      setRes6("");
      setRes7("");
      setRes8("");
      setRes9("");
      setRes10("");
      setVal1(0);
      setVal2(0);
      setVal3(0);
      setVal4(0);
      setVal5(0);
      setVal6(0);
      setVal7(0);
      setVal8(0);
      setVal9(0);
      setVal10(0);
      setSelector1(false);
      setSelector2(false);
      setSelector3(false);
      setSelector4(false);
      setSelector5(false);
      setSelector6(false);
      setSelector7(false);
      setSelector8(false);
      setSelector9(false);
      setSelector10(false);
      setSelectorNum1(false);
      setSelectorNum2(false);
      setSelectorNum3(false);
      setSelectorNum4(false);
      setSelectorNum5(false);
      setSelectorNum6(false);
      setSelectorNum7(false);
      setSelectorNum8(false);
      setSelectorNum9(false);
      setSelectorNum10(false);
      setSuma(0)
    });
  }, [Socket]);

  return (
    <div>
      <div className="number-board new">
        <DigitDisplay digitValue={numStr[0]} />
        <DigitDisplay digitValue={numStr[1]} />
        <DigitDisplay digitValue={numStr[2]} />
      </div>
      <div id="divDuo">
        <div id="res">
          <div>
            <div>
              {selector1 ? <div><h1>-----------------</h1></div> : <div><h1> {res1} </h1></div> }
              {selectorNum1 ? <div><h1>--</h1></div> : <div><h1>{val1}{selectorNum1}</h1></div> }
            </div>
            <div>
              {selector2 ? <div><h1>-----------------</h1></div> : <div><h1>{res2}</h1></div> }
              {selectorNum2 ? <div><h1>--</h1></div> : <div><h1>{val2}</h1></div> }
            </div>
            <div>
              {selector3 ? <div><h1>-----------------</h1></div> : <div><h1>{res3} </h1></div> }
              {selectorNum3 ? <div><h1>--</h1></div> : <div><h1>{val3}</h1></div> }
            </div>
            <div>
              {selector4 ? <div><h1>-----------------</h1></div> : <div><h1>{res4} </h1></div> }
              {selectorNum4 ? <div><h1>--</h1></div> : <div><h1>{val4}</h1></div> }
            </div>
            <div>
              {selector5 ? <div><h1>-----------------</h1></div> : <div><h1>{res5} </h1></div> }
              {selectorNum5 ? <div><h1>--</h1></div> : <div><h1>{val5}</h1></div> }
            </div>
          </div>
          <div>
            <div>
              {selector6 ? <div><h1>-----------------</h1></div> : <div><h1>{res6} </h1></div> }
              {selectorNum6 ? <div><h1>--</h1></div> : <div><h1>{val6}</h1></div> }
            </div>
            <div>
              {selector7 ? <div><h1>-----------------</h1></div> : <div><h1> {res7}</h1></div> }
              {selectorNum7 ? <div><h1>--</h1></div> : <div><h1>{val7}</h1></div> }
            </div>
            <div>
              {selector8 ? <div><h1>-----------------</h1></div> : <div><h1>{res8} </h1></div> }
              {selectorNum8 ? <div><h1>--</h1></div> : <div><h1>{val8}</h1></div> }
            </div>
            <div>
              {selector9 ? <div><h1>-----------------</h1></div> : <div><h1>{res9} </h1></div> }
              {selectorNum9 ? <div><h1>--</h1></div> : <div><h1>{val9}</h1></div> }
            </div>
            <div>
              {selector10 ? <div><h1>-----------------</h1></div> : <div><h1>{res10} </h1></div> }
              {selectorNum10 ? <div><h1>--</h1></div> : <div><h1>{val10}</h1></div> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Duo;
