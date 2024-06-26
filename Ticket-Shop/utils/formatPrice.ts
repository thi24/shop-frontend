export function formatPrice(price: number | null): string {
    if (price === null) {
      return "N/A";
    }
    return (price / 100).toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €";
  }