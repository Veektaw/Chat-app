import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [isSignupLoading, isSetSignupLoading] = useState(false)
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  });

  console.log("sign up info:", signupInfo)

  useEffect(() => {
    const user = localStorage.getItem("User")
    setUser(JSON.parse(user))
  }, [])

  const updateSignupInfo = useCallback((info) => {
    setSignupInfo(info)
  }, [])

  const signupUser = useCallback(async (e) => {
    e.preventDefault();
    isSetSignupLoading(true);
    setSignupError(null)

    const response = await postRequest(`${baseUrl}/signup`, JSON.stringify(signupInfo));

    isSetSignupLoading(false)

    if (response.error) {
        return setSignupError(response)
    }

    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
  },[signupInfo])

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, [])

  return (
    <AuthContext.Provider value={{ user,  signupInfo, updateSignupInfo, signupError, signupUser, isSignupLoading, logoutUser}}>
      {children}
    </AuthContext.Provider>
  );
};