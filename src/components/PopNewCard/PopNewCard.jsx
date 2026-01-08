import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import { TasksContext } from "../../context/TaskContext";
import { useModal } from "../../context/Modal";
import {
  SPopNewCard,
  SPopNewCardContainer,
  SPopNewCardBlock,
  SPopNewCardContent,
  SPopNewCardTtl,
  SPopNewCardClose,
  SPopNewCardWrap,
  SFormNew,
  SFormNewBlock,
  SFormNewInput,
  SFormNewArea,
  SFormNewBtnCreate,
  SCategories,
  SCategoriesP,
  SCategoriesThemes,
  SCategoriesTheme,
} from "./PopNewCard.styled";

const PopNewCard = ({ isOpen, onClose, onCreateCard }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Web Design");
  const [selectedStatus, setSelectedStatus] = useState("Без статуса"); // Добавляем состояние статуса
  const [selectedDate, setSelectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { openModal, closeModal } = useModal();
  
  const navigate = useNavigate();
  const {
    addNewTask,
    error: contextError,
    clearError,
  } = useContext(TasksContext);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 495);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Функция для форматирования даты в формат API
  const formatDateForAPI = useCallback((dateString) => {
    if (!dateString) return new Date().toISOString();

    // Преобразуем DD.MM.YYYY в YYYY-MM-DD
    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      const [day, month, year] = dateString.split(".");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      return new Date(formattedDate).toISOString();
    }

    // Если дата уже в формате YYYY-MM-DD
    if (dateString.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
      return new Date(dateString).toISOString();
    }

    // Если дата в другом формате, возвращаем как есть
    return dateString;
  }, []);

  useEffect(() => {
    console.log("PopNewCard: isOpen =", isOpen);
    if (isOpen) {
      openModal();
      console.log("PopNewCard: openModal called");
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}.${today.getFullYear()}`;
      setSelectedDate(formattedDate);
      setFormError("");
      if (clearError) clearError();

      // Блокируем скролл при открытии модалки
      document.body.style.overflow = "hidden";
    } else {
      closeModal();
      console.log("PopNewCard: closeModal called");
      // Разблокируем скролл при закрытии
      document.body.style.overflow = "";
    }

    return () => {
      closeModal();
      document.body.style.overflow = "";
    };
  }, [isOpen, openModal, closeModal, clearError]);

  const validateForm = () => {
    if (!title.trim()) {
      setFormError("Введите название задачи");
      return false;
    }
    if (title.trim().length < 3) {
      setFormError("Название должно содержать минимум 3 символа");
      return false;
    }
    if (!description.trim()) {
      setFormError("Введите описание задачи");
      return false;
    }
    if (description.trim().length < 10) {
      setFormError("Описание должно содержать минимум 10 символов");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (isSubmitting) return;

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        const newCard = {
          title: title.trim(),
          description: description.trim(),
          topic: selectedTopic,
          status: selectedStatus,
          date: formatDateForAPI(selectedDate),
        };

        const success = await addNewTask(newCard);

        if (success) {
          setTitle("");
          setDescription("");
          setSelectedTopic("Web Design");
          setSelectedStatus("Без статуса");
          navigate("/");
        } else {
          setFormError("Не удалось создать задачу");
        }
      } catch (error) {
        setFormError(error.message || "Произошла ошибка при создании задачи");
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      title,
      description,
      selectedTopic,
      selectedStatus,
      selectedDate,
      isSubmitting,
      addNewTask,
      navigate,
      formatDateForAPI,
    ]
  );

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  if (!isOpen) return null;

  return (
    <SPopNewCard>
      <SPopNewCardContainer>
        <SPopNewCardBlock>
          <SPopNewCardContent>
            <SPopNewCardTtl>Создание задачи</SPopNewCardTtl>
            <SPopNewCardClose onClick={onClose}>&#10006;</SPopNewCardClose>

            {(formError || contextError) && (
              <div
                style={{
                  background: "#FFE6E6",
                  color: "#D32F2F",
                  padding: "10px",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                {formError || contextError}
              </div>
            )}

            <SPopNewCardWrap>
              <SFormNew onSubmit={handleSubmit}>
                <SFormNewBlock>
                  <label
                    htmlFor="formTitle"
                    className="subttl"
                    style={{
                      fontSize: isMobile ? "16px" : "14px",
                      fontWeight: "600",                     
                      display: "block", 
                      textAlign: "left",  
                      marginBottom: "15px",                                       
                    }}
                  >
                    Название задачи
                  </label>
                  <SFormNewInput
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (formError) setFormError("");
                    }}
                    autoFocus={!isMobile}
                    required
                    disabled={isSubmitting}
                  />
                </SFormNewBlock>

                <SFormNewBlock>
                  <label
                    htmlFor="textArea"
                    className="subttl"
                    style={{
                      fontSize: isMobile ? "16px" : "14px",
                      fontWeight: "600",                      
                      display: "block",                      
                      textAlign: "left",
                     
                    }}
                  >
                    Описание задачи
                  </label>
                  <SFormNewArea
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (formError) setFormError("");
                    }}
                    rows={isMobile ? "4" : "4"}
                    disabled={isSubmitting}
                  ></SFormNewArea>
                </SFormNewBlock>
              </SFormNew>

              <div>
                <Calendar
                  mode="new"
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  isMobile={isMobile}
                />
              </div>
            </SPopNewCardWrap>

            <SCategories>
              <SCategoriesP
                className="subttl"
                style={{
                  fontSize: isMobile ? "16px" : "14px",
                  fontWeight: "600",                  
                }}
              >
                Категория
              </SCategoriesP>
              <SCategoriesThemes>
                <SCategoriesTheme
                  className={`_orange ${
                    selectedTopic === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() =>
                    !isSubmitting && setSelectedTopic("Web Design")
                  }
                  disabled={isSubmitting}
                  $active={selectedTopic === "Web Design"}
                >
                  <p className="_orange">Web Design</p>
                </SCategoriesTheme>
                <SCategoriesTheme
                  className={`_green ${
                    selectedTopic === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => !isSubmitting && setSelectedTopic("Research")}
                  disabled={isSubmitting}
                  $active={selectedTopic === "Research"}
                >
                  <p className="_green">Research</p>
                </SCategoriesTheme>
                <SCategoriesTheme
                  className={`_purple ${
                    selectedTopic === "Copywriting" ? "_active-category" : ""
                  }`}
                  onClick={() =>
                    !isSubmitting && setSelectedTopic("Copywriting")
                  }
                  disabled={isSubmitting}
                  $active={selectedTopic === "Copywriting"}
                >
                  <p className="_purple">Copywriting</p>
                </SCategoriesTheme>
              </SCategoriesThemes>
            </SCategories>

            {/* Кнопка создания - исправлена позиция */}
            <div
              style={{
                display: "flex",  
                justifyContent: isMobile ? "center" : "flex-end",                    
                marginTop: "20px",
                clear: "both",                
              }}
            >
              <SFormNewBtnCreate
                id="btnCreate"
                onClick={handleSubmit}
                disabled={isSubmitting}
                isMobile={isMobile} 
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner"
                      style={{
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderTopColor: "#ffffff",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        marginRight: "8px",
                      }}
                    />
                    Создание...
                  </>
                ) : (
                  "Создать задачу"
                )}
              </SFormNewBtnCreate>
            </div>
          </SPopNewCardContent>
        </SPopNewCardBlock>
      </SPopNewCardContainer>
    </SPopNewCard>
  );
};

export default PopNewCard;
