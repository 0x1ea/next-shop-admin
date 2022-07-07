import React, { useState, useContext, createContext } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@services/api";
const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(endPoints.auth.login, { email, password }, options);

    console.log("data:", data);
    console.log(data.access_token);

    if (data.access_token) {
      Cookie.set("token", data.access_token, { expires: 5 });
    }

    // setUser("login");
  };

  return {
    user,
    signIn,
  };
}
