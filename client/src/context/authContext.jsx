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

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, isSetLoginLoading] = useState(false)
  const [loginInfo, setLoginInfo] = useState({
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

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info)
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


  const loginUser = useCallback(async (e) => {
    e.preventDefault();
    isSetLoginLoading(true);
    setLoginError(null)

    const response = await postRequest(`${baseUrl}/login`, JSON.stringify(loginInfo));
    isSetLoginLoading(false)

    if (response.error) {
        return setLoginError(response)
    }

    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)

  }, [loginInfo])

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, [])

  return (
    <AuthContext.Provider value={{
    user, 
    signupInfo,
    loginInfo,
    updateSignupInfo,
    updateLoginInfo,
    signupError,
    loginError,
    signupUser,
    isSignupLoading,
    isLoginLoading,
    logoutUser,
    loginUser}}>
      {children}
    </AuthContext.Provider>
  );
};