import { Provider } from "react-redux";
import { store} from "./store/index.jsx";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx"
import Equipos from "../src/pages/Equipos.jsx"
import Duo from "../src/pages/Duo.jsx"
import EquiposControl from "../src/pages/EquiposControl.jsx"
import DuoControl from "../src/pages/DuoControl.jsx"
import Ruleta from "../src/pages/Ruleta.jsx"
import RuletaControl from "../src/pages/RuletaControl.jsx"


function App() {
  return (
    <>
      <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="home/equipos" element={<Equipos />} />
              <Route path="home/duo" element={<Duo />} />
              <Route path="home/equiposControl" element={<EquiposControl />} />
              <Route path="home/duoControl" element={<DuoControl />} />
              <Route path="home/ruletaControl" element={<RuletaControl />} />
              <Route path="home/ruleta" element={<Ruleta />} />
            </Routes>
          </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
