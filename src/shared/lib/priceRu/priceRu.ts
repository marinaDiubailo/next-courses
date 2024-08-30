export const priceRu = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'RUB',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
  }).format(price)
}
