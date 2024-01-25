import { fetchData } from "./../weather/fetchDataModule.js";
import { getCurrentLocation } from "./../weather/locationModule.js";
import * as constants from "../weather/constants.js";
import {temperatureElement} from "../weather/constants.js";



const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const coldGifs = ['cold','cup','mittens','skates','skates_2','snow-winter']
const hotGifs = ['sunglasses','sunglasses_2','spf', 'hot']
const rainGifs = ['umbrella', 'umbrella_1', 'rubber_boots'] //TODO: пока непонятно


async function getGifName(){
    try{
        const location = await getCurrentLocation()
        const city = constants.cityInput.value.trim();
        const data = await fetchData(city || location)
        // console.log('gifs', data)
        let temperature = parseInt(data.main.temp)
        let nextTemp = parseInt(temperatureElement.textContent);
        const currentTemp = nextTemp || temperature;
        // console.log('gifs',currentTemp)
        // console.log('temp', currentTemp >= -20)
        if(currentTemp <= 0){
            const random = getRandomNumber(0,coldGifs.length)
            return coldGifs[random]
        } else if(currentTemp > 0){
            const random = getRandomNumber(0,hotGifs.length)
            return hotGifs[random]
        }
    } catch (err){
        return undefined
    }

}
async function getGif() {
    try {
        const name = await getGifName();
        // console.log(name)
        if(name === undefined){
            return
        }
        const response = await fetch(`http://localhost:3000/gifs/get_by_name?name=${name}`)
        const blob = await response.blob()
        const obj = URL.createObjectURL(blob)
        const img = document.createElement('img')
        img.src = obj
        img.classList.add('container_block-3__gif')
        return img;
    } catch (err) {
        console.log('Ошибка получения gif:', err);
    }
}

function setGif(element) {
    const div = document.querySelector('#gif');
    div.innerHTML = ''
    div.appendChild(element)

}


export async function loadGif(){
    const gif = await getGif()
    if (gif !== undefined) {
        setGif(gif)
    }
}

document.addEventListener("DOMContentLoaded", async function () {
     loadGif()
})