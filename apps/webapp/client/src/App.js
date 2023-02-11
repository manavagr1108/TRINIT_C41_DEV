import "./App.css";
// import getGoogleUrl from "./utils/getGoogleUrl";
// import { ChakraProvider } from "@chakra-ui/react";
// import { Button } from "@chakra-ui/react";
// import axios from "axios";
import Charts from "./comps/Charts/Charts";
import Router from "./Routes";
import { useContext, useState } from "react";
import AuthContext from "./Context/Context.js";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Login from "./comps/Login/Login";
import { AuthContextProvider } from "./Context/Context.js";
function App() {
  // const { loggedIn } = useContext(AuthContext);
  const [usageData, setUsageData] = useState([]);

  return (
    <>
      <AuthContextProvider>
        <Router/>
      </AuthContextProvider>
    </>
  );
}

export default App;
