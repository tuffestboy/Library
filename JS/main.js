async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featured_tracks(data.Tracks);
}

function featured_tracks(data) {
  const bar = document.getElementById("featured-tracks");

  data.forEach(Track => {
    const slideritem = document.createElement("div");
    slideritem.className = "slider-item";
    slideritem.innerHTML = `
      <img src="${Track.Artwork}" alt="${Track.Name}" class="artwork">
    `;

    bar.appendChild(slideritem);
  });
}

fetchData();