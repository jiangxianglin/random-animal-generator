import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ChallengeManager } from '@/lib/challenge-manager';
import { Animal, DrawingDifficulty } from '@/lib/animals';

// Mock animal database for testing
const mockAnimals: Animal[] = [
  {
    id: 'test_001',
    commonName: 'Test Lion',
    scientificName: 'Panthera leo testus',
    category: 'mammals',
    facts: ['Fact 1', 'Fact 2'],
    imageUrl: 'https://example.com/lion.jpg',
    imageAlt: 'Test lion',
    drawingDifficulty: 'easy',
    drawingTips: ['Tip 1', 'Tip 2'],
    bodyParts: ['mane', 'paws', 'tail']
  },
  {
    id: 'test_002',
    commonName: 'Test Eagle',
    scientificName: 'Aquila testus',
    category: 'birds',
    facts: ['Fact 1', 'Fact 2'],
    imageUrl: 'https://example.com/eagle.jpg',
    imageAlt: 'Test eagle',
    drawingDifficulty: 'medium',
    drawingTips: ['Tip 1', 'Tip 2', 'Tip 3'],
    bodyParts: ['wings', 'beak', 'talons', 'feathers']
  },
  {
    id: 'test_003',
    commonName: 'Test Dragon',
    scientificName: 'Draco testus',
    category: 'reptiles',
    facts: ['Fact 1', 'Fact 2'],
    imageUrl: 'https://example.com/dragon.jpg',
    imageAlt: 'Test dragon',
    drawingDifficulty: 'hard',
    drawingTips: ['Tip 1', 'Tip 2'],
    bodyParts: ['scales', 'wings', 'claws', 'horns', 'tail']
  }
];

