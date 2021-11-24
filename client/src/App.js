import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Debug from "./components/Debug/Debug";
import Main from "./components/Main/Main";
import DebugUsers from "./components/Debug/Users/Users"
import DebugComments from './components/Debug/Comments/Comments'
import DebugGroups from './components/Debug/Groups/Groups'
import MainGroups from './components/Main/Groups/Groups'
import MainGroup from './components/Main/Group/Group'
import MainUser from './components/Main/User/User'
import Phrase from './components/Main/Phrase/Phrase'

function App() {
  return (
      <Router>
          <Routes>
              <Route path='/debug/users' element={<DebugUsers/>}></Route>
              <Route path='/debug/comments' element={<DebugComments/>}></Route>
              <Route path='/debug/groups' element={<DebugGroups/>}></Route>
              <Route path='/debug' element={<Debug/>}></Route>
              <Route path='/groups' element={<MainGroups/>}/>
              <Route path='/group' element={<MainGroup/>}/>
              <Route path='/users/:userId' element={<MainUser/>}/>
              <Route path='/phrase' element={<Phrase/>}/>
              <Route path='/' element={<Main/>}></Route>
          </Routes>
      </Router>
  );
}

export default App;
