$(window).ready(function(){
    
    var aboutSwiper = new Swiper(".about-swiper", {
        spaceBetween: 20,
        slidesPerView: 2.5,
        centeredSlides: true,
        navigation: {
            nextEl: ".aboutSwiper-button-next",
            prevEl: ".aboutSwiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
    });

})