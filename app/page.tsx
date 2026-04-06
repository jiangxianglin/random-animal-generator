'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { AnimalCard } from '@/components/animal-card';
import { GeneratorControls } from '@/components/generator-controls';
import { ChallengePanel } from '@/components/challenge-panel';
import { TimerDisplay } from '@/components/timer-display';
import { HybridAnimalCard } from '@/components/hybrid-animal-card';
import { HistoryPanel } from '@/components/history-panel';
import { CompatibilityNotice } from '@/components/compatibility-notice';
import { AnimalGenerator } from '@/lib/generator';
import { ChallengeManager, HybridAnimal, ChallengeMode } from '@/lib/challenge-manager';
import { HistoryManager, HistoryEntry } from '@/lib/history-manager';
import { Animal, CategoryKey, DrawingDifficulty } from '@/lib/animals';

const generator = new AnimalGenerator();
const challengeManager = new ChallengeManager();
const historyManager = new HistoryManager();

function HomeContent() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [hybridAnimal, setHybridAnimal] = useState<HybridAnimal | null>(null);
  const [challengeMode, setChallengeMode] = useState<ChallengeMode | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isDailyCompleted, setIsDailyCompleted] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Check daily challenge completion on mount
  useEffect(() => {
    setIsDailyCompleted(challengeManager.isDailyCompleted());
  }, []);

  const handleSelectHistoryEntry = (entry: HistoryEntry) => {
    setAnimals(entry.animals);
    setHybridAnimal(null);
    setChallengeMode(entry.challengeMode as ChallengeMode || null);
    scrollToResults();
  };

  const handleClearHistory = () => {
    // History is already cleared by HistoryPanel, just refresh UI if needed
  };

  const handleGenerate = (quantity: number, category: CategoryKey | null, difficulty: DrawingDifficulty | null) => {
    try {
      // Clear any active challenge mode
      clearChallengeMode();
      
      const generated = generator.generate(quantity, category, difficulty);
      setAnimals(generated);
      setHybridAnimal(null);
      setChallengeMode(null);
      
      // Save to history
      historyManager.addToHistory(generated, category, difficulty, null);
      
      // Update URL state with difficulty parameter
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (difficulty) params.set('difficulty', difficulty);
      if (quantity !== 3) params.set('quantity', quantity.toString());
      
      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : '/';
      router.push(newUrl, { scroll: false });
      
      // Scroll to results after generation
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const clearChallengeMode = () => {
    challengeManager.stopTimer();
    challengeManager.clearChallenge();
    setChallengeMode(null);
    setIsTimerActive(false);
    setTimerSeconds(0);
  };

  const handleDailyChallenge = () => {
    try {
      clearChallengeMode();
      const animal = challengeManager.getDailyChallenge();
      setAnimals([animal]);
      setHybridAnimal(null);
      setChallengeMode('daily');
      
      // Save to history
      historyManager.addToHistory([animal], null, animal.drawingDifficulty, 'daily');
      
      // Update URL
      router.push('?mode=daily', { scroll: false });
      
      // Mark as completed
      challengeManager.markDailyCompleted();
      setIsDailyCompleted(true);
      
      scrollToResults();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleTimedChallenge = () => {
    try {
      clearChallengeMode();
      const challenge = challengeManager.startTimedChallenge(600, null, {
        onTick: (remainingSeconds) => {
          setTimerSeconds(remainingSeconds);
        },
        onComplete: () => {
          setIsTimerActive(false);
          alert('Time\'s up! Challenge complete!');
        }
      });
      
      const animal = challenge.animal as Animal;
      setAnimals([animal]);
      setHybridAnimal(null);
      setChallengeMode('timed');
      setIsTimerActive(true);
      setTimerSeconds(600);
      
      // Save to history
      historyManager.addToHistory([animal], null, animal.drawingDifficulty, 'timed');
      
      // Update URL
      router.push('?mode=timed', { scroll: false });
      
      scrollToResults();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleHardMode = () => {
    try {
      clearChallengeMode();
      const animal = challengeManager.generateHardMode();
      setAnimals([animal]);
      setHybridAnimal(null);
      setChallengeMode('hard');
      
      // Save to history
      historyManager.addToHistory([animal], null, 'hard', 'hard');
      
      // Update URL
      router.push('?mode=hard', { scroll: false });
      
      scrollToResults();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleHybridMode = () => {
    try {
      clearChallengeMode();
      const hybrid = challengeManager.generateHybridAnimal();
      setHybridAnimal(hybrid);
      setAnimals([]);
      setChallengeMode('hybrid');
      
      // Save hybrid components to history (use first animal for difficulty filter)
      if (hybrid.sourceAnimals.length > 0) {
        historyManager.addToHistory(hybrid.sourceAnimals, null, hybrid.sourceAnimals[0].drawingDifficulty, 'hybrid');
      }
      
      // Update URL
      router.push('?mode=hybrid', { scroll: false });
      
      scrollToResults();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const scrollToResults = () => {
    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Generate initial animals on mount or when URL params change
  useEffect(() => {
    const mode = searchParams.get('mode') as ChallengeMode | null;
    
    // Handle challenge modes from URL
    if (mode === 'daily') {
      const animal = challengeManager.getDailyChallenge();
      setAnimals([animal]);
      setChallengeMode('daily');
      challengeManager.markDailyCompleted();
      setIsDailyCompleted(true);
    } else if (mode === 'timed') {
      const challenge = challengeManager.startTimedChallenge(600, null, {
        onTick: (remainingSeconds) => setTimerSeconds(remainingSeconds),
        onComplete: () => {
          setIsTimerActive(false);
          alert('Time\'s up! Challenge complete!');
        }
      });
      setAnimals([challenge.animal as Animal]);
      setChallengeMode('timed');
      setIsTimerActive(true);
      setTimerSeconds(600);
    } else if (mode === 'hard') {
      const animal = challengeManager.generateHardMode();
      setAnimals([animal]);
      setChallengeMode('hard');
    } else if (mode === 'hybrid') {
      const hybrid = challengeManager.generateHybridAnimal();
      setHybridAnimal(hybrid);
      setChallengeMode('hybrid');
    } else {
      // Regular generation
      const category = searchParams.get('category') as CategoryKey | null;
      const difficulty = searchParams.get('difficulty') as DrawingDifficulty | null;
      const quantity = parseInt(searchParams.get('quantity') || '3', 10);
      const generated = generator.generate(quantity, category, difficulty);
      setAnimals(generated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      challengeManager.stopTimer();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Timer Display for Timed Challenge */}
      <TimerDisplay remainingSeconds={timerSeconds} isActive={isTimerActive} />
      
      {/* Browser Compatibility Notice */}
      <CompatibilityNotice />
      
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Random Animal Generator for Drawing",
              "applicationCategory": "DesignApplication",
              "description": "Random animal generator designed for artists with difficulty ratings, drawing tips, and challenge modes. Perfect for daily drawing practice, skill building, and creative inspiration.",
              "url": "https://www.randomanimalgenerator.online/",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Generate 1-10 random animals for drawing practice",
                "Difficulty ratings: Easy, Medium, Hard",
                "2-3 drawing tips per animal",
                "Challenge modes: Daily, Timed, Hard Mode, Hybrid",
                "Filter by 5 categories: Mammals, Birds, Reptiles, Marine, Insects",
                "High-quality reference images",
                "History tracking for practice subjects",
                "Mobile responsive design",
                "Free to use"
              ],
              "audience": {
                "@type": "Audience",
                "audienceType": ["artists", "illustrators", "art students", "art teachers"]
              },
              "provider": {
                "@type": "Organization",
                "name": "Random Animal Generator for Drawing"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does the random animal generator for drawing work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our drawing-focused generator randomly selects from 100+ animals with difficulty ratings (Easy/Medium/Hard) and drawing tips. Choose 1-10 animals, filter by category or difficulty level, and get instant reference images with actionable drawing guidance to improve your art skills."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the difficulty levels for drawing?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Animals are classified as Easy (simple shapes, minimal details), Medium (moderate complexity), or Hard (intricate textures and details). This helps artists practice at their skill level and progressively challenge themselves as they improve."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What drawing tips are included?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Each animal includes 2-3 actionable drawing tips (10-15 words each) focusing on key features, shape simplification, and texture techniques. These tips help you capture the essence of each animal and improve your drawing skills."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the random animal generator free for artists?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our random animal generator for drawing is completely free with no registration required. We provide drawing practice resources accessible to all artists, students, and creative learners."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use this for daily drawing practice?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Use our Daily Drawing Challenge mode for consistent practice. The same animal is shown to all users each day, creating a community challenge. Track your progress with the history feature."
                  }
                }
              ]
            }
          ])
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        {/* Compact Header with Tool - First Screen */}
        <div className="min-h-screen flex flex-col justify-center py-8">
          <header className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="text-6xl md:text-7xl animate-bounce">🦁</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-green-600 to-amber-600">
              Random Animal Generator for Drawing
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto mb-2">
              Practice your art skills with random animals, drawing tips, and difficulty levels
            </p>
            <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
              Free drawing practice tool for artists, illustrators, art students, and creative learners
            </p>
          </header>

          {/* Generator Controls - Prominent Position */}
          <section className="mb-8 max-w-2xl mx-auto w-full space-y-4">
            <GeneratorControls onGenerate={handleGenerate} />
            <ChallengePanel
              onDailyChallenge={handleDailyChallenge}
              onTimedChallenge={handleTimedChallenge}
              onHardMode={handleHardMode}
              onHybridMode={handleHybridMode}
              isDailyCompleted={isDailyCompleted}
            />
            <HistoryPanel
              onSelectEntry={handleSelectHistoryEntry}
              onClearHistory={handleClearHistory}
            />
          </section>

          {/* Hero Image Banner - Below the fold */}
          <div className="relative w-full max-w-3xl mx-auto mt-8 rounded-xl overflow-hidden shadow-xl opacity-90">
            <Image
              src="/RandomAnimalGenerator-hero.png"
              alt="Random Animal Generator for Drawing - Diverse wildlife for art practice including lions, birds, sea turtles, and butterflies"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto max-h-48 object-cover"
              title="Practice Drawing with Random Animal Generator"
            />
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-8">
            <div className="inline-flex flex-col items-center gap-2 text-gray-500 animate-bounce">
              <span className="text-sm font-medium">Scroll to see results & learn more</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results */}
        {(animals.length > 0 || hybridAnimal) && (
          <section className="mb-12 scroll-mt-8" id="results">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-sm">
                {challengeMode === 'daily' && '📅 Daily Challenge'}
                {challengeMode === 'timed' && '⏱️ Timed Challenge'}
                {challengeMode === 'hard' && '🔥 Hard Mode Challenge'}
                {challengeMode === 'hybrid' && '🧬 Hybrid Animal Challenge'}
                {!challengeMode && 'Your Generated Animals'}
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                {challengeMode === 'daily' && 'Complete today\'s drawing challenge!'}
                {challengeMode === 'timed' && 'Draw as fast as you can in 10 minutes!'}
                {challengeMode === 'hard' && 'Test your advanced drawing skills!'}
                {challengeMode === 'hybrid' && 'Create a unique hybrid creature!'}
                {!challengeMode && 'Click on any card to learn more'}
              </p>
            </div>
            
            {/* Hybrid Animal Display */}
            {hybridAnimal && (
              <div className="max-w-2xl mx-auto">
                <HybridAnimalCard hybrid={hybridAnimal} />
              </div>
            )}
            
            {/* Regular Animals Display */}
            {animals.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {animals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Quick Introduction - After Results */}
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 mb-8 border border-emerald-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              About Our Drawing Practice Tool
            </h2>
          </div>
          
          {/* Biodiversity Showcase Image */}
          <div className="relative w-full max-w-2xl mx-auto mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/RandomAnimalGenerator-BiodiversityShowcase.png"
              alt="Animal biodiversity showcase featuring mammals, birds, reptiles, marine life, and insects in their natural habitats"
              width={1200}
              height={1200}
              className="w-full h-auto max-h-96 object-contain"
              title="Five Categories of Wildlife - Mammals, Birds, Reptiles, Marine Animals, and Insects"
              loading="lazy"
            />
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              Welcome to our <strong>random animal generator for drawing</strong> - a specialized practice tool designed for artists, illustrators, and art students seeking creative inspiration and skill development. This free drawing reference generator provides instant access to diverse animals with difficulty ratings (Easy/Medium/Hard), actionable drawing tips, and high-quality reference images across five major categories: mammals, birds, reptiles, marine life, and insects.
            </p>
            <p>
              Our <strong>random animal generator for drawing</strong> features 100+ carefully curated species, each with difficulty classification and 2-3 drawing tips to help you capture key features and improve your technique. Whether you&apos;re practicing daily sketches, building your portfolio, or seeking creative challenges, this drawing tool delivers structured practice subjects perfect for skill progression, timed challenges, and artistic exploration.
            </p>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 mb-8 border border-amber-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How Artists Use This Drawing Tool
            </h2>
          </div>

          {/* Use Cases Image */}
          <div className="relative w-full max-w-4xl mx-auto mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/RandomAnimalGenerator-UseCasesSection.png"
              alt="Educational classroom scene with students and teachers learning about animals using the random animal generator tool"
              width={2560}
              height={1080}
              className="w-full h-auto"
              title="Perfect for Classroom Education, Homeschooling, and Student Learning"
              loading="lazy"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "🎨",
                title: "Daily Drawing Practice",
                description: "Artists use our random animal generator for daily sketch challenges. The difficulty ratings help you progressively build skills from easy to hard subjects."
              },
              {
                emoji: "✍️",
                title: "Art Student Portfolio",
                description: "Art students build diverse portfolios with our drawing reference generator. Practice different animal types and complexity levels for comprehensive skill development."
              },
              {
                emoji: "⏱️",
                title: "Timed Drawing Challenges",
                description: "Illustrators use timed mode for speed drawing practice. Set 10-minute challenges to improve your quick sketching and gesture drawing abilities."
              },
              {
                emoji: "📚",
                title: "Art Class Assignments",
                description: "Art teachers assign drawing exercises using our difficulty filters. Students can practice at their skill level with guided drawing tips for each animal."
              },
              {
                emoji: "🏆",
                title: "Skill Progression Tracking",
                description: "Track your drawing progress with history features. Revisit previous subjects to see improvement and challenge yourself with harder difficulty levels."
              },
              {
                emoji: "🎯",
                title: "Creative Inspiration",
                description: "Professional artists discover unique subjects for illustration projects. The hybrid mode combines animals for creative character design and concept art."
              }
            ].map((useCase, index) => (
              <div key={index} className="group bg-gradient-to-br from-emerald-50 to-amber-50 p-6 rounded-xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {useCase.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 mb-8 border border-green-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: "How does the random animal generator for drawing work?",
                answer: "Our drawing-focused generator randomly selects from 100+ animals with difficulty ratings (Easy/Medium/Hard) and drawing tips. Choose 1-10 animals, filter by category or difficulty level, and get instant reference images with actionable drawing guidance to improve your art skills."
              },
              {
                question: "What are the difficulty levels for drawing?",
                answer: "Animals are classified as Easy (simple shapes, minimal details), Medium (moderate complexity), or Hard (intricate textures and details). This helps artists practice at their skill level and progressively challenge themselves as they improve."
              },
              {
                question: "What drawing tips are included?",
                answer: "Each animal includes 2-3 actionable drawing tips (10-15 words each) focusing on key features, shape simplification, and texture techniques. These tips help you capture the essence of each animal and improve your drawing skills."
              },
              {
                question: "Is the random animal generator free for artists?",
                answer: "Yes! Our random animal generator for drawing is completely free with no registration required. We provide drawing practice resources accessible to all artists, students, and creative learners."
              },
              {
                question: "Can I use this for daily drawing practice?",
                answer: "Absolutely! Use our Daily Drawing Challenge mode for consistent practice. The same animal is shown to all users each day, creating a community challenge. Track your progress with the history feature."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-emerald-50 p-6 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    Q
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-9">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 text-gray-700">
          <div className="inline-block px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-emerald-200 mb-4">
            <p className="font-medium">&copy; 2026 Random Animal Generator for Drawing</p>
          </div>
          <p className="text-gray-600 mb-4">Free drawing practice tool for artists and creative learners</p>
          <div className="inline-block px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200 text-sm">
            <p className="text-emerald-800">
              <span className="font-semibold">Privacy:</span> All data is stored locally on your device. 
              No personal information is collected or transmitted.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🦁</div>
          <p className="text-xl text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
