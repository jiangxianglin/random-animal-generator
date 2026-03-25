import { Animal, ANIMAL_DATABASE, DrawingDifficulty } from './animals';

export type ChallengeMode = 'daily' | 'timed' | 'hard' | 'hybrid';

export interface HybridAnimal {
  id: string;
  commonName: string;
  sourceAnimals: [Animal, Animal];
  combinedBodyParts: string[];
  drawingTips: string[];
  imageUrls: [string, string];
  difficulty: DrawingDifficulty;
}

export interface ChallengeState {
  mode: ChallengeMode;
  animal: Animal | HybridAnimal;
  startTime: number;
  duration: number;
  remainingTime: number;
  isCompleted: boolean;
  completedDate?: string;
}

export interface TimerCallback {
  onTick: (remainingSeconds: number) => void;
  onComplete: () => void;
}

export class ChallengeManager {
  private database: Animal[];
  private timerInterval: NodeJS.Timeout | null = null;
  private currentChallenge: ChallengeState | null = null;

  constructor(database: Animal[] = ANIMAL_DATABASE) {
    this.database = database;
  }

  /**
   * Get daily challenge animal (deterministic based on date)
   * Same animal for all users on the same day
   */
  getDailyChallenge(): Animal {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Use date as seed for deterministic selection
    const seed = this.hashString(dateString);
    const index = seed % this.database.length;
    
    return this.database[index];
  }

  /**
   * Start timed challenge with countdown timer
   * @param duration Duration in seconds (default: 600 = 10 minutes)
   * @param difficulty Optional difficulty filter
   * @param callbacks Timer callbacks for UI updates
   */
  startTimedChallenge(
    duration: number = 600,
    difficulty: DrawingDifficulty | null = null,
    callbacks?: TimerCallback
  ): ChallengeState {
    // Stop any existing timer
    this.stopTimer();

    // Select animal
    let availableAnimals = this.database;
    if (difficulty) {
      availableAnimals = availableAnimals.filter(a => a.drawingDifficulty === difficulty);
    }

    if (availableAnimals.length === 0) {
      throw new Error('No animals available with the selected difficulty');
    }

    const animal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];

    // Create challenge state
    this.currentChallenge = {
      mode: 'timed',
      animal,
      startTime: Date.now(),
      duration,
      remainingTime: duration,
      isCompleted: false
    };

    // Start countdown timer
    if (callbacks) {
      this.timerInterval = setInterval(() => {
        if (!this.currentChallenge) return;

        const elapsed = Math.floor((Date.now() - this.currentChallenge.startTime) / 1000);
        this.currentChallenge.remainingTime = Math.max(0, duration - elapsed);

        callbacks.onTick(this.currentChallenge.remainingTime);

        if (this.currentChallenge.remainingTime === 0) {
          this.currentChallenge.isCompleted = true;
          this.stopTimer();
          callbacks.onComplete();
        }
      }, 1000);
    }

    return this.currentChallenge;
  }

  /**
   * Generate hard mode animal (only hard difficulty)
   */
  generateHardMode(): Animal {
    const hardAnimals = this.database.filter(a => a.drawingDifficulty === 'hard');

    if (hardAnimals.length === 0) {
      throw new Error('No hard difficulty animals available');
    }

    return hardAnimals[Math.floor(Math.random() * hardAnimals.length)];
  }

  /**
   * Generate hybrid animal (combine body parts from 2 animals)
   */
  generateHybridAnimal(): HybridAnimal {
    if (this.database.length < 2) {
      throw new Error('Need at least 2 animals to create a hybrid');
    }

    // Select two distinct animals randomly
    const shuffled = [...this.database].sort(() => Math.random() - 0.5);
    const animal1 = shuffled[0];
    const animal2 = shuffled[1];

    // Combine body parts from both animals
    const combinedBodyParts: string[] = [];
    
    // Take 2-3 parts from each animal
    const parts1Count = Math.floor(Math.random() * 2) + 2; // 2-3
    const parts2Count = Math.floor(Math.random() * 2) + 2; // 2-3
    
    const parts1 = animal1.bodyParts.slice(0, Math.min(parts1Count, animal1.bodyParts.length));
    const parts2 = animal2.bodyParts.slice(0, Math.min(parts2Count, animal2.bodyParts.length));
    
    combinedBodyParts.push(...parts1, ...parts2);

    // Combine drawing tips
    const combinedTips: string[] = [];
    combinedTips.push(`Combine ${animal1.commonName}'s ${parts1[0]} with ${animal2.commonName}'s ${parts2[0]}`);
    
    if (animal1.drawingTips.length > 0) {
      combinedTips.push(animal1.drawingTips[0]);
    }
    if (animal2.drawingTips.length > 0) {
      combinedTips.push(animal2.drawingTips[0]);
    }

    // Use higher difficulty
    const difficulty = this.getHigherDifficulty(animal1.drawingDifficulty, animal2.drawingDifficulty);

    return {
      id: `hybrid_${animal1.id}_${animal2.id}`,
      commonName: `${animal1.commonName}-${animal2.commonName}`,
      sourceAnimals: [animal1, animal2],
      combinedBodyParts,
      drawingTips: combinedTips.slice(0, 3), // Max 3 tips
      imageUrls: [animal1.imageUrl, animal2.imageUrl],
      difficulty
    };
  }

  /**
   * Check if daily challenge was completed today
   */
  isDailyCompleted(): boolean {
    const completedDate = this.getStoredCompletionDate();
    if (!completedDate) return false;

    const today = new Date().toISOString().split('T')[0];
    return completedDate === today;
  }

  /**
   * Mark daily challenge as completed
   */
  markDailyCompleted(): void {
    const today = new Date().toISOString().split('T')[0];
    this.storeCompletionDate(today);
  }

  /**
   * Stop the current timer
   */
  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  /**
   * Get current challenge state
   */
  getCurrentChallenge(): ChallengeState | null {
    return this.currentChallenge;
  }

  /**
   * Clear current challenge
   */
  clearChallenge(): void {
    this.stopTimer();
    this.currentChallenge = null;
  }

  // Private helper methods

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private getHigherDifficulty(d1: DrawingDifficulty, d2: DrawingDifficulty): DrawingDifficulty {
    const difficultyOrder: Record<DrawingDifficulty, number> = {
      easy: 1,
      medium: 2,
      hard: 3
    };

    return difficultyOrder[d1] >= difficultyOrder[d2] ? d1 : d2;
  }

  private getStoredCompletionDate(): string | null {
    if (typeof window === 'undefined' && typeof global.localStorage === 'undefined') return null;
    
    try {
      const storage = typeof window !== 'undefined' ? localStorage : global.localStorage;
      return storage.getItem('dailyChallengeCompletedDate');
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return null;
    }
  }

  private storeCompletionDate(date: string): void {
    if (typeof window === 'undefined' && typeof global.localStorage === 'undefined') return;
    
    try {
      const storage = typeof window !== 'undefined' ? localStorage : global.localStorage;
      storage.setItem('dailyChallengeCompletedDate', date);
    } catch (error) {
      console.error('Failed to write to localStorage:', error);
    }
  }
}
