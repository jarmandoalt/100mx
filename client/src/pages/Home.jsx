import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getQ100, getQ5 } from "../services/routes"
import {
  DATAQ100,
  DATAQ5
} from "../reducers/crudReducers";

const Home = () => {
    const dispatch = useDispatch(),
      navigate = useNavigate()
      

  const navigateEquipos = async () => {
    await getData100()
    navigate("/home/equipos")
    window.open(`/home/equiposControl`, 'toolbar=0,location=0,menubar=0');
  };

  const getData100 = async () => {
      const response = await getQ100();
      if (response.status === 200) {
        console.log(response.data.qt100);
        dispatch(DATAQ100(response.data.qt100));
      }
  };

  const navigateDuo = async () => {
    await getData5()
    navigate("/home/duo")
    window.open(`/home/duoControl`, 'toolbar=0,location=0,menubar=0');
  };

  const getData5 = async () => {
    const response = await getQ5();
    if (response.status === 200) {
      console.log("get data5");
      dispatch(DATAQ5(response.data.qt5));
    }
};

  return (
    <div id="divHome">
      <div>
        <button onClick={navigateEquipos}>
          Equipo
        </button>
      </div>
      <div>
        <button onClick={navigateDuo}>
          Duo
        </button>
      </div>
    </div>

  )
}

export default Home;