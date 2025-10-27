/*================================================
[  Table of contents  ]
================================================

1. Variables
2. Mobile Menu
3. Mega Menu
4. One Page Navigation
5. Toogle Search
6. Current Year Copyright area
7. Background Image
8. wow js init
9. Tooltip
10. Nice Select
11. Default active and hover item active
12. Product Details Page
13. Isotope Gallery Active  ( Gallery / Portfolio )
14. LightCase jQuery Active
15. Slider One Active 
16. Product Slider One
17. Tab Product Slider One
18. Blog Slider One
19. Testimonial Slider - 1
20. Testimonial Slider - 2
21. Testimonial Slider - 3
22. Category Slider
23. Image Slide  - 1 (Screenshot) 
24. Image Slide - 2
25. Image Slide - 3
26. Image Slide - 4 
27. Brand Logo
28. Blog Gallery (Blog Page )
29. Countdown
30. Counter Up
31. Instagram Feed
32. Price Slider
33. Quantity plus minus
34. scrollUp active
35. Parallax active
36. Header menu sticky



======================================
[ End table content ]
======================================*/

import mplace from "./maplace-active";

const main = () => {
  const checkJquery = setInterval(() => {
    if (typeof window !== "undefined" && window.$) {
      clearCheckJquery();
      /* --------------------------------------------------------
              1. Variables
          --------------------------------------------------------- */
      var $window = $(window),
        $body = $("body");

      /* --------------------------------------------------------
              2. Mobile Menu
          --------------------------------------------------------- */
      /* ---------------------------------
              Utilize Function 
          ----------------------------------- */
      (function () {
        var $ltn__utilizeToggle = $(".ltn__utilize-toggle"),
          $ltn__utilize = $(".ltn__utilize"),
          $ltn__utilizeOverlay = $(".ltn__utilize-overlay"),
          $mobileMenuToggle = $(".mobile-menu-toggle");
        $ltn__utilizeToggle.on("click", function (e) {
          e.preventDefault();
          var $this = $(this),
            $target = $this.attr("href");
          $body.addClass("ltn__utilize-open");
          $($target).addClass("ltn__utilize-open");
          $ltn__utilizeOverlay.fadeIn();
          if ($this.parent().hasClass("mobile-menu-toggle")) {
            $this.addClass("close");
          }
        });
        $(".ltn__utilize-close, .ltn__utilize-overlay").on(
          "click",
          function (e) {
            e.preventDefault();
            $body.removeClass("ltn__utilize-open");
            $ltn__utilize.removeClass("ltn__utilize-open");
            $ltn__utilizeOverlay.fadeOut();
            $mobileMenuToggle.find("a").removeClass("close");
          }
        );
      })();

      /* ------------------------------------
              Utilize Menu
          ----------------------------------- */
      function mobileltn__utilizeMenu() {
        var $ltn__utilizeNav = $(".ltn__utilize-menu, .overlay-menu"),
          $ltn__utilizeNavSubMenu = $ltn__utilizeNav.find(".sub-menu");

        /*Add Toggle Button With Off Canvas Sub Menu*/
        $ltn__utilizeNavSubMenu
          .parent()
          .prepend('<span class="menu-expand"></span>');

        /*Category Sub Menu Toggle*/
        $ltn__utilizeNav.on("click", "li a, .menu-expand", function (e) {
          var $this = $(this);
          if ($this.attr("href") === "#" || $this.hasClass("menu-expand")) {
            e.preventDefault();
            if ($this.siblings("ul:visible").length) {
              $this.parent("li").removeClass("active");
              $this.siblings("ul").slideUp();
              $this.parent("li").find("li").removeClass("active");
              $this.parent("li").find("ul:visible").slideUp();
            } else {
              $this.parent("li").addClass("active");
              $this
                .closest("li")
                .siblings("li")
                .removeClass("active")
                .find("li")
                .removeClass("active");
              $this.closest("li").siblings("li").find("ul:visible").slideUp();
              $this.siblings("ul").slideDown();
            }
          }
        });
      }
      mobileltn__utilizeMenu();

      /* --------------------------------------------------------
              3. Mega Menu
          --------------------------------------------------------- */
      $(".mega-menu").each(function () {
        if ($(this).children("li").length) {
          var ulChildren = $(this).children("li").length;
          $(this).addClass("column-" + ulChildren);
        }
      });

      /* Remove Attribute( href ) from sub-menu title in mega-menu */
      /*
          $('.mega-menu > li > a').removeAttr('href');
          */

      /* Mega Munu  */
      // $(".mega-menu").parent().css({"position": "inherit"});
      $(".mega-menu").parent().addClass("mega-menu-parent");

      /* Add space for Elementor Menu Anchor link */
      $(window).on("elementor/frontend/init", function () {
        elementorFrontend.hooks.addFilter(
          "frontend/handlers/menu_anchor/scroll_top_distance",
          function (scrollTop) {
            return scrollTop - 75;
          }
        );
      });

      /* --------------------------------------------------------
              3-2. Category Menu
          --------------------------------------------------------- */

      $(".ltn__category-menu-title").on("click", function () {
        $(".ltn__category-menu-toggle").slideToggle(500);
      });

      /* Category Menu More Item show */
      $(".ltn__category-menu-more-item-parent").on("click", function () {
        $(".ltn__category-menu-more-item-child").slideToggle();
        $(this).toggleClass("rx-change");
      });

      /* Category Submenu Column Count */
      $(".ltn__category-submenu").each(function () {
        if ($(this).children("li").length) {
          var ulChildren = $(this).children("li").length;
          $(this).addClass("ltn__category-column-no-" + ulChildren);
        }
      });

      /* Category Menu Responsive */
      function ltn__CategoryMenuToggle() {
        $(".ltn__category-menu-toggle .ltn__category-menu-drop > a").on(
          "click",
          function () {
            if ($(window).width() < 991) {
              $(this).removeAttr("href");
              var element = $(this).parent("li");
              if (element.hasClass("open")) {
                element.removeClass("open");
                element.find("li").removeClass("open");
                element.find("ul").slideUp();
              } else {
                element.addClass("open");
                element.children("ul").slideDown();
                element.siblings("li").children("ul").slideUp();
                element.siblings("li").removeClass("open");
                element.siblings("li").find("li").removeClass("open");
                element.siblings("li").find("ul").slideUp();
              }
            }
          }
        );
        $(".ltn__category-menu-toggle .ltn__category-menu-drop > a").append(
          '<span class="expand"></span>'
        );
      }
      ltn__CategoryMenuToggle();

      /* ---------------------------------------------------------
              4. One Page Navigation ( jQuery Easing Plugin )
          --------------------------------------------------------- */
      // jQuery for page scrolling feature - requires jQuery Easing plugin
      $(function () {
        $("a.page-scroll").bind("click", function (event) {
          var $anchor = $(this);
          $("html, body")
            .stop()
            .animate(
              {
                scrollTop: $($anchor.attr("href")).offset().top,
              },
              1500,
              "easeInOutExpo"
            );
          event.preventDefault();
        });
      });

      /* --------------------------------------------------------
              5. Toogle Search
          -------------------------------------------------------- */
      // Handle click on toggle search button
      $(".header-search-1").on("click", function () {
        $(".header-search-1, .header-search-1-form").toggleClass("search-open");
        return false;
      });

      /* ---------------------------------------------------------
              6. Current Year Copyright area
          --------------------------------------------------------- */
      $(".current-year").text(new Date().getFullYear());

      /* ---------------------------------------------------------
              7. Background Image
          --------------------------------------------------------- */
      var $backgroundImage = $(".bg-image, .bg-image-top");
      $backgroundImage.each(function () {
        var $this = $(this),
          $bgImage = $this.data("bs-bg");
        $this.css("background-image", "url(" + $bgImage + ")");
      });

      /* ---------------------------------------------------------
              8. wow js init
          --------------------------------------------------------- */
      new WOW().init();

      /* ---------------------------------------------------------
              9. Tooltip
          --------------------------------------------------------- */
      $('[data-toggle="tooltip"]').tooltip();

      /* --------------------------------------------------------
              10. Nice Select
          --------------------------------------------------------- */

      $("select").niceSelect();

      /* ---------------------------------------------------------
              datepicker
          --------------------------------------------------------- */

      $(".ltn__datepicker .input-group.date").datepicker({
        format: "mm/dd/yyyy",
        /* format: 'mm/dd/yyyy', */
        /* format: 'yyyy/dd/mm', */
      });

      /* --------------------------------------------------------
              11. Default active and hover item active
          --------------------------------------------------------- */
      var ltn__active_item = $(
        ".ltn__feature-item-6, .ltn__our-journey-wrap ul li, .ltn__pricing-plan-item"
      );
      ltn__active_item.mouseover(function () {
        ltn__active_item.removeClass("active");
        $(this).addClass("active");
      });

      /* --------------------------------------------------------
              12. Product Details Page
          --------------------------------------------------------- */
      $(".ltn__shop-details-large-img").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: ".ltn__shop-details-small-img",
      });
      $(".ltn__shop-details-small-img").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: ".ltn__shop-details-large-img",
        dots: false,
        arrows: true,
        focusOnSelect: true,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              13. Isotope Gallery Active  ( Gallery / Portfolio )
          -------------------------------------------------------- */
      var $ltnGalleryActive = $(".ltn__gallery-active"),
        $ltnGalleryFilterMenu = $(".ltn__gallery-filter-menu");
      /*Filter*/
      $ltnGalleryFilterMenu.on("click", "button, a", function () {
        var $this = $(this),
          $filterValue = $this.attr("data-filter");
        $ltnGalleryFilterMenu.find("button, a").removeClass("active");
        $this.addClass("active");
        $ltnGalleryActive.isotope({ filter: $filterValue });
      });
      /*Grid*/
      $ltnGalleryActive.each(function () {
        var $this = $(this),
          $galleryFilterItem = ".ltn__gallery-item";
        $this.imagesLoaded(function () {
          $this.isotope({
            itemSelector: $galleryFilterItem,
            percentPosition: true,
            masonry: {
              columnWidth: ".ltn__gallery-sizer",
            },
          });
        });
      });

      /* --------------------------------------------------------
              14. LightCase jQuery Active
          --------------------------------------------------------- */
      $("a[data-rel^=lightcase]").lightcase({
        transition:
          "elastic" /* none, fade, fadeInline, elastic, scrollTop, scrollRight, scrollBottom, scrollLeft, scrollHorizontal and scrollVertical */,
        swipe: true,
        maxWidth: 1170,
        maxHeight: 600,
      });

      /* --------------------------------------------------------
              15. Slider One Active 
          --------------------------------------------------------- */
      $(".ltn__slide-one-active")
        .slick({
          autoplay: false,
          autoplaySpeed: 2000,
          arrows: true,
          dots: true,
          fade: true,
          cssEase: "linear",
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow:
            '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
          nextArrow:
            '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                arrows: false,
                dots: true,
              },
            },
          ],
        })
        .on("afterChange", function () {
          new WOW().init();
        });
      /* --------------------------------------------------------
              15-2. Slider Active 2
          --------------------------------------------------------- */
      $(".ltn__slide-active-2")
        .slick({
          autoplay: false,
          autoplaySpeed: 2000,
          arrows: false,
          dots: true,
          fade: true,
          cssEase: "linear",
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow:
            '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
          nextArrow:
            '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                arrows: false,
                dots: true,
              },
            },
          ],
        })
        .on("afterChange", function () {
          new WOW().init();
        });

      /* --------------------------------------------------------
              16. Product Slider One
          --------------------------------------------------------- */
      $(".ltn__product-slider-one-active").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              16. Product Slider One
          --------------------------------------------------------- */
      $(".ltn__product-slider-item-four-active").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              16. Product Slider One
          --------------------------------------------------------- */
      $(".ltn__related-product-slider-one-active").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              17. Tab Product Slider One
          --------------------------------------------------------- */
      $(".ltn__tab-product-slider-one-active").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });
      /* --------------------------------------------------------
              17. Small Product Slider One
          --------------------------------------------------------- */
      $(".ltn__small-product-slider-active").slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              18. Blog Slider One
          --------------------------------------------------------- */
      $(".ltn__blog-slider-one-active").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              19. Testimonial Slider - 1
          --------------------------------------------------------- */
      $(".ltn__testimonial-slider-active").slick({
        arrows: true,
        dots: true,
        infinite: true,
        speed: 300,
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
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              20. Testimonial Slider - 2
          --------------------------------------------------------- */
      $(".ltn__testimonial-slider-2-active").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              21. Testimonial Slider - 3
          --------------------------------------------------------- */
      $(".ltn__testimonial-slider-3-active").slick({
        arrows: true,
        centerMode: true,
        centerPadding: "80px",
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              centerMode: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              22. Category Slider
          --------------------------------------------------------- */
      $(".ltn__category-slider-active").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 375,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              23. Image Slide  - 1 (Screenshot) 
          --------------------------------------------------------- */
      $(".ltn__image-slider-1-active").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 580,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              24. Image Slide - 2
          --------------------------------------------------------- */
      $(".ltn__image-slider-2-active").slick({
        rtl: false,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "80px",
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
              centerPadding: "50px",
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: "50px",
            },
          },
        ],
      });

      /* --------------------------------------------------------
              25. Image Slide - 3
          --------------------------------------------------------- */
      $(".ltn__image-slider-3-active").slick({
        rtl: false,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              26. Image Slide - 4 
          --------------------------------------------------------- */
      $(".ltn__image-slider-4-active").slick({
        rtl: false,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        prevArrow:
          '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow:
          '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      /* --------------------------------------------------------
              27. Brand Logo
          --------------------------------------------------------- */
      if ($(".ltn__brand-logo-active").length) {
        $(".ltn__brand-logo-active").slick({
          rtl: false,
          arrows: false,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 5,
          slidesToScroll: 1,
          prevArrow:
            '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
          nextArrow:
            '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
              },
            },
            {
              breakpoint: 580,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ],
        });
      }

      /* --------------------------------------------------------
              28. Blog Gallery (Blog Page )
          --------------------------------------------------------- */
      // if ($(".ltn__blog-gallery-active").length) {
      //   $(".ltn__blog-gallery-active").slick({
      //     rtl: false,
      //     arrows: true,
      //     dots: false,
      //     infinite: true,
      //     speed: 300,
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //     prevArrow:
      //       '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
      //     nextArrow:
      //       '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
      //   });
      // }

      /* --------------------------------------------------------
              29. Countdown
          --------------------------------------------------------- */
      $("[data-countdown]").each(function () {
        var $this = $(this),
          finalDate = $(this).data("countdown");
        if (!$this.hasClass("countdown-full-format")) {
          $this.countdown(finalDate, function (event) {
            $this.html(
              event.strftime(
                '<div class="single"><h1>%D</h1><p>Days</p></div> <div class="single"><h1>%H</h1><p>Hrs</p></div> <div class="single"><h1>%M</h1><p>Mins</p></div> <div class="single"><h1>%S</h1><p>Secs</p></div>'
              )
            );
          });
        } else {
          $this.countdown(finalDate, function (event) {
            $this.html(
              event.strftime(
                '<div class="single"><h1>%Y</h1><p>Years</p></div> <div class="single"><h1>%m</h1><p>Months</p></div> <div class="single"><h1>%W</h1><p>Weeks</p></div> <div class="single"><h1>%d</h1><p>Days</p></div> <div class="single"><h1>%H</h1><p>Hrs</p></div> <div class="single"><h1>%M</h1><p>Mins</p></div> <div class="single"><h1>%S</h1><p>Secs</p></div>'
              )
            );
          });
        }
      });

      /* --------------------------------------------------------
              30. Counter Up
          --------------------------------------------------------- */
      // $('.ltn__counter').counterUp();

      $(".counter").counterUp({
        delay: 10,
        time: 2000,
      });
      $(".counter").addClass("animated fadeInDownBig");
      $("h3").addClass("animated fadeIn");

      /* --------------------------------------------------------
              33. Quantity plus minus
          -------------------------------------------------------- */
      $(".cart-plus-minus").prepend('<div class="dec qtybutton">-</div>');
      $(".cart-plus-minus").append('<div class="inc qtybutton">+</div>');
      $(".qtybutton").on("click", function () {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() == "+") {
          var newVal = parseFloat(oldValue) + 1;
        } else {
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 0;
          }
        }
        $button.parent().find("input").val(newVal);
      });

      /* --------------------------------------------------------
              34. scrollUp active
          -------------------------------------------------------- */
      $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: "linear",
        scrollSpeed: 900,
        animation: "fade",
      });

      /* --------------------------------------------------------
              35. Parallax active ( About Section  )
          -------------------------------------------------------- */
      /* 
          > 1 page e 2 ta call korle 1 ta kaj kore 
          */
      if ($(".ltn__parallax-effect-active").length) {
        var scene = $(".ltn__parallax-effect-active").get(0);
        var parallaxInstance = new Parallax(scene);
      }

      /* --------------------------------------------------------
              Newsletter Popup
          -------------------------------------------------------- */

      $("#ltn__newsletter_popup").modal("show");

      /* --------------------------------------------------------
          36. Header menu sticky
      -------------------------------------------------------- */

      $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();

        if (scroll < 445) {
          $(".ltn__header-sticky").removeClass("sticky-active");
        } else {
          $(".ltn__header-sticky").addClass("sticky-active");
        }
      });

      /*-----------------
              preloader
          ------------------*/
      if ($("#preloader").length) {
        var preLoder = $("#preloader");
        preLoder.fadeOut(1000);
      }

      const isMaplace = document.querySelector("#gmap");
      if (isMaplace) {
        let googlePromise = new Promise(function (myResolve, myReject) {
          const isGoogle = window.google ? true : false;
          const googleTimeOut = setTimeout(() => {
            myReject();
          }, 5000);
          if (isGoogle) {
            myResolve();
            clearTimeout(googleTimeOut);
          }
        });
        googlePromise.then(() => mplace()).catch(() => {});
      }
    }
  }, 100);
  function clearCheckJquery() {
    clearInterval(checkJquery);
  }
};

export default main;
