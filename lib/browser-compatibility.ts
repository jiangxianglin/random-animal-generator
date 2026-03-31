export interface BrowserCompatibility {
  isLocalStorageAvailable: boolean;
  isClipboardApiAvailable: boolean;
  isIndexedDbAvailable: boolean;
  isModernBrowser: boolean;
  unsupportedFeatures: string[];
}

export function checkBrowserCompatibility(): BrowserCompatibility {
  const unsupportedFeatures: string[] = [];
  
  let isLocalStorageAvailable = false;
  let isClipboardApiAvailable = false;
  let isIndexedDbAvailable = false;
  let isModernBrowser = true;

  if (typeof window !== 'undefined') {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      isLocalStorageAvailable = true;
    } catch {
      unsupportedFeatures.push('localStorage');
    }

    try {
      isClipboardApiAvailable = !!(
        navigator.clipboard && 
        navigator.clipboard.writeText && 
        typeof navigator.clipboard.writeText === 'function'
      );
      if (!isClipboardApiAvailable) {
        unsupportedFeatures.push('Clipboard API');
      }
    } catch {
      unsupportedFeatures.push('Clipboard API');
    }

    try {
      isIndexedDbAvailable = !!window.indexedDB;
      if (!isIndexedDbAvailable) {
        unsupportedFeatures.push('IndexedDB');
      }
    } catch {
      unsupportedFeatures.push('IndexedDB');
    }

    const ua = navigator.userAgent;
    const isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    const isOldEdge = ua.indexOf('Edge/') > -1 && parseInt(ua.split('Edge/')[1], 10) < 79;
    
    isModernBrowser = !isIE && !isOldEdge;
    if (!isModernBrowser) {
      unsupportedFeatures.push('Modern browser features');
    }
  } else {
    isModernBrowser = false;
  }

  return {
    isLocalStorageAvailable,
    isClipboardApiAvailable,
    isIndexedDbAvailable,
    isModernBrowser,
    unsupportedFeatures
  };
}

export function handleLocalStorageError(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      return 'Storage is full. Please clear some history or data to continue.';
    }
    if (error.name === 'SecurityError') {
      return 'LocalStorage is blocked. Please enable cookies in your browser settings.';
    }
  }
  return 'An error occurred while saving data. Please check your browser settings.';
}
