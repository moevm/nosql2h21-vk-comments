import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Debug from "./components/Debug/Debug";
import Main from "./components/Main/Main";

function App() {
  return (
      <Router>
          <Routes>
              <Route path='/debug' element={<Debug/>}></Route>
              <Route path='/' element={<Main/>}></Route>
          </Routes>
      </Router>
  );
}

export default App;
