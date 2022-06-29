var s2Swiper = new Swiper(".s2--Swiper", {
    spaceBetween: 30,
    effect: "fade",
    navigation: {
        nextEl: ".s2swiper-button-next",
        prevEl: ".s2swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
});
gsap.fromTo(".s4--wrap ul",
{x:"0%"},
{x:"-100%",duration:50,repeat:-1,ease:"none"}
)