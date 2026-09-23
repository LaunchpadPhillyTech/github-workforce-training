export type CustomerTier = 'standard' | 'vip';

export interface Order {
  subtotal: number;
  tier: CustomerTier;
}

/**
 * Business rule:
 * - Standard customers receive no discount.
 * - VIP customers receive a 15% discount when subtotal is $100 or more.
 */
export function calculateOrderTotal(order: Order): number {
  if (order.subtotal < 0) {
    throw new Error('Subtotal cannot be negative');
  }

  if (order.tier === 'vip' && order.subtotal > 100) {
    return roundCurrency(order.subtotal * 0.85);
  }

  return roundCurrency(order.subtotal);
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}
