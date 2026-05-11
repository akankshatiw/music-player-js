const cardsContainer =
document.querySelector(".cards");

const searchInput =
document.getElementById("searchInput");

const homeBtn =
document.getElementById("homeBtn");

const favBtn =
document.getElementById("favBtn");

const playBtn =
document.getElementById("playBtn");

const pauseBtn =
document.getElementById("pauseBtn");

const audio = new Audio();

let favorites = [];

/* SEARCH SONGS */

async function searchSongs(songName){

  try{

    const response = await fetch(
      `https://itunes.apple.com/search?term=${songName}&entity=song`
    );

    const data = await response.json();

    displaySongs(data.results);

  }

  catch(error){

    console.log(error);

  }

}

/* DISPLAY SONGS */

function displaySongs(songs){

  cardsContainer.innerHTML = "";

  songs.forEach((song)=>{

    const card =
    document.createElement("div");

    card.classList.add("card","glass");

    card.innerHTML = `
      <img src="${song.artworkUrl100}">

      <h3>${song.trackName}</h3>

      <p>${song.artistName}</p>

      <button class="fav-btn">
        ❤️ Favorite
      </button>
    `;

    /* PLAY SONG */

    card.addEventListener("click",()=>{

      audio.src = song.previewUrl;

      audio.play();

      document.getElementById("player-img")
      .src = song.artworkUrl100;

      document.getElementById("player-title")
      .innerText = song.trackName;

      document.getElementById("player-artist")
      .innerText = song.artistName;

    });

    /* FAVORITES */

    const favButton =
    card.querySelector(".fav-btn");

    favButton.addEventListener("click",(e)=>{

      e.stopPropagation();

      favorites.push(song);

      //alert("Added To Favorites ");

      console.log(favorites);

    });

    cardsContainer.appendChild(card);

  });

}

/* SEARCH INPUT */

searchInput.addEventListener(
  "keypress",
  (e)=>{

    if(e.key === "Enter"){

      searchSongs(searchInput.value);

    }

  }
);

/* HOME BUTTON */

homeBtn.addEventListener("click",()=>{

  searchSongs("weeknd");

});

/* FAVORITES PAGE */

favBtn.addEventListener("click",()=>{

  displaySongs(favorites);

});

/* PLAYER CONTROLS */

playBtn.addEventListener("click",()=>{

  audio.play();

});

pauseBtn.addEventListener("click",()=>{

  audio.pause();

});

/* DEFAULT SONGS */

searchSongs("weeknd");