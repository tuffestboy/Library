async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featured_bar(data.Tracks, data.Artists);
  table(data.Tracks);
}

function featured_bar(tracks, artists) {
  const trackEls = document.querySelectorAll("#track-bar");
  const artistEls = document.querySelectorAll("#artist-bar");
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

function table(tracks) {
  const trackTable = document.getElementById("track-table");
  if (!trackTable) return;

  tracks.forEach(track => {
    const item = document.createElement("div");
    item.className = "item p-2 w-25";
    item.innerHTML = `<img src="${track.Artwork}" alt="${track.Name}" class="rounded-5 img-fluid">`;
    trackTable.appendChild(item);
  });
}

fetchData();