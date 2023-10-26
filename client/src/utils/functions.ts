export const formatUSD = (price: number, maximumFractionDigits: number = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: maximumFractionDigits,
  }).format(price);
};

export const calculateTotal = ({
  items,
}: {
  items: {
    product: string;
    size: string | null;
    color: string | null;
    quantity: number;
    price: number;
  }[];
}) => {
  let sum = 0;
  if (items.length > 0) {
    for (const item of items) {
      sum += item.quantity * item.price;
    }
  }

  return sum;
};
