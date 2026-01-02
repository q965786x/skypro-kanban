import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import { TasksContext } from "../../context/TaskContext";
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
  SFormNewCreate,
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

  const navigate = useNavigate();
  const {
    addNewTask,
    error: contextError,
    clearError,
  } = useContext(TasksContext);

  // Функция для форматирования даты в формат API
  const formatDateForAPI = useCallback((dateString) => {
    if (!dateString) return new Date().toISOString();
    
    // Преобразуем DD.MM.YYYY в YYYY-MM-DD
    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      const [day, month, year] = dateString.split('.');
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
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
    if (isOpen) {
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}.${today.getFullYear()}`;
      setSelectedDate(formattedDate);
      setFormError("");
      if (clearError) clearError();
    }
  }, [isOpen, clearError]);

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

        console.log("Создание задачи с данными:", newCard);

        const success = await addNewTask(newCard);

        if (success) {
          console.log("Задача успешно создана");
          setTitle("");
          setDescription("");
          setSelectedTopic("Web Design");
          setSelectedStatus("Без статуса");
          navigate("/");
        } else {
          setFormError("Не удалось создать задачу");
        }
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate("/");
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  if (!isOpen) return null;

  return (
    <SPopNewCard style={{ display: "block" }}>
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
                  <label htmlFor="formTitle" className="subttl">
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
                    autoFocus
                    required
                    disabled={isSubmitting}
                  />
                </SFormNewBlock>

                <SFormNewBlock>
                  <label htmlFor="textArea" className="subttl">
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
                    rows="4"
                    disabled={isSubmitting}
                  ></SFormNewArea>
                </SFormNewBlock>
              </SFormNew>

              <Calendar
                mode="new"
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </SPopNewCardWrap>

            {/* <div style={{ marginBottom: "20px" }}>
              <SCategoriesP className="subttl">Статус задачи</SCategoriesP>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {[
                  "Без статуса",
                  "Нужно сделать",
                  "В работе",
                  "Тестирование",
                  "Готово",
                ].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    style={{
                      padding: "8px 16px",
                      border: `2px solid ${
                        selectedStatus === status ? "#565eef" : "#d4dbe5"
                      }`,
                      background:
                        selectedStatus === status ? "#565eef" : "white",
                      color: selectedStatus === status ? "white" : "#565eef",
                      borderRadius: "20px",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                    disabled={isSubmitting}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div> */}

            <SCategories>
              <SCategoriesP className="subttl">Категория</SCategoriesP>
              <SCategoriesThemes>
                <SCategoriesTheme
                  className={`_orange ${
                    selectedTopic === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() =>
                    !isSubmitting && setSelectedTopic("Web Design")
                  }
                  style={{ 
                    opacity: isSubmitting ? 0.7 : (selectedTopic === "Web Design" ? 1 : 0.4),
                    cursor: isSubmitting ? "not-allowed" : "pointer"
                  }}
                >
                  <p className="_orange">Web Design</p>
                </SCategoriesTheme>
                <SCategoriesTheme
                  className={`_green ${
                    selectedTopic === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => !isSubmitting && setSelectedTopic("Research")}
                  style={{ opacity: isSubmitting ? 0.7 : 1 }}
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
                  style={{ 
                    opacity: isSubmitting ? 0.7 : (selectedTopic === "Copywriting" ? 1 : 0.4),
                    cursor: isSubmitting ? "not-allowed" : "pointer"
                  }}
                >
                  <p className="_purple">Copywriting</p>
                </SCategoriesTheme>
              </SCategoriesThemes>
            </SCategories>

            <SFormNewCreate
              className="_hover01"
              id="btnCreate"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{ 
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Создание...
                </>
              ) : (
                "Создать задачу"
              )}
            </SFormNewCreate>
          </SPopNewCardContent>
        </SPopNewCardBlock>
      </SPopNewCardContainer>
    </SPopNewCard>
  );
};

export default PopNewCard;
