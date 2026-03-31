'use client';

import { useState } from 'react';
import { Animal } from '@/lib/animals';
import { HybridAnimal } from '@/lib/challenge-manager';
import { shareManager } from '@/lib/share-manager';

interface ShareButtonsProps {
  animal?: Animal;
  hybrid?: HybridAnimal;
  className?: string;
}

export function ShareButtons({ animal, hybrid, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleCopyLink = async () => {
    let success = false;
    if (animal) {
      success = await shareManager.copyAnimalLink(animal);
    } else if (hybrid) {
      success = await shareManager.copyHybridLink(hybrid);
    }

    if (success) {
      setCopied(true);
      setShowNotification(true);
      setTimeout(() => {
        setCopied(false);
        setShowNotification(false);
      }, 2000);
    }
  };

  const handlePinterest = () => {
    if (animal) {
      shareManager.shareToPinterest(animal);
    } else if (hybrid) {
      shareManager.shareHybridToPinterest(hybrid);
    }
  };

  const handleTwitter = () => {
    if (animal) {
      shareManager.shareToTwitter(animal);
    } else if (hybrid) {
      shareManager.shareHybridToTwitter(hybrid);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-600 mr-1">Share:</span>
      
      <button
        onClick={handlePinterest}
        className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
        aria-label="Share on Pinterest"
        title="Share on Pinterest"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      </button>

      <button
        onClick={handleTwitter}
        className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>

      <button
        onClick={handleCopyLink}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg ${
          copied 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-600 hover:bg-gray-700 text-white'
        }`}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
        title={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse z-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
