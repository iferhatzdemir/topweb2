const makePath = (text) => {
  const pathMakeAbleText = text
    .toLowerCase()
    ?.split("/")
    .join(" ")
    .split("&")
    .join(" ");
  return pathMakeAbleText?.split(" ")?.join("_");
};

export default makePath;
