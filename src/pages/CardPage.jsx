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
  const [cardNotFound, setCardNotFound] = useState(false);

  const card = tasks.find((card) => card._id === id || card.id === id);

  const handleClose = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!card && id) {
      const timer = setTimeout(() => {
        const updatedCard = tasks.find((c) => c._id === id || c.id === id);
        if (!updatedCard) {
          setCardNotFound(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [card, id, tasks, navigate]);

  if (cardNotFound) {
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
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h3 style={{ color: "#565eef", marginBottom: "15px" }}>
              Задача не найдена
            </h3>
            <p style={{ color: "#94a6be", marginBottom: "20px" }}>
              Задача была удалена или не существует.
            </p>
            <button
              onClick={handleClose}
              style={{
                padding: "10px 20px",
                background: "#565eef",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Вернуться на главную
            </button>
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

      {card && <PopBrowse card={card} onClose={handleClose} />}
    </div>
  );
};

export default CardPage;
