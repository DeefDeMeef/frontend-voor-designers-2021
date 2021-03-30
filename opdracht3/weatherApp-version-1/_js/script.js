const section = document.querySelector('section')
const div = document.querySelector('.container')
const forecastDiv = document.querySelector('.forecast')

let locationName = document.createElement('h2')
let tempCelcius = document.createElement('h1')
let weatherIcon = document.createElement('img')

window.addEventListener("load", () => {
    let lat;
    let long;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude
            long = position.coords.longitude

            console.log(lat, long)

            // const api = `http://api.weatherapi.com/v1/current.json?key=ac6835b1e1fe4dc19fb203430212403&q=${lat},${long}&aqi=no`
            const api = `http://api.weatherapi.com/v1/forecast.json?key=ac6835b1e1fe4dc19fb203430212403&q=${lat},${long}&days=7&aqi=no&alerts=no`

            fetch(api)
                .then(async response => {
                    return response.json();
                })
                .then(async data => {
                    console.log(data)
                    const weather = data

                    weatherIconJson = data.current.condition.icon
                    locationName.innerHTML = data.location.country + ', ' + data.location.name
                    tempCelcius.innerHTML = data.current.temp_c + '°'
                    weatherIcon.src =  data.current.condition.icon

                    div.appendChild(locationName)
                    div.appendChild(tempCelcius)
                    div.appendChild(weatherIcon)
                    console.log(data.forecast.forecastday.length)

                    showForecast(weather);

                    function showForecast(obj) {
                        const data = obj.forecast.forecastday
                        for( let int = 0; int < data.length; int++) {
                            const date = document.createElement('p')
                            const p = document.createElement('p')
                            const forecastIcon = document.createElement('img')

                            date.textContent = data[int].date
                            p.textContent = data[int].day.condition.text
                            forecastIcon.src = data[int].day.condition.icon

                            forecastDiv.appendChild(date)
                            forecastDiv.appendChild(p)
                            forecastDiv.appendChild(forecastIcon)
                        }
                    }
                })
                .catch(error => {
                    console.log('Oei, er is een error namelijk: ' + error)
              })
        });
    }
})

var form = document.querySelector('#searchForm')
var submitForm = document.querySelector('button')
var inputText = document.querySelector('#searchQuery')

function zoeken(event) {
	event.preventDefault();

	let search = inputText.value; 

    const api = `http://api.weatherapi.com/v1/forecast.json?key=ac6835b1e1fe4dc19fb203430212403&q=${search}&days=4&aqi=no&alerts=no`

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            
            tempCelcius.textContent = data.current.temp_c + '°'
            locationName.textContent = data.location.country + ', ' + data.location.name
            weatherIcon.src =  data.current.condition.icon
            inputText.value = ''
        })
        .catch(error => {
            console.log(error)
            console.log('verkeerde naam')
            locationName.innerHTML = 'No matching location found.'
        })

}

submitForm.addEventListener('click', zoeken)

const fbi = 'https://api.fbi.gov/wanted/v1/list'

fetch('https://api.fbi.gov/wanted/v1/list', { mode: 'cors', credentials: 'include'})
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
        })