describe('ChallengeManager', () => {
  let manager: ChallengeManager;

  beforeEach(() => {
    manager = new ChallengeManager(mockAnimals);
    // Clear localStorage before each test
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  });

  afterEach(() => {
    manager.stopTimer();
  });

  describe('getDailyChallenge', () => {
    it('should return an animal from the database', () => {
      const animal = manager.getDailyChallenge();
      expect(animal).toBeDefined();
      expect(mockAnimals.some(a => a.id === animal.id)).toBe(true);
    });

    it('should return the same animal when called multiple times on the same day', () => {
      const animal1 = manager.getDailyChallenge();
      const animal2 = manager.getDailyChallenge();
      const animal3 = manager.getDailyChallenge();
      
      expect(animal1.id).toBe(animal2.id);
      expect(animal2.id).toBe(animal3.id);
    });
  });

  describe('startTimedChallenge', () => {
    it('should create a timed challenge with default duration', () => {
      const challenge = manager.startTimedChallenge();
      
      expect(challenge).toBeDefined();
      expect(challenge.mode).toBe('timed');
      expect(challenge.duration).toBe(600);
      expect(challenge.remainingTime).toBe(600);
      expect(challenge.isCompleted).toBe(false);
      expect(mockAnimals.some(a => a.id === challenge.animal.id)).toBe(true);
    });

    it('should create a timed challenge with custom duration', () => {
      const challenge = manager.startTimedChallenge(300);
      
      expect(challenge.duration).toBe(300);
      expect(challenge.remainingTime).toBe(300);
    });

    it('should filter by difficulty when specified', () => {
      const challenge = manager.startTimedChallenge(600, 'hard');
      
      expect((challenge.animal as Animal).drawingDifficulty).toBe('hard');
    });

    it('should throw error when no animals match difficulty filter', () => {
      const emptyManager = new ChallengeManager([]);
      
      expect(() => {
        emptyManager.startTimedChallenge(600, 'easy');
      }).toThrow('No animals available with the selected difficulty');
    });

    it('should call onTick callback during countdown', async () => {
      const callbacks = {
        onTick: vi.fn(),
        onComplete: vi.fn()
      };

      manager.startTimedChallenge(2, null, callbacks);

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      expect(callbacks.onTick).toHaveBeenCalled();
      manager.stopTimer();
    });
  });

  describe('generateHardMode', () => {
    it('should return only hard difficulty animals', () => {
      const animal = manager.generateHardMode();
      
      expect(animal).toBeDefined();
      expect(animal.drawingDifficulty).toBe('hard');
    });

    it('should throw error when no hard animals available', () => {
      const easyManager = new ChallengeManager([mockAnimals[0]]); // Only easy animal
      
      expect(() => {
        easyManager.generateHardMode();
      }).toThrow('No hard difficulty animals available');
    });
  });

  describe('generateHybridAnimal', () => {
    it('should combine two distinct animals', () => {
      const hybrid = manager.generateHybridAnimal();
      
      expect(hybrid).toBeDefined();
      expect(hybrid.sourceAnimals).toHaveLength(2);
      expect(hybrid.sourceAnimals[0].id).not.toBe(hybrid.sourceAnimals[1].id);
    });

    it('should have combined body parts from both sources', () => {
      const hybrid = manager.generateHybridAnimal();
      
      expect(hybrid.combinedBodyParts.length).toBeGreaterThan(0);
      
      // Check that at least one part from each source is included
      const parts1 = hybrid.sourceAnimals[0].bodyParts;
      const parts2 = hybrid.sourceAnimals[1].bodyParts;
      
      const hasParts1 = parts1.some(part => hybrid.combinedBodyParts.includes(part));
      const hasParts2 = parts2.some(part => hybrid.combinedBodyParts.includes(part));
      
      expect(hasParts1).toBe(true);
      expect(hasParts2).toBe(true);
    });

    it('should have a combined name', () => {
      const hybrid = manager.generateHybridAnimal();
      
      expect(hybrid.commonName).toContain('-');
      expect(hybrid.commonName).toContain(hybrid.sourceAnimals[0].commonName);
      expect(hybrid.commonName).toContain(hybrid.sourceAnimals[1].commonName);
    });

    it('should have drawing tips', () => {
      const hybrid = manager.generateHybridAnimal();
      
      expect(hybrid.drawingTips).toBeDefined();
      expect(hybrid.drawingTips.length).toBeGreaterThan(0);
      expect(hybrid.drawingTips.length).toBeLessThanOrEqual(3);
    });

    it('should have both image URLs', () => {
      const hybrid = manager.generateHybridAnimal();
      
      expect(hybrid.imageUrls).toHaveLength(2);
      expect(hybrid.imageUrls[0]).toBe(hybrid.sourceAnimals[0].imageUrl);
      expect(hybrid.imageUrls[1]).toBe(hybrid.sourceAnimals[1].imageUrl);
    });

    it('should use the higher difficulty of the two animals', () => {
      const hybrid = manager.generateHybridAnimal();
      
      const diff1 = hybrid.sourceAnimals[0].drawingDifficulty;
      const diff2 = hybrid.sourceAnimals[1].drawingDifficulty;
      
      const difficultyOrder: Record<DrawingDifficulty, number> = {
        easy: 1,
        medium: 2,
        hard: 3
      };
      
      const expectedDifficulty = difficultyOrder[diff1] >= difficultyOrder[diff2] ? diff1 : diff2;
      expect(hybrid.difficulty).toBe(expectedDifficulty);
    });

    it('should throw error when less than 2 animals available', () => {
      const singleManager = new ChallengeManager([mockAnimals[0]]);
      
      expect(() => {
        singleManager.generateHybridAnimal();
      }).toThrow('Need at least 2 animals to create a hybrid');
    });
  });

  describe('isDailyCompleted and markDailyCompleted', () => {
    beforeEach(() => {
      // Mock localStorage for Node environment
      if (typeof window === 'undefined') {
        global.localStorage = {
          getItem: vi.fn(),
          setItem: vi.fn(),
          removeItem: vi.fn(),
          clear: vi.fn(),
          length: 0,
          key: vi.fn()
        } as any;
      }
    });

    it('should return false when no completion date is stored', () => {
      (global.localStorage.getItem as any).mockReturnValue(null);
      expect(manager.isDailyCompleted()).toBe(false);
    });

    it('should return true after marking as completed today', () => {
      const today = new Date().toISOString().split('T')[0];
      let storedValue: string | null = null;
      
      (global.localStorage.setItem as any).mockImplementation((key: string, value: string) => {
        storedValue = value;
      });
      
      (global.localStorage.getItem as any).mockImplementation(() => storedValue);
      
      manager.markDailyCompleted();
      expect(manager.isDailyCompleted()).toBe(true);
    });

    it('should return false if completion date is from a previous day', () => {
      // Mock localStorage to return yesterday's date
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];
      
      (global.localStorage.getItem as any).mockReturnValue(yesterdayString);
      
      expect(manager.isDailyCompleted()).toBe(false);
    });
  });

  describe('stopTimer', () => {
    it('should stop the timer', () => {
      const callbacks = {
        onTick: vi.fn(),
        onComplete: vi.fn()
      };

      manager.startTimedChallenge(10, null, callbacks);
      manager.stopTimer();
      
      const tickCountBefore = callbacks.onTick.mock.calls.length;
      
      // Wait and verify no more ticks
      setTimeout(() => {
        const tickCountAfter = callbacks.onTick.mock.calls.length;
        expect(tickCountAfter).toBe(tickCountBefore);
      }, 2000);
    });
  });

  describe('getCurrentChallenge', () => {
    it('should return null when no challenge is active', () => {
      expect(manager.getCurrentChallenge()).toBeNull();
    });

    it('should return current challenge state', () => {
      const challenge = manager.startTimedChallenge();
      const current = manager.getCurrentChallenge();
      
      expect(current).toBe(challenge);
    });
  });

  describe('clearChallenge', () => {
    it('should clear the current challenge', () => {
      manager.startTimedChallenge();
      expect(manager.getCurrentChallenge()).not.toBeNull();
      
      manager.clearChallenge();
      expect(manager.getCurrentChallenge()).toBeNull();
    });
  });
});
