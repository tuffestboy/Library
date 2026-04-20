async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featured_tracks(data.Tracks);
}

function featured_tracks(data) {
  const featured = document.querySelectorAll(".featured");

  const duration = data.length * 7;

  featured.forEach(el => {
    el.style.animationDuration = `${duration}s`;

    data.forEach(Track => {
      const slideritem = document.createElement("div");
      slideritem.className = "slider-item p-2 p-md-3 p-lg-5";
      slideritem.innerHTML = `
        <img src="${Track.Artwork}" alt="${Track.Name}">
      `;
      el.appendChild(slideritem);
    });
  });
}

fetchData();