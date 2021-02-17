var draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

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

// music player js

const previous = document.querySelector('#pre');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
var title = document.querySelector('#title');
var track_image = document.querySelector('#track_image');
var artist = document.querySelector('#artist');

var arrayIndex = 0;
var playingTrack = false;

var track = document.createElement('audio');

var allTracks = [{
    name: "Go Flex",
    trackPath: "mp3/postMalone.mp3",
    img: "img/post_malone.jpg",
    singer: "Post Malone"
  },
  {
    name: "Walk This Way",
    trackPath: "mp3/aerosmith.mp3",
    img: "img/aerosmith.jpg",
    singer: "Run-D.M.C., Aerosmith"
  },
  {
    name: "This Must Be the Place",
    trackPath: "mp3/talkingHeads.mp3",
    img: "img/talking_heads.jpg",
    singer: "Talking Heads"
  },
  {
    name: "Fresh",
    trackPath: "mp3/koolAndTheGang.mp3",
    img: "img/kool_and_the_gang.jpg",
    singer: "Kool & The Gang"
  },
  {
    name: "Frank Lampard",
    trackPath: "mp3/ares.mp3",
    img: "img/are.jpg",
    singer: "Ares"
  },
  {
    name: "Lady - Hear Me Tonight",
    trackPath: "mp3/modjo.mp3",
    img: "img/modjo.jpg",
    singer: "Modjo"
  },
  {
    name: "Music Sounds Better With You",
    trackPath: "mp3/stardust.mp3",
    img: "img/stardust.jpg",
    singer: "Stardust"
  },
  {
    name: "Make Luv",
    trackPath: "mp3/room5.mp3",
    img: "img/room5.jpg",
    singer: "Room 5, Oliver Cheatham"
  }
];

function load_track(arrayIndex) {
  track.src = allTracks[arrayIndex].trackPath;
  title.innerHTML = allTracks[arrayIndex].name;
  track_image.src = allTracks[arrayIndex].img;
  artist.innerHTML = allTracks[arrayIndex].singer;
  track.load(); // laad de nieuwe gegevens in de dom
}

load_track(arrayIndex);

function justplay() {
  if (playingTrack == false) {
    playsong();

  } else {
    pausesong();
  }
}

function playsong() {
  track.play();
  playingTrack = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  track_image.classList.add('rotate');
}

function pausesong() {
  track.pause();
  playingTrack = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  track_image.classList.remove('rotate');
}

function next_song() {
  if (arrayIndex < allTracks.length - 1) {
    arrayIndex += 1;
    load_track(arrayIndex);
    playsong();
  } else {
    arrayIndex = 0;
    load_track(arrayIndex);
    playsong();
  }
}

console.log(arrayIndex);

function previous_song() {
  if (arrayIndex > 0) {
    arrayIndex = arrayIndex - 1;
    load_track(arrayIndex);
    playsong();

  } else {
    arrayIndex = allTracks.length;
    load_track(arrayIndex);
    playsong();
  }
}

previous.addEventListener('click', previous_song);
play.addEventListener('click', justplay);
next.addEventListener('click', next_song);

var malonePlay = document.querySelector('#postMalone');

function loadPost() {
  track.src = allTracks[0].trackPath;
  title.innerHTML = allTracks[0].name;
  track_image.src = allTracks[0].img;
  artist.innerHTML = allTracks[0].singer;
  track.load(); // laad de nieuwe gegevens in de dom
}

function playPost() {
  loadPost();
  if (playingTrack == false) {
    malonePlay.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    playsong();
  } else {
    malonePlay.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
    pausesong();
  }
}

var aerosmithPlay = document.querySelector('#aerosmith');

function loadAero() {
  track.src = allTracks[1].trackPath;
  title.innerHTML = allTracks[1].name;
  track_image.src = allTracks[1].img;
  artist.innerHTML = allTracks[1].singer;
  track.load(); // laad de nieuwe gegevens in de dom
}

function playAero() {
  loadAero();
  if (playingTrack == false) {
    aerosmithPlay.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    playsong();
  } else {
    aerosmithPlay.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
    pausesong();
  }
}

var talkingHeadsPlay = document.querySelector('#talkingHeads');

function loadtalkingHeads() {
  track.src = allTracks[2].trackPath;
  title.innerHTML = allTracks[2].name;
  track_image.src = allTracks[2].img;
  artist.innerHTML = allTracks[2].singer;
  track.load(); // laad de nieuwe gegevens in de dom
}

function playtalkingHeads() {
  loadtalkingHeads();
  if (playingTrack == false) {
    talkingHeadsPlay.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    playsong();
  } else {
    talkingHeadsPlay.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
    pausesong();
  }
}

malonePlay.addEventListener('click', playPost);
aerosmithPlay.addEventListener('click', playAero);
talkingHeadsPlay.addEventListener('click', playtalkingHeads);

// niet echt belangrijk, probeerde hier wat uit maar is nog niet gelukt