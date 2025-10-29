export const cardsData = [
    // Без статуса (5 карточек)
    {
        id: 1,
        topic: 'Web Design',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'Без статуса',
    },
    {
        id: 2,
        topic: 'Research',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'Без статуса', 
    },
    {
        id: 3,
        topic: 'Web Design',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'Без статуса', 
    },
    {
        id: 4,
        topic: 'Copywriting',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'Без статуса', 
    },
    {
        id: 5,
        topic: 'Research',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'Без статуса',
    },

    // Нужно сделать (1 карточка)
    {
        id: 6,
        topic: 'Research',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'Нужно сделать',
    }, 
    
    // В работе (3 карточки)
    {
        id: 7,
        topic: 'Research',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'В работе',
    },
    {
        id: 8,
        topic: 'Copywriting',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'В работе',
    },
    {
        id: 9,
        topic: 'Web Design',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'В работе', 
    },

    // Тестирование (1 карточка)
    {
        id: 10,
        topic: 'Research',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'Тестирование',
    },

    // Готово (1 карточка)
    {
        id: 11,
        topic: 'Research',
        title: 'Название задачи',
        date: '30.10.23',
        status: 'Готово', 
    }
];

// Функция для получения карточек по статусу
export const getCardsByStatus = (status) => {
    return cardsData.filter(card => card.status === status);
};

// Все статусы
export const statuses = [
    'Без статуса',
    'Нужно сделать',
    'В работе',
    'Тестирование',
    'Готово',
];