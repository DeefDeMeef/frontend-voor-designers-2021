# Frontend voor Designers - opdracht 1: Een Micro-interactie uitwerken en testen

# Muziekspeler drag & drop
Ik heb voor de drag & drop case gekozen.
Het interface is een afspeellijst van een muziekspeler zoals bijvoorbeeld Spotify. Je kan de nummers drag en droppen naar een andere plaats in de afspeellijst en als extra heb ik gemaakt dat je de muziek ook kan afspelen.

## Versie V1
Toen ik de opdracht kreeg ben ik misschien iets te enthousiast begonnen waardoor ik problemen nog niet kon voorspellen. Ik heb namelijk de eerste versie op mobiel gemaakt maar blijkaar werkt drag en drop hiervoor niet omdat het touch is. Ik had dus al een best ver uitgewerkte interface maar kon hem gaan omvormen naar desktop om drag en drop toe te kunnen passen. 

Link naar versie 1: https://deefdemeef.github.io/frontend-voor-designers-2021/opdracht1/muziekspelerV1/

## Versie V2
Na de fout van versie 1 ben ik de interface gaan uitwerken naar desktop. Dit ging eigenlijk erg makkelijk omdat ik de oude elementen alleen een beetje hoefde aan te passen met css. 
Vervolgens kon ik nu echt gaan beginnen met drag en drop.
Ik kwam er al heel snel achter dat dit echt heel lastig was. Na veel documentatie te lezen op MDN snapte ik enigzins hoe het werkte maar nog niet hoe ik het kon toepassen in de opdracht. Ik zocht dus een manier om dit wel te kunnen doen en ben op YouTube gaan zoeken naar drag en drop tutorials. Ik had er 1 gevonden die met vanilla JavaScript een drag en drop had gemaakt met vrij weinig regels code, deze code is nogsteeds best lastig te begrijpen omdat hij aparte parameters gebruikt en functions aanroept die pas later gemaakt worden. Maar ik heb een beetje code van hem geleend en deze toegepast op de opdracht. Bij de les kwam Koop toen een leuk idee: de muziekspeler werkend maken. Dit leek me wel wat dus daar ben ik voor versie 3 volledig ingedoken.

Link naar versie 2: https://deefdemeef.github.io/frontend-voor-designers-2021/opdracht1/muziekspelerV2/

## Versie V3
In versie 3 heb ik een werkende muziekspeler ervan gemaakt en de interface verbeterd op gebruiksvriendelijkheid. Het werkend maken was echt veel makkelijker dan ik dacht. Het aparte bij deze opdracht was dat drag & drop makkelijk klonk en een werkende speler maken lastig klonk maar het is dus omgedraaid. Hoe ik het werkend heb gemaakt vertel ik onder het kopje "code".

Link naar versie 3: https://deefdemeef.github.io/frontend-voor-designers-2021/opdracht1/muziekspelerV3/

## Code
Om elementen te kunnen draggen maak ik gebruik van de javascript drag events, dit zijn events die standaard in javascript zitten.
Een simpel stukje om dit toe te lichten is de volgende code:
```JavaScript
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})
```
Hier zie je dat ik voor de variable draggables een loop gebruik om ze allemaal dezelfde functie mee te geven. Vervolgens wanneer de gebruiker een blok gaat draggen luistert de event: dragstart. Dit gebeurt niet voor elk blokje tegelijk maar alleen voor degene die wordt gedragged. Wanneer het blokje losgelaten wordt gebruik ik het event: dragend. Dit stukje code zorgt ervoor dat er een class op en af gaat wanneer er gedragged wordt. In de class wordt de opacity lager gezet en een border word toegevoegd om de gebruiker een indicatie te geven waar het blokje neergezet wordt.
\
Het volgende stukje code is lastig om in woorden uit te leggen zonder inline te vertellen wat er gebeurd dus ik doe het inline:
```JavaScript
containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault() // standaard gedrag van dit element pas je aan.
    const afterElement = getDragAfterElement(container, e.clientY) // bepaal boven welk element de gebruiker een element sleept
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) { // wanneer de gebruiker undefinied krijgt en dus onderaan de drag container is append child onder aan de array.
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement) // als de gebruiker het element tussen 2 elementen heeft parse de nieuwe child: draggable en insert hem voor het getal wat afterelement geeft.
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')] // maak een array van de drag containers zodat we kunnen inserten en appenden

  // deze return functie rekent uit waar de cursor van de gebruiker aan het draggen is. Vervolgens retruned hij het element waar hij boven zit.
  // Je hover bijvoorbeeld met je container boven het 3e element (tussen 2 en 3 in dus) dan returned deze functie element 3 terug.
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect() // get rectangle info zoals top, height, width etc.
    const offset = y - box.top - box.height / 2 // y = gebruikers cursor - box top - box hoogte gedeeld door 2 (het midden van de box dus)
    if (offset < 0 && offset > closest.offset) { // offset moet een negatief getal zijn omdat we anders onder een element hoveren met de drag container
      return {
        offset: offset,
        element: child
      } // offset: en child: word terug gegeven aan afterElement
    } else {
      return closest
    }
  }, {
    offset: Number.NEGATIVE_INFINITY // oneindig negatief getal, hierdoor zal de originele offset altijd groter zijn dan deze offset
  }).element // zorgt ervoor dat je alleen het element krijgt wat gereduced is.
}
```
Dit is alle code die ik gebruik om de gebruiker te laten drag en droppen.
Voor nu heb ik niet veel tijd gehad om de muziek speel code hier toe te lichten maar als dat nodig is kan ik het zo doen of in een gesprekje uitleggen.
