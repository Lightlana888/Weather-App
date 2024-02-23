// fetchDataModule.js
import * as constants from "./constants.js";
import * as ErrorsModule from "./errorsModule.js";
import { getScreenSize } from "../clothes/swiper-control.js";

export async function fetchData(location) {
  //console.log('===  Size screen from FETCH MODULE ====');
  getScreenSize();
  try {
    let API_URL;

    if (location) {
      const { latitude, longitude } = location;
      API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=en&appid=${constants.apiKey}&units=metric`;
    } else {
      const city = constants.cityInput.value.trim();
      if (/^\d+$/.test(city)) {
        ErrorsModule.showError("Введите корректное название города");
        return;
      } else {
        API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${constants.apiKey}&units=metric`;
        constants.cityInput.value = "";
      }
    }
    ErrorsModule.hideError();

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Ошибка получения данных о погоде");
    }

    const data = await response.json();
    if (data.cod && data.cod !== 200) {
      ErrorsModule.showError(`Ошибка: ${data.message}`);
      return;
    }
    console.log(data);
    console.log("Получены данные о погоде:", data.main.temp);
    //localStorage.setItem('test-temp', data.main.temp);
    //localStorage.setItem('test', 1);

    return data;
  } catch (error) {
    console.error("Ошибка получения данных о погоде:", error.message);
    ErrorsModule.showError("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
  }
}
