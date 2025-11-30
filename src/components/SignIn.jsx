import React, { useContext } from "react";
import AuthForm from "./AuthForm";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  return <AuthForm isSignUp={false} onLogin={login} />;
};

export default SignIn;
