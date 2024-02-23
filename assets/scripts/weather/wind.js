import * as constants from './constants.js';

// Функция получения направления ветра по градусам
export function getWindDirection(degrees) {
    const directions = ['север', 'северо-восток', 'восток', 'юго-восток', 'юг', 'юго-запад', 'запад', 'северо-запад'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

// Функция обновления визуализации направления ветра
export function updateWindDirection(degrees, speed) {
    const normalizedDegrees = (degrees + 360) % 360;
    const windDirection = getWindDirection(normalizedDegrees);

    constants.windSpeedElement.textContent = `${Math.round(speed)} km/h`;
    console.log(`Ветер идет с направления: ${windDirection}`);

    arrow.style.transform = `translate(-50%, -100%) rotate(${normalizedDegrees + 180}deg)`;
}
