import React, { useState, useContext, useEffect, useCallback } from "react";
import Calendar from "../Calendar/Calendar";
import { TasksContext } from "../../context/TaskContext";
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
  SCategoryTheme,
  SPopBrowseTitleInput,
} from "./PopBrowse.styled";

// Вспомогательная функция для форматирования даты
const formatDisplayDate = (dateString) => {
  if (!dateString) return "не установлен";
  
  try {
    // Пробуем разные форматы даты
    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      // DD.MM.YYYY
      const [day, month, year] = dateString.split('.');
      const shortYear = year.slice(-2);
      return `${day}.${month}.${shortYear}`;
    }
    
    if (dateString.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
      // YYYY-MM-DD
      const [year, month, day] = dateString.split('-');
      const shortYear = year.slice(-2);
      return `${day}.${month}.${shortYear}`;
    }

    // Пробуем распарсить как ISO строку
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      return `${day}.${month}.${year}`;
    }
    
    return dateString;
  } catch (error) {
    console.error("Ошибка форматирования даты:", error);
    return dateString;
  }
};

// Функция для получения даты в формате для календаря
const getDateForCalendar = (dateString) => {
  if (!dateString) return "";
  
  try {
    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      return dateString; // Уже в правильном формате
    }
    
    if (dateString.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
      const [year, month, day] = dateString.split('-');
      return `${day}.${month}.${year}`;
    }

    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    
    return "";
  } catch (error) {
    console.error("Ошибка преобразования даты:", error);
    return "";
  }
};

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

