function featuredtrackbar() {
    new Swiper('.tracks', {

        // Layout
        direction: 'horizontal',
        slidesPerView: 6,
        slidesPerGroup: 1,
        spaceBetween: 20,
        centeredSlides: false,
        centeredSlidesBounds: false,
        centerInsufficientSlides: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        autoHeight: false,

        // Loop
        loop: true,
        loopAdditionalSlides: 4,
        loopPreventsSliding: false,

        // Gedrag
        speed: 8000,
        init: true,
        initialSlide: 0,
        enabled: true,
        nested: false,
        oneWayMovement: false,
        cssMode: false,
        virtualTranslate: false,
        roundLengths: false,
        maxBackfaceHiddenSlides: 10,
        runCallbacksOnInit: true,
        uniqueNavElements: true,

        // Touch
        allowTouchMove: false,
        allowSlideNext: true,
        allowSlidePrev: true,
        grabCursor: false,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        longSwipes: true,
        longSwipesMs: 300,
        longSwipesRatio: 0.5,
        shortSwipes: true,
        followFinger: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        passiveListeners: true,

        // Weerstand
        resistance: true,
        resistanceRatio: 0.85,

        // Klikken
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,

        // Performance & observatie
        watchOverflow: true,
        watchSlidesProgress: false,
        resizeObserver: true,
        updateOnWindowResize: true,
        observer: false,
        observeParents: false,
        observeSlideChildren: false,

        // Free mode
        freeMode: {
            enabled: true,
            momentum: false,
            momentumBounce: false,
            momentumBounceRatio: 1,
            momentumRatio: 1,
            momentumVelocityRatio: 1,
            sticky: false,
            minimumVelocity: 0.02,
        },

        preventInteractionOnTransition: true,

        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            reverseDirection: false,
            stopOnLastSlide: false,
            waitForTransition: true,
        },
        // Breakpoints
        breakpoints: {
            375: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1280: { slidesPerView: 4, spaceBetween: 15 },
            1440: { slidesPerView: 6, spaceBetween: 20 },
        },

        // Events
        on: {
            resize(swiper) {
                swiper.autoplay.stop();
                swiper.autoplay.start();
            },
        },

    });
}

function featuredartistbar() {
    new Swiper('.artists', {

        // Layout
        direction: 'horizontal',
        slidesPerView: 6,
        slidesPerGroup: 1,
        spaceBetween: 20,
        centeredSlides: false,
        centeredSlidesBounds: false,
        centerInsufficientSlides: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        autoHeight: false,

        // Loop
        loop: true,
        loopAdditionalSlides: 4,
        loopPreventsSliding: false,

        // Gedrag
        speed: 8000,
        init: true,
        initialSlide: 0,
        enabled: true,
        nested: false,
        oneWayMovement: false,
        cssMode: false,
        virtualTranslate: false,
        roundLengths: false,
        maxBackfaceHiddenSlides: 10,
        runCallbacksOnInit: true,
        uniqueNavElements: true,

        // Touch
        allowTouchMove: false,
        allowSlideNext: true,
        allowSlidePrev: true,
        grabCursor: false,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        longSwipes: true,
        longSwipesMs: 300,
        longSwipesRatio: 0.5,
        shortSwipes: true,
        followFinger: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        passiveListeners: true,

        // Weerstand
        resistance: true,
        resistanceRatio: 0.85,

        // Klikken
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,

        // Performance & observatie
        watchOverflow: true,
        watchSlidesProgress: false,
        resizeObserver: true,
        updateOnWindowResize: true,
        observer: false,
        observeParents: false,
        observeSlideChildren: false,

        // Free mode
        freeMode: {
            enabled: true,
            momentum: false,
            momentumBounce: false,
            momentumBounceRatio: 1,
            momentumRatio: 1,
            momentumVelocityRatio: 1,
            sticky: false,
            minimumVelocity: 0.02,
        },

        preventInteractionOnTransition: true,

        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            reverseDirection: true,
            stopOnLastSlide: false,
            waitForTransition: true,
        },
        // Breakpoints
        breakpoints: {
            375: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1280: { slidesPerView: 4, spaceBetween: 15 },
            1440: { slidesPerView: 6, spaceBetween: 20 },
        },

        // Events
        on: {
            resize(swiper) {
                swiper.autoplay.stop();
                swiper.autoplay.start();
            },
        },

    });
}