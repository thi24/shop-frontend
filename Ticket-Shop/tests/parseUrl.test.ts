import { describe, it, expect } from 'vitest';
import { parseUrl } from '../utils/parseUrl';

describe('parseUrl', () => {
  it('should return the UUID from the URL', () => {
    const url = 'http://example.com/path/123e4567-e89b-12d3-a456-426614174000';
    const result = parseUrl(url);
    expect(result).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  it('should return an empty string if no UUID is found', () => {
    const url = 'http://example.com/path/no-uuid-here';
    const result = parseUrl(url);
    expect(result).toBe('');
  });
});
