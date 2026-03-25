import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import animalsData from '../lib/animals-data.json';

/**
 * Property-Based Tests for Database Validation
 * 
 * These tests validate that all animals in the database meet the required
 * drawing metadata specifications from Requirements 2.6, 2.7, and 2.8.
 */

describe('Database Validation - Property-Based Tests', () => {
  /**
   * Property 23: Drawing Tips Count Validation
   * Validates: Requirements 2.7
   * 
   * For any animal in the database, it should have 2-3 drawing tips.
   */
  it('Property 23: All animals should have 2-3 drawing tips', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...animalsData),
        (animal) => {
          const tipCount = animal.drawingTips?.length || 0;
          return tipCount >= 2 && tipCount <= 3;
        }
      ),
      {
        verbose: true,
        examples: [
          // Test with a few specific animals to ensure they pass
          [animalsData[0]],
          [animalsData[Math.floor(animalsData.length / 2)]],
          [animalsData[animalsData.length - 1]],
        ],
      }
    );
  });

  /**
   * Property 23 (Extended): Drawing Tips Word Count Validation
   * Validates: Requirements 2.7
   * 
   * For any animal in the database, each drawing tip should be approximately 10-15 words.
   * We allow a tolerance of ±3 words to account for natural language variation.
   */
  it('Property 23 (Extended): Each drawing tip should be approximately 10-15 words', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...animalsData),
        (animal) => {
          if (!animal.drawingTips || animal.drawingTips.length === 0) {
            return false;
          }

          return animal.drawingTips.every((tip: string) => {
            const wordCount = tip.trim().split(/\s+/).length;
            // Allow 7-18 words (10-15 ±3 words tolerance)
            return wordCount >= 7 && wordCount <= 18;
          });
        }
      ),
      {
        verbose: true,
      }
    );
  });

  /**
   * Property 24: Body Parts Presence
   * Validates: Requirements 2.8
   * 
   * For any animal in the database, it should have 3-5 distinctive body parts.
   */
  it('Property 24: All animals should have 3-5 distinctive body parts', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...animalsData),
        (animal) => {
          const bodyPartsCount = animal.bodyParts?.length || 0;
          return bodyPartsCount >= 3 && bodyPartsCount <= 5;
        }
      ),
      {
        verbose: true,
        examples: [
          // Test with a few specific animals to ensure they pass
          [animalsData[0]],
          [animalsData[Math.floor(animalsData.length / 2)]],
          [animalsData[animalsData.length - 1]],
        ],
      }
    );
  });

  /**
   * Property 24 (Extended): Body Parts Non-Empty Validation
   * Validates: Requirements 2.8
   * 
   * For any animal in the database, each body part should be a non-empty string.
   */
  it('Property 24 (Extended): Each body part should be a non-empty string', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...animalsData),
        (animal) => {
          if (!animal.bodyParts || animal.bodyParts.length === 0) {
            return false;
          }

          return animal.bodyParts.every((part: string) => {
            return typeof part === 'string' && part.trim().length > 0;
          });
        }
      ),
      {
        verbose: true,
      }
    );
  });

  /**
   * Property 25: Difficulty Value Validation
   * Validates: Requirements 2.6
   * 
   * For any animal in the database, the drawing difficulty should be one of:
   * 'easy', 'medium', or 'hard'.
   */
  it('Property 25: All animals should have valid difficulty values', () => {
    const validDifficulties: DrawingDifficulty[] = ['easy', 'medium', 'hard'];

    fc.assert(
      fc.property(
        fc.constantFrom(...animalsData),
        (animal) => {
          return (
            animal.drawingDifficulty !== undefined &&
            validDifficulties.includes(animal.drawingDifficulty as DrawingDifficulty)
          );
        }
      ),
      {
        verbose: true,
        examples: [
          // Test with a few specific animals to ensure they pass
          [animalsData[0]],
          [animalsData[Math.floor(animalsData.length / 2)]],
          [animalsData[animalsData.length - 1]],
        ],
      }
    );
  });

  /**
   * Property 25 (Extended): Difficulty Distribution Validation
   * Validates: Requirements 2.9
   * 
   * The database should have approximately:
   * - 33% Easy animals
   * - 42% Medium animals
   * - 25% Hard animals
   * 
   * We allow a tolerance of ±8% for each category to account for database size.
   */
  it('Property 25 (Extended): Difficulty distribution should match target ratios', () => {
    const totalAnimals = animalsData.length;
    const difficultyCounts = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    animalsData.forEach((animal) => {
      if (animal.drawingDifficulty) {
        difficultyCounts[animal.drawingDifficulty as DrawingDifficulty]++;
      }
    });

    const easyPercentage = (difficultyCounts.easy / totalAnimals) * 100;
    const mediumPercentage = (difficultyCounts.medium / totalAnimals) * 100;
    const hardPercentage = (difficultyCounts.hard / totalAnimals) * 100;

    // Target: 33% Easy (±8%), 42% Medium (±8%), 25% Hard (±8%)
    expect(easyPercentage).toBeGreaterThanOrEqual(25);
    expect(easyPercentage).toBeLessThanOrEqual(41);

    expect(mediumPercentage).toBeGreaterThanOrEqual(34);
    expect(mediumPercentage).toBeLessThanOrEqual(50);

    expect(hardPercentage).toBeGreaterThanOrEqual(17);
    expect(hardPercentage).toBeLessThanOrEqual(33);
  });
});

/**
 * Additional Validation Tests (Non-PBT)
 * 
 * These tests validate overall database structure and completeness.
 */
describe('Database Validation - Structure Tests', () => {
  it('should have at least 120 animals in the database', () => {
    expect(animalsData.length).toBeGreaterThanOrEqual(120);
  });

  it('should have all required fields for each animal', () => {
    animalsData.forEach((animal, index) => {
      expect(animal.id, `Animal at index ${index} missing id`).toBeDefined();
      expect(animal.commonName, `Animal at index ${index} missing commonName`).toBeDefined();
      expect(animal.scientificName, `Animal at index ${index} missing scientificName`).toBeDefined();
      expect(animal.category, `Animal at index ${index} missing category`).toBeDefined();
      expect(animal.facts, `Animal at index ${index} missing facts`).toBeDefined();
      expect(animal.imageUrl, `Animal at index ${index} missing imageUrl`).toBeDefined();
      expect(animal.imageAlt, `Animal at index ${index} missing imageAlt`).toBeDefined();
      expect(animal.drawingDifficulty, `Animal at index ${index} missing drawingDifficulty`).toBeDefined();
      expect(animal.drawingTips, `Animal at index ${index} missing drawingTips`).toBeDefined();
      expect(animal.bodyParts, `Animal at index ${index} missing bodyParts`).toBeDefined();
    });
  });

  it('should have unique IDs for all animals', () => {
    const ids = animalsData.map((animal) => animal.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have animals from all 5 major categories', () => {
    const categories = new Set(animalsData.map((animal) => animal.category));
    expect(categories.has('mammals')).toBe(true);
    expect(categories.has('birds')).toBe(true);
    expect(categories.has('reptiles')).toBe(true);
    expect(categories.has('marine')).toBe(true);
    expect(categories.has('insects')).toBe(true);
  });
});
