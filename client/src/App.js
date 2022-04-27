import {Routes, Route} from "react-router-dom";
import './App.css';
import React, { useState, useEffect } from "react";
// import Home from "./views/Home";
// import Login from "./views/Login";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = React.lazy(()=> import("./views/Home"));
const Login = React.lazy(()=> import("./views/Login"));
const ProtectedRoute = React.lazy(()=> import("./components/Auth"));

toast.configure();


function App() {

  const [isAuth, setIsAuth] = useState(false);


  // useEffect(() => {
  //   try {
      
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  
  // }, [])
  

  return (
    <div className="App">
      <Routes>
          <Route path={"/login"} element={<Login setIsAuth={setIsAuth}/>}/>
          <Route element={<ProtectedRoute isAuth={isAuth}/>}>
            <Route path={"*"} element={<Home/>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
