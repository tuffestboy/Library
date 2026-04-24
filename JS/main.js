async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featured_bar(data.Tracks, data.Artists);
  tracks_table(data.Tracks);
  artists_table(data.Artists);
  search_page(data.Tracks);
  console.log("Data is geladen!");
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
    col.className = "col m-0 p-3";
    col.innerHTML = `
      <div class="card">
        <img class="card-img-top track-artwork" alt="${track.Name}" src="${track.Artwork}">
        <div class="card-body h-50 px-1">
          <h6 class="card-title m-0 pb-1 text-center text-white">${track.Name}</h6>
          <p class="card-text m-0 pb-1 small text-center text-muted">${track.Artist}</p>
          <p class="card-text m-0 pb-1 small text-center text-muted">${track.Genre}</p>
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
      <div class="card">
        <img class="artist-artwork card-img-top" alt="${artist.Name}" src="${artist.Artwork}">
        <div class="card-body h-50 px-1">
          <h6 class="card-title m-0 pb-1 text text-center text-white">${artist.Name}</h6>
        </div>
      </div>`;
    el.appendChild(col);
  });
}

function search_page(tracks) {
  const resultsEl = document.getElementById("search-results");
  if (!resultsEl) return;

  // --- Genre dropdown vullen ---
  const genreMenu = document.getElementById("genre-menu");
  const genres = [...new Set(tracks.map(t => t.Genre))].sort();

  genreMenu.innerHTML =
    `<li><a class="dropdown-item" href="#" data-genre="all">Alle genres</a></li>
     <li><hr class="dropdown-divider"></li>` +
    genres.map(g => `<li><a class="dropdown-item" href="#" data-genre="${g}">${g}</a></li>`).join("");

  // --- State ---
  let currentGenre = "all";
  let currentSort = "default";
  let currentSearch = "";

  // --- Render functie ---
  function render() {
    let filtered = [...tracks];

    // Zoeken op naam of artiest
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(t =>
        t.Name.toLowerCase().includes(q) ||
        t.Artist.toLowerCase().includes(q)
      );
    }

    // Filter op genre
    if (currentGenre !== "all") {
      filtered = filtered.filter(t => t.Genre === currentGenre);
    }

    // Sorteren
    if (currentSort === "popularity-desc") {
      filtered.sort((a, b) => (b.Playcount ?? 0) - (a.Playcount ?? 0));
    } else if (currentSort === "popularity-asc") {
      filtered.sort((a, b) => (a.Playcount ?? 0) - (b.Playcount ?? 0));
    } else if (currentSort === "name-asc") {
      filtered.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (currentSort === "name-desc") {
      filtered.sort((a, b) => b.Name.localeCompare(a.Name));
    }

    // Resultaat teller
    const countEl = document.getElementById("result-count");
    if (countEl) countEl.textContent = `${filtered.length} resultaten`;

    // Cards tekenen
    resultsEl.innerHTML = "";
    if (filtered.length === 0) {
      resultsEl.innerHTML = `<p class="text-center text-muted w-100 py-5">Geen resultaten gevonden.</p>`;
      return;
    }

    filtered.forEach(track => {
      const col = document.createElement("div");
      col.className = "col m-0 p-3";
      col.innerHTML = `
        <div class="card">
          <img class="card-img-top track-artwork" alt="${track.Name}" src="${track.Artwork}">
          <div class="card-body h-50 px-1">
            <h6 class="card-title m-0 pb-1 text-center text-white">${track.Name}</h6>
            <p class="card-text m-0 pb-1 small text-center text-muted">${track.Artist}</p>
            <p class="card-text m-0 pb-1 small text-center text-muted">${track.Genre}</p>
            <p class="card-text m-0 pb-1 small text-center text-muted">${track.Playcount}</p>
          </div>
        </div>`;
      resultsEl.appendChild(col);
    });
  }

  // --- Event listeners ---

  // Zoekbalk (live zoeken)
  document.getElementById("searchbalk").addEventListener("input", e => {
    currentSearch = e.target.value;
    render();
  });

  // Genre filter
  genreMenu.addEventListener("click", e => {
    const item = e.target.closest("[data-genre]");
    if (!item) return;
    e.preventDefault();
    currentGenre = item.dataset.genre;
    document.getElementById("genre-btn").textContent =
      currentGenre === "all" ? "Genre" : currentGenre;
    render();
  });

  // Sorteren
  document.querySelectorAll("[data-sort]").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      currentSort = e.target.dataset.sort;
      document.getElementById("sort-btn").textContent = e.target.textContent;
      render();
    });
  });

  // Eerste render
  render();
}

fetchData();