"use client";
import { useState } from 'react';

function ButtonCheckout({ priceId }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);
        
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify({ priceId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await res.json();
            
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No se pudo obtener la URL de pago');
            }
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            alert('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            onClick={handleCheckout}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Procesando...</span>
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <span>Comprar Ahora</span>
                </>
            )}
        </button>
    );
}

export default ButtonCheckout;