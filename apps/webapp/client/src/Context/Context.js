import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { REACT_APP_BACKEND_URI } = process.env;

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get(`${REACT_APP_BACKEND_URI}/loggedIn`, {
      withCredentials: true,
    });
    setLoggedIn(loggedInRes.data);
    return loggedInRes.data;
  };
  useEffect(() => {
    // console.log(loggedIn)
    getLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loggedIn]);
  return (
    <AuthContext.Provider value={{ loggedIn,getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
