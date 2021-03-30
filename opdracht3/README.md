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
    if (navigator.geolocation) { // wanneer gebruiker toegang geeft tot locatie beginnen met het script
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude // pak latitude
            long = position.coords.longitude // pak longitude

            console.log(lat, long)
            const api = `http://api.weatherapi.com/v1/forecast.json?key=apikey&q=${lat},${long}&days=7&aqi=no&alerts=no` 
            // plak de lat en long in de url om hiermee een request te kunnen maken

            fetch(api) // fetch oftewel een javascript interface maken om toegang te krijgen tot de http data van de api
                .then(async response => {
                    return response.json();
                })
                .then(async data => { // async function, wilde ik gebruiker voor await maar de api was snel genoeg en heb hier niet zoveel meegedaan eigenlijk
                  console.log(data) // console log de verkregen data
                }
```

# Breakdown Schetsen
Dit zijn de breakdown schetsen die ik heb gemaakt voordat ik begon met programmeren. Ik heb me eigenlijk helemaal gehouden aan deze schetsen en dat was best nieuw voor mij omdat ik het liefst meteen lekker ga coderen. Toch heb ik gemerkt dat deze schetsen erg fijn zijn om op terug te blikken tijdens het coderen. Ik heb deze onderaan gedaan omdat je anders lang moet scrollen voor de rest van deze readme.

![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/breakdown1.jpg)
![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/breakdown2.jpg)
![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/breakdown3.jpg)
