import { Animal, ANIMAL_DATABASE, CategoryKey, DrawingDifficulty } from './animals';

export class AnimalGenerator {
  private database: Animal[];

  constructor(database: Animal[] = ANIMAL_DATABASE) {
    this.database = database;
  }

  generate(count: number, category?: CategoryKey | null, difficulty?: DrawingDifficulty | null): Animal[] {
    let availableAnimals = this.database;

    // Apply category filter
    if (category) {
      availableAnimals = availableAnimals.filter(animal => animal.category === category);
    }

    // Apply difficulty filter
    if (difficulty) {
      availableAnimals = availableAnimals.filter(animal => animal.drawingDifficulty === difficulty);
    }

    if (availableAnimals.length < count) {
      throw new Error(`Only ${availableAnimals.length} animals available with the selected filters`);
    }

    // Fisher-Yates avoids the weak randomness of sort(() => Math.random() - 0.5)
    const shuffled = [...availableAnimals];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  getCategoryCounts(difficulty?: DrawingDifficulty | null): Record<CategoryKey, number> {
    const counts = {} as Record<CategoryKey, number>;

    let animalsToCount = this.database;

    // Apply difficulty filter if provided
    if (difficulty) {
      animalsToCount = animalsToCount.filter(animal => animal.drawingDifficulty === difficulty);
    }

    animalsToCount.forEach(animal => {
      counts[animal.category] = (counts[animal.category] || 0) + 1;
    });

    return counts;
  }

  getDifficultyCounts(category?: CategoryKey | null): Record<DrawingDifficulty, number> {
    const counts = {
      easy: 0,
      medium: 0,
      hard: 0
    } as Record<DrawingDifficulty, number>;

    let animalsToCount = this.database;

    // Apply category filter if provided
    if (category) {
      animalsToCount = animalsToCount.filter(animal => animal.category === category);
    }

    animalsToCount.forEach(animal => {
      if (animal.drawingDifficulty) {
        counts[animal.drawingDifficulty]++;
      }
    });

    return counts;
  }

  getTotalCount(): number {
    return this.database.length;
  }
}

