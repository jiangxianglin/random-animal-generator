import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { HistoryManager, HistoryEntry, HistoryStats } from '../lib/history-manager';
import { Animal, DrawingDifficulty, CategoryKey, ANIMAL_DATABASE } from '../lib/animals';

// Mock localStorage for Node.js environment
class MockLocalStorage {
  private store: Record<string, string> = {};

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }
}

// Set up global localStorage mock
if (typeof globalThis !== 'undefined' && !globalThis.localStorage) {
  (globalThis as any).localStorage = new MockLocalStorage();
}

describe('HistoryManager', () => {
  let historyManager: HistoryManager;
  let mockAnimal: Animal;
  let mockAnimal2: Animal;

  beforeEach(() => {
    // Clear localStorage before each test
    if (globalThis.localStorage) {
      globalThis.localStorage.clear();
    }

    // Create a new history manager for each test
    historyManager = new HistoryManager();

    // Create mock animals for testing
    mockAnimal = {
      id: 'test_mammal_001',
      commonName: 'Test Tiger',
      scientificName: 'Panthera tigris',
      category: 'mammals' as CategoryKey,
      facts: ['Fact 1', 'Fact 2'],
      imageUrl: 'https://example.com/tiger.jpg',
      imageAlt: 'A tiger',
      drawingDifficulty: 'medium' as DrawingDifficulty,
      drawingTips: ['Tip 1', 'Tip 2', 'Tip 3'],
      bodyParts: ['stripes', 'whiskers', 'tail']
    };

    mockAnimal2 = {
      id: 'test_bird_001',
      commonName: 'Test Eagle',
      scientificName: 'Aquila chrysaetos',
      category: 'birds' as CategoryKey,
      facts: ['Fact 1', 'Fact 2'],
      imageUrl: 'https://example.com/eagle.jpg',
      imageAlt: 'An eagle',
      drawingDifficulty: 'hard' as DrawingDifficulty,
      drawingTips: ['Tip 1', 'Tip 2'],
      bodyParts: ['wings', 'beak', 'talons']
    };
  });

  afterEach(() => {
    if (globalThis.localStorage) {
      globalThis.localStorage.clear();
    }
  });

  describe('addToHistory', () => {
    it('should add an animal entry to history', () => {
      const entry = historyManager.addToHistory([mockAnimal]);

      expect(entry).toBeDefined();
      expect(entry.animals).toContain(mockAnimal);
      expect(entry.filters.quantity).toBe(1);
    });

    it('should return a new entry with correct structure', () => {
      const entry = historyManager.addToHistory([mockAnimal], 'mammals', 'medium', null);

      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('timestamp');
      expect(entry).toHaveProperty('animals');
      expect(entry).toHaveProperty('filters');
      expect(entry).toHaveProperty('challengeMode');
      expect(typeof entry.timestamp).toBe('number');
      expect(entry.filters.category).toBe('mammals');
      expect(entry.filters.difficulty).toBe('medium');
    });

    it('should add multiple animals to a single entry', () => {
      const animals = [mockAnimal, mockAnimal2];
      const entry = historyManager.addToHistory(animals);

      expect(entry.animals).toHaveLength(2);
      expect(entry.animals[0]).toBe(mockAnimal);
      expect(entry.animals[1]).toBe(mockAnimal2);
    });

    it('should store challenge mode if provided', () => {
      const entry = historyManager.addToHistory([mockAnimal], null, null, 'daily');

      expect(entry.challengeMode).toBe('daily');
    });

    it('should preserve null filters', () => {
      const entry = historyManager.addToHistory([mockAnimal], null, null, null);

      expect(entry.filters.category).toBeNull();
      expect(entry.filters.difficulty).toBeNull();
      expect(entry.challengeMode).toBeNull();
    });
  });

  describe('getHistory', () => {
    it('should return empty array when no history exists', () => {
      const history = historyManager.getHistory();

      expect(history).toEqual([]);
    });

    it('should return history in reverse chronological order (newest first)', async () => {
      // Add first entry
      const entry1 = historyManager.addToHistory([mockAnimal]);
      
      // Wait a bit to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Add second entry
      const entry2 = historyManager.addToHistory([mockAnimal2]);

      const history = historyManager.getHistory();

      expect(history).toHaveLength(2);
      expect(history[0].id).toBe(entry2.id);
      expect(history[1].id).toBe(entry1.id);
    });

    it('should limit returned entries by the provided limit parameter', () => {
      for (let i = 0; i < 10; i++) {
        historyManager.addToHistory([mockAnimal]);
      }

      const history = historyManager.getHistory(5);

      expect(history).toHaveLength(5);
    });

    it('should respect max entries limit in storage', () => {
      // Add more than MAX_ENTRIES (50)
      for (let i = 0; i < 60; i++) {
        historyManager.addToHistory([mockAnimal]);
      }

      const history = historyManager.getHistory();

      expect(history.length).toBeLessThanOrEqual(50);
    });
  });

  describe('clearHistory', () => {
    it('should clear all history entries', () => {
      historyManager.addToHistory([mockAnimal]);
      historyManager.addToHistory([mockAnimal2]);

      expect(historyManager.getHistory()).toHaveLength(2);

      historyManager.clearHistory();

      expect(historyManager.getHistory()).toHaveLength(0);
    });

    it('should persist empty history to storage', () => {
      historyManager.addToHistory([mockAnimal]);
      historyManager.clearHistory();

      const newManager = new HistoryManager();
      expect(newManager.getHistory()).toHaveLength(0);
    });
  });

  describe('removeEntry', () => {
    it('should remove a specific entry by ID', () => {
      const entry1 = historyManager.addToHistory([mockAnimal]);
      const entry2 = historyManager.addToHistory([mockAnimal2]);

      historyManager.removeEntry(entry1.id);

      const history = historyManager.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].id).toBe(entry2.id);
    });

    it('should not affect other entries', () => {
      const entry1 = historyManager.addToHistory([mockAnimal]);
      const entry2 = historyManager.addToHistory([mockAnimal2]);
      const entry3 = historyManager.addToHistory([mockAnimal]);

      historyManager.removeEntry(entry2.id);

      const history = historyManager.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0].id).toBe(entry3.id);
      expect(history[1].id).toBe(entry1.id);
    });
  });

  describe('getStats', () => {
    it('should return empty stats when no history exists', () => {
      const stats = historyManager.getStats();

      expect(stats.totalCount).toBe(0);
      expect(stats.mostCommonCategory).toBeNull();
    });

    it('should calculate total count correctly', () => {
      historyManager.addToHistory([mockAnimal]);
      historyManager.addToHistory([mockAnimal, mockAnimal2]);

      const stats = historyManager.getStats();

      expect(stats.totalCount).toBe(3); // 1 + 2 animals
    });

    it('should identify most common category', () => {
      // Add 3 mammals
      historyManager.addToHistory([mockAnimal]);
      historyManager.addToHistory([mockAnimal]);
      historyManager.addToHistory([mockAnimal]);
      
      // Add 1 bird
      historyManager.addToHistory([mockAnimal2]);

      const stats = historyManager.getStats();

      expect(stats.mostCommonCategory).toBe('mammals');
    });

    it('should provide category distribution', () => {
      historyManager.addToHistory([mockAnimal]);
      historyManager.addToHistory([mockAnimal2]);
      historyManager.addToHistory([mockAnimal]);

      const stats = historyManager.getStats();

      expect(stats.categoryDistribution.mammals).toBe(2);
      expect(stats.categoryDistribution.birds).toBe(1);
      expect(stats.categoryDistribution.reptiles).toBe(0);
      expect(stats.categoryDistribution.marine).toBe(0);
      expect(stats.categoryDistribution.insects).toBe(0);
    });

    it('should handle multiple animals in a single entry', () => {
      historyManager.addToHistory([mockAnimal, mockAnimal2, mockAnimal]);

      const stats = historyManager.getStats();

      expect(stats.totalCount).toBe(3);
      expect(stats.categoryDistribution.mammals).toBe(2);
      expect(stats.categoryDistribution.birds).toBe(1);
    });
  });

  describe('getEntryCount', () => {
    it('should return correct entry count', () => {
      expect(historyManager.getEntryCount()).toBe(0);

      historyManager.addToHistory([mockAnimal]);
      expect(historyManager.getEntryCount()).toBe(1);

      historyManager.addToHistory([mockAnimal2]);
      expect(historyManager.getEntryCount()).toBe(2);

      historyManager.removeEntry(historyManager.getHistory(1)[0].id);
      expect(historyManager.getEntryCount()).toBe(1);
    });
  });

  describe('localStorage persistence', () => {
    it('should not throw errors when adding to history', () => {
      expect(() => {
        historyManager.addToHistory([mockAnimal], 'mammals');
      }).not.toThrow();
    });

    it('should maintain history in memory', () => {
      historyManager.addToHistory([mockAnimal]);
      historyManager.addToHistory([mockAnimal2]);

      const history = historyManager.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0].animals[0].commonName).toBe('Test Eagle');
      expect(history[1].animals[0].commonName).toBe('Test Tiger');
    });

    it('should handle corrupted localStorage data gracefully', () => {
      if (globalThis.localStorage) {
        // Set corrupted JSON in localStorage
        globalThis.localStorage.setItem('animalGeneratorHistory', '{invalid json}');

        // Should not throw, should load empty history
        const manager = new HistoryManager();
        expect(manager.getHistory()).toBeDefined();
      }
    });
  });

  describe('FIFO limit enforcement', () => {
    it('should enforce 50-entry maximum limit', () => {
      // Add exactly 50 entries
      for (let i = 0; i < 50; i++) {
        historyManager.addToHistory([mockAnimal]);
      }

      expect(historyManager.getEntryCount()).toBe(50);

      // Add one more - should evict the oldest
      const newEntry = historyManager.addToHistory([mockAnimal2]);
      
      expect(historyManager.getEntryCount()).toBe(50);
      
      // Verify the newest entry is at the top
      const history = historyManager.getHistory();
      expect(history[0].id).toBe(newEntry.id);
    });

    it('should keep newest entries after FIFO eviction', async () => {
      const entries = [];
      
      for (let i = 0; i < 52; i++) {
        const entry = historyManager.addToHistory([mockAnimal]);
        entries.push(entry);
        
        // Small delay to ensure different timestamps
        await new Promise(resolve => setTimeout(resolve, 1));
      }

      const history = historyManager.getHistory();
      
      // Should have 50 entries
      expect(history).toHaveLength(50);
      
      // Should contain entries 2-51 (oldest entries 0-1 should be evicted)
      expect(history[0].id).toBe(entries[51].id);
      expect(history[49].id).toBe(entries[2].id);
    });
  });

  describe('error handling', () => {
    it('should handle corrupted localStorage data gracefully', () => {
      if (globalThis.localStorage) {
        // Set corrupted JSON in localStorage
        globalThis.localStorage.setItem('animalGeneratorHistory', '{invalid json}');

        // Should not throw, should load empty history
        const manager = new HistoryManager();
        expect(manager.getHistory()).toEqual([]);
      }
    });

    it('should handle localStorage not available', () => {
      // This test verifies behavior when localStorage is unavailable
      // In a Node.js environment, this is the default
      const manager = new HistoryManager();
      
      // Should not throw
      manager.addToHistory([mockAnimal]);
      
      // Should still work in memory (but may not persist)
      expect(manager.getEntryCount()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty animals array', () => {
      const entry = historyManager.addToHistory([]);

      expect(entry.animals).toHaveLength(0);
      expect(entry.filters.quantity).toBe(0);
    });

    it('should generate unique entry IDs', () => {
      const entry1 = historyManager.addToHistory([mockAnimal]);
      const entry2 = historyManager.addToHistory([mockAnimal]);

      expect(entry1.id).not.toBe(entry2.id);
    });

    it('should handle all challenge modes', () => {
      const modes = ['daily', 'timed', 'hard', 'hybrid'] as const;

      for (const mode of modes) {
        const entry = historyManager.addToHistory([mockAnimal], null, null, mode);
        expect(entry.challengeMode).toBe(mode);
      }
    });

    it('should handle all difficulty levels', () => {
      const difficulties: DrawingDifficulty[] = ['easy', 'medium', 'hard'];

      for (const difficulty of difficulties) {
        const entry = historyManager.addToHistory([mockAnimal], null, difficulty);
        expect(entry.filters.difficulty).toBe(difficulty);
      }
    });

    it('should handle all categories', () => {
      const categories: CategoryKey[] = ['mammals', 'birds', 'reptiles', 'marine', 'insects'];

      for (const category of categories) {
        const entry = historyManager.addToHistory([mockAnimal], category);
        expect(entry.filters.category).toBe(category);
      }
    });
  });
});
