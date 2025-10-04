export const usdFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amount: number, formatter = usdFormat) =>
  formatter.format(amount);
