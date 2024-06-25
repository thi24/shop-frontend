import { describe, it, expect } from 'vitest';
import { checkInputs } from '../utils/checkInputs';

describe('checkInputs', () => {
  it('should return true for all numeric inputs', () => {
    const inputs = [
      { value: '123', style: { outline: '' } },
      { value: '456', style: { outline: '' } },
    ] as HTMLInputElement[];

    const result = checkInputs(inputs);
    expect(result).toBe(true);
    inputs.forEach(input => {
      expect(input.style.outline).toBe('');
    });
  });

  it('should return false for non-numeric inputs and set outline to red', () => {
    const inputs = [
      { value: '123', style: { outline: '' } },
      { value: 'abc', style: { outline: '' } },
    ] as HTMLInputElement[];

    const result = checkInputs(inputs);
    expect(result).toBe(false);
    expect(inputs[0].style.outline).toBe('');
    expect(inputs[1].style.outline).toBe('2px solid red');
  });

  it('should handle empty and null values correctly', () => {
    const inputs = [
      { value: '', style: { outline: '' } },
      { value: null, style: { outline: '' } },
    ] as unknown as HTMLInputElement[];

    const result = checkInputs(inputs);
    expect(result).toBe(true);
    inputs.forEach(input => {
      expect(input.style.outline).toBe('');
    });
  });
});
