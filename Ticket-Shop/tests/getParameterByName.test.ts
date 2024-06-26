import { describe, it, expect } from 'vitest';
import { getParameterByName } from '../utils/getParameterByName';

describe('getParameterByName', () => {
  it('should return the parameter value when it exists', () => {
    const url = 'http://example.com?param1=value1&param2=value2';
    expect(getParameterByName('param1', url)).toBe('value1');
    expect(getParameterByName('param2', url)).toBe('value2');
  });

  it('should return an empty string when the parameter exists but has no value', () => {
    const url = 'http://example.com?param1=&param2=value2';
    expect(getParameterByName('param1', url)).toBe('');
  });

  it('should return null when the parameter does not exist', () => {
    const url = 'http://example.com?param1=value1&param2=value2';
    expect(getParameterByName('param3', url)).toBeNull();
  });

  it('should handle special characters in parameter names', () => {
    const url = 'http://example.com?param%5B1%5D=value1&param2=value2';
    expect(getParameterByName('param[1]', url)).toBe('value1');
  });

  it('should decode URL-encoded parameter values', () => {
    const url = 'http://example.com?param1=value%201&param2=value%202';
    expect(getParameterByName('param1', url)).toBe('value 1');
    expect(getParameterByName('param2', url)).toBe('value 2');
  });
});

