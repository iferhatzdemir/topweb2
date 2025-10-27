import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import React from "react";

const CheckoutProduct = ({ product }) => {
  const { title, price, disc, quantity } = product ? product : {};
  const totalPriceSingle = countTotalPrice([{ price, quantity, disc }]);

  return (
    <tr>
      <td>
        {sliceText(title, 20)} <strong>× {quantity}</strong>
      </td>
      <td>${modifyAmount(totalPriceSingle)}</td>
    </tr>
  );
};

export default CheckoutProduct;
