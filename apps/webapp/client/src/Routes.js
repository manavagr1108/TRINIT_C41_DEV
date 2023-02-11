import React,{useContext} from "react";
import Charts from "./comps/Charts/Charts";
import AuthContext from "./Context/Context.js";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Login from "./comps/Login/Login";
const Router=()=>{
    const { loggedIn } = useContext(AuthContext);
    // console.log(loggedIn)
    return (
        <>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              {/* {loggedIn === false && (
                <>
                  <Route path="/login" element={<Login />} />
                </>
              )} */}
            
                  <Route path="/profile" element={<Charts />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </div></>
    )
}

export default Router;