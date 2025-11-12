import React from "react";
import AuthForm from "./AuthForm";

const SignIn = ({ onLogin }) => {
  return <AuthForm isSignUp={false} onLogin={onLogin} />;
};

export default SignIn;
