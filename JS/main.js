async function fetchData() {
  const response = await fetch("https://smegmastrijder.nl/api/shuffled");
  const data = await response.json();
  featuredtrack(data.Tracks);
}

function featuredtrack(data) {
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

  new Swiper('.swiper', {
    spaceBetween: 100,
    speed: 8000,
    direction: 'horizontal',
    autoplay: { delay: 0 },
    loop: true,
    slidesPerView: 1,
    freeMode: true,
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 6 },
    }
  });
}

fetchData();