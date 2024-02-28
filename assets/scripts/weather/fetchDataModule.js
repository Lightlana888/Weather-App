// fetchDataModule.js
import * as constants from "./constants.js";
import * as ErrorsModule from "./errorsModule.js";
import { getScreenSize } from "../clothes/swiper-control.js";



export async function fetchData(location) {
  //console.log('===  Size screen from FETCH MODULE ====');
  getScreenSize();
  try {
    let API_URL, response;

    if (location) {
      const { latitude, longitude } = location;
      if (!latitude || !longitude) {
        throw new Error("Неверные координаты города");
      }
      API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=en&appid=${constants.apiKey}&units=metric`;
    } else {
      const city = constants.cityInput.value.trim();

      if (!isNaN(city) || /^\d+$/.test(city)) {
        throw new Error("Введите корректное название города");
      }
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${constants.apiKey}`);
      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error("Введите корректное название города");
      }


      API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${constants.apiKey}&units=metric`;
      constants.cityInput.value = "";

    }
    ErrorsModule.hideError();

    response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Ошибка получения данных о погоде");
    }

    const data = await response.json();
    if (data.cod && data.cod !== 200) {
      throw new Error(`Ошибка: ${data.message}`);
    }
    console.log(data);

    //localStorage.setItem('test-temp', data.main.temp);
    //localStorage.setItem('test', 1);

    return data;
  } catch (error) {
    console.error("Ошибка получения данных о погоде:", error.message);
    if (error.message === "Неверные координаты города") {
      ErrorsModule.showError("Введите корректное название города");
    } else {
      ErrorsModule.showError(error.message);
    }
  }
}
