import React, { FormEvent, useEffect, useState } from "react";

import "../styles/login.css";
import { ContextOfUser } from "../contexts/UserContext";

type LoginProps = {
  isVisible: boolean;
};

export default function Login({ isVisible }: LoginProps) {
  const [loginVisible, setLoginVisilbe] = useState<boolean>(isVisible);

  useEffect(() => {
    setLoginVisilbe(isVisible);
  }, [isVisible]);

  const [valideForm, setValideForm] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const { user, loginUser } = ContextOfUser();

  useEffect(() => {
    setLoginVisilbe(false);
  }, [user]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setValideForm(!valideForm);
    setErrorMessage("");

    try {
      await loginUser(username, password, setErrorMessage);
      if (!errorMessage) {
        window.location.reload();
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={`login-form ${
        loginVisible ? "form-actived" : "form-disabled"
      }`}
    >
      <h1 className="login-title">Login</h1>
      <div className="container-email-login">
        <input
          required
          onChange={(e) => setUsername(e.target.value)}
          className="input-email login-input"
          name="email"
          type="text"
        />
        <label className="label-email label-login " htmlFor="">
          Username
        </label>
      </div>
      <div className="container-password-login">
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          className="input-password login-input"
          type="password"
        />
        <label className="label-password label-login" htmlFor="">
          Password
        </label>
      </div>
      <div className="errox-box">
        <span className="error-message">{errorMessage}</span>
      </div>
      <button
        className="button-login"
        disabled={username && password ? false : true}
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
