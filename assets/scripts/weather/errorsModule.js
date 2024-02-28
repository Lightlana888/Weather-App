import * as constants from './constants.js';

// Функция для вывода сообщений об ошибках при введенных в инпут некорректных данных в контейнер
export function showError(message) {

    constants.errorContainer.textContent = message;
    constants.errorContainer.style.display = 'block';
    constants.mainContainerInfo.style.display = 'none';
    constants.addContainerInfo.style.display = 'none';
    constants.clothesContainer.style.display = 'none';
}

export function hideError() {

    constants.errorContainer.style.display = 'none';
}
