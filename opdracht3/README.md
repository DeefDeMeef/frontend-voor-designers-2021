# Project: Weather App
Ik heb met een weather api een app gemaakt die jouw huidige locatie zoekt en vervolgens het huidige weer laat zien en de weersvoorspelling voor de komende dagen. Verder kan je nog een andere locatie opzoeken over de hele wereld en dan kan je het weer van die locatie bekijken. Ik wilde alle elementen en data aanmaken met JavaScript en in me HTML alleen de statische elementen zetten zoals de zoekbalk, eigenlijk alleen de zoekbalk en de sections om de data in te appenden.

[Link naar de app](https://deefdemeef.github.io/frontend-voor-designers-2021/opdracht3/weatherApp/)

# interface
De interface is niet heel bijzonder omdat het voor de gebruiker niet fijn is om 3 stappen te volgens voordat hij het weer een keer heeft gevonden terwijl dat vaak het enigste doel is om een weather app te gebruiken. Dus om toch een extraatje toe te voegen heb ik een zoekfunctie erin verwerkt om toch de app iets dynamischer en leuker te maken voor de gebruiker. Hoe ik de principes heb toegepast ga ik hieronder toelichten.

### 04: Keep users in control

### 08: Provide a natural next step

### 09: Appearance follows behavior

### 11: Strong visual hierarchies work best

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

## code
Leg de code uit.

# Breakdown Schetsen
Dit zijn de breakdown schetsen die ik heb gemaakt voordat ik begon met programmeren. Ik heb me eigenlijk helemaal gehouden aan deze schetsen en dat was best nieuw voor mij omdat ik het liefst meteen lekker ga coderen. Toch heb ik gemerkt dat deze schetsen erg fijn zijn om op terug te blikken tijdens het coderen. Ik heb deze onderaan gedaan omdat je anders lang moet scrollen voor de rest van deze readme.

![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/breakdown1.jpg)
![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/breakdown2.jpg)
![pages](https://github.com/DeefDeMeef/frontend-voor-designers-2021/blob/main/opdracht3/images/breakdown3.jpg)
