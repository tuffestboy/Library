async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featuredtracks(data.Tracks);
  featuredtrackbar();
  featuredartistbar(data.Artists);
  featuredartistbar();
}

function featuredtracks(data) {
  const featuredbar = document.getElementById("featured-tracks");
  featuredbar.innerHTML = "";

  const carousel = document.createElement("div");
  carousel.innerHTML = `
    <div class="c-carousel">
      <div class="c-carousel__wrapper swiper">
        <div class="c-carousel__inner-wrapper swiper-wrapper" id="swiper-slides"></div>
      </div>
    </div>
  `;

  featuredbar.appendChild(carousel);

  const slidesWrapper = document.getElementById("swiper-slides");

  data.forEach(Track => {
    const slide = document.createElement("div");
    slide.className = "c-carousel__item swiper-slide";
    slide.innerHTML = `
    <div class="art-wrapper featured">
      <img src="${Track.Artwork}" alt="${Track.Name} class="artwork"">
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
    <div class="c-carousel">
      <div class="c-carousel__wrapper swiper">
        <div class="c-carousel__inner-wrapper swiper-wrapper" id="swiper-slides"></div>
      </div>
    </div>
  `;

  featuredbar.appendChild(carousel);

  const slidesWrapper = document.getElementById("swiper-slides");

  data.forEach(Artist => {
    const slide = document.createElement("div");
    slide.className = "c-carousel__item swiper-slide";
    slide.innerHTML = `
    <div class="art-wrapper featured">
      <img src="${Artist.Artwork}" alt="${Artist.Name} class="artwork"">
    </div>
    `;
    slidesWrapper.appendChild(slide);
  });
}
fetchData();