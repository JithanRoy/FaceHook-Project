import {useReducer} from "react";
import {initialState, ProfileReducer} from "../reducers/ProfileReducer.js";
import {ProfileContext} from "../context/index.js";

const ProfileProvider = ({children}) => {
  const [state, disPatch] = useReducer(ProfileReducer , initialState);

  return (
    <ProfileContext.Provider value={[state, disPatch]}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider;