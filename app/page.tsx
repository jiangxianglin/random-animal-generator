'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimalCard } from '@/components/animal-card';
import { GeneratorControls } from '@/components/generator-controls';
import { AnimalGenerator } from '@/lib/generator';
import { Animal, CategoryKey } from '@/lib/animals';

const generator = new AnimalGenerator();

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  const handleGenerate = (quantity: number, category: CategoryKey | null) => {
    try {
      const generated = generator.generate(quantity, category);
      setAnimals(generated);
      
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

  // Generate initial animals on mount
  useEffect(() => {
    handleGenerate(3, null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 relative overflow-hidden">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Random Animal Generator",
            "applicationCategory": "EducationalApplication",
            "description": "Generate random animals with fascinating facts and high-quality images. Perfect for educators, students, artists, and wildlife enthusiasts. 100+ species across 5 categories.",
            "url": typeof window !== 'undefined' ? window.location.origin : 'https://randomanimalgenerator.com',
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Generate 1-10 random animals",
              "Filter by 5 categories: Mammals, Birds, Reptiles, Marine, Insects",
              "Educational facts for each animal",
              "High-quality wildlife images",
              "Mobile responsive design",
              "Free to use"
            ],
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": ["teacher", "student", "parent"]
            },
            "provider": {
              "@type": "Organization",
              "name": "Random Animal Generator"
            }
          })
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        {/* Compact Header with Tool - First Screen */}
        <div className="min-h-screen flex flex-col justify-center py-8">
          <header className="text-center mb-8 text-white">
            <div className="inline-block mb-4">
              <div className="text-6xl md:text-7xl animate-bounce">🦁</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
              Random Animal Generator
            </h1>
            <p className="text-lg md:text-xl opacity-95 font-medium max-w-2xl mx-auto mb-2">
              Discover fascinating wildlife with educational facts and stunning images
            </p>
            <p className="text-sm md:text-base opacity-80 max-w-xl mx-auto">
              Free wildlife discovery tool for teachers, students, artists, and nature enthusiasts
            </p>
          </header>

          {/* Generator Controls - Prominent Position */}
          <section className="mb-8 max-w-2xl mx-auto w-full">
            <GeneratorControls onGenerate={handleGenerate} />
          </section>

          {/* Hero Image Banner - Below the fold */}
          <div className="relative w-full max-w-3xl mx-auto mt-8 rounded-xl overflow-hidden shadow-xl opacity-90">
            <Image
              src="/RandomAnimalGenerator-hero.png"
              alt="Random Animal Generator - Diverse wildlife including lions, birds, sea turtles, and butterflies for educational learning"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto max-h-48 object-cover"
              title="Explore Wildlife Diversity with Random Animal Generator"
            />
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-8">
            <div className="inline-flex flex-col items-center gap-2 text-white/70 animate-bounce">
              <span className="text-sm font-medium">Scroll to see results & learn more</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results */}
        {animals.length > 0 && (
          <section className="mb-12 scroll-mt-8" id="results">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                Your Generated Animals
              </h2>
              <p className="text-white/90 mt-2 text-lg">Click on any card to learn more</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {animals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          </section>
        )}

        {/* Quick Introduction - After Results */}
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 mb-8 border border-purple-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              About Our Wildlife Discovery Tool
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
              Welcome to our <strong>random animal generator</strong> - an educational wildlife discovery tool designed for teachers, students, artists, and nature enthusiasts. This free animal randomizer provides instant access to fascinating creature facts and high-quality photographs from five major categories: mammals, birds, reptiles, marine life, and insects.
            </p>
            <p>
              Our <strong>random animal generator</strong> features 100+ carefully curated species, each with accurate scientific information and engaging facts. Whether you're creating lesson plans, seeking creative inspiration, or exploring biodiversity, this wildlife tool delivers educational content perfect for classroom activities, homeschooling, and personal learning.
            </p>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 mb-8 border border-purple-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How to Use the Random Animal Generator
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
                emoji: "🎓",
                title: "Classroom Education",
                description: "Teachers use our random animal generator to create engaging biology lessons and spark biodiversity discussions. Perfect for elementary through high school science education."
              },
              {
                emoji: "✍️",
                title: "Creative Writing",
                description: "Writers discover unique species for character creation and world-building. The wildlife generator adds authentic creature details to narratives."
              },
              {
                emoji: "🎨",
                title: "Art Reference",
                description: "Artists leverage this tool for drawing challenges and anatomy studies. Each profile includes high-quality reference photographs."
              },
              {
                emoji: "🏠",
                title: "Homeschooling",
                description: "Parents create educational games and quizzes with our random animal generator. Build a comprehensive wildlife curriculum easily."
              },
              {
                emoji: "🎮",
                title: "Trivia Games",
                description: "Create custom animal trivia and quiz competitions. Challenge friends to identify species and recall fascinating facts."
              },
              {
                emoji: "📚",
                title: "Personal Learning",
                description: "Wildlife enthusiasts explore new species daily and expand their knowledge of biodiversity and the animal kingdom."
              }
            ].map((useCase, index) => (
              <div key={index} className="group bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
        <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 mb-8 border border-purple-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
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
                question: "How does the random animal generator work?",
                answer: "Our wildlife generator randomly selects from 100+ species across five categories: mammals, birds, reptiles, marine animals, and insects. Choose 1-10 animals per generation and filter by category for targeted learning."
              },
              {
                question: "Is the random animal generator free?",
                answer: "Yes! Our random animal generator is completely free with no registration required. We provide educational wildlife resources accessible to everyone interested in nature and biodiversity."
              },
              {
                question: "Can I filter by animal category?",
                answer: "Absolutely! The random animal generator lets you filter by five major categories. Focus on specific wildlife groups for educational purposes or personal interest."
              },
              {
                question: "What makes this tool educational?",
                answer: "Each animal profile includes accurate scientific facts, habitat information, and high-quality images. Perfect for classroom activities, homeschooling, and research projects."
              },
              {
                question: "Does it work on mobile devices?",
                answer: "Yes! The random animal generator is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. Explore wildlife anywhere with internet access."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-purple-50 p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
        <footer className="text-center py-10 text-white">
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
            <p className="font-medium">&copy; 2026 Random Animal Generator</p>
          </div>
          <p className="opacity-80">Free educational wildlife discovery tool for learning</p>
        </footer>
      </div>
    </div>
  );
}
