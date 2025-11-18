import React from "react";
import AuthForm from "./AuthForm";

const SignUp = ({ onLogin }) => {
  return <AuthForm isSignUp onLogin={onLogin} />;
};

export default SignUp;
