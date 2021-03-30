# Project: Weather App
Ik heb met een weather api een app gemaakt die jouw huidige locatie zoekt en vervolgens het huidige weer laat zien en de weersvoorspelling voor de komende dagen. Verder kan je nog een andere locatie opzoeken over de hele wereld en dan kan je het weer van die locatie bekijken. Ik wilde alle elementen en data aanmaken met JavaScript en in me HTML alleen de statische elementen zetten zoals de zoekbalk, eigenlijk alleen de zoekbalk en de sections om de data in te appenden.

**Graag browser naar iPhone X zetten voor een mooi resultaat, desktop kan opzich ook maar is minder mooi**
[Link naar de app](https://deefdemeef.github.io/frontend-voor-designers-2021/opdracht3/weatherApp/)

# Interface
De interface is niet heel bijzonder omdat het voor de gebruiker niet fijn is om 3 stappen te volgens voordat hij het weer een keer heeft gevonden terwijl dat vaak het enigste doel is om een weather app te gebruiken. Dus om toch een extraatje toe te voegen heb ik een zoekfunctie erin verwerkt om toch de app iets dynamischer en leuker te maken voor de gebruiker. Hoe ik de principes heb toegepast ga ik hieronder toelichten.

### 04: Keep users in control
De gebruiker is in volledige controle, de browser vraagt aan de gebruiken of hij toegang mag krijgen tot zijn locatie. De gebruiker moet hier antwoord opgeven voordat de app wat gaat doen. Stel je declined dit dan krijg je een empty state (JavaScript kan niet zien wat de gebruiker indrukt dus ik kan geen state op de weigering maken helaas), maar wanneer je dit accept krijg je het weer te zien van je huidige locatie. Verder kan de gebruiker nog zoeken met eigen zoekquery's en dit gebeurd ook alleen wanneer de gebruiker op de zoek knop drukt.

### 08: Provide a natural next step
Dit is lastig te verwerken in een app waar de goal is om het weer te bekijken aangezien dit eigenlijk maar 1 handeling is. Dit principe zie je denk het meest terugkomen bij de zoekfunctie. De placeholder van die input is namelijk "search other location.." en vervolgens is het de bedoeling dat de gebruiken op het vergrootglas (zoeken) drukt.
Dit voelt denk als een natuurlijke stap aan om het doel; in dit geval het weer van een andere locatie bekijken te bereiken.

### 09: Appearance follows behavior
Ik denk dat ik dit er wel goed in heb verwerkt omdat het weer bekijken eigenlijk al een soort van eigen leeswijze heeft. Dus ik merkte tijdens het coderen heel erg dat ik graag zoveel mogelijk data uit de api wilde halen maar dat ik dan veel onnodige data krijg waar de gebruiker niet op zit te wachten en liever bijvoorbeeld buienradar opent.

### 11: Strong visual hierarchies work best
Ik heb rekening gehouden met grote van teksten, plaatsen en de positie van elementen. Zo heb ik het huidige weer in het midden gezet zodat daar de eerste focus ligt. Daarna kijk je verder naar beneden en zie je de voorspellingen van de komender dagen en de verwachte neerslag van deze dagen. 

![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/pages.png)

## UI Events
De main event die ik heb uitgewerkt is de zoekfunctie, de gebruiker kan een andere locatie zoeken en de api zoekt vervolgens de nieuwe data en zet deze in de HTML. Eigenlijk is dit gewoon een simpel click event maar den functie ervan was wel leuk om te maken omdat de oude data weg moest en de nieuwe erin maar met me fetch maak ik elementen (createElement) hierdoor kon ik dus niet hetzelfde gebruiken omdat je dan de app als het ware cloned onder elkaar. Daarom heb ik dit met classlists gedaan die worden toegevoegd aan de gemaakte elementen (deze worden gemaakt onload dus die zijn er altijd) daarna kon ik een functie schrijven die de innerHTML aanpast met de aangevraagde data van de gebruiker.

## States
In de app heb ik 3 states uitgewerkt namelijk: succes, empty en error state. Hoe dit werkt ga ik hieronder toelichten.
### Succes State
Wanneer de gebruiker toegang geeft tot zijn locatie kan de app data zoeken met behulp van de api, dit resulteerd in een succes state.
### Empty State
Wanneer de gebruiker geen toegang geeft tot de locatie of wanneer javascript niet aanwezig is kan de app niet runnen waardoor elementen niet gemaakt worden en dan is de app dus leeg.
### Error State
Wanneer de gebruiker een plaats opzoekt die de api niet kan vinden geeft de app een error, hier zegt hij dat de ingevulde plek niet gevonden kan worden.
![states](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/states.png)

## Code Uitleg
JavaScript is where the magic happens
```js
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

window.addEventListener("load", () => { // voer uit wanneer de window geladen is
    let lat;
    let long;

    if (navigator.geolocation) { // wanneer gebruiker toegang geeft tot locatie beginnen met het script
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude // pak latitude
            long = position.coords.longitude // pak longitude

            console.log(lat, long)
            // plak de lat en long in de url om hiermee een request te kunnen maken
            const api = `http://api.weatherapi.com/v1/forecast.json?key=ac6835b1e1fe4dc19fb203430212403&q=${lat},${long}&days=7&aqi=no&alerts=no`

            fetch(api) // fetch oftewel een javascript interface maken om toegang te krijgen tot de http data van de api
                .then(async response => {
                    return response.json();
                })
                .then(async data => {
                    console.log(data) // console log de verkregen data
                    const weather = data
                    let today = new Date()

                    const namedDay = days[today.getDay()];
                    const namedMonth = months[today.getMonth()];

                    // deze variables zijn al gedeclareerd zodat ze global scope en niet function scope zijn
                    // gebruik api en zet de gevraagde data in de variable neer
                    locationName.innerHTML = data.location.country + ', ' + data.location.name
                    date.innerHTML = namedDay + ', ' + namedMonth + ' ' + today.getDate() + ', ' + today.getFullYear() // komt niet uit api maar was leuk om toe te voegen
                    tempCelcius.innerHTML = data.current.temp_c + '°c'
                    weatherIcon.src = data.current.condition.icon
                    condition.innerHTML = data.current.condition.text

                    // append de variables naar HTML
                    div.appendChild(locationName)
                    div.appendChild(date)
                    div.appendChild(tempCelcius)
                    div.appendChild(condition)
                    div.appendChild(weatherIcon)

                    // voer functie showForecast uit met parameter weather
                    showForecast(weather);

                    // vang parameter op
                    function showForecast(obj) {
                        const data = obj.forecast.forecastday // shorthand zodat ik niet alles hoef uit te typen steeds
                        for (let int = 0; int < data.length; int++) { // simpele for loop om alle voorspellingen te krijgen
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

                            // hieronder gebeurd vrijwel hetzelfde als het eerste stukje code maar dit is dan in een loop
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
                            // ik wilde charts maken maar daarvoor had ik uit een array van 3 een aaraay van 24 nodig
                            // dus daarom een for loop in een for loop
                            console.log(data[int].hour.length, int)
                            let test = data[int].hour
                            let subArray = []
                            console.log(test.length)
                            
                            for(getal = 0; getal < test.length; getal++) {
                                subArray.push(test[getal].chance_of_rain)
                                if (subArray.length == 24) { // wanneer de length van subArray 24 is slices en pushen in array
                                    array.push(subArray.slice(0)) // de uitkomst is nu 3 array's met verschillende data erin
                                }
                            }

                            // nogsteeds in de for loop!
                            let dataArray = array[int].toString() // converteren naar string
                            const chart = document.createElement('canvas'); // create canvas
                            let myChart = new Chart(chart, { // chart.js, een library om charts te maken met eigen data
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
                .catch(error => { // catch error en console log deze
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

    let search = inputText.value; // krijg value de ingevulde query

    // zet query in api en voer fetch uit
    const api = `http://api.weatherapi.com/v1/forecast.json?key=ac6835b1e1fe4dc19fb203430212403&q=${search}&days=3&aqi=no&alerts=no`

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            // vanaf hier is het eigenlijk hetzelfde als de eerste fetch, alleen worden hier geen charts gemaakt (simpelweg niet aan toe gekomen)
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
            // vertel de gebruiker dat er niks gevonden is
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
```

# Versies
### Versie 1
Eerste versie was vooral kijken wat de api allemaal kon. Dit is dus alleen een simpele pagina die niet kan zoeken of states kan geven. Het is puur de huidige locatie krijgen en het huidige weer laten zien.
![versie1](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/screencapture-file-C-Users-davey-OneDrive-Documenten-GitHub-frontend-voor-designers-2021-opdracht3-weatherApp-version-1-index-html-2021-03-31-00_43_27.png)

# Breakdown Schetsen
Dit zijn de breakdown schetsen die ik heb gemaakt voordat ik begon met programmeren. Ik heb me eigenlijk helemaal gehouden aan deze schetsen en dat was best nieuw voor mij omdat ik het liefst meteen lekker ga coderen. Toch heb ik gemerkt dat deze schetsen erg fijn zijn om op terug te blikken tijdens het coderen. Ik heb deze onderaan gedaan omdat je anders lang moet scrollen voor de rest van deze readme.

![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/breakdown1.jpg)
![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/breakdown2.jpg)
![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/breakdown3.jpg)
