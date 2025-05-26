import {useAuth} from "../hooks/useAuth.js";
import {Navigate, Outlet} from "react-router-dom";
import Header from "../components/common/Header.jsx";


const PrivateRoutes = () => {
  const { auth } = useAuth();
  return (
    <>
      {
        auth.user ? (
          <div className='container'>
            <Header />
            <Outlet />
          </div>
        ) : (
          <Navigate to='/login' />
        )
      }
    </>
  )
}

export default PrivateRoutes;