const PopBrowse = ({ card, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateTask, removeTask } = useContext(TasksContext);

  
  useEffect(() => {
    if (card) {
      setTitle(card.title || "");
      setDescription(card.description || "");
      setSelectedStatus(card.status || "Без статуса");
      setSelectedDate(card.date || "");
      setSelectedTopic(card.topic || "Web Design");
    }
  }, [card]);

  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
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
        setSelectedDate(card.date || "");
        setSelectedTopic(card.topic || "Web Design");
      }
    },
    [card]
  );

  // Функция для форматирования даты в формат API
  const formatDateForAPI = useCallback((dateString) => {
    if (!dateString) return new Date().toISOString();
    
    try {
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
      
       return dateString;
    } catch (error) {
      console.error("Ошибка форматирования даты:", error);
      return new Date().toISOString();
    }
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
          date: formatDateForAPI(selectedDate),
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
      selectedDate,
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
      <SPopBrowseStatus>
        <SStatusTitle>Статус</SStatusTitle>
        <SStatusThemes>
          {statuses.map((statusItem) =>
            editMode ? (
              <SStatusTheme
                key={statusItem}
                $active={status === statusItem}
                onClick={() =>
                  !isSubmitting && onStatusChange && onStatusChange(statusItem)
                }
                style={{
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                <SStatusThemeText>{statusItem}</SStatusThemeText>
              </SStatusTheme>
            ) : (
              <SStatusTheme key={statusItem} $active={status === statusItem}>
                <SStatusThemeText>{statusItem}</SStatusThemeText>
              </SStatusTheme>
            )
          )}
        </SStatusThemes>
      </SPopBrowseStatus>
    );
  };

  
  const DescriptionForm = ({ description, onChange, isEditing: editMode }) => (
    <SPopBrowseForm>
      <SFormBrowseBlock>
        <label htmlFor="textArea01" className="subttl">
          Описание задачи
        </label>
        <SFormBrowseArea
          name="text"
          id="textArea01"
          readOnly={!editMode}
          value={description}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder="Описание задачи отсутствует..."
          disabled={isSubmitting || !editMode}
        ></SFormBrowseArea>
      </SFormBrowseBlock>
    </SPopBrowseForm>
  );

  
  {/* const CategorySection = ({ topic, onTopicChange, isEditing: editMode }) => {
    const topicClass = getTopicClass(topic);
    const topics = ["Web Design", "Research", "Copywriting"];

    return (
      <div className="theme-down__categories theme-down">
        <p className="categories__p subttl">Категория</p>
        {editMode ? (
          <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
            {topics.map((topicItem) => (
              <SCategoryTheme
                key={topicItem}
                className={`_${getTopicClass(topicItem)} ${
                  topic === topicItem ? "_active-category" : ""
                }`}
                onClick={() =>
                  !isSubmitting && onTopicChange && onTopicChange(topicItem)
                }
                style={{
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                <p className={`_${getTopicClass(topicItem)}`}>{topicItem}</p>
              </SCategoryTheme>
            ))}
          </div>
        ) : (
          <div className={`categories__theme _${topicClass} _active-category`}>
            <p className={`_${topicClass}`}>{topic || "Web Design"}</p>
          </div>
        )}
      </div>
    );
  }; */}

  
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
        />
      );
    }

    return <SPopBrowseTtl>{title || "Название задачи"}</SPopBrowseTtl>;
  };

  
  const BrowseButtons = ({ onClose, onEdit, onDelete }) => (
    <SPopBrowseBtnBrowse>
      <SBtnGroup>
        <SBtnEdit
          className="btn-bor"
          onClick={onEdit}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          Редактировать задачу
        </SBtnEdit>
        <SBtnEdit
          className="btn-delete"
          onClick={onDelete}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          Удалить задачу
        </SBtnEdit>
      </SBtnGroup>
      <SBtnClose
        onClick={onClose}
        disabled={isSubmitting}
        style={{ opacity: isSubmitting ? 0.7 : 1 }}
      >
        Закрыть
      </SBtnClose>
    </SPopBrowseBtnBrowse>
  );
  
  const EditButtons = ({ onClose, onSave, onCancel, onDelete }) => (
    <SPopBrowseBtnEdit>
      <SBtnGroup>
        <SBtnEdit
          className="btn-bg"
          onClick={onSave}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </SBtnEdit>
        <SBtnEdit
          className="btn-bor"
          onClick={onCancel}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          Отменить
        </SBtnEdit>
        <SBtnEdit
          className="btn-delete"
          onClick={onDelete}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          Удалить задачу
        </SBtnEdit>
      </SBtnGroup>
      <SBtnClose
        onClick={onClose}
        disabled={isSubmitting}
        style={{ opacity: isSubmitting ? 0.7 : 1 }}
      >
        Закрыть
      </SBtnClose>
    </SPopBrowseBtnEdit>
  );

  const handleDateSelect = useCallback(
    (date) => {
      if (!isSubmitting && isEditing) {
        setSelectedDate(date);
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

            <SPopBrowseTopBlock>
              <TitleField
                title={title}
                onChange={setTitle}
                isEditing={isEditing}
                isSubmitting={isSubmitting}
              />
              {/* КАТЕГОРИЯ В ПРАВОМ ВЕРХНЕМ УГЛУ - ОТОБРАЖАЕТСЯ И В РЕЖИМЕ ПРОСМОТРА, И В РЕЖИМЕ РЕДАКТИРОВАНИЯ */}
              {selectedTopic && (
                <div
                  className={`categories__theme theme-top _${getTopicClass(
                    selectedTopic
                  )} _active-category`}
                  style={{
                    opacity: isEditing ? 1 : 1, // Всегда видна
                    pointerEvents: isEditing ? "none" : "auto", // В режиме редактирования не кликабельна
                  }}
                >
                  <p className={`_${getTopicClass(selectedTopic)}`}>
                    {selectedTopic}
                  </p>
                </div>
              )}
            </SPopBrowseTopBlock>

            <StatusSection
              status={selectedStatus}
              onStatusChange={isEditing ? setSelectedStatus : undefined}
              isEditing={isEditing}
            />

            <SPopBrowseWrap>
              <DescriptionForm
                description={description}
                onChange={isEditing ? setDescription : undefined}
                isEditing={isEditing}
              />
              <Calendar
                mode={isEditing ? "new" : "browse"}
                selectedDate={isEditing ? selectedDate : displayDate}
                onDateSelect={isEditing ? handleDateSelect : undefined}
              />
            </SPopBrowseWrap>

            {/* <CategorySection
              topic={selectedTopic}
              onTopicChange={isEditing ? setSelectedTopic : undefined}
              isEditing={isEditing} 
            /> */}

            {isEditing ? (
              <EditButtons
                onClose={handleClose}
                onSave={handleSave}
                onCancel={handleCancelEdit}
                onDelete={handleDelete}
              />
            ) : (
              <BrowseButtons
                onClose={handleClose}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            )}
          </SPopBrowseContent>
        </SPopBrowseBlock>
      </SPopBrowseContainer>
    </SPopBrowse>
  );
};

export default PopBrowse;
