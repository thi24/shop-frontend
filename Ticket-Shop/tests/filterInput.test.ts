import { describe, it, expect } from 'vitest';
import { filterInput } from '../utils/filterInput';

describe('filterInput', () => {
  it('should not allow non-numeric characters', () => {
    const event = {
      target: {
        value: 'abc12',
      },
    } as unknown as Event;

    filterInput(event);

    expect((event.target as HTMLInputElement).value).toBe('12');
  });

  it('should limit the value to 99', () => {
    const event = {
      target: {
        value: '123',
      },
    } as unknown as Event;

    filterInput(event);

    expect((event.target as HTMLInputElement).value).toBe('99');
  });

  it('should allow numeric values less than 99', () => {
    const event = {
      target: {
        value: '45',
      },
    } as unknown as Event;

    filterInput(event);

    expect((event.target as HTMLInputElement).value).toBe('45');
  });

  it('should handle empty input', () => {
    const event = {
      target: {
        value: '',
      },
    } as unknown as Event;

    filterInput(event);

    expect((event.target as HTMLInputElement).value).toBe('');
  });

  it('should handle input with leading zeros', () => {
    const event = {
      target: {
        value: '007',
      },
    } as unknown as Event;

    filterInput(event);

    expect((event.target as HTMLInputElement).value).toBe('7');
  });
});