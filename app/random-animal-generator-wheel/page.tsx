'use client';

import { useState, useMemo } from 'react';
import { AnimalWheelSpinner } from '@/components/animal-wheel-spinner';
import { ANIMAL_DATABASE, Animal } from '@/lib/animals';

const WHEEL_COLORS = [
  '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981',
  '#3B82F6', '#EF4444', '#14B8A6', '#F97316', '#84CC16'
];

interface WheelAnimal {
  id: string;
  commonName: string;
  imageUrl: string;
  imageAlt: string;
  color: string;
}

export default function RandomAnimalGeneratorWheel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  
  const categories = [
    { value: 'all', label: 'All Animals', count: ANIMAL_DATABASE.length },
    { value: 'mammals', label: 'Mammals', count: ANIMAL_DATABASE.filter(a => a.category === 'mammals').length },
    { value: 'birds', label: 'Birds', count: ANIMAL_DATABASE.filter(a => a.category === 'birds').length },
    { value: 'reptiles', label: 'Reptiles', count: ANIMAL_DATABASE.filter(a => a.category === 'reptiles').length },
    { value: 'marine', label: 'Marine', count: ANIMAL_DATABASE.filter(a => a.category === 'marine').length },
    { value: 'insects', label: 'Insects', count: ANIMAL_DATABASE.filter(a => a.category === 'insects').length }
  ];

  const wheelAnimals = useMemo(() => {
    const filtered = selectedCategory === 'all' 
      ? ANIMAL_DATABASE 
      : ANIMAL_DATABASE.filter(a => a.category === selectedCategory);
    
    const selected = filtered.slice(0, 12);
    
    return selected.map((animal, index): WheelAnimal => ({
      id: animal.id,
      commonName: animal.commonName,
      imageUrl: animal.imageUrl,
      imageAlt: animal.imageAlt,
      color: WHEEL_COLORS[index % WHEEL_COLORS.length]
    }));
  }, [selectedCategory]);

  const handleSpinComplete = (animal: WheelAnimal) => {
    const fullAnimal = ANIMAL_DATABASE.find(a => a.id === animal.id);
    setSelectedAnimal(fullAnimal || null);
  };

  const useCases = [
    {
      icon: '🎮',
      title: 'Party Games & Decision Making',
      description: 'Let the Random Animal Generator Wheel decide who goes first, who picks the movie, or settle friendly disputes with a fun random selector.'
    },
    {
      icon: '📚',
      title: 'Educational Activities',
      description: 'Teachers and parents can use this animal wheel spinner to create engaging animal-themed lessons. Perfect for biology classes, nature studies, and wildlife education.'
    },
    {
      icon: '✍️',
      title: 'Creative Writing Prompts',
      description: 'Writers block? Let the wheel picker select an animal for your next story character, setting inspiration, or plot element in your creative writing journey.'
    },
    {
      icon: '🎭',
      title: 'Role-Playing Games',
      description: 'Perfect for tabletop RPGs, classroom activities, or family game nights where random animal selection is needed. Use this animal spinner for character assignment.'
    },
    {
      icon: '🏋️',
      title: 'Team Building Activities',
      description: 'Split into teams randomly, assign animal roles, or create animal-themed fitness challenges with the spin wheel selector. Great for icebreakers and group activities.'
    },
    {
      icon: '🎨',
      title: 'Art & Drawing Challenges',
      description: 'Artists can use this as a prompt generator for drawing challenges. Spin the Random Animal Generator Wheel and try to draw whatever animal lands on!'
    }
  ];

  const tips = [
    'Click the spin button and watch the wheel rotate',
    'Wait for the wheel to stop completely',
    'The pointer at the top shows your selected animal',
    'Change categories to explore different animal groups',
    'Share your results with friends on social media'
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            🎯 Random Animal Generator Wheel
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Free Online Tool • {ANIMAL_DATABASE.length}+ Animals • Instant Results
          </p>
        </div>

        <section className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            <div className="w-full lg:w-3/5">
              <AnimalWheelSpinner 
                animals={wheelAnimals} 
                onSpinComplete={handleSpinComplete}
              />
            </div>
            
            <div className="w-full lg:w-2/5">
              <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Choose Your Category
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`p-3 rounded-lg text-left transition-all text-sm ${
                        selectedCategory === cat.value
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-gray-50 hover:bg-indigo-50 text-gray-700'
                      }`}
                    >
                      <div className="font-semibold">{cat.label}</div>
                      <div className={`text-xs ${selectedCategory === cat.value ? 'text-indigo-200' : 'text-gray-500'}`}>
                        {cat.count} animals
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                  <p className="text-xs text-indigo-800">
                    <strong>💡 Tip:</strong> The wheel shows up to 12 animals. Select a category!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {selectedAnimal && (
          <section className="mb-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 relative h-64 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={selectedAnimal.imageUrl}
                    alt={selectedAnimal.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedAnimal.commonName}
                  </h2>
                  <p className="text-base text-indigo-600 italic mb-3">
                    {selectedAnimal.scientificName}
                  </p>
                  <div className="space-y-2 mb-4">
                    {selectedAnimal.facts.slice(0, 2).map((fact, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-xl">📚</span>
                        <p className="text-gray-700 text-sm">{fact}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      {selectedAnimal.category.charAt(0).toUpperCase() + selectedAnimal.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">
              How to Use the Random Animal Wheel
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-white text-indigo-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <p className="text-white/90">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              What is the Random Animal Generator Wheel?
            </h2>
            <p className="text-gray-700 text-sm mb-2">
              The <strong>Random Animal Generator Wheel</strong> is a free online spinning wheel tool designed to help you select animals randomly for various purposes. Whether you need an animal picker for games, educational activities, creative writing inspiration, or decision-making fun, this wheel spinner delivers instant, unbiased results every time you spin.
            </p>
            <p className="text-gray-700 text-sm">
              Perfect for teachers, parents, game masters, writers, and anyone who needs a fair and entertaining way to pick random animals. No registration required, no downloads needed—just open and start spinning!
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Use Cases
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Use Our Random Animal Generator Wheel?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                  🎯 Instant & Easy to Use
                </h3>
                <p className="text-gray-700 mb-4">
                  No registration required. No downloads needed. Just open the page, 
                  select your preferred animal category, and spin! Our Random Animal Generator Wheel is designed 
                  to be intuitive and accessible for everyone.
                </p>
                
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                  📱 Works Everywhere
                </h3>
                <p className="text-gray-700 mb-4">
                  Fully responsive design means you can use this animal wheel spinner on 
                  your desktop, tablet, or smartphone. Perfect for on-the-go decision making!
                </p>
                
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                  🦁 Diverse Animal Collection
                </h3>
                <p className="text-gray-700">
                  Our database includes {ANIMAL_DATABASE.length}+ animals across multiple 
                  categories - from majestic mammals to colorful birds, fascinating reptiles, 
                  incredible marine life, and amazing insects.
                </p>
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-lg mb-6">
                <img
                  src="/RandomAnimalGenerator-BiodiversityShowcase.png"
                  alt="Animal biodiversity showcase featuring mammals, birds, marine animals, and insects"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                🎮 Fun & Engaging
              </h3>
              <p className="text-gray-700 mb-4">
                The spinning animation adds excitement and visual appeal to random selection. 
                Whether for games, education, or creative purposes, our Random Animal Generator Wheel makes the 
                experience enjoyable.
              </p>
              
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                💯 Completely Free
              </h3>
              <p className="text-gray-700 mb-4">
                Unlike many other tools, our random animal wheel is 100% free with no 
                hidden costs, no premium features, and no annoying ads. Use it as much 
                as you want!
              </p>
              
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                🔄 Regular Updates
              </h3>
              <p className="text-gray-700">
                We constantly add new animals to our collection and improve the tool 
                based on user feedback. Check back regularly for new features and 
                animals!
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <img
                src="/random-animal-wheel-interface-preview.png"
                alt="Random Animal Generator Wheel tool interface preview showing the spinning wheel and category filters"
                className="w-full rounded-xl shadow-lg"
                loading="lazy"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How does the Random Animal Generator Wheel work?
                </h3>
                <p className="text-gray-700">
                  Our Random Animal Generator Wheel uses a mathematical algorithm to ensure 
                  truly random selection. When you click the spin button, the wheel rotates 
                  for a random duration (4-6 seconds) and stops at a random position, 
                  selecting that animal.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I use this Random Animal Generator Wheel for commercial purposes?
                </h3>
                <p className="text-gray-700">
                  Yes! Our animal wheel spinner is free to use for any purpose, including 
                  educational, entertainment, and commercial applications. No attribution 
                  required.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How many animals are in the database?
                </h3>
                <p className="text-gray-700">
                  Currently, our database contains {ANIMAL_DATABASE.length}+ different 
                  animals spanning 5 major categories: mammals, birds, reptiles, marine 
                  animals, and insects. We regularly add new species!
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is the selection truly random?
                </h3>
                <p className="text-gray-700">
                  Yes! We use a cryptographically secure random number generator to ensure 
                  that every spin is completely unpredictable and fair. No algorithms can 
                  influence or predict the outcome.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I suggest an animal to add to the Random Animal Generator Wheel?
                </h3>
                <p className="text-gray-700">
                  Absolutely! We love hearing from our users. If you have suggestions for 
                  animals you would like to see added to our collection, please reach out 
                  through our contact channels.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is the Random Animal Generator Wheel mobile-friendly?
                </h3>
                <p className="text-gray-700">
                  Yes! Our animal picker is fully responsive and works perfectly on 
                  smartphones, tablets, and desktop computers. You can use this wheel spinner 
                  anywhere, anytime with an internet connection.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How can I share the results from the Random Animal Generator Wheel?
                </h3>
                <p className="text-gray-700">
                  You can easily share your selected animal on social media or with friends. 
                  Simply take a screenshot of the result or copy the animal information. 
                  Our random animal selector makes it fun to compare results with others!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-indigo-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Spin?
            </h2>
            <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
              Start exploring the animal kingdom with our fun and interactive Random Animal Generator Wheel. Perfect for games, learning, and making random decisions!
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-full shadow-lg hover:bg-indigo-50 transition-all transform hover:scale-105"
            >
              ⬆️ Back to the Wheel
            </button>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">🎲</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Decision Maker Wheel
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Can't make a decision? Let our general decision wheel help you choose!
                </p>
                <span className="text-indigo-600 text-sm font-medium">Coming Soon →</span>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">🍕</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Food Randomizer
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stuck on what to eat? Spin the wheel to decide your next meal!
                </p>
                <span className="text-indigo-600 text-sm font-medium">Coming Soon →</span>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Team Generator
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Need to split into teams? Our team generator makes it fair and fun!
                </p>
                <span className="text-indigo-600 text-sm font-medium">Coming Soon →</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-gray-600 py-8 border-t border-gray-200">
          <p className="mb-2">
            Random Animal Generator Wheel - A free online tool for games, education, and fun!
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Random Animal Generator. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
