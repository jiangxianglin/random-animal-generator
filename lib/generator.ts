import { Animal, ANIMAL_DATABASE, CategoryKey } from './animals';

export class AnimalGenerator {
  private database: Animal[];

  constructor(database: Animal[] = ANIMAL_DATABASE) {
    this.database = database;
  }

  generate(count: number, category?: CategoryKey | null): Animal[] {
    let availableAnimals = this.database;

    if (category) {
      availableAnimals = this.database.filter(animal => animal.category === category);
    }

    if (availableAnimals.length < count) {
      throw new Error(`Only ${availableAnimals.length} animals available in this category`);
    }

    // Shuffle and select unique animals
    const shuffled = [...availableAnimals].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  getCategoryCounts(): Record<CategoryKey, number> {
    const counts = {} as Record<CategoryKey, number>;
    
    this.database.forEach(animal => {
      counts[animal.category] = (counts[animal.category] || 0) + 1;
    });

    return counts;
  }

  getTotalCount(): number {
    return this.database.length;
  }
}
