import { describe, it, expect } from 'vitest';
import { filterInput } from '../utils/filterInput';

function createEvent(value: string): Event {
  return {
    target: {
      value,
    },
  } as unknown as Event;
}

describe('filterInput', () => {
  it('should not allow non-numeric characters', () => {
    const event = createEvent('abc12');
    filterInput(event);
    expect((event.target as HTMLInputElement).value).toBe('12');
  });

  it('should limit the value to 99', () => {
    const event = createEvent('123');
    filterInput(event);
    expect((event.target as HTMLInputElement).value).toBe('99');
  });

  it('should allow numeric values less than 99', () => {
    const event = createEvent('45');
    filterInput(event);
    expect((event.target as HTMLInputElement).value).toBe('45');
  });

  it('should handle empty input', () => {
    const event = createEvent('');
    filterInput(event);
    expect((event.target as HTMLInputElement).value).toBe('');
  });

  it('should handle input with leading zeros', () => {
    const event = createEvent('007');
    filterInput(event);
    expect((event.target as HTMLInputElement).value).toBe('7');
  });
});