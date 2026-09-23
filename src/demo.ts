import { calculateOrderTotal } from './discount.js';

const examples = [
  { subtotal: 80, tier: 'standard' as const },
  { subtotal: 150, tier: 'vip' as const },
  { subtotal: 100, tier: 'vip' as const },
];

for (const order of examples) {
  console.log(order, '=>', calculateOrderTotal(order));
}
