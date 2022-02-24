//
// First Section
//
let animation = lottie.loadAnimation({
  container: document.getElementById('lottie'),
  path: './lottiefiles/lf20_lrx1ahrj.json',
  renderer: 'svg',
  loop: true,
  autoplay: true,
})

animation.setSubframe(false)

$(document).ready(function () {
  $('.roadmapSlick').slick({
    infinite: false,
    initialSlide: 0,
    speed: 300,
    variableWidth: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 868,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
        },
      },
    ],
  })
})
