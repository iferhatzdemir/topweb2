const getRangeValue = (
  setRangeValue,
  maxSize,
  intLowerLimit,
  intUpperLimit,
  isNotValue
) => {
  const checkIsNiceSelect = setInterval(() => {
    const jquery = window.$;

    if (jquery) {
      handleClearInterval();

      $(".slider-range").slider({
        range: true,
        min: intLowerLimit,
        max: maxSize,
        values: [intLowerLimit, intUpperLimit],
        slide: function (event, ui) {
          if (setRangeValue) {
            setRangeValue(`${ui.values[0]}-${ui.values[1]}`);
          }

          $(".amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        },
      });
      $(".amount").val(
        "$" +
          $(".slider-range").slider("values", 0) +
          " - $" +
          $(".slider-range").slider("values", 1)
      );
    }
  }, 100);

  function handleClearInterval() {
    clearInterval(checkIsNiceSelect);
  }
};

export default getRangeValue;
