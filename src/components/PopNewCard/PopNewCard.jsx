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

const PopNewCard = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Web Design");
  const [selectedStatus, setSelectedStatus] = useState("Без статуса");
  const [selectedDate, setSelectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { openModal, closeModal } = useModal();

  const navigate = useNavigate();
  const {
    addNewTask,
    error: contextError,
    clearError,
    refetchTasks,
  } = useContext(TasksContext);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 495);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      openModal();

      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}.${today.getFullYear()}`;

      setSelectedDate(formattedDate);
      setFormError("");
      setIsSuccess(false);

      if (clearError) clearError();

      document.body.style.overflow = "hidden";
    } else {
      closeModal();
      document.body.style.overflow = "";
    }

    return () => {
      closeModal();
      document.body.style.overflow = "";
    };
  }, [isOpen, openModal, closeModal, clearError]);

  // Сброс состояния формы при закрытии
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedTopic("Web Design");
    setSelectedStatus("Без статуса");
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${today.getFullYear()}`;
    setSelectedDate(formattedDate);
    setFormError("");
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  const formatDateForAPI = useCallback((dateString) => {
    if (!dateString) return new Date().toISOString();

    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      const [day, month, year] = dateString.split(".");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      return new Date(formattedDate).toISOString();
    }

    return new Date().toISOString();
  }, []);

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
      setFormError("");
      setIsSuccess(false);

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
          // Устанавливаем флаг успешного создания
          setIsSuccess(true);

          // Обновляем список задач
          if (refetchTasks) {
            await refetchTasks();
          }

          // Задержка перед закрытием для отображения успешного состояния
          setTimeout(() => {
            // Закрываем модальное окно
            if (onClose) {
              onClose();
            }

            // Сбрасываем форму
            resetForm();

            // Делаем навигацию на главную
            navigate("/", { replace: true });
          }, 1000); // 1 секунда задержки для отображения успеха
        } else {
          setFormError("Не удалось создать задачу");
          setIsSubmitting(false);
        }
      } catch (error) {
        setFormError(error.message || "Произошла ошибка при создании задачи");
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
      onClose,
      refetchTasks,
    ]
  );

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      if (onClose) {
        onClose();
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && !isSubmitting) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSubmitting]);

  if (!isOpen) return null;

  return (
    <SPopNewCard>
      <SPopNewCardContainer>
        <SPopNewCardBlock>
          <SPopNewCardContent>
            <SPopNewCardTtl>Создание задачи</SPopNewCardTtl>
            <SPopNewCardClose
              onClick={handleClose}
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.5 : 1 }}
            >
              &#10006;
            </SPopNewCardClose>

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

            {isSuccess && (
              <div
                style={{
                  background: "#E8F5E9",
                  color: "#2E7D32",
                  padding: "10px",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "18px" }}>✓</span>
                Задача успешно создана! Перенаправление...
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
                  onDateSelect={
                    isSubmitting || isSuccess ? undefined : handleDateSelect
                  }
                  isMobile={isMobile}
                  disabled={isSubmitting || isSuccess}
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
                    !isSubmitting &&
                    !isSuccess &&
                    setSelectedTopic("Web Design")
                  }
                  disabled={isSubmitting || isSuccess}
                  $active={selectedTopic === "Web Design"}
                >
                  <p className="_orange">Web Design</p>
                </SCategoriesTheme>
                <SCategoriesTheme
                  className={`_green ${
                    selectedTopic === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() =>
                    !isSubmitting && !isSuccess && setSelectedTopic("Research")
                  }
                  disabled={isSubmitting || isSuccess}
                  $active={selectedTopic === "Research"}
                >
                  <p className="_green">Research</p>
                </SCategoriesTheme>
                <SCategoriesTheme
                  className={`_purple ${
                    selectedTopic === "Copywriting" ? "_active-category" : ""
                  }`}
                  onClick={() =>
                    !isSubmitting &&
                    !isSuccess &&
                    setSelectedTopic("Copywriting")
                  }
                  disabled={isSubmitting || isSuccess}
                  $active={selectedTopic === "Copywriting"}
                >
                  <p className="_purple">Copywriting</p>
                </SCategoriesTheme>
              </SCategoriesThemes>
            </SCategories>

            {/* Кнопка создания */}
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
                disabled={isSubmitting || isSuccess}
                isMobile={isMobile}
                type="button"
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
                        verticalAlign: "middle",
                      }}
                    />
                    Создание...
                  </>
                ) : isSuccess ? (
                  <>
                    <span style={{ marginRight: "8px" }}>✓</span>
                    Успешно!
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
