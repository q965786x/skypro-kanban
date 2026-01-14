import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
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
  SPopBrowseTitleInput,
} from "./PopBrowse.styled";

const PopBrowse = ({ card: initialCard, onClose }) => {
  const tasksContext = useContext(TasksContext);
  const navigate = useNavigate();

  const { tasks, updateTask, removeTask } = tasksContext;

  const [currentCard, setCurrentCard] = useState(initialCard);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialCard?.title || "");
  const [description, setDescription] = useState(
    initialCard?.description || ""
  );
  const [selectedStatus, setSelectedStatus] = useState(
    initialCard?.status || "Без статуса"
  );
  const [selectedTopic, setSelectedTopic] = useState(
    initialCard?.topic || "Web Design"
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (initialCard?._id && tasks?.length > 0) {
      const updatedCard = tasks.find(
        (task) => task._id === initialCard._id || task.id === initialCard._id
      );
      if (updatedCard) {
        setCurrentCard(updatedCard);
      }
    }
  }, [tasks, initialCard]);

  useEffect(() => {
    if (currentCard) {
      setTitle(currentCard.title || "");
      setDescription(currentCard.description || "");
      setSelectedStatus(currentCard.status || "Без статуса");
      setSelectedTopic(currentCard.topic || "Web Design");

      if (currentCard.date) {
        const normalizedDate = normalizeDate(currentCard.date);
        setSelectedDate(normalizedDate);
      }
    }
  }, [currentCard]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 495);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Эффект для редиректа после успешного сохранения
  useEffect(() => {
    if (saveSuccess) {
      // Задержка для отображения сообщения об успехе
      const timer = setTimeout(() => {
        // Закрываем модальное окно и делаем редирект
        if (onClose) {
          onClose();
        }
        // Редирект на главную страницу
        navigate("/", { replace: true });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [saveSuccess, onClose, navigate]);

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

  const normalizeDate = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("T") && dateString.endsWith("Z")) {
      try {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      } catch (error) {
        return "";
      }
    }
    return dateString;
  };

  const formatDateForAPI = useCallback((dateString) => {
    if (!dateString) return new Date().toISOString();
    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      const [day, month, year] = dateString.split(".");
      return new Date(`${year}-${month}-${day}`).toISOString();
    }
    return dateString;
  }, []);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "не установлен";

    if (dateString.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      return dateString;
    }

    if (dateString === "не установлен") {
      return dateString;
    }

    const normalized = normalizeDate(dateString);
    return normalized || "не установлен";
  };

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();

      if (isSubmitting || saveSuccess) return;

      if (!currentCard) {
        setError("Карточка не найдена");
        return;
      }

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
      setSaveSuccess(false);

      try {
        const success = await updateTask(currentCard._id || currentCard.id, {
          title: title.trim(),
          description: description.trim(),
          topic: selectedTopic,
          status: selectedStatus,
          date: formatDateForAPI(selectedDate) || new Date().toISOString(),
        });

        if (success) {
          setSaveSuccess(true);
        } else {
          setError("Не удалось сохранить");
          setIsSubmitting(false);
        }
      } catch (err) {
        setError(err.message || "Произошла ошибка при сохранении");
        setIsSubmitting(false);
      }
    },
    [
      currentCard,
      isSubmitting,
      saveSuccess,
      title,
      description,
      selectedTopic,
      selectedStatus,
      selectedDate,
      formatDateForAPI,
      updateTask,
    ]
  );

  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      // Закрываем модальное окно и делаем редирект на главную
      if (onClose) {
        onClose();
      }
      navigate("/", { replace: true });
    },
    [onClose, navigate]
  );

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        if (onClose) {
          onClose();
        }
        navigate("/", { replace: true });
      }
    },
    [onClose, navigate]
  );

  const handleEditClick = useCallback((e) => {
    e.preventDefault();
    setIsEditing(true);
    setError("");
    setSaveSuccess(false);
  }, []);

  const handleCancelEdit = useCallback(
    (e) => {
      e.preventDefault();
      setIsEditing(false);
      setError("");
      setSaveSuccess(false);

      if (currentCard) {
        setTitle(currentCard.title || "");
        setDescription(currentCard.description || "");
        setSelectedStatus(currentCard.status || "Без статуса");
        setSelectedTopic(currentCard.topic || "Web Design");

        if (currentCard.date) {
          const normalizedDate = normalizeDate(currentCard.date);
          setSelectedDate(normalizedDate);
        }
      }
    },
    [currentCard]
  );

  const handleDelete = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isSubmitting) return;

      if (!currentCard) return;

      const isConfirmed = window.confirm(
        `Вы уверены, что хотите удалить задачу "${currentCard.title}"?`
      );

      if (!isConfirmed) return;

      setIsSubmitting(true);
      setError("");
      setIsDeleted(true);

      try {
        const success = await removeTask(currentCard._id || currentCard.id);

        if (success) {
          setTimeout(() => {
            if (onClose) {
              onClose();
            }
            navigate("/", { replace: true });
          }, 300);
        } else {
          setError("Не удалось удалить задачу");
          setIsDeleted(false);
        }
      } catch (err) {
        setError(err.message || "Произошла ошибка при удалении");
        setIsDeleted(false);
      } finally {
        setIsSubmitting(false);
      }
    },
    [currentCard, isSubmitting, removeTask, onClose]
  );

  const handleDateSelect = useCallback(
    (date) => {
      if (!isSubmitting && isEditing && !saveSuccess) {
        // date приходит в формате DD.MM.YYYY из Calendar
        setSelectedDate(date);
        setFormattedDate(date);
      }
    },
    [isSubmitting, isEditing, saveSuccess]
  );

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        if (isEditing && !saveSuccess) {
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
  }, [isEditing, saveSuccess, handleCancelEdit, handleClose]);

  // Получаем актуальную дату для отображения
  const displayDate = useMemo(() => {
    return formatDisplayDate(selectedDate || currentCard?.date);
  }, [selectedDate, currentCard]);

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
          {editMode && !saveSuccess ? (
            // В режиме редактирования показываем ВСЕ статусы
            <SStatusThemes>
              {statuses.map((statusItem) => (
                <SStatusTheme
                  key={statusItem}
                  $active={status === statusItem}
                  onClick={() =>
                    !isSubmitting &&
                    !saveSuccess &&
                    onStatusChange &&
                    onStatusChange(statusItem)
                  }
                  style={{
                    cursor:
                      isSubmitting || saveSuccess ? "not-allowed" : "pointer",
                    opacity: isSubmitting || saveSuccess ? 0.7 : 1,
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
    saveSuccess: success,
  }) => {
    if (editMode && !success) {
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

  if (isDeleted) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <div
            className="loading-spinner"
            style={{ margin: "0 auto 15px" }}
          ></div>
          <p style={{ color: "#565eef" }}>Задача удалена. Перенаправление...</p>
        </div>
      </div>
    );
  }

  return (
    <SPopBrowse style={{ display: "block" }} onClick={handleOverlayClick}>
      <SPopBrowseContainer>
        <SPopBrowseBlock>
          <SPopBrowseContent>
            {/* Отображение сообщения об успехе */}
            {saveSuccess && (
              <div
                style={{
                  background: "#E8F5E9",
                  color: "#565EEF",
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
                Задача успешно сохранена! Перенаправление...
              </div>
            )}

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
                    saveSuccess={saveSuccess}
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

                  {isEditing ? (
                    <SFormBrowseArea
                      name="text"
                      id="textArea01"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Описание задачи отсутствует..."
                      disabled={isSubmitting}
                    />
                  ) : (
                    <div
                      style={{
                        background: "#F5F5F5",
                        padding: "15px",
                        borderRadius: "8px",
                        minHeight: "100px",
                        marginTop: "10px",
                        color: "#000000",
                        fontSize: "14px",
                        lineHeight: "1.5",
                      }}
                    >
                      {description || "Описание задачи отсутствует..."}
                    </div>
                  )}
                </div>

                {/* 4. Календарь */}
                <div style={{ marginBottom: "20px" }}>
                  <Calendar
                    mode={isEditing && !saveSuccess ? "new" : "browse"}
                    selectedDate={
                      isEditing && !saveSuccess ? formattedDate : displayDate
                    }
                    onDateSelect={
                      isEditing && !saveSuccess ? handleDateSelect : undefined
                    }
                    isMobile={isMobile}
                    disabled={isSubmitting || saveSuccess}
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
                <SPopBrowseTopBlock>
                  <TitleField
                    title={title}
                    onChange={setTitle}
                    isEditing={isEditing}
                    isSubmitting={isSubmitting}
                    saveSuccess={saveSuccess}
                  />

                  {selectedTopic && (
                    <div style={{ alignSelf: "flex-start" }}>
                      {renderCategory()}
                    </div>
                  )}
                </SPopBrowseTopBlock>

                <StatusSection
                  status={selectedStatus}
                  onStatusChange={
                    isEditing && !saveSuccess ? setSelectedStatus : undefined
                  }
                  isEditing={isEditing}
                />

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

                      {isEditing ? (
                        <SFormBrowseArea
                          name="text"
                          id="textArea01"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Описание задачи отсутствует..."
                          disabled={isSubmitting}
                        />
                      ) : (
                        <div
                          style={{
                            background: "#F5F5F5",
                            padding: "15px",
                            borderRadius: "8px",
                            minHeight: "200px",
                            marginTop: "10px",
                            color: "#000000",
                            fontSize: "14px",
                            lineHeight: "1.5",
                          }}
                        >
                          {description || "Описание задачи отсутствует..."}
                        </div>
                      )}
                    </SFormBrowseBlock>
                  </SPopBrowseForm>

                  <Calendar
                    mode={isEditing && !saveSuccess ? "new" : "browse"}
                    selectedDate={
                      isEditing && !saveSuccess ? formattedDate : displayDate
                    }
                    onDateSelect={
                      isEditing && !saveSuccess ? handleDateSelect : undefined
                    }
                    isMobile={isMobile}
                    disabled={isSubmitting || saveSuccess}
                  />
                </SPopBrowseWrap>
              </>
            )}

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
                {!saveSuccess ? (
                  <>
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
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner"
                              style={{
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                borderTopColor: "#fff",
                                borderRadius: "50%",
                                animation: "spin 0.8s linear infinite",
                                marginRight: "8px",
                              }}
                            />
                            Сохранение...
                          </>
                        ) : (
                          "Сохранить"
                        )}
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

                    {!isMobile && (
                      <SBtnClose
                        onClick={handleClose}
                        disabled={isSubmitting}
                        style={{
                          opacity: isSubmitting ? 0.7 : 1,
                          order: 2,
                        }}
                      >
                        Закрыть
                      </SBtnClose>
                    )}

                    {isMobile && (
                      <SBtnClose
                        onClick={handleClose}
                        disabled={isSubmitting}
                        style={{
                          opacity: isSubmitting ? 0.7 : 1,
                          width: "100%",
                          marginTop: "10px",
                          order: 2,
                        }}
                      >
                        Закрыть
                      </SBtnClose>
                    )}
                  </>
                ) : (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <p style={{ color: "#565EEF", marginBottom: "15px" }}>
                      Задача успешно сохранена!
                    </p>
                    <SBtnClose
                      onClick={handleClose}
                      style={{
                        backgroundColor: "#565EEF",
                        borderColor: "#565EEF",
                      }}
                    >
                      Перейти к списку задач
                    </SBtnClose>
                  </div>
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

                {!isMobile && (
                  <SBtnClose
                    onClick={handleClose}
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      order: 2,
                    }}
                  >
                    Закрыть
                  </SBtnClose>
                )}

                {isMobile && (
                  <SBtnClose
                    onClick={handleClose}
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      width: "100%",
                      marginTop: "10px",
                      order: 2,
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
