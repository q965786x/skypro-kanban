import React, { useContext } from "react";
import AuthForm from "./AuthForm";
import { AuthContext } from "../context/AuthContext";

const SignUp = ({ onLogin }) => {
  const { login } = useContext(AuthContext);
  return <AuthForm isSignUp onLogin={login} />;
};

export default SignUp;
