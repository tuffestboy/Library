async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featured_bar(data.Tracks, data.Artists);
  tracks_table(data.Tracks);
  artists_table(data.Artists);
  console.log("Data is geladen!")
}

function featured_bar(tracks, artists) {
  const trackEls = document.querySelectorAll(".track-bar");
  const artistEls = document.querySelectorAll(".artist-bar");
  const track = tracks.length * 7;
  const artist = artists.length * 7;

  trackEls.forEach(el => {
    el.style.animationDuration = `${track}s`;
    tracks.forEach(track => {
      const item = document.createElement("div");
      item.className = "slider-item my-3 mx-3 p-2";
      item.innerHTML = `<img alt="${track.Name}" draggable="false" src="${track.Artwork}">`;
      el.appendChild(item);
    });
  });

  artistEls.forEach(el => {
    el.style.animationDuration = `${artist}s`;
    artists.forEach(artist => {
      const item = document.createElement("div");
      item.className = "slider-item my-3 mx-3 p-2";
      item.innerHTML = `<img alt="${artist.Name}" draggable="false" src="${artist.Artwork}">`;
      el.appendChild(item);
    });
  });
}

function tracks_table(tracks) {
  const el = document.getElementById("tracks-table");
  if (!el) return;
  tracks.forEach(track => {
    const col = document.createElement("div");
    col.className = "col m-3 py-3";
    col.innerHTML = `
          <div class="card">
              <img class="card-img-top track-artwork" alt="${track.Name}" src="${track.Artwork}">
              <div class="card-body h-50 px-1">
                  <h6 class="card-title m-0 pb-1 text-center text-white">${track.Name}</h6>
                  <p class="card-text m-0 pb-1 small text-center text-muted">${track.Artist}</p>
              </div>
          </div>`;
    el.appendChild(col);
  });
}

function artists_table(artists) {
  const el = document.getElementById("artists-table");
  if (!el) return;
  artists.forEach(artist => {
    const col = document.createElement("div");
    col.className = "col m-0 p-3";
    col.innerHTML = `
          <div class="card pb-4">
              <img class="artist-artwork card-img-top" alt="${artist.Name}" src="${artist.Artwork}">
              <div class="card-body h-50 px-1">
                  <h6 class="card-title m-0 pb-1 text text-center text-white">${artist.Name}</h6>
              </div>
          </div>`;
    el.appendChild(col);
  });
}

fetchData();