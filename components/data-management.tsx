'use client';

import { useState } from 'react';
import { DataManager } from '@/lib/data-manager';

interface DataManagementButtonProps {
  className?: string;
}

export function DataManagementButton({ className = '' }: DataManagementButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClearData = () => {
    const result = DataManager.clearAllData();
    if (result.success) {
      setShowConfirm(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className={`text-sm text-red-600 hover:text-red-800 transition-colors ${className}`}
        aria-label="Clear all stored data"
      >
        Clear All Data
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">🗑️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clear All Data?</h3>
              <p className="text-gray-600">
                This will permanently delete all your history, preferences, and challenge progress. 
                This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse z-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>All data cleared successfully!</span>
        </div>
      )}
    </>
  );
}
