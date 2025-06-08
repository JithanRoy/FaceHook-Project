import {useContext} from "react";
import {PostContext} from "../context/index.js";


export const usePost = () => {
  return useContext(PostContext);
}