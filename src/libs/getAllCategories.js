import allCategories from "@/../public/fakedata/categories.json";

const getAllCategories = () => {
  const categories = allCategories.map((cateory, idx) => ({
    ...cateory,
  }));
  return categories;
};

export default getAllCategories;
