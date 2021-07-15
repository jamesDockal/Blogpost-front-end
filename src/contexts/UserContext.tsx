import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import api from "../services/api";

type UserProviderProps = {
  children: ReactNode;
};

type IUser = {
  id: string;
  username: string;
};

type UserContextValue = {
  user: IUser;
  token: string;
  loginUser: (
    username: string,
    password: string,
    setErrorMessage: Function
  ) => void;
  logUserOut: () => void;
  singUpUser: (
    username: string,
    password: string,
    setErrorMessage: Function
  ) => void;

  createPost: (
    title: string,
    content: string,
    setErrorMessage: Function
  ) => void;
};

export const UserContext = createContext({} as UserContextValue);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<string | any>(Cookies.get("user"));
  const [token, setToken] = useState<string | any>(Cookies.get("token"));

  useEffect(() => {
    setUser(user);
  }, [user]);

  async function loginUser(
    username: string,
    password: string,
    setErrorMessage: Function
  ) {
    try {
      const { data } = await api.post("/user/login", {
        username,
        password,
      });

      if (!data) {
        setErrorMessage("Internal error");
      } else {
        Cookies.set("user", data.user.username);
        Cookies.set("token", data.token);
        setUser(data.user.username);
      }
    } catch (e) {
      setErrorMessage(e.response.data.error);
    }
  }

  async function singUpUser(
    username: string,
    password: string,
    setErrorMessage: Function
  ) {
    console.log("sing up");

    try {
      const { data } = await api.post("/user/register", {
        username,
        password,
      });

      if (!data) {
        setErrorMessage("Internal error");
      } else {
        Cookies.set("user", data.user.username);
        Cookies.set("token", data.token);
        setUser(data.user.username);
      }
    } catch (e) {
      setErrorMessage(e.response.data.error);
    }
  }

  function logUserOut() {
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(null);
    window.location.reload();
  }

  async function createPost(
    title: string,
    content: string,
    setErrorMessage: Function
  ) {
    console.log("creat post");

    try {
      const { data } = await api.post(
        "/blogpost/create",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data", data);

      if (!data) {
        setErrorMessage("Internal error");
      }
    } catch (e) {
      setErrorMessage(e.response.data.error);
    }
  }

  return (
    <UserContext.Provider
      value={{ user, token, loginUser, logUserOut, singUpUser, createPost }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const ContextOfUser = () => {
  return useContext(UserContext);
};
