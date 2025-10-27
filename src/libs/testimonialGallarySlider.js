const visitedTestimonials = [];
const testimonialGallarySlider = (num) => {
  const checkJquery = setInterval(() => {
    const is$ = window?.$;
    const isVisited = visitedTestimonials.includes(num);
    if (is$) {
      visitedTestimonials.push(num);

      clearCheckJquery();
      var ltn__testimonial_quote_slider = $(
        `.ltn__testimonial-slider-${num}-active`
      );

      ltn__testimonial_quote_slider.slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        arrows: true,
        fade: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              autoplay: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              autoplay: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
            },
          },
          {
            breakpoint: 580,
            settings: {
              autoplay: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
            },
          },
        ],
      });
      if (!isVisited) {
        /* have to write code for bind it with static images */
        ltn__testimonial_quote_slider.on(
          "beforeChange",
          function (event, slick, currentSlide, nextSlide) {
            var liIndex = nextSlide + 1;
            var slideImageliIndex =
              slick.slideCount == liIndex ? liIndex - 1 : liIndex;
            var cart = $(
              `.ltn__testimonial-slider-${num} .slick-slide[data-slick-index="` +
                slideImageliIndex +
                '"]'
            ).find(".ltn__testimonial-image");
            var imgtodrag = $(
              `.ltn__testimonial-quote-menu-${num} li:nth-child(${liIndex})`
            )
              .find("img")
              .eq(0);
            if (imgtodrag) {
              AnimateTestimonialImage(imgtodrag, cart);
            }
          }
        );
        /* have to write code for bind static image to slider accordion to slide index of images */
        $(document).on(
          "click",
          `.ltn__testimonial-quote-menu-${num} li`,
          function (e) {
            var el = $(this);
            var elIndex = el.prevAll().length;
            ltn__testimonial_quote_slider.slick("slickGoTo", elIndex);
            var cart = $(
              `.ltn__testimonial-slider-${num} .slick-slide[data-slick-index="` +
                elIndex +
                '"]'
            ).find(".ltn__testimonial-image");
            var imgtodrag = el.find("img").eq(0);
            if (imgtodrag) {
              AnimateTestimonialImage(imgtodrag, cart);
            }
          }
        );
        function AnimateTestimonialImage(imgtodrag, cart) {
          var imgclone = imgtodrag
            .clone()
            .offset({
              top: imgtodrag.offset()?.top,
              left: imgtodrag.offset()?.left,
            })
            .css({
              opacity: "0.5",
              position: "absolute",
              height: "130px",
              width: "130px",
              "z-index": "100",
            })
            .addClass("quote-animated-image")
            .appendTo($("body"))
            .animate(
              {
                top: cart.offset()?.top + 10,
                left: cart.offset()?.left + 10,
                width: 130,
                height: 130,
              },
              300
            );

          imgclone.animate(
            {
              visibility: "hidden",
              opacity: "0",
            },
            function () {
              $(this).remove();
            }
          );
        }
      }
    }
  }, 50);
  function clearCheckJquery() {
    clearInterval(checkJquery);
  }
};

export default testimonialGallarySlider;
