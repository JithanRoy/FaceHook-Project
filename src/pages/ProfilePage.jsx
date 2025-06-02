import React, {useEffect} from 'react'
import useAxios from "../hooks/useAxios.js";
import {useAuth} from "../hooks/useAuth.js";
import {useProfile} from "../hooks/useProfile.js";
import {actions} from "../actions/index.js";
import ProfileInfo from "../components/profile/ProfileInfo.jsx";
import MyPosts from "../components/profile/MyPosts.jsx";

const ProfilePage = () => {

  const {state, dispatch} = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({
      type: actions.profile.DATA_FETCHING
    });

    const fetchProfile = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          })
        }
      } catch(error) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        })
      }
    }
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div> Fetching your Profile data...</div>
  }

  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  )
}

export default ProfilePage