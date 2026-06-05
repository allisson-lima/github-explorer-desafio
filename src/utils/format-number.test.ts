import { formatNumber } from './format-number';

describe('formatNumber', () => {
  it('deve formatar números em pt-BR', () => {
    expect(formatNumber(1000)).toBe('1.000');
    expect(formatNumber(9000)).toBe('9.000');
  });

  it('deve formatar zero', () => {
    expect(formatNumber(0)).toBe('0');
  });
});
