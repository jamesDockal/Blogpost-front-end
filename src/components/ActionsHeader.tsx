import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";

import Cookies from "js-cookie";

import "../styles/actionsheader.css";

import { ContextOfUser } from "../contexts/UserContext";
import { useRef } from "react";
import CreatePost from "./CreatePost";

type IUser = {
  id: string;
  username: string;
};

export default function ActionsHeader() {
  const [viewLoginForm, setViewLoginForm] = useState<boolean>(false);
  const [viewRegisterForm, setViewRegisterForm] = useState<boolean>(false);
  const [viewCreatePost, setViewCreatePost] = useState<boolean>(false);

  const { user, logUserOut } = ContextOfUser();

  useEffect(() => {
    setViewLoginForm(false);
  }, [user]);

  useEffect(() => {
    setViewRegisterForm(false);
  }, [user]);

  //see if it was click outside the element
  const loginRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const createPostRef = useRef<HTMLDivElement>(null);
  //see if it was click outside the element
  const handleClick = (e: any) => {
    if (
      !registerRef?.current?.contains(e.target)
      // ||
    ) {
      setViewRegisterForm(false);
    }

    if (!loginRef?.current?.contains(e.target)) {
      setViewLoginForm(false);
    }

    if (!createPostRef?.current?.contains(e.target)) {
      setViewCreatePost(false);
    }
  };
  //see if it was click outside the element
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <div ref={createPostRef}>
        <CreatePost isVisible={viewCreatePost} />
      </div>

      <div ref={loginRef}>
        <Login isVisible={viewLoginForm} />
      </div>

      <div ref={registerRef}>
        <Register isVisible={viewRegisterForm} />
      </div>

      <div className={`actions-header`}>
        {user ? (
          <>
            <button
              onClick={() => setViewCreatePost(true)}
              className="create-post-button"
            >
              Create Post
            </button>
            <a
              onClick={() => logUserOut()}
              href="#"
              className="create-post-link"
            >
              Log out
            </a>
            <span className="user-username">{user}</span>
          </>
        ) : (
          <>
            <button
              onClick={() => setViewLoginForm(!viewLoginForm)}
              className="login-button  action-button"
            >
              login
            </button>
            <button
              onClick={() => setViewRegisterForm(!viewRegisterForm)}
              className="register-button action-button"
            >
              register
            </button>
          </>
        )}
      </div>
    </>
  );
}
