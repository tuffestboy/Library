async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featured_bar(data.Tracks, data.Artists);
  tracks_table(data.Tracks);
  artists_table(data.Artists);
}

function featured_bar(tracks, artists) {
  const trackEls = document.querySelectorAll(".track-bar");
  const artistEls = document.querySelectorAll(".artist-bar");
  const duration = tracks.length * 7;

  trackEls.forEach(el => {
    el.style.animationDuration = `${duration}s`;
    tracks.forEach(track => {
      const item = document.createElement("div");
      item.className = "slider-item p-2 p-md-3";
      item.innerHTML = `<img src="${track.Artwork}" alt="${track.Name}" draggable="false">`;
      el.appendChild(item);
    });
  });

  artistEls.forEach(el => {
    el.style.animationDuration = `${duration}s`;
    artists.forEach(artist => {
      const item = document.createElement("div");
      item.className = "slider-item p-2 p-md-3";
      item.innerHTML = `<img src="${artist.Artwork}" alt="${artist.Name}" draggable="false">`;
      el.appendChild(item);
    });
  });
}

function tracks_table(tracks) {
  const el = document.getElementById("tracks-table");
  if (!el) return;
  tracks.forEach(track => {
    const col = document.createElement("div");
    col.className = "col m-0 p-2";
    col.innerHTML = `
          <div class="card">
              <img src="${track.Artwork}" alt="${track.Name}" class="track-artwork card-img-top">
              <div class="card-body h-50 px-1">
                  <h6 class="card-title pb-1 m-0 text-center text-white">${track.Name}</h6>
                  <p class="card-text pb-1 m-0 text-center text-muted small">${track.Artist}</p>
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
    col.className = "col m-0 p-2";
    col.innerHTML = `
          <div class="card pb-4">
              <img src="${artist.Artwork}" alt="${artist.Name}" class="artist-artwork card-img-top">
              <div class="card-body h-50 px-1">
                  <h6 class="card-title pb-1 m-0 text-center text-white text">${artist.Name}</h6>
              </div>
          </div>`;
    el.appendChild(col);
  });
}

fetchData();