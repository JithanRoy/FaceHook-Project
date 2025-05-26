import {AuthContext} from "../context/index.js";
import React from "react";


const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState({});
  return (
    <AuthContext value={{auth, setAuth}}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider;