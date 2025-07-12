'use client'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "Descubre tu Estilo Único",
      subtitle: "Moda que refleja tu personalidad",
      cta: "Explorar Colección",
      bg: "from-purple-600 to-pink-600"
    },
    {
      title: "Nuevas Tendencias",
      subtitle: "Lo último en moda para esta temporada",
      cta: "Ver Novedades",
      bg: "from-blue-600 to-indigo-600"
    },
    {
      title: "Calidad Premium",
      subtitle: "Materiales de primera calidad al mejor precio",
      cta: "Comprar Ahora",
      bg: "from-indigo-600 to-purple-600"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient animado */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bg} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Formas decorativas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {slides[currentSlide].title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in delay-300">
          {slides[currentSlide].subtitle}
        </p>
        <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-fade-in delay-500">
          {slides[currentSlide].cta}
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}