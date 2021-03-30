const section = document.querySelector('section')
const div = document.querySelector('.container')
const forecastDiv = document.querySelector('.forecast')
const charts = document.querySelector('#charts')

let locationName = document.createElement('h2')
let date = document.createElement('h3')
let tempCelcius = document.createElement('h1')
let weatherIcon = document.createElement('img')
let condition = document.createElement('p')
let conditionText = document.createElement('p')

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

window.addEventListener("load", () => {
    let lat;
    let long;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude
            long = position.coords.longitude

            console.log(lat, long)
            const api = `http://api.weatherapi.com/v1/forecast.json?key=ac6835b1e1fe4dc19fb203430212403&q=${lat},${long}&days=7&aqi=no&alerts=no`

            fetch(api)
                .then(async response => {
                    return response.json();
                })
                .then(async data => {
                    console.log(data)
                    const weather = data
                    let today = new Date()

                    const namedDay = days[today.getDay()];
                    const namedMonth = months[today.getMonth()];

                    weatherIconJson = data.current.condition.icon
                    locationName.innerHTML = data.location.country + ', ' + data.location.name
                    date.innerHTML = namedDay + ', ' + namedMonth + ' ' + today.getDate() + ', ' + today.getFullYear()
                    tempCelcius.innerHTML = data.current.temp_c + '°c'
                    weatherIcon.src = data.current.condition.icon
                    condition.innerHTML = data.current.condition.text

                    div.appendChild(locationName)
                    div.appendChild(date)
                    div.appendChild(tempCelcius)
                    div.appendChild(condition)
                    div.appendChild(weatherIcon)

                    showForecast(weather);

                    function showForecast(obj) {
                        const data = obj.forecast.forecastday
                        for (let int = 0; int < data.length; int++) {
                            const container = document.createElement('div')
                            container.classList.add('click' + int)
                            container.classList.add('containerFore')
                            const date = document.createElement('p')
                            date.classList.add('forecastDate')
                            conditionText.classList.add('conditionText')
                            const temps = document.createElement('p')
                            temps.classList.add('tempsForecast')
                            const forecastIcon = document.createElement('img')
                            forecastIcon.classList.add('forecastIcon')
                            const modal = document.createElement('div')
                            modal.classList.add('modal' + int)

                            let getDayName = new Date(data[int].date)
                            const namedDay = days[getDayName.getDay()];

                            forecastIcon.src = data[int].day.condition.icon
                            date.textContent = namedDay

                            conditionText.textContent = data[int].day.condition.text

                            temps.textContent = Math.floor(data[int].day.avgtemp_c) + '°c' + '/' + Math.floor(data[int].day.maxtemp_c) + '°c'

                            container.appendChild(forecastIcon)
                            container.appendChild(date)
                            container.appendChild(conditionText)
                            container.appendChild(temps)
                            forecastDiv.appendChild(container)
                            forecastDiv.appendChild(modal)
                            }
                        let array = []
                        for (let int = 0; int < data.length; int++) {
                            console.log(data[int].hour.length, int)
                            let test = data[int].hour
                            let subArray = []
                            console.log(test.length)
                            
                            for(getal = 0; getal < test.length; getal++) {
                                subArray.push(test[getal].chance_of_rain)
                                if (subArray.length == 24) {
                                    array.push(subArray.slice(0))
                                }
                            }

                            let dataArray = array[int].toString()
                            const chart = document.createElement('canvas');
                            let myChart = new Chart(chart, {
                                type: 'line',
                                data: {
                                    labels: ['00', '02', '04','06', '08', '10', '12', '14','16', '18', '20', '22', '24'],
                                    datasets: [{
                                        label: 'Chance of rain in %',
                                        data: dataArray,
                                        backgroundColor: [
                                            'rgba(9, 132, 227, 0.6)',
                                        ],
                                        borderColor: [
                                            '#fff'
                                        ],
                                        borderWidth: 2,
                                        bezierCurve: true,
                                    }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }]
                                    }
                                }
                            });
                            charts.appendChild(chart)
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

    const api = `http://api.weatherapi.com/v1/forecast.json?key=ac6835b1e1fe4dc19fb203430212403&q=${search}&days=3&aqi=no&alerts=no`

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)

            const weather = data
            tempCelcius.textContent = data.current.temp_c + '°'
            locationName.textContent = data.location.country + ', ' + data.location.name
            weatherIcon.src = data.current.condition.icon
            inputText.value = ''

            let div = document.querySelectorAll('.containerFore')
            let charts = document.querySelectorAll('canvas')
            for (i = 0; i < div.length; i++) {
                div[i].style.display = "block"
            }
            for (i = 0; i < div.length; i++) {
                charts[i].style.display = "none"
            }

            showForecast(weather)

            function showForecast(obj) {
                const data = obj.forecast.forecastday
                for (let int = 0; int < data.length; int++) {
                    const date = document.querySelector('.forecastDate')
                    const conditionTextF = document.querySelector('.conditionText')
                    const temps = document.querySelector('.tempsForecast')
                    const forecastIcon = document.querySelector('.forecastIcon')
                    const container = document.querySelector('.containerFore')

                    let getDayName = new Date(data[int].date)
                    const namedDay = days[getDayName.getDay()];

                    forecastIcon.src = data[int].day.condition.icon
                    date.textContent = namedDay
                    conditionTextF.textContent = data[int].day.condition.text
                    temps.textContent = Math.floor(data[int].day.avgtemp_c) + '°c' + '/' + Math.floor(data[int].day.maxtemp_c) + '°c'
                }}
            
        })
        .catch(error => {
            console.log(error)
            console.log('verkeerde naam')
            locationName.innerHTML = 'No matching location found.'
            tempCelcius.textContent = ''
            weatherIcon.src = ''
            let div = document.querySelectorAll('.containerFore')
            let charts = document.querySelectorAll('canvas')
            for (i = 0; i < div.length; i++) {
                div[i].style.display = "none"
            }
            for (i = 0; i < div.length; i++) {
                charts[i].style.display = "none"
            }
        })

}

submitForm.addEventListener('click', zoeken)