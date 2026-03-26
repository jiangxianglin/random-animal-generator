import { Animal, DrawingDifficulty, CategoryKey } from './animals';

/**
 * Represents a single history entry of generated animals
 */
export interface HistoryEntry {
  id: string;              // Unique entry ID (timestamp-based)
  timestamp: number;       // Unix timestamp
  animals: Animal[];       // Generated animals
  filters: {
    category: CategoryKey | null;
    difficulty: DrawingDifficulty | null;
    quantity: number;
  };
  challengeMode: string | null; // Challenge mode if applicable ('daily', 'timed', 'hard', 'hybrid', or null)
}

/**
 * History statistics
 */
export interface HistoryStats {
  totalCount: number;
  mostCommonCategory: CategoryKey | null;
  categoryDistribution: Record<CategoryKey, number>;
}

/**
 * Manages generation history with localStorage persistence
 * Stores up to 50 entries using FIFO eviction when limit is reached
 */
export class HistoryManager {
  private readonly STORAGE_KEY = 'animalGeneratorHistory';
  private readonly MAX_ENTRIES = 50;
  private history: HistoryEntry[] = [];

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Check if localStorage is available
   */
  private static isStorageAvailable(): boolean {
    try {
      if (typeof window === 'undefined') {
        return false;
      }

      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Add animals to history
   * @param animals Array of generated animals
   * @param category Category filter applied
   * @param difficulty Difficulty filter applied
   * @param challengeMode Challenge mode if applicable
   */
  addToHistory(
    animals: Animal[],
    category: CategoryKey | null = null,
    difficulty: DrawingDifficulty | null = null,
    challengeMode: string | null = null
  ): HistoryEntry {
    // Create new history entry
    const entry: HistoryEntry = {
      id: this.generateEntryId(),
      timestamp: Date.now(),
      animals,
      filters: {
        category,
        difficulty,
        quantity: animals.length
      },
      challengeMode
    };

    // Add to beginning of array (newest first)
    this.history.unshift(entry);

    // Enforce max entries limit (FIFO)
    if (this.history.length > this.MAX_ENTRIES) {
      this.history = this.history.slice(0, this.MAX_ENTRIES);
    }

    // Persist to storage
    this.saveToStorage();

    return entry;
  }

  /**
   * Get history entries in reverse chronological order (newest first)
   * @param limit Maximum entries to return (default: 50)
   * @returns Array of history entries
   */
  getHistory(limit: number = this.MAX_ENTRIES): HistoryEntry[] {
    return this.history.slice(0, limit);
  }

  /**
   * Clear all history entries
   */
  clearHistory(): void {
    this.history = [];
    this.saveToStorage();
  }

  /**
   * Remove specific entry from history
   * @param entryId History entry ID to remove
   */
  removeEntry(entryId: string): void {
    this.history = this.history.filter(entry => entry.id !== entryId);
    this.saveToStorage();
  }

  /**
   * Get history statistics
   * @returns Statistics about generated animals
   */
  getStats(): HistoryStats {
    const categoryDistribution: Record<CategoryKey, number> = {
      mammals: 0,
      birds: 0,
      reptiles: 0,
      marine: 0,
      insects: 0
    };

    // Count total animals and category distribution
    let totalCount = 0;
    for (const entry of this.history) {
      for (const animal of entry.animals) {
        totalCount++;
        categoryDistribution[animal.category]++;
      }
    }

    // Find most common category
    let mostCommonCategory: CategoryKey | null = null;
    let maxCount = 0;
    for (const [category, count] of Object.entries(categoryDistribution)) {
      if (count > maxCount) {
        maxCount = count;
        mostCommonCategory = category as CategoryKey;
      }
    }

    return {
      totalCount,
      mostCommonCategory,
      categoryDistribution
    };
  }

  /**
   * Get total number of history entries
   */
  getEntryCount(): number {
    return this.history.length;
  }

  // Private helper methods

  /**
   * Generate unique entry ID based on timestamp
   */
  private generateEntryId(): string {
    return `history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Load history from localStorage
   */
  private loadFromStorage(): void {
    try {
      if (!HistoryManager.isStorageAvailable()) {
        return; // Skip in non-browser environments
      }

      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as HistoryEntry[];
        this.history = Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
      this.history = [];
    }
  }

  /**
   * Save history to localStorage
   */
  private saveToStorage(): void {
    try {
      if (!HistoryManager.isStorageAvailable()) {
        return; // Skip in non-browser environments
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.history));
    } catch (error) {
      console.error('Failed to save history to localStorage:', error);
      // Handle quota exceeded or other storage errors
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        // Try to clear oldest entries and retry
        if (this.history.length > 1) {
          this.history = this.history.slice(0, Math.floor(this.history.length / 2));
          try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.history));
          } catch (retryError) {
            console.error('Failed to save history after cleanup:', retryError);
          }
        }
      }
    }
  }
}
