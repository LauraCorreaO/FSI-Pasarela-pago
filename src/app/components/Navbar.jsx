'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDownIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

const categorias = [
  { nombre: 'Camisas', ruta: 'camisas', emoji: '👔' },
  { nombre: 'Pantalones', ruta: 'pantalones', emoji: '👖' },
  { nombre: 'Vestidos', ruta: 'vestidos', emoji: '👗' },
  { nombre: 'Chaquetas', ruta: 'chaquetas', emoji: '🧥' },
  { nombre: 'Faldas', ruta: 'faldas', emoji: '👚' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl hover:text-pink-200 transition-colors">
            <ShoppingBagIcon className="h-8 w-8" />
            <span>StyleShop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-pink-200 transition-colors font-medium">
              Inicio
            </Link>
            
            {/* Dropdown de categorías */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-white hover:text-pink-200 transition-colors font-medium">
                <span>Categorías</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <div className="py-1">
                  {categorias.map((categoria) => (
                    <Link
                      key={categoria.ruta}
                      href={`/shop/${categoria.ruta}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 hover:text-indigo-600 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span className="text-lg">{categoria.emoji}</span>
                      <span>{categoria.nombre}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-pink-200 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mt-2 mb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-white hover:bg-white/20 rounded-md transition-colors">
                Inicio
              </Link>
              {categorias.map((categoria) => (
                <Link
                  key={categoria.ruta}
                  href={`/shop/${categoria.ruta}`}
                  className="block px-3 py-2 text-white hover:bg-white/20 rounded-md transition-colors flex items-center space-x-2"
                >
                  <span>{categoria.emoji}</span>
                  <span>{categoria.nombre}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}