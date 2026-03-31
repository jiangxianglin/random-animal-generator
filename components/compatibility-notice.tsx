'use client';

import { useState, useCallback } from 'react';
import { checkBrowserCompatibility, BrowserCompatibility } from '@/lib/browser-compatibility';

function getInitialState(): { compatibility: BrowserCompatibility | null; isDismissed: boolean } {
  if (typeof window === 'undefined') {
    return { compatibility: null, isDismissed: false };
  }
  const dismissed = sessionStorage.getItem('compatibilityNoticeDismissed') === 'true';
  return { compatibility: checkBrowserCompatibility(), isDismissed: dismissed };
}

export function CompatibilityNotice() {
  const [{ compatibility, isDismissed }, setState] = useState(getInitialState);

  const handleDismiss = useCallback(() => {
    sessionStorage.setItem('compatibilityNoticeDismissed', 'true');
    setState(prev => ({ ...prev, isDismissed: true }));
  }, []);

  if (!compatibility || isDismissed) {
    return null;
  }

  const hasIssues = !compatibility.isLocalStorageAvailable || 
                    !compatibility.isClipboardApiAvailable || 
                    !compatibility.isModernBrowser;

  if (!hasIssues) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-amber-50 border-2 border-amber-400 rounded-xl shadow-xl p-4 z-50 animate-fadeIn"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl flex-shrink-0">⚠️</span>
        <div className="flex-1">
          <h3 className="font-bold text-amber-900 mb-2">
            Browser Compatibility Notice
          </h3>
          <p className="text-sm text-amber-800 mb-3">
            Some features may not work properly in your browser:
          </p>
          <ul className="text-sm text-amber-800 space-y-1 mb-3">
            {!compatibility.isLocalStorageAvailable && (
              <li className="flex items-center gap-2">
                <span>•</span>
                <span>History will not be saved</span>
              </li>
            )}
            {!compatibility.isClipboardApiAvailable && (
              <li className="flex items-center gap-2">
                <span>•</span>
                <span>Copy to clipboard may not work</span>
              </li>
            )}
            {!compatibility.isModernBrowser && (
              <li className="flex items-center gap-2">
                <span>•</span>
                <span>Please update your browser for best experience</span>
              </li>
            )}
          </ul>
          <button
            onClick={handleDismiss}
            className="w-full px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
