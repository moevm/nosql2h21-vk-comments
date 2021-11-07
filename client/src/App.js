import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Debug from "./components/Debug/Debug";
import Main from "./components/Main/Main";
import DebugUsers from "./components/DebugUsers/DebugUsers"

function App() {
  return (
      <Router>
          <Routes>
              <Route path='/debug/users' element={<DebugUsers/>}></Route>
              <Route path='/debug' element={<Debug/>}></Route>
              <Route path='/' element={<Main/>}></Route>
          </Routes>
      </Router>
  );
}

export default App;
