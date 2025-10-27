const setBgImage = () => {
  var $backgroundImage = $(".bg-image, .bg-image-top");
  $backgroundImage.each(function () {
    var $this = $(this),
      $bgImage = $this.data("bs-bg");
    $this.css("background-image", "url(" + $bgImage + ")");
  });
};

export default setBgImage;
