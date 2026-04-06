import { Animal } from './animals';
import { HybridAnimal } from './challenge-manager';

export interface ShareData {
  animal: Animal;
  shareUrl: string;
  pinterestUrl: string;
  twitterUrl: string;
  description: string;
}

export interface HybridShareData {
  hybrid: HybridAnimal;
  shareUrl: string;
  pinterestUrl: string;
  twitterUrl: string;
  description: string;
}

export class ShareManager {
  private readonly BASE_URL = 'https://www.randomanimalgenerator.online/';

  generateShareLink(animalId: string): string {
    return `${this.BASE_URL}?shared=${encodeURIComponent(animalId)}`;
  }

  generateHybridShareLink(sourceAnimalIds: string[]): string {
    const ids = sourceAnimalIds.join(',');
    return `${this.BASE_URL}?hybrid=${encodeURIComponent(ids)}`;
  }

  shareToPinterest(animal: Animal): void {
    const shareUrl = this.generateShareLink(animal.id);
    const mediaUrl = animal.imageUrl;
    const description = this.buildPinterestDescription(animal);
    
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(mediaUrl)}&description=${encodeURIComponent(description)}`;
    
    this.openShareWindow(pinterestUrl);
  }

  shareToTwitter(animal: Animal): void {
    const shareUrl = this.generateShareLink(animal.id);
    const tweetText = this.buildTwitterText(animal);
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=AnimalDrawing,ArtPractice,RandomAnimal`;
    
    this.openShareWindow(twitterUrl);
  }

  shareHybridToPinterest(hybrid: HybridAnimal): void {
    const shareUrl = this.generateHybridShareLink(hybrid.sourceAnimals.map(a => a.id));
    const mediaUrl = hybrid.sourceAnimals[0]?.imageUrl || '';
    const description = this.buildHybridPinterestDescription(hybrid);
    
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(mediaUrl)}&description=${encodeURIComponent(description)}`;
    
    this.openShareWindow(pinterestUrl);
  }

  shareHybridToTwitter(hybrid: HybridAnimal): void {
    const shareUrl = this.generateHybridShareLink(hybrid.sourceAnimals.map(a => a.id));
    const tweetText = this.buildHybridTwitterText(hybrid);
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=HybridAnimal,ArtPractice,CreatureDesign`;
    
    this.openShareWindow(twitterUrl);
  }

  async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    } catch {
      return false;
    }
  }

  async copyAnimalLink(animal: Animal): Promise<boolean> {
    const shareUrl = this.generateShareLink(animal.id);
    return this.copyToClipboard(shareUrl);
  }

  async copyHybridLink(hybrid: HybridAnimal): Promise<boolean> {
    const shareUrl = this.generateHybridShareLink(hybrid.sourceAnimals.map(a => a.id));
    return this.copyToClipboard(shareUrl);
  }

  getShareData(animal: Animal): ShareData {
    return {
      animal,
      shareUrl: this.generateShareLink(animal.id),
      pinterestUrl: this.buildPinterestUrl(animal),
      twitterUrl: this.buildTwitterUrl(animal),
      description: this.buildPinterestDescription(animal)
    };
  }

  getHybridShareData(hybrid: HybridAnimal): HybridShareData {
    return {
      hybrid,
      shareUrl: this.generateHybridShareLink(hybrid.sourceAnimals.map(a => a.id)),
      pinterestUrl: this.buildHybridPinterestUrl(hybrid),
      twitterUrl: this.buildHybridTwitterUrl(hybrid),
      description: this.buildHybridPinterestDescription(hybrid)
    };
  }

  private buildPinterestDescription(animal: Animal): string {
    const tips = animal.drawingTips.slice(0, 2).join('. ') + '.';
    return `${animal.commonName} drawing reference - Difficulty: ${animal.drawingDifficulty}. Tips: ${tips} #AnimalDrawing #ArtPractice`;
  }

  private buildTwitterText(animal: Animal): string {
    return `Practice drawing ${animal.commonName}! Difficulty: ${animal.drawingDifficulty}. Tips: ${animal.drawingTips[0]} #AnimalDrawing #ArtPractice`;
  }

  private buildHybridPinterestDescription(hybrid: HybridAnimal): string {
    const names = hybrid.sourceAnimals.map(a => a.commonName).join(' + ');
    const tips = hybrid.combinedTips.slice(0, 2).join('. ') + '.';
    return `Hybrid creature: ${names}. Tips: ${tips} #HybridAnimal #CreatureDesign #ArtPractice`;
  }

  private buildHybridTwitterText(hybrid: HybridAnimal): string {
    const names = hybrid.sourceAnimals.map(a => a.commonName).join(' + ');
    return `Check out this hybrid creature: ${names}! Created with @RandomAnimalGen #HybridAnimal #CreatureDesign #ArtPractice`;
  }

  private buildPinterestUrl(animal: Animal): string {
    const shareUrl = this.generateShareLink(animal.id);
    const mediaUrl = animal.imageUrl;
    const description = this.buildPinterestDescription(animal);
    return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(mediaUrl)}&description=${encodeURIComponent(description)}`;
  }

  private buildTwitterUrl(animal: Animal): string {
    const shareUrl = this.generateShareLink(animal.id);
    const tweetText = this.buildTwitterText(animal);
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=AnimalDrawing,ArtPractice,RandomAnimal`;
  }

  private buildHybridPinterestUrl(hybrid: HybridAnimal): string {
    const shareUrl = this.generateHybridShareLink(hybrid.sourceAnimals.map(a => a.id));
    const mediaUrl = hybrid.sourceAnimals[0]?.imageUrl || '';
    const description = this.buildHybridPinterestDescription(hybrid);
    return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(mediaUrl)}&description=${encodeURIComponent(description)}`;
  }

  private buildHybridTwitterUrl(hybrid: HybridAnimal): string {
    const shareUrl = this.generateHybridShareLink(hybrid.sourceAnimals.map(a => a.id));
    const tweetText = this.buildHybridTwitterText(hybrid);
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=HybridAnimal,CreatureDesign,ArtPractice`;
  }

  private openShareWindow(url: string): void {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      url,
      'share',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );
  }
}

export const shareManager = new ShareManager();
