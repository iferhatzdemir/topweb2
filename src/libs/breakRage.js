const breakRage = (curretRange) => {
  const rangeArray = curretRange?.split("-");
  const lowerLimit = parseInt(rangeArray[0]);
  const upperLimit = parseInt(rangeArray[1]);
  return { lowerLimit, upperLimit };
};

export default breakRage;
