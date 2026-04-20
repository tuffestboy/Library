async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featured_tracks(data.Tracks);
  featured_artists(data.Artists);
  tracks_table(data)
}

function featured_tracks(data) {
  const featured = document.querySelectorAll("#featured-tracks-id");

  const duration = data.length * 7;

  featured.forEach(el => {
    el.style.animationDuration = `${duration}s`;

    data.forEach(Track => {
      const slideritem = document.createElement("div");
      slideritem.className = "slider-item p-2 p-md-3";
      slideritem.innerHTML = `<img src="${Track.Artwork}" alt="${Track.Name}">`;
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
      slideritem.innerHTML = `<img src="${Artist.Artwork}" alt="${Artist.Name}">`;
      el.appendChild(slideritem);
    });
  });
}

function tracks_table(data) {
  const table = document.getElementById("tracks-table");

  data.Tracks.forEach(Track => {
    const col = document.createElement("div");
    col.className = "col pb-3";
    col.dataset.name = Track.Name;
    col.dataset.artist = Track.Artist;

    col.innerHTML = `
      <div class="card rounded-4 overflow-hidden border-white">
        <img src="${Track.Artwork}" alt="${Track.Name}" class="card-img">
        <div class="card-body text-center">
          <div class="card-title text-white border-bottom border-white pb-1 mb-1">${Track.Name}</div>
          <div class="card-text text-body small">${Track.Artist}</div>
        </div>
      </div>
    `;

    table.appendChild(col);
  });
}

function search_thingy() {
  document.getElementById("search-tab").addEventListener("input", function () {
    const thing = this.value.toLowerCase();
    const cols = document.querySelectorAll(".col");
    const table = document.getElementById("tracks-table");

    let visible = 0;

    cols.forEach(col => {
      const name = col.dataset.name.toLowerCase();
      const artist = col.dataset.artist.toLowerCase();

      if (name.includes(thing) || artist.includes(thing)) {
        col.style.display = "";
        visible++;
      } else {
        col.style.display = "none";
      }
    });

    if (visible === 0) {
      table.classList.remove("bg-light-subtle", "border", "shadow-lg");
    } else {
      table.classList.add("bg-light-subtle", "border", "shadow-lg");
    }
  });
}

fetchData();
search_thingy();