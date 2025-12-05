import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
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

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}.${today.getFullYear()}`;
      setSelectedDate(formattedDate);
    }
  }, [isOpen]);

  // PopNewCard.jsx - добавьте в начало компонента
useEffect(() => {
  // Проверяем классы body при открытии/закрытии
  console.log("PopNewCard открыт, классы body:", document.body.className);
  
  return () => {
    console.log("PopNewCard закрыт, классы body:", document.body.className);
  };
}, [isOpen]);

 const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (isSubmitting) {
        console.log("Запрос уже отправляется...");
        return;
      }

      if (!title.trim()) {
        alert("Пожалуйста, введите название задачи");
        return;
      }

      setIsSubmitting(true);

      try {
        const newCard = {
          title: title.trim(),
          description: description.trim(),
          topic: selectedTopic,
          status: selectedStatus, // Используем выбранный статус!
          date: new Date().toISOString(),
        };

        console.log("Создаем задачу со статусом:", selectedStatus);
        
        // Вызываем создание задачи без проверки результата
      await onCreateCard(newCard);
      
      // Всегда считаем успехом и закрываем модалку
      console.log("Задача отправлена, закрываем модалку");
      navigate("/");

      } catch (error) {
        console.error("Ошибка создания задачи:", error);
        alert("Ошибка при создании задачи: " + error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [title, description, selectedTopic, selectedStatus, isSubmitting, onCreateCard, navigate]
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
                    onChange={(e) => setTitle(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
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

            {/* БЛОК ВЫБОРА СТАТУСА */}
            <div style={{ marginBottom: "20px" }}>
              <SCategoriesP className="subttl">Статус задачи</SCategoriesP>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    style={{
                      padding: "8px 16px",
                      border: `2px solid ${selectedStatus === status ? "#565eef" : "#d4dbe5"}`,
                      background: selectedStatus === status ? "#565eef" : "white",
                      color: selectedStatus === status ? "white" : "#565eef",
                      borderRadius: "20px",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

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
                >
                  <p className="_orange">Web Design</p>
                </SCategoriesTheme>
                <SCategoriesTheme
                  className={`_green ${
                    selectedTopic === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => !isSubmitting && setSelectedTopic("Research")}
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
            >
              {isSubmitting ? "Создание..." : "Создать задачу"}
            </SFormNewCreate>
          </SPopNewCardContent>
        </SPopNewCardBlock>
      </SPopNewCardContainer>
    </SPopNewCard>
  );
};

export default PopNewCard;
