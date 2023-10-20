export const formatUSD = (price: number, maximumFractionDigits: number = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: maximumFractionDigits,
  }).format(price);
};
