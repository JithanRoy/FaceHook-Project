import {api} from "../api/index.js";
import {useAuth} from "./useAuth.js";
import axios from "axios";
import {useEffect} from "react";


const useAxios = () => {
  const { auth } = useAuth();

  useEffect(() => {
    //Add a request Interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.token;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    //Add a response Interceptor
    const responseIntercept = api.interceptors.response.use((response) =>  response,
      async (error) => {
        const orginalRequest = error.config;
        if (error.response.status === 401 && !orginalRequest._retry) {
            orginalRequest._retry = true;

            try {
              const refreshToken = auth?.refreshToken;
              const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
                { refreshToken }
              );
              const { token } = response.data;

              console.log(`Refresh token: ${token}`);
              setAuth({...auth, authToken: token})

              // Retry the orginal request with the new token
              orginalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(orginalRequest);
            } catch (error) {
              throw error;
            }
        }
        return Promise.reject(error);
      });

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    }
  }, [auth.authToken]);

  return {api};
};

export default useAxios;