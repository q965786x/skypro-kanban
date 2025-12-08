export const statuses = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

export let cardsData = [
  // Без статуса (5 карточек)
  {
    id: 1,
    topic: "Web Design",
    title: "Новая задача",
    date: "2023-12-01",
    status: "Без статуса",
    description: "Описание задачи",
  },
  {
    id: 2,
    topic: "Research",
    title: "Новая задача",
    date: "2023-12-01",
    status: "Без статуса",
    description: "Описание задачи",
  },
  {
    id: 3,
    topic: "Web Design",
    title: "Новая задача",
    date: "2023-12-01",
    status: "Без статуса",
    description: "Описание задачи",
  },
  {
    id: 4,
    topic: "Copywriting",
    title: "Новая задача",
    date: "2023-12-01",
    status: "Без статуса",
    description: "Описание задачи",
  },
  {
    id: 5,
    topic: "Research",
    title: "Новая задача",
    date: "2023-12-01",
    status: "Без статуса",
    description: "Описание задачи",
  },

  // Нужно сделать (1 карточка)
  {
    id: 6,
    topic: "Research",
    title: "Новая задача",
    date: "2023-12-01",
    status: "Нужно сделать",
    description: "Описание задачи",
  },

  // В работе (3 карточки)
  {
    id: 7,
    topic: "Research",
    title: "Новая задача",
    date: "2023-12-01",
    status: "В работе",
    description: "Описание задачи",
  },
  {
    id: 8,
    topic: "Copywriting",
    title: "Новая задача",
    date: "2023-12-01",
    status: "В работе",
    description: "Описание задачи",
  },
  {
    id: 9,
    topic: "Web Design",
    title: "Новая задача",
    date: "2023-12-01",
    status: "В работе",
    description: "Описание задачи",
  },

  // Тестирование (1 карточка)
  {
    id: 10,
    topic: "Research",
    title: "Новая задача",
    date: "2023-12-01",
    status: "Тестирование",
    description: "Описание задачи",
  },

  // Готово (1 карточка)
  {
    id: 11,
    topic: "Research",
    title: "Новая задача",
    date: "2023-12-01",
    status: "Готово",
    description: "Описание задачи",
  },
];

// Функция для обновления cardsData
export const updateCardsData = (newCards) => {
  cardsData = newCards;
};

export const getCardsByStatus = (status) => {
  return cardsData.filter((card) => card.status === status);
};
