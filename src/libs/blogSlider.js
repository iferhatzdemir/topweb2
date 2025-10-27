const blogSlider = () => {
  if ($(".ltn__blog-gallery-active").length) {
    $(".ltn__blog-gallery-active").slick({
      rtl: false,
      arrows: true,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow:
        '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
      nextArrow:
        '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
    });
  }
};

export default blogSlider;
