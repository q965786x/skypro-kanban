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

  // Инициализация данных при монтировании
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

  // Вспомогательная функция для определения класса темы
  const getTopicClass = useCallback((topic) => {
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
  }, []);

  // Включение режима редактирования
  const handleEditClick = useCallback((e) => {
    e.preventDefault();
    setIsEditing(true);
    setError("");
  }, []);

  // Отмена редактирования
  const handleCancelEdit = useCallback(
    (e) => {
      e.preventDefault();
      setIsEditing(false);
      setError("");

      // Восстанавливаем исходные значения
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

  // Сохранение изменений
  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();

      if (isSubmitting || !card) return;

      // Валидация
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
          date: selectedDate || new Date().toISOString(),
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
    ]
  );

  // Удаление задачи
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

  // Вспомогательный компонент для DescriptionForm
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

  // Вспомогательный компонент для CategorySection
  const CategorySection = ({ topic, onTopicChange, isEditing: editMode }) => {
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
  };

  // Вспомогательный компонент для TitleField
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

  // Вспомогательный компонент для BrowseButtons
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

  // Вспомогательный компонент для EditButtons
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

  // Добавляем обработчик Escape
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
              />
              {!isEditing && (
                <div
                  className={`categories__theme theme-top _${getTopicClass(
                    selectedTopic
                  )} _active-category`}
                >
                  <p className={`_${getTopicClass(selectedTopic)}`}>
                    {selectedTopic || "Web Design"}
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
                selectedDate={selectedDate || card?.date || "09.09.2023"}
                onDateSelect={isEditing ? handleDateSelect : undefined}
              />
            </SPopBrowseWrap>

            <CategorySection
              topic={selectedTopic}
              onTopicChange={isEditing ? setSelectedTopic : undefined}
              isEditing={isEditing}
            />

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
