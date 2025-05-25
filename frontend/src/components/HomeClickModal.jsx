import React from "react";
import { X } from 'lucide-react';

const HomeClickModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-orange-600">Sobre HomeClick</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Cerrar modal"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <section>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Por qué HomeClick?</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            El nombre <strong className="text-orange-600">HomeClick</strong> fue elegido para nuestra tienda en línea de venta de casas porque refleja perfectamente la esencia de nuestro servicio: la posibilidad de encontrar el hogar ideal con solo un clic.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-orange-700 mb-2">HOME</h4>
                                <p className="text-gray-700 text-sm">
                                    Transmite de manera directa el propósito de nuestra plataforma: la compra y venta de viviendas. Evoca sensaciones de comodidad, seguridad y estabilidad, valores fundamentales en la decisión de adquirir un nuevo hogar.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-700 mb-2">CLICK</h4>
                                <p className="text-gray-700 text-sm">
                                    Representa la facilidad y modernidad de nuestro servicio. En un mundo cada vez más digital, este término resalta la rapidez y accesibilidad que ofrecemos.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                            Misión
                        </h3>
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                            <p className="text-gray-700 leading-relaxed">
                                Facilitar el proceso de compra y venta de viviendas mediante una plataforma digital innovadora, brindando a nuestros clientes herramientas avanzadas, asesoría confiable y un servicio eficiente que transforme la manera en que las personas acceden a su nuevo hogar.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Visión
                        </h3>
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                            <p className="text-gray-700 leading-relaxed">
                                Ser la plataforma líder en la compra y venta de viviendas en línea, ofreciendo una experiencia rápida, segura y accesible, donde cualquier persona pueda encontrar su hogar ideal con solo un clic.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="border-t border-gray-200 p-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeClickModal;