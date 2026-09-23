import { describe, expect, it } from 'vitest';
import { calculateOrderTotal } from '../src/discount.js';

describe('calculateOrderTotal', () => {
  it('does not discount a standard customer', () => {
    expect(calculateOrderTotal({ subtotal: 80, tier: 'standard' })).toBe(80);
  });

  it('discounts a VIP customer above the threshold', () => {
    expect(calculateOrderTotal({ subtotal: 150, tier: 'vip' })).toBe(127.5);
  });

  it('rejects a negative subtotal', () => {
    expect(() => calculateOrderTotal({ subtotal: -1, tier: 'vip' })).toThrow(
      'Subtotal cannot be negative'
    );
  });
});
