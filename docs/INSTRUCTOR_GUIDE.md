# Instructor Guide

## Learning objective

Learners should experience promotion gates rather than treating branches as folders.

The exercise intentionally contains:

1. A boundary-condition bug in `src/discount.ts`.
2. Missing test coverage for the exact `$100.00` VIP threshold.

Expected correction:

```ts
order.subtotal >= 100
```

Expected added automated test:

```ts
expect(calculateOrderTotal({ subtotal: 100, tier: 'vip' })).toBe(85)
```

Do not give learners the answer before they complete the review process.

## Recommended pairing

- Learner A: feature author.
- Learner B: peer reviewer.
- Instructor / designated learner: stakeholder acceptance tester.
- Lead Developer or Project Manager: production approver.

## Reviewer commit requirement

Learner B must make a meaningful commit. The intended opportunity is to add or improve the boundary-condition test or make another legitimate improvement discovered during review.

An empty commit does not satisfy the exercise.

## UAT acceptance examples

- VIP $99.99 -> $99.99
- VIP $100.00 -> $85.00
- VIP $150.00 -> $127.50
- Standard $150.00 -> $150.00

## Debrief

Focus the discussion on why:

- integration changes risk,
- UAT must test the integrated artifact,
- CI and AI review solve different problems,
- AI-generated tests still need human judgment,
- production approval is a separate responsibility from authorship.
