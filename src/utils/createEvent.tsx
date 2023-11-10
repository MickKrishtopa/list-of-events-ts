const equipmentsArr: Array<string> = [
    'Вегас',
    'Коммутатор',
    'Люк',
    'ИБП',
    'ЛВС',
    'Трансформатор',
    'Генератор',
];

const workersArr: Array<string> = [
    'Иванов И.И.',
    'Петров П.П',
    'Сидоров С.С',
    'Федеров Ф.Ф',
];

const messagesArr: Array<string> = [
    'Сервер недоступен',
    'Потеряно соединение',
    'Низкий заряд батареи',
    'Что-то пошло не так',
];

const priorityArr: Array<string> = [
    'низкая',
    'средняя',
    'высокая',
    'критическая',
];

const getRandomItem = (arr: Array<string>): string => {
    const index = Math.floor(Math.random() * arr.length);

    return arr[index];
};

export const createEvent = () => ({
    id: new Date().toISOString(),
    new: true,
    date: new Date().toLocaleString(),
    priority: getRandomItem(priorityArr),
    equipment: getRandomItem(equipmentsArr),
    message: getRandomItem(messagesArr),
    responsible: getRandomItem(workersArr),
});
