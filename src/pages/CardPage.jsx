import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopBrowse from "../components/PopBrowse/PopBrowse";
import { AuthContext } from "../context/AuthContext";
import { TasksContext } from "../context/TaskContext";

const CardPage = () => {
  const { user } = useContext(AuthContext);
  const { tasks } = useContext(TasksContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const card = tasks.find((card) => card._id === id || card.id === id);

  const handleClose = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!card && id && tasks.length > 0) {
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  }, [card, id, tasks, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldRedirect) {
        navigate("/");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [shouldRedirect, navigate]);

  if (!card) {
    return (
      <div className="wrapper">
        <Header />
        <Main />
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <div
              className="loading-spinner"
              style={{ margin: "0 auto 15px" }}
            ></div>
            <p style={{ color: "#565eef" }}>Перенаправление на главную...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="wrapper">
        <Header />
        <Main />
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <div
              className="loading-spinner"
              style={{ margin: "0 auto 15px" }}
            ></div>
            <p style={{ color: "#565eef" }}>Загрузка задачи...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Header />
      <Main />

      <PopBrowse
        card={card}
        onClose={() => {
          setShouldRedirect(true);
          setTimeout(() => navigate("/"), 100);
        }}
      />
    </div>
  );
};

export default CardPage;
