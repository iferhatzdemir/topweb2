import breakRage from "./breakRage";
import countDiscount from "./countDiscount";
import makePath from "./makePath";
import makeText from "./makeText";

const filterItems = (items, collection, filterItem, isProducts) => {
  switch (collection) {
    case "category":
      return items?.filter(
        ({ type, category }) =>
          makePath(isProducts ? type : category) === filterItem
      );

    case "brand":
      return items?.filter(({ brand }) => makePath(brand) === filterItem);

    case "tags":
      return items?.filter(({ tags }) => tags?.includes(makeText(filterItem)));

    case "size":
      return items?.filter(({ size }) => makePath(size) === filterItem);

    case "color":
      return items?.filter(({ color }) => makePath(color) === filterItem);

    case "range":
      const { lowerLimit, upperLimit } = breakRage(filterItem);
      return items?.filter(({ price, disc }) => {
        const { netPrice } = countDiscount(price, disc);
        return netPrice >= lowerLimit && netPrice <= upperLimit;
      });

    case "author":
      return items?.filter(
        ({ author }) => makePath(author?.name) === filterItem
      );

    case "role":
      return items?.filter(
        ({ author }) => makePath(author?.desig) === filterItem
      );

    case "search":
      if (!filterItem) return [];
      const searchText = new RegExp(makeText(filterItem), "i");
      return items?.filter(({ title }) => searchText.test(title));

    case "popularity":
      return [...items]?.sort((a, b) => b.views - a.views);

    case "new":
      return [...items]?.sort((a, b) => b.date - a.date);

    case "price ascending":
      return [...items]?.sort(
        ({ price, disc }, { price: price2, disc: disc2 }) => {
          const { netPrice: netPrice1 } = countDiscount(price, disc);
          const { netPrice: netPrice2 } = countDiscount(price2, disc2);
          return netPrice1 - netPrice2;
        }
      );

    case "price descending":
      return [...items]?.sort(
        ({ price, disc }, { price: price2, disc: disc2 }) => {
          const { netPrice: netPrice1 } = countDiscount(price, disc);
          const { netPrice: netPrice2 } = countDiscount(price2, disc2);
          return netPrice2 - netPrice1;
        }
      );
    default:
      return items;
  }
};

export default filterItems;
