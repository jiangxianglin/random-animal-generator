# Property-Based Tests for Random Animal Generator

This directory contains property-based tests (PBT) using [fast-check](https://github.com/dubzzz/fast-check) to validate the correctness of the animal database.

## What are Property-Based Tests?

Property-based testing is a testing methodology where you define properties (invariants) that should hold true for all valid inputs, rather than testing specific examples. The testing framework then generates many random test cases to try to find counterexamples that violate these properties.

## Test Files

### `database-validation.test.ts`

This file contains property-based tests that validate the animal database meets all requirements from the specification.

#### Property 23: Drawing Tips Count Validation
**Validates:** Requirements 2.7

Tests that every animal in the database has exactly 2-3 drawing tips. This ensures artists always have actionable guidance for drawing each animal.

```typescript
// For any animal in the database:
animal.drawingTips.length >= 2 && animal.drawingTips.length <= 3
```

#### Property 23 (Extended): Drawing Tips Word Count
**Validates:** Requirements 2.7

Tests that each drawing tip is approximately 10-15 words (with ±3 word tolerance). This ensures tips are concise and actionable.

```typescript
// For any drawing tip:
wordCount >= 7 && wordCount <= 18
```

#### Property 24: Body Parts Presence
**Validates:** Requirements 2.8

Tests that every animal has 3-5 distinctive body parts listed. These are used for the hybrid animal mode where body parts from two animals are combined.

```typescript
// For any animal in the database:
animal.bodyParts.length >= 3 && animal.bodyParts.length <= 5
```

#### Property 24 (Extended): Body Parts Non-Empty
**Validates:** Requirements 2.8

Tests that each body part is a non-empty string, ensuring data quality.

```typescript
// For any body part:
typeof part === 'string' && part.trim().length > 0
```

#### Property 25: Difficulty Value Validation
**Validates:** Requirements 2.6

Tests that every animal has a valid drawing difficulty value: 'easy', 'medium', or 'hard'.

```typescript
// For any animal in the database:
['easy', 'medium', 'hard'].includes(animal.drawingDifficulty)
```

#### Property 25 (Extended): Difficulty Distribution
**Validates:** Requirements 2.9

Tests that the database has approximately the target difficulty distribution:
- 33% Easy animals (±8% tolerance)
- 42% Medium animals (±8% tolerance)
- 25% Hard animals (±8% tolerance)

This ensures a balanced progression path for artists at different skill levels.

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Test Output

When tests pass, you'll see:
```
✓ Property 23: All animals should have 2-3 drawing tips
✓ Property 23 (Extended): Each drawing tip should be approximately 10-15 words
✓ Property 24: All animals should have 3-5 distinctive body parts
✓ Property 24 (Extended): Each body part should be a non-empty string
✓ Property 25: All animals should have valid difficulty values
✓ Property 25 (Extended): Difficulty distribution should match target ratios
```

When a property fails, fast-check will show:
- The counterexample that violated the property
- The seed for reproducing the failure
- The shrunk version (simplified failing case)

## Why Property-Based Testing?

1. **Comprehensive Coverage**: Tests all animals in the database, not just a few examples
2. **Catches Edge Cases**: Automatically finds data quality issues
3. **Living Documentation**: Properties serve as executable specifications
4. **Regression Prevention**: Ensures new animals added to the database meet requirements

## Adding New Properties

When adding new requirements to the animal database:

1. Define the property in natural language
2. Implement it as a test using `fc.assert` and `fc.property`
3. Reference the requirement number in comments
4. Add examples if needed for specific edge cases

Example:
```typescript
it('Property X: Description of what should be true', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...animalsData),
      (animal) => {
        // Return true if property holds, false otherwise
        return /* your validation logic */;
      }
    ),
    { verbose: true }
  );
});
```
