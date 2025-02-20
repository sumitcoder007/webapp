import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { useState } from "react";
import RefreshHandler from "./refreshHandler";

function App() {

  const [isAuthenticat, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticat ? element : <Navigate to='/login'/>
  }


  return (
    <div className="App">
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to = '/login'/>} />
        <Route path="/home" element = {<PrivateRoute element={<Home/>}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
