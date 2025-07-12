'use client'
import ButtonCheckout from './ButtonCheckout'
import { useState } from 'react'

export default function ListaProductos({ productos }) {
  const [imageErrors, setImageErrors] = useState(new Set())

  const handleImageError = (productId) => {
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const getImageSrc = (producto) => {
    if (imageErrors.has(producto.id)) {
      return `https://via.placeholder.com/400x300/6366f1/white?text=${encodeURIComponent(producto.nombre)}`
    }
    return producto.imagen
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {productos.length > 0 ? (
        productos.map((producto, index) => (
          <div 
            key={producto.id} 
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Imagen del producto */}
            <div className="relative overflow-hidden">
              <img 
                src={getImageSrc(producto)}
                alt={producto.nombre}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => handleImageError(producto.id)}
              />
              
              {/* Overlay con efectos */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Badge de categoría */}
              {producto.categoria && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  {producto.categoria}
                </div>
              )}
            </div>

            {/* Contenido del producto */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {producto.nombre}
              </h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    {producto.precio}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    {producto.moneda}
                  </span>
                </div>
                
                {/* Rating simulado */}
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(4.0)</span>
                </div>
              </div>

              {/* Botón de compra mejorado */}
              <ButtonCheckout priceId={producto.id} />
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-gray-600 mb-6">
              Lo sentimos, no encontramos productos en esta categoría por el momento.
            </p>
            <a 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      )}
    </div>
  )
}