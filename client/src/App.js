import DashBoard from './components/DashBoard';
import LoginPage from './components/LoginPage';
import Private from "./components/Private"
import {Route,Navigate,Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<LoginPage/>} exact />
      <Route path="/private" element={<Private/>} >
      <Route path="dashboard" element={<DashBoard/>} />
      </Route>
      </Routes>
    </div>
  );
}

export default App;
