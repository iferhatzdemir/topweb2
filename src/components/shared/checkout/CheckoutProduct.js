import countTotalPrice from "@/libs/countTotalPrice";
import sliceText from "@/libs/sliceText";
import { useLocale } from "@/hooks/useLocale";
import { formatCurrency } from "@/i18n/formatters";
import React, { useMemo } from "react";

const CheckoutProduct = ({ product }) => {
  const { title, price, disc, quantity } = product ? product : {};
  const totalPriceSingle = countTotalPrice([{ price, quantity, disc }]);
  const { locale } = useLocale('checkout');
  const formattedTotal = useMemo(
    () => formatCurrency(totalPriceSingle, locale),
    [totalPriceSingle, locale]
  );

  return (
    <tr>
      <td>
        {sliceText(title, 20)} <strong>× {quantity}</strong>
      </td>
      <td>{formattedTotal}</td>
    </tr>
  );
};

export default CheckoutProduct;
