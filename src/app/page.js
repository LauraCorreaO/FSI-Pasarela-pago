import { Stripe } from 'stripe'
import ListaProductos from './components/ListaProductos'
import HeroSection from './components/HeroSection'
import CategoriesGrid from './components/CategoriesGrid'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // Obtener todos los productos
  const pricesData = await stripe.prices.list({ 
    expand: ['data.product'],
    limit: 100
  });

  // Convertir a formato que espera el componente
  const todosLosProductos = pricesData.data
    .filter(price => price.product.active) // Solo productos activos
    .map(price => ({
      id: price.id,
      nombre: price.product.name,
      precio: (price.unit_amount / 100).toFixed(2),
      moneda: price.currency.toUpperCase(),
      imagen: price.product.images?.[0] || '/ropa.jpg',
      categoria: price.product.metadata?.categoria || 'Sin categoría'
    }))

  // Obtener productos destacados (primeros 6)
  const productosDestacados = todosLosProductos.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categorías */}
      <CategoriesGrid />
      
      {/* Productos Destacados */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección especial de productos más populares
            </p>
          </div>
          
          <ListaProductos productos={productosDestacados} />
          
          {/* Botón para ver todos los productos */}
          <div className="text-center mt-12">
            <a
              href="/shop/todos"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Ver Todos los Productos
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {todosLosProductos.length}+
              </div>
              <div className="text-gray-600">Productos Disponibles</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">5</div>
              <div className="text-gray-600">Categorías</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-pink-600 mb-2">100%</div>
              <div className="text-gray-600">Satisfacción Garantizada</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}