import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PopExit from "../components/PopExit/PopExit";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { AuthContext } from "../context/AuthContext";

const ExitPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="wrapper">
      <Header />
      <Main />

      <PopExit onConfirm={handleLogout} onCancel={handleClose} isOpen={true} />
    </div>
  );
};

export default ExitPage;
