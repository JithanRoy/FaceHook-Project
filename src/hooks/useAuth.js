import {useContext, useDebugValue} from "react";
import {AuthContext} from "../context/index.js";


export const useAuth = () => {
  const {auth} = useContext(AuthContext);
  useDebugValue(auth, auth => auth?.user ? 'User Logged In' : 'User Logged Out');
  return useContext(AuthContext);
}