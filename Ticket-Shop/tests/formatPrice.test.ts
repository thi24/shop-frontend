import { describe, it, expect } from 'vitest';
import { formatPrice } from '../utils/formatPrice';

describe('formatPrice', () => {
  it('should return "N/A" for null input', () => {
    expect(formatPrice(null)).toBe("N/A");
  });

  it('should format price correctly for valid input', () => {
    expect(formatPrice(12345)).toBe("123,45 €");
    expect(formatPrice(100)).toBe("1,00 €");
    expect(formatPrice(0)).toBe("0,00 €");
  });

  it('should handle large numbers correctly', () => {
    expect(formatPrice(123456789)).toBe("1.234.567,89 €");
  });
});