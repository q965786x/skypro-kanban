import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopBrowse from "../components/PopBrowse/PopBrowse";
import { AuthContext } from "../context/AuthContext";
import { TasksContext } from "../context/TaskContext";

const CardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const { tasks } = useContext(TasksContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // Ищем карточку в tasks из контекста
  const card = tasks.find((card) => card._id === id || card.id === id);

  const handleClose = () => {
    navigate("/"); // Возврат на главную
  };

  // Добавляем обработчик клавиши Escape
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

  if (!card) {
    console.warn("Карточка не найдена, id:", id);
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
            }}
          >
            <h3>Задача не найдена</h3>
            <p>Задача с ID {id} не существует или была удалена.</p>
            <button onClick={handleClose}>Закрыть</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {/* Показываем основной интерфейс */}
      <Header />
      <Main />

      {/* Поверх всего показываем модальное окно просмотра карточки */}
      {card && <PopBrowse card={card} onClose={handleClose} />}
    </div>
  );
};

export default CardPage;
