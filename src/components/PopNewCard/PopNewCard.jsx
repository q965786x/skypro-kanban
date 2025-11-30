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
  const [selectedDate, setSelectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Защита от двойного сабмита
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

  // useCallback для обработчика сабмита
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
          date: new Date().toISOString(),
        };

        const success = await onCreateCard(newCard);
        if (success) {
          navigate("/");
        } else {
          alert("Ошибка при создании задачи");
        }
      } catch (error) {
        console.error("Ошибка создания задачи:", error);
        alert("Произошла ошибка при создании задачи");
      } finally {
        setIsSubmitting(false);
      }
    },
    [title, description, selectedTopic, isSubmitting, onCreateCard, navigate]
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
