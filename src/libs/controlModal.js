import React from "react";

const controlModal = () => {
  if (window.$) {
    $(`#quick_view_modal`).modal("hide");
    $(`#add_to_cart_modal`).modal("hide");
    $(`#liton_wishlist_modal`).modal("hide");
  }
};

export default controlModal;
