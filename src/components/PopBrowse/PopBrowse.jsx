import React from "react";
import Calendar from "../Calendar/Calendar";

const PopBrowse = ({ card, onClose }) => {
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="pop-browse"
      id="popBrowse"
      style={{ display: "block" }}
      onClick={handleOverlayClick}
    >
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">
                {card?.title || "Название задачи"}
              </h3>
              <div
                className={`categories__theme theme-top _${getTopicClass(
                  card?.topic
                )} _active-category`}
              >
                <p className={`_${getTopicClass(card?.topic)}`}>
                  {card?.topic || "Web Design"}
                </p>
              </div>
            </div>

            <StatusSection status={card?.status} />

            <div className="pop-browse__wrap">
              <DescriptionForm description={card?.description} />
              <Calendar
                mode="browse"
                selectedDate={card?.date || "09.09.2023"}
              />
            </div>

            <CategorySection topic={card?.topic} />

            <BrowseButtons onClose={handleClose} />
            <EditButtons onClose={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для определения класса темы
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

const StatusSection = ({ status }) => (
  <div className="pop-browse__status status">
    <p className="status__p subttl">Статус</p>
    <div className="status__themes">
      <div
        className={`status__theme ${
          status === "Без статуса" ? "_gray" : "_hide"
        }`}
      >
        <p className={status === "Без статуса" ? "_gray" : ""}>Без статуса</p>
      </div>
      <div
        className={`status__theme ${
          status === "Нужно сделать" ? "_gray" : "_hide"
        }`}
      >
        <p className={status === "Нужно сделать" ? "_gray" : ""}>
          Нужно сделать
        </p>
      </div>
      <div
        className={`status__theme ${status === "В работе" ? "_gray" : "_hide"}`}
      >
        <p className={status === "В работе" ? "_gray" : ""}>В работе</p>
      </div>
      <div
        className={`status__theme ${
          status === "Тестирование" ? "_gray" : "_hide"
        }`}
      >
        <p className={status === "Тестирование" ? "_gray" : ""}>Тестирование</p>
      </div>
      <div
        className={`status__theme ${status === "Готово" ? "_gray" : "_hide"}`}
      >
        <p className={status === "Готово" ? "_gray" : ""}>Готово</p>
      </div>
    </div>
  </div>
);

const DescriptionForm = ({ description }) => (
  <form className="pop-browse__form form-browse" id="formBrowseCard" action="#">
    <div className="form-browse__block">
      <label htmlFor="textArea01" className="subttl">
        Описание задачи
      </label>
      <textarea
        className="form-browse__area"
        name="text"
        id="textArea01"
        readOnly
        placeholder="Введите описание задачи..."
      ></textarea>
    </div>
  </form>
);

const CategorySection = ({ topic }) => (
  <div className="theme-down__categories theme-down">
    <p className="categories__p subttl">Категория</p>
    <div
      className={`categories__theme _${getTopicClass(topic)} _active-category`}
    >
      <p className={`_${getTopicClass(topic)}`}>{topic || "Web Design"}</p>
    </div>
  </div>
);

const BrowseButtons = ({ onClose }) => (
  <div className="pop-browse__btn-browse">
    <div className="btn-group">
      <button className="btn-browse__edit _btn-bor _hover03">
        <a href="#">Редактировать задачу</a>
      </button>
      <button className="btn-browse__delete _btn-bor _hover03">
        <a href="#">Удалить задачу</a>
      </button>
    </div>
    <button className="btn-browse__close _btn-bg _hover01" onClick={onClose}>
      Закрыть
    </button>
  </div>
);

const EditButtons = ({ onClose }) => (
  <div className="pop-browse__btn-edit _hide">
    <div className="btn-group">
      <button className="btn-edit__edit _btn-bg _hover01">
        <a href="#">Сохранить</a>
      </button>
      <button className="btn-edit__edit _btn-bor _hover03">
        <a href="#">Отменить</a>
      </button>
      <button className="btn-edit__delete _btn-bor _hover03" id="btnDelete">
        <a href="#">Удалить задачу</a>
      </button>
    </div>
    <button className="btn-edit__close _btn-bg _hover01" onClick={onClose}>
      Закрыть
    </button>
  </div>
);

export default PopBrowse;
