import Stripe from 'stripe'
import ListaProductos from '../../components/ListaProductos'

export const dynamic = 'force-dynamic'

export default async function CategoriaPage({ params }) {
  // Await params before destructuring
  const { categoria } = await params;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // Obtener todos los precios (sin límite de 10 por defecto)
  const pricesData = await stripe.prices.list({ 
    expand: ['data.product'],
    limit: 100 // Ajusta según tus necesidades
  });

  // Debug: Imprimir todos los productos y sus metadatos
  console.log('=== DEBUG INFO ===');
  console.log('Categoría buscada:', categoria);
  console.log('Total de precios encontrados:', pricesData.data.length);
  
  // Mapear todas las categorías disponibles para debug
  const categoriasDisponibles = pricesData.data
    .filter(price => price.product.active)
    .map(price => ({
      nombre: price.product.name,
      categoria: price.product.metadata?.categoria || 'Sin categoría'
    }));
  
  console.log('Categorías disponibles:', categoriasDisponibles);

  // Crear un mapeo de categorías para manejo más flexible
  const categoriaMap = {
    'camisas': ['camisas', 'camisa', 'shirts', 'shirt'],
    'pantalones': ['pantalones', 'pantalon', 'pants', 'jeans'],
    'vestidos': ['vestidos', 'vestido', 'dress', 'dresses'],
    'chaquetas': ['chaquetas', 'chaqueta', 'jacket', 'jackets', 'abrigos'],
    'faldas': ['faldas', 'falda', 'skirt', 'skirts'],
    'todos': ['todos', 'all', 'everything']
  };

  let productos = [];

  if (categoria === 'todos') {
    // Mostrar todos los productos
    productos = pricesData.data
      .filter(price => price.product.active)
      .map(price => ({
        id: price.id,
        nombre: price.product.name,
        precio: (price.unit_amount / 100).toFixed(2),
        moneda: price.currency.toUpperCase(),
        imagen: price.product.images?.[0] || '/ropa.jpg',
        categoria: price.product.metadata?.categoria || 'Sin categoría'
      }));
  } else {
    // Filtrar por categoría específica
    const variacionesCategoria = categoriaMap[categoria] || [categoria];
    
    productos = pricesData.data
      .filter(price => {
        if (!price.product.active) return false;
        
        const categoriaProducto = price.product.metadata?.categoria?.toLowerCase() || '';
        
        // Verificar si la categoría del producto coincide con alguna variación
        return variacionesCategoria.some(variacion => 
          categoriaProducto.includes(variacion.toLowerCase()) ||
          variacion.toLowerCase().includes(categoriaProducto)
        );
      })
      .map(price => ({
        id: price.id,
        nombre: price.product.name,
        precio: (price.unit_amount / 100).toFixed(2),
        moneda: price.currency.toUpperCase(),
        imagen: price.product.images?.[0] || '/ropa.jpg',
        categoria: price.product.metadata?.categoria || 'Sin categoría'
      }));
  }

  console.log('Productos filtrados:', productos.length);
  console.log('Productos encontrados:', productos.map(p => ({ nombre: p.nombre, categoria: p.categoria })));

  // Formatear el título de la página
  const formatearTitulo = (cat) => {
    const titulos = {
      'camisas': 'Camisas',
      'pantalones': 'Pantalones',
      'vestidos': 'Vestidos',
      'chaquetas': 'Chaquetas',
      'faldas': 'Faldas',
      'todos': 'Todos los Productos'
    };
    return titulos[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header de la categoría */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {formatearTitulo(categoria)}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {categoria === 'todos' 
              ? 'Descubre toda nuestra colección de productos' 
              : `Encuentra los mejores ${formatearTitulo(categoria).toLowerCase()} para tu estilo`
            }
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {productos.length} {productos.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Inicio
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {formatearTitulo(categoria)}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Lista de productos */}
        <ListaProductos productos={productos} />

        {/* Mensaje adicional si no hay productos */}
        {productos.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.691c-2.343-1.343-3.329-3.806-2.13-6.1l1.905-3.642a1 1 0 01.894-.553h8.662a1 1 0 01.894.553l1.905 3.642c1.199 2.294.213 4.757-2.13 6.1z" />
              </svg>
              <p className="text-lg">
                No se encontraron productos en esta categoría.
              </p>
              <p className="text-sm mt-2">
                Consulta la consola del navegador para más información de debug.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}