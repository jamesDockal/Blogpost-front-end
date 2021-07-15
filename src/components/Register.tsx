import React, { FormEvent, useEffect, useState } from "react";

import "../styles/register.css";
import { ContextOfUser } from "../contexts/UserContext";

type registerProps = {
  isVisible: boolean;
};

export default function Register({ isVisible }: registerProps) {
  const [registerVisible, registerVisilbe] = useState<boolean>(isVisible);

  useEffect(() => {
    registerVisilbe(isVisible);
  }, [isVisible]);

  const [valideForm, setValideForm] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const { user, singUpUser: SingUpUser } = ContextOfUser();

  useEffect(() => {
    registerVisilbe(false);
  }, [user]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setValideForm(!valideForm);
    setErrorMessage("");

    try {
      await SingUpUser(username, password, setErrorMessage);
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={`register-form ${
        registerVisible ? "form-actived" : "form-disabled"
      }`}
    >
      <h1 className="register-title">Sign Up</h1>
      <div className="container-email-register">
        <input
          required
          onChange={(e) => setUsername(e.target.value)}
          className="input-email register-input"
          name="email"
          type="text"
        />
        <label className="label-email label-register " htmlFor="">
          Username
        </label>
      </div>
      <div className="container-password-register">
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          className="input-password register-input"
          type="password"
        />
        <label className="label-password label-register" htmlFor="">
          Password
        </label>
      </div>
      <div className="errox-box">
        <span className="error-message">{errorMessage}</span>
      </div>
      <button
        className="button-register"
        disabled={username && password ? false : true}
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}
