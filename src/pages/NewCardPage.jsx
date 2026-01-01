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
    navigate("/");
  };

  const handleCreate = async (newCardData) => {
    try {
      const success = await addNewTask(newCardData);

      if (success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <Main />

      <PopNewCard
        isOpen={true}
        onClose={handleClose}
        onCreateCard={handleCreate}
      />
    </div>
  );
};

export default NewCardPage;
