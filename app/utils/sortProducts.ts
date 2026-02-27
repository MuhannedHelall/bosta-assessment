export function sortProducts(
  products: Product[],
  sortBy: SortOption,
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "category":
      return sorted.sort((a, b) =>
        a.category.toLowerCase().localeCompare(b.category.toLowerCase()),
      );

    case "rating":
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);

    case "price_low_high":
      return sorted.sort((a, b) => a.price - b.price);

    case "price_high_low":
      return sorted.sort((a, b) => b.price - a.price);

    default:
      return products;
  }
}
