async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featuredtracks(data.Tracks);
  featuredartists(data.Artists);
  featuredtrackbar();
  featuredartistbar();
}

function featuredtracks(data) {
  const featuredbar = document.getElementById("featured-tracks");
  featuredbar.innerHTML = "";

  const carousel = document.createElement("div");
  carousel.innerHTML = `
    <div class="slide">
      <div class="swiper tracks">
        <div class="swiper-wrapper" id="slider-tracks"></div>
      </div>
    </div>
  `;

  featuredbar.appendChild(carousel);

  const slidesWrapper = document.getElementById("slider-tracks");

  data.forEach(Track => {
    const slide = document.createElement("div");
    slide.className = "slide-item swiper-slide";
    slide.innerHTML = `
    <div class="art-wrapper featured">
      <img src="${Track.Artwork}" alt="${Track.Name}" class="artwork card-img">
    </div>
    `;
    slidesWrapper.appendChild(slide);
  });
}

function featuredartists(data) {
  const featuredbar = document.getElementById("featured-artists");
  featuredbar.innerHTML = "";

  const carousel = document.createElement("div");
  carousel.innerHTML = `
    <div class="slide">
      <div class="swiper artists">
        <div class="swiper-wrapper" id="slider-artists"></div>
      </div>
    </div>
  `;

  featuredbar.appendChild(carousel);

  const slidesWrapper = document.getElementById("slider-artists");

  data.forEach(Artist => {
    const slide = document.createElement("div");
    slide.className = "slide-item swiper-slide";
    slide.innerHTML = `
    <div class="art-wrapper featured">
      <img src="${Artist.Artwork}" alt="${Artist.Name}" class="artwork card-img">
    </div>
    `;
    slidesWrapper.appendChild(slide);
  });
}

fetchData();