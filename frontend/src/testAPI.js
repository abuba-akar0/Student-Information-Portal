import React, { useState } from "react";
import APIService from "./APIService";

const APITest = () => {
  const [loginResponse, setLoginResponse] = useState(null);
  const [registerResponse, setRegisterResponse] = useState(null);

  const testLogin = () => {
    APIService.LoginUser({ username: "testuser", password: "testpass" })
      .then((resp) => setLoginResponse(resp))
      .catch((error) => console.log("Login error: ", error));
  };

  const testRegister = () => {
    APIService.CreateUser({
      username: "newuser",
      first_name: "New",
      last_name: "User",
      email: "newuser@example.com",
      password: "newpass",
    })
      .then((resp) => setRegisterResponse(resp))
      .catch((error) => console.log("Registration error: ", error));
  };

  return (
    <div>
      <button onClick={testLogin}>Test Login</button>
      <button onClick={testRegister}>Test Register</button>
      <div>
        <h3>Login Response:</h3>
        <pre>{JSON.stringify(loginResponse, null, 2)}</pre>
      </div>
      <div>
        <h3>Register Response:</h3>
        <pre>{JSON.stringify(registerResponse, null, 2)}</pre>
      </div>
    </div>
  );
};

export default APITest;