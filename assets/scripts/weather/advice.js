import * as constants from './constants.js';

// Функция для получения случайного совета

export async function fetchAdvice() {
    try {
        const apiUrl = 'https://api.adviceslip.com/advice';
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Ошибка получения совета');
        }

        const data = await response.json();

        // Проверяем, есть ли текст совета в данных
        if (data && data.slip && data.slip.advice) {
            // Вывод совета на страницу
            constants.adviceContainer.textContent = `"${data.slip.advice}"`;
        } else {
            throw new Error('Данные о совете отсутствуют или некорректны');
        }
    } catch (error) {
        console.error('Ошибка получения совета:', error.message);
        // Обработка ошибки
        constants.adviceContainer.textContent = 'Произошла ошибка. Попробуйте еще раз.';
    }
}