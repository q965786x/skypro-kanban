import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { TasksContext } from "../context/TaskContext";

const NewCardPage = () => {
  const navigate = useNavigate();
  const { addNewTask } = useContext(TasksContext);

  const handleClose = () => {
    navigate("/"); // Возврат на главную
  };

  const handleCreate = async (newCardData) => {
    const success = await addNewTask(newCardData);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="wrapper">
      {/* Показываем основной интерфейс */}
      <Header />
      <Main />

      {/* Поверх всего показываем модальное окно */}
      <PopNewCard
        isOpen={true}
        onClose={handleClose}
        onCreateCard={handleCreate}
      />
    </div>
  );
};

export default NewCardPage;
