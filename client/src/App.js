import {Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./views/Home";
import Login from "./views/Login";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"*"} element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
