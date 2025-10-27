export const VAT_RATE = 0.20; // 20% KDV

export const calculateVat = (taxableAmount, rate = VAT_RATE) => {
  const amount = Number(((taxableAmount || 0) * rate).toFixed(2));
  return { amount, rate };
};
