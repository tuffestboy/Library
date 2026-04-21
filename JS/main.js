let allTracks = [];
let currentFilter = 'Track';
let currentSort = 'none';

async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  allTracks = data.Tracks;
  allArtists = data.Artists;
  featured_tracks(data.Tracks);
  featured_artists(data.Artists);
  renderTracks(allTracks);
  renderArtists(allArtists);
}

function featured_tracks(data) {
  const featured = document.querySelectorAll("#featured-tracks-id");
  const duration = data.length * 7;

  featured.forEach(el => {
    el.style.animationDuration = `${duration}s`;
    data.forEach(Track => {
      const slideritem = document.createElement("div");
      slideritem.className = "slider-item p-2 p-md-3";
      slideritem.innerHTML = `<img src="${Track.Artwork}" alt="${Track.Name}" draggable="false">`;
      el.appendChild(slideritem);
    });
  });
}

function featured_artists(data) {
  const featured = document.querySelectorAll("#featured-artists-id");
  const duration = data.length * 7;

  featured.forEach(el => {
    el.style.animationDuration = `${duration}s`;
    data.forEach(Artist => {
      const slideritem = document.createElement("div");
      slideritem.className = "slider-item p-2 p-md-3";
      slideritem.innerHTML = `<img src="${Artist.Artwork}" alt="${Artist.Name}" draggable="false">`;
      el.appendChild(slideritem);
    });
  });
}

function renderTracks(tracks) {
  const table = document.getElementById("tracks-table");
  if (!table) return;
  table.innerHTML = '';

  if (tracks.length === 0) {
    table.classList.remove("bg-light-subtle", "border", "shadow-lg");
    return;
  }
  table.classList.add("bg-light-subtle", "border", "shadow-lg");

  tracks.forEach(Track => {
    const col = document.createElement("div");
    col.className = "col";
    col.dataset.name = Track.Name;
    col.dataset.artist = Track.Artist;

    col.innerHTML = `
      <div class="card rounded-4 overflow-hidden border-white h-100">
        <img src="${Track.Artwork}" alt="${Track.Name}" class="card-img-top track-artwork">
        <div class="card-body text-center d-flex flex-column justify-content-center">
          <div class="card-title text-white border-bottom border-white pb-1 mb-1 fs-5">${Track.Name}</div>
          <div class="card-text text-body border-bottom border-white pb-1 mb-1 small fs-6">${Track.Artist}</div>
          <div class="card-text text-body border-bottom border-white fs-6">${Track.Genre ?? ''}</div>
          </div>
      </div>
    `;

    table.appendChild(col);
  });
}

function renderArtists(artists) {
  const table = document.getElementById("artists-table");
  if (!table) return;
  table.innerHTML = '';
  table.classList.add("bg-light-subtle", "border", "shadow-lg");

  artists.forEach(Artist => {
    const col = document.createElement("div");
    col.className = "col";
    col.dataset.name = Artist.Name;

    col.innerHTML = `
      <div class="card rounded-4 overflow-hidden border-white h-100">
        <img src="${Artist.Artwork}" alt="${Artist.Name}" class="card-img-top track-artwork">
        <div class="card-body text-center d-flex flex-column justify-content-center">
          <div class="card-title text-white border-bottom border-white pb-1 mb-1 fs-5">${Artist.Name}</div>
          </div>
      </div>
    `;

    table.appendChild(col);
  });
}

function applyFiltersAndSort() {
  const query = document.getElementById("search-tab")?.value.toLowerCase() ?? '';

  let filtered = allTracks.filter(track => {
    if (currentFilter === 'Artist') return track.Artist.toLowerCase().includes(query);
    if (currentFilter === 'Genre') return track.Genre?.toLowerCase().includes(query);
    return track.Name.toLowerCase().includes(query);
  });

  if (currentSort === 'az') filtered.sort((a, b) => a.Name.localeCompare(b.Name));
  if (currentSort === 'za') filtered.sort((a, b) => b.Name.localeCompare(a.Name));

  renderTracks(filtered);
}

function search_thingy() {
  document.getElementById("search-tab")?.addEventListener("input", applyFiltersAndSort);

  document.querySelectorAll("[data-filter]").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      currentFilter = e.target.dataset.filter;
      document.getElementById("filter-btn").textContent = `Filter: ${currentFilter}`;
      applyFiltersAndSort();
    });
  });

  document.querySelectorAll("[data-sort]").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      currentSort = e.target.dataset.sort;
      document.getElementById("sort-btn").textContent = currentSort === 'az' ? 'Sort: A → Z' : 'Sort: Z → A';
      applyFiltersAndSort();
    });
  });
}

fetchData();
search_thingy();