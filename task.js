
//http://api.weatherapi.com/v1/current.json?key=16541044fefe4032af1200453240612&q=Mumbai&aqi=no


const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location .location");
const dayField = document.querySelector(".time_location .day");
const dateField = document.querySelector(".time_location .date");
const timeField = document.querySelector(".time_location .time");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector(".form");

let target = 'Palghar';

form.addEventListener('submit', searchForLocation);

const fetchResults = async (targetLocation) => {
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=16541044fefe4032af1200453240612&q=${targetLocation}&aqi=no`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await res.json();
        console.log(data); 

        const locationName = data.location.name;
        const time = data.location.localtime;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;

        const dayOfWeek = getDayOfWeek(time);

        updateDetails(temp, locationName, time, condition, dayOfWeek);
    } catch (error) {
        console.error(error);
        alert("Could not retrieve weather data. Please try again.");
    }
}

function getDayOfWeek(time) {
    const date = new Date(time);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
}

function updateDetails(temp, locationName, time, condition, dayOfWeek) {
    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dayField.innerText = dayOfWeek;
    dateField.innerText = time.slice(0, 10);
    timeField.innerText = time.slice(11, 16);
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();
    if (target) {
        fetchResults(target);
    } else {
        alert('Please enter a location');
    }
}

fetchResults(target);
