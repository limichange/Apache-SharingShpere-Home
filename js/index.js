//
// First Section
//

$(document).ready(function () {
  $('.roadmapSlick').slick({
    infinite: false,
    speed: 300,
    variableWidth: true,
    draggable: false,
    arrows: true,

    responsive: [
      {
        breakpoint: 868,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
          arrows: false,
        },
      },
    ],
  })

  $('.roadmapSlick').on(
    'beforeChange',
    function (event, slick, currentSlide, nextSlide) {
      if (nextSlide > 0) {
        $('.shadow.left').show()
      } else {
        $('.shadow.left').hide()
      }

      var rightEndIndex = 4

      // get window width
      var windowWidth = $(window).width()

      if (windowWidth > 1900) {
        rightEndIndex = 0
      } else if (windowWidth > 1368) {
        rightEndIndex = 1
      } else if (windowWidth > 1068) {
        rightEndIndex = 2
      } else if (windowWidth > 868) {
        rightEndIndex = 3
      }

      if (nextSlide > rightEndIndex) {
        $('.slick-next.slick-arrow').hide()
        $('.shadow.right').hide()
      } else {
        $('.slick-next.slick-arrow').show()
        $('.shadow.right').show()
      }
    }
  )

  $('.shadow.left').hide()

  $('.navigation .iconMenu').click(function () {
    $('.mobileMenu').show()
    bodyScrollLock.disableBodyScroll(document.querySelector('.mobileMenu'))
  })

  $('.languageSelect + .langs').hide()
  $('.mobileMenu .itemList').hide()

  $('.mobileMenu .item').click(function () {
    // this item
    var item = $(this)
    item.find('.arrowIcon').toggleClass('active')
    item.find('+ .itemList').slideToggle()
  })

  $('.mobileMenu .x').click(function () {
    $('.mobileMenu').hide()
    bodyScrollLock.enableBodyScroll(document.querySelector('.mobileMenu'))
  })

  function checkFooterSize() {
    var windowWidth = $(window).width()

    if (windowWidth < 740) {
      $('.footerNavigation .links').hide()
    } else {
      $('.footerNavigation .links').show()
    }
  }

  checkFooterSize()

  // window resize hide links
  $(window).resize(function () {
    checkFooterSize()
  })

  $('.footerNavigation .item').click(function () {
    // this item
    var item = $(this)
    item.find('.links').slideToggle()
  })
})
