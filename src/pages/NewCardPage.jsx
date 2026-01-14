import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { TasksContext } from "../context/TaskContext";

const NewCardPage = () => {
  const navigate = useNavigate();
  const { addNewTask } = useContext(TasksContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    if (!isProcessing) {
      navigate("/", { replace: true });
    }
  };

  const handleCreate = async (newCardData) => {
    try {
      setIsProcessing(true);
      const success = await addNewTask(newCardData);

      if (success) {
        return true;
      } else {
        setIsProcessing(false);
        return false;
      }
    } catch (error) {
      setIsProcessing(false);
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
