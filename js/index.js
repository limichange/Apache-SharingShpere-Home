//
// First Section
//
let animation = lottie.loadAnimation({
  container: document.getElementById('lottie'),
  path: './lottiefiles/lf20_lrx1ahrj.json',
  renderer: 'canvas',
  loop: true,
  autoplay: true,
})

animation.setSubframe(false)

$(document).ready(function () {
  $('.roadmapSlick').slick({
    infinite: false,
    initialSlide: 2,
    speed: 300,
    variableWidth: true,
    draggable: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  })
})
