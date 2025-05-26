import React from 'react'
import {useAuth} from "../hooks/useAuth.js";
import {Link} from "react-router-dom";

const HomePage = () => {
  const {auth} = useAuth();

  return (
    <>
      <div>HomePage</div>
      <Link to="/me">Go to Profile Page</Link>
    </>
  )
}

export default HomePage