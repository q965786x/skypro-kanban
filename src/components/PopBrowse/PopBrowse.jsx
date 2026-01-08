import React, { useState, useContext, useEffect, useCallback } from "react";
import Calendar from "../Calendar/Calendar";
import { TasksContext } from "../../context/TaskContext";
import { useModal } from "../../context/Modal";
import {
  SPopBrowse,
  SPopBrowseContainer,
  SPopBrowseBlock,
  SPopBrowseContent,
  SPopBrowseTopBlock,
  SPopBrowseTtl,
  SPopBrowseWrap,
  SPopBrowseStatus,
  SStatusTitle,
  SStatusThemes,
  SStatusTheme,
  SStatusThemeText,
  SPopBrowseForm,
  SFormBrowseBlock,
  SFormBrowseArea,
  SPopBrowseBtnBrowse,
  SPopBrowseBtnEdit,
  SBtnGroup,
  SBtnEdit,
  SBtnClose,
  SPopBrowseTitleInput,
} from "./PopBrowse.styled";

const PopBrowse = ({ card, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { openModal, closeModal } = useModal();

  const { updateTask, removeTask } = useContext(TasksContext);

  useEffect(() => {
    if (card) {
      setTitle(card.title || "");
      setDescription(card.description || "");
      setSelectedStatus(card.status || "Без статуса");

      // Нормализуем дату при загрузке
      const normalizedDate = normalizeDate(card.date || "");

      // Устанавливаем оба состояния
      setSelectedDate(normalizedDate);
      setFormattedDate(normalizedDate);

      setSelectedTopic(card.topic || "Web Design");
    }
  }, [card]);

  useEffect(() => {
    // Проверка на мобильное устройство
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 495);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    openModal();

    return () => {
      closeModal();
    };
  }, [openModal, closeModal]);

  const getTopicClass = (topic) => {
    switch (topic) {
      case "Web Design":
        return "orange";
      case "Research":
        return "green";
      case "Copywriting":
        return "purple";
      default:
        return "orange";
    }
  };

  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      closeModal();
      onClose();
    },
    [closeModal, onClose]
  );

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleEditClick = useCallback((e) => {
    e.preventDefault();
    setIsEditing(true);
    setError("");
  }, []);

  const handleCancelEdit = useCallback(
    (e) => {
      e.preventDefault();
      setIsEditing(false);
      setError("");

      if (card) {
        setTitle(card.title || "");
        setDescription(card.description || "");
        setSelectedStatus(card.status || "Без статуса");

        // Восстанавливаем исходную дату
        const normalizedDate = normalizeDate(card.date || "");
        setSelectedDate(normalizedDate);
        setFormattedDate(normalizedDate);

        setSelectedTopic(card.topic || "Web Design");
      }
    },
    [card]
  );

  // Функция для нормализации даты
  const normalizeDate = (dateString) => {
    if (!dateString) return "";

    // 1. ISO формат (2026-01-17T00:00:00.000Z)
    if (dateString.includes("T") && dateString.endsWith("Z")) {
      try {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();
          return `${day}.${month}.${year}`;
        }
      } catch (error) {}
    }

    // 2. Формат DD.MM.YYYY - возвращаем как есть
    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      return dateString;
    }

    // 3. Формат YYYY-MM-DD
    if (dateString.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
      const [year, month, day] = dateString.split("-");
      return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
    }

    return dateString;
  };

  // Функция для форматирования даты для отображения
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "не установлен";

    // Если дата уже в формате DD.MM.YYYY
    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      return dateString;
    }

    // Если пришла "не установлен"
    if (dateString === "не установлен") {
      return dateString;
    }

    // Пробуем нормализовать
    const normalized = normalizeDate(dateString);
    return normalized || "не установлен";
  };

  // Функция для форматирования даты в формат API
  const formatDateForAPI = useCallback((dateString) => {
    if (!dateString || dateString === "не установлен") {
      return new Date().toISOString();
    }

    // Если дата уже в формате DD.MM.YYYY
    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      const [day, month, year] = dateString.split(".");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      return new Date(formattedDate).toISOString();
    }

    // Если дата уже в ISO формате
    if (dateString.includes("T") && dateString.endsWith("Z")) {
      return dateString;
    }

    return new Date().toISOString(); // Возвращаем текущую дату как запасной вариант
  }, []);

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();

      if (isSubmitting || !card) return;

      if (!title.trim()) {
        setError("Название задачи не может быть пустым");
        return;
      }

      if (!description.trim()) {
        setError("Описание задачи не может быть пустым");
        return;
      }

      setIsSubmitting(true);
      setError("");

      try {
        const updatedTask = {
          title: title.trim(),
          description: description.trim(),
          topic: selectedTopic,
          status: selectedStatus,
          date: formatDateForAPI(formattedDate),
        };

        const success = await updateTask(card._id || card.id, updatedTask);

        if (success) {
          setIsEditing(false);
        } else {
          setError("Не удалось сохранить изменения");
        }
      } catch (err) {
        setError(err.message || "Произошла ошибка при сохранении");
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      card,
      isSubmitting,
      title,
      description,
      selectedTopic,
      selectedStatus,
      formattedDate,
      updateTask,
      formatDateForAPI,
    ]
  );

  const handleDelete = useCallback(
    async (e) => {
      e.preventDefault();

      if (isSubmitting || !card) return;

      if (!window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
        return;
      }

      setIsSubmitting(true);
      setError("");

      try {
        const success = await removeTask(card._id || card.id);

        if (success) {
          onClose();
        } else {
          setError("Не удалось удалить задачу");
        }
      } catch (err) {
        setError(err.message || "Произошла ошибка при удалении");
      } finally {
        setIsSubmitting(false);
      }
    },
    [card, isSubmitting, removeTask, onClose]
  );

  // Вспомогательный компонент для StatusSection
  const StatusSection = ({ status, onStatusChange, isEditing: editMode }) => {
    const statuses = [
      "Без статуса",
      "Нужно сделать",
      "В работе",
      "Тестирование",
      "Готово",
    ];

    return (
      <SPopBrowseStatus
        style={{
          display: "flex",
          //alignItems: "center",
          gap: "10px",
        }}
      >
        <SStatusTitle
          style={{
            marginBottom: "0",
            minWidth: "60px",
          }}
        >
          Статус
        </SStatusTitle>

        <div style={{ flex: 1 }}>
          {editMode ? (
            // В режиме редактирования показываем ВСЕ статусы
            <SStatusThemes>
              {statuses.map((statusItem) => (
                <SStatusTheme
                  key={statusItem}
                  $active={status === statusItem}
                  onClick={() =>
                    !isSubmitting &&
                    onStatusChange &&
                    onStatusChange(statusItem)
                  }
                  style={{
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  <SStatusThemeText>{statusItem}</SStatusThemeText>
                </SStatusTheme>
              ))}
            </SStatusThemes>
          ) : (
            // В режиме просмотра показываем ТОЛЬКО текущий статус
            <SStatusTheme $active={true} style={{ display: "inline-block" }}>
              <SStatusThemeText>{status}</SStatusThemeText>
            </SStatusTheme>
          )}
        </div>
      </SPopBrowseStatus>
    );
  };

  const TitleField = ({
    title,
    onChange,
    isEditing: editMode,
    isSubmitting: submitting,
  }) => {
    if (editMode) {
      return (
        <SPopBrowseTitleInput
          type="text"
          value={title}
          onChange={(e) => onChange && onChange(e.target.value)}
          disabled={submitting}
          placeholder="Введите название задачи"
          style={
            isMobile
              ? {
                  fontSize: "18px",
                  padding: "12px",
                  marginTop: "10px",
                }
              : {}
          }
        />
      );
    }

    return (
      <SPopBrowseTtl
        style={
          isMobile
            ? {
                fontSize: "20px",
                lineHeight: "1.3",
                textAlign: "left",
              }
            : {}
        }
      >
        {title || "Название задачи"}
      </SPopBrowseTtl>
    );
  };

  const handleDateSelect = useCallback(
    (date) => {
      if (!isSubmitting && isEditing) {
        // date приходит в формате DD.MM.YYYY из Calendar
        setSelectedDate(date);
        setFormattedDate(date);
      }
    },
    [isSubmitting, isEditing]
  );

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        if (isEditing) {
          handleCancelEdit(e);
        } else {
          handleClose(e);
        }
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isEditing, handleCancelEdit, handleClose]);

  // Форматируем дату для отображения
  const displayDate = formatDisplayDate(selectedDate || card?.date);

  // Функция для рендеринга категории
  const renderCategory = () => {
    const categoryElement = (
      <div
        className={`categories__theme _${getTopicClass(
          selectedTopic
        )} _active-category`}
        style={{
          display: "inline-block",
          width: "auto",
          height: "30px",
          padding: "8px 20px",
          borderRadius: "24px",
          opacity: "1",
          backgroundColor:
            getTopicClass(selectedTopic) === "orange"
              ? "#FFE4C2"
              : getTopicClass(selectedTopic) === "green"
              ? "#B4FDD1"
              : getTopicClass(selectedTopic) === "purple"
              ? "#E9D4FF"
              : "#FFE4C2",
        }}
      >
        <p
          style={{
            color:
              getTopicClass(selectedTopic) === "orange"
                ? "#FF6D00"
                : getTopicClass(selectedTopic) === "green"
                ? "#06B16E"
                : getTopicClass(selectedTopic) === "purple"
                ? "#9A48F1"
                : "#FF6D00",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "14px",
            whiteSpace: "nowrap",
            margin: "0",
          }}
        >
          {selectedTopic}
        </p>
      </div>
    );

    return categoryElement;
  };

  return (
    <SPopBrowse style={{ display: "block" }} onClick={handleOverlayClick}>
      <SPopBrowseContainer>
        <SPopBrowseBlock>
          <SPopBrowseContent>
            {/* Отображение ошибок */}
            {error && (
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
                {error}
              </div>
            )}

            {/* Для мобильной версии: название задачи сразу под Header */}
            {isMobile ? (
              <>
                {/* 1. Название задачи под Header */}
                <div style={{ marginBottom: "20px" }}>
                  <TitleField
                    title={title}
                    onChange={setTitle}
                    isEditing={isEditing}
                    isSubmitting={isSubmitting}
                  />
                </div>

                {/* 2. Статус */}
                <StatusSection
                  status={selectedStatus}
                  onStatusChange={isEditing ? setSelectedStatus : undefined}
                  isEditing={isEditing}
                />

                {/* 3. Описание задачи */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="textArea01"
                    className="subttl"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Описание задачи
                  </label>

                  <SFormBrowseArea
                    name="text"
                    id="textArea01"
                    readOnly={!isEditing}
                    value={description}
                    onChange={
                      isEditing
                        ? (e) => setDescription(e.target.value)
                        : undefined
                    }
                    placeholder="Описание задачи отсутствует..."
                    disabled={isSubmitting || !isEditing}
                  />
                </div>

                {/* 4. Календарь */}
                <div style={{ marginBottom: "20px" }}>
                  <Calendar
                    mode={isEditing ? "new" : "browse"}
                    selectedDate={isEditing ? formattedDate : displayDate}
                    onDateSelect={isEditing ? handleDateSelect : undefined}
                    isMobile={isMobile}
                  />
                </div>

                {/* 5. Категория (для мобильной версии - после календаря) */}
                {selectedTopic && (
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      className="subttl"
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        marginBottom: "14px",
                      }}
                    >
                      Категория
                    </div>
                    {renderCategory()}
                  </div>
                )}
              </>
            ) : (
              // Десктопная версия
              <>
                {/* 1. Название задачи и категория в правом верхнем углу */}
                <SPopBrowseTopBlock>
                  <TitleField
                    title={title}
                    onChange={setTitle}
                    isEditing={isEditing}
                    isSubmitting={isSubmitting}
                  />

                  {/* Категория в правом верхнем углу (только для десктопа) */}
                  {selectedTopic && (
                    <div style={{ alignSelf: "flex-start" }}>
                      {renderCategory()}
                    </div>
                  )}
                </SPopBrowseTopBlock>

                {/* 2. Статус */}
                <StatusSection
                  status={selectedStatus}
                  onStatusChange={isEditing ? setSelectedStatus : undefined}
                  isEditing={isEditing}
                />

                {/* 3. Описание задачи и календарь - горизонтально */}
                <SPopBrowseWrap>
                  <SPopBrowseForm>
                    <SFormBrowseBlock>
                      <label
                        htmlFor="textArea01"
                        className="subttl"
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "12px",
                          display: "block",
                        }}
                      >
                        Описание задачи
                      </label>

                      <SFormBrowseArea
                        name="text"
                        id="textArea01"
                        readOnly={!isEditing}
                        value={description}
                        onChange={
                          isEditing
                            ? (e) => setDescription(e.target.value)
                            : undefined
                        }
                        placeholder="Описание задачи отсутствует..."
                        disabled={isSubmitting || !isEditing}
                      />
                    </SFormBrowseBlock>
                  </SPopBrowseForm>

                  {/* Календарь справа */}
                  <Calendar
                    mode={isEditing ? "new" : "browse"}
                    selectedDate={isEditing ? formattedDate : displayDate}
                    onDateSelect={isEditing ? handleDateSelect : undefined}
                    isMobile={isMobile}
                  />
                </SPopBrowseWrap>
              </>
            )}

            {/* 6. Кнопки */}
            {isEditing ? (
              <SPopBrowseBtnEdit
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: isMobile ? "center" : "space-between",
                  alignItems: isMobile ? "center" : "flex-end",
                  marginTop: "30px",
                  gap: "10px",
                }}
              >
                <SBtnGroup
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: "8px",
                    order: 1,
                  }}
                >
                  <SBtnEdit
                    className="btn-bg"
                    onClick={handleSave}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? "Сохранение..." : "Сохранить"}
                  </SBtnEdit>
                  <SBtnEdit
                    className="btn-bor"
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    Отменить
                  </SBtnEdit>
                  <SBtnEdit
                    className="btn-delete"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    Удалить задачу
                  </SBtnEdit>
                </SBtnGroup>

                {/* Кнопка Закрыть - для мобилки внизу, для десктопа справа */}
                {!isMobile && (
                  <SBtnClose
                    onClick={handleClose}
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      order: 2, // Для десктопа - второй элемент
                    }}
                  >
                    Закрыть
                  </SBtnClose>
                )}

                {/* Для мобильной версии - кнопка Закрыть отдельно внизу */}
                {isMobile && (
                  <SBtnClose
                    onClick={handleClose}
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      width: "100%",
                      marginTop: "10px",
                      order: 2, // Для мобилки - второй элемент (после всех кнопок)
                    }}
                  >
                    Закрыть
                  </SBtnClose>
                )}
              </SPopBrowseBtnEdit>
            ) : (
              <SPopBrowseBtnBrowse
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: isMobile ? "center" : "space-between",
                  alignItems: isMobile ? "center" : "flex-end",
                  marginTop: "30px",
                  gap: "10px",
                }}
              >
                <SBtnGroup
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: "8px",
                    order: 1,
                  }}
                >
                  <SBtnEdit
                    className="btn-bor"
                    onClick={handleEditClick}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    Редактировать задачу
                  </SBtnEdit>
                  <SBtnEdit
                    className="btn-delete"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    Удалить задачу
                  </SBtnEdit>
                </SBtnGroup>

                {/* Кнопка Закрыть - для мобилки внизу, для десктопа справа */}
                {!isMobile && (
                  <SBtnClose
                    onClick={handleClose}
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      order: 2, // Для десктопа - второй элемент
                    }}
                  >
                    Закрыть
                  </SBtnClose>
                )}

                {/* Для мобильной версии - кнопка Закрыть отдельно внизу */}
                {isMobile && (
                  <SBtnClose
                    onClick={handleClose}
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      width: "100%",
                      marginTop: "10px",
                      order: 2, // Для мобилки - второй элемент (после всех кнопок)
                    }}
                  >
                    Закрыть
                  </SBtnClose>
                )}
              </SPopBrowseBtnBrowse>
            )}
          </SPopBrowseContent>
        </SPopBrowseBlock>
      </SPopBrowseContainer>
    </SPopBrowse>
  );
};

export default PopBrowse;
