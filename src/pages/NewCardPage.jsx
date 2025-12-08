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
    console.log("NewCardPage: создание задачи");
    try {
      const success = await addNewTask(newCardData);
      console.log("NewCardPage: результат создания", success);
      
      if (success) {
        return true; // Возвращаем true при успехе
      } else {
        return false; // Возвращаем false при ошибке
      }
    } catch (error) {
      console.error("NewCardPage: ошибка создания", error);
      return false; // Возвращаем false при исключении
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
