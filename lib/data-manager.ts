const STORAGE_KEYS = [
  'animalGeneratorHistory',
  'challengeState',
  'dailyChallengeCompleted',
  'challengeTimers',
  'userPreferences'
];

export class DataManager {
  static clearAllData(): { success: boolean; error?: string } {
    try {
      if (typeof window === 'undefined') {
        return { success: false, error: 'Cannot clear data on server' };
      }

      for (const key of STORAGE_KEYS) {
        try {
          localStorage.removeItem(key);
        } catch {
          // Continue with other keys if one fails
        }
      }

      sessionStorage.clear();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  static getStorageSize(): { used: number; available: boolean } {
    try {
      let used = 0;
      for (const key of STORAGE_KEYS) {
        const item = localStorage.getItem(key);
        if (item) {
          used += item.length * 2; // UTF-16 characters = 2 bytes
        }
      }
      return { used, available: true };
    } catch {
      return { used: 0, available: false };
    }
  }

  static isLocalStorageAvailable(): boolean {
    try {
      if (typeof window === 'undefined') {
        return false;
      }
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}
