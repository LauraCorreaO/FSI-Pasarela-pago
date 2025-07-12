'use client'
import { useRouter } from 'next/navigation'

const categorias = [
  { 
    nombre: 'Camisas', 
    ruta: 'camisas', 
    emoji: '👔',
    description: 'Elegantes y cómodas',
    color: 'from-blue-400 to-blue-600'
  },
  { 
    nombre: 'Pantalones', 
    ruta: 'pantalones', 
    emoji: '👖',
    description: 'Para cualquier ocasión',
    color: 'from-indigo-400 to-indigo-600'
  },
  { 
    nombre: 'Vestidos', 
    ruta: 'vestidos', 
    emoji: '👗',
    description: 'Sofisticados y únicos',
    color: 'from-pink-400 to-pink-600'
  },
  { 
    nombre: 'Chaquetas', 
    ruta: 'chaquetas', 
    emoji: '🧥',
    description: 'Estilo y abrigo',
    color: 'from-purple-400 to-purple-600'
  },
  { 
    nombre: 'Faldas', 
    ruta: 'faldas', 
    emoji: '👚',
    description: 'Femininas y versátiles',
    color: 'from-rose-400 to-rose-600'
  },
]

export default function CategoriesGrid() {
  const router = useRouter()

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explora por Categorías
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas navegando por nuestras categorías especializadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias.map((categoria, index) => (
            <div
              key={categoria.ruta}
              onClick={() => router.push(`/shop/${categoria.ruta}`)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Fondo gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-br ${categoria.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Efectos decorativos */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              {/* Contenido */}
              <div className="relative z-10 p-8 h-48 flex flex-col justify-between text-white">
                <div>
                  <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {categoria.emoji}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{categoria.nombre}</h3>
                  <p className="text-white/90 text-sm">{categoria.description}</p>
                </div>
                
                <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Explorar</span>
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Efecto hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}