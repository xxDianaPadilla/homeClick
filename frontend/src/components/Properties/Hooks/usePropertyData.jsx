import { useState, useEffect } from "react";
import house1 from '../../../assets/image5.png';
import house6 from '../../../assets/image6.png';
import house7 from '../../../assets/image7.png';
import house8 from '../../../assets/image5.png';

export const usePropertyData = (propertyId) => {
    const [mainImage, setMainImage] = useState(house8);

    const thumbnails = [house1, house6, house7, house1];

    // Objeto con los datos de la propiedad mostrada.
    const propertyData = {
        name: "Casa en Colonia Escalón",
        price: "$150,000",
        location: "San Salvador, El Salvador",
        description: "Hermosa y lugar de lujo donde se une espectacularmente zona residencial. Disfruta una viviesta privada y accesible, con amplios espacios iluminados, comodidad y seguridad. Ideal para familias que buscan calidad de vida, cerca de centros comerciales, colegios y zonas recreativas. Acaba y detalles modernos, ofrecen un equilibrio perfecto entre estilo, funcionalidad y confort.",
        details: [
            "Habitaciones: 3",
            "Baños: 4",
            "Parqueo: Sí",
            "Patio: Sí",
            "Ubicación: Urbanización Alpes de la Escalón, San Salvador centro",
            "Número: 42",
            "Año de construcción: 2021"
        ],
        dimensions: [
            "Tamaño del lote: 150 metros cuadrados",
            "Altura: 3.2 metros"
        ]
    };

    useEffect(() => {

        if (propertyId === '2' || propertyId === '5' || propertyId === '8') {
            setMainImage(house6);
        } else if (propertyId === '3' || propertyId === '6' || propertyId === '9') {
            setMainImage(house7);
        }else{
            setMainImage(house1)
        }
    }, [propertyId]);

    return {
        mainImage,
        setMainImage,
        thumbnails,
        propertyData
    };
};