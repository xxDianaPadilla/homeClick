import areaIcon from "../assets/image38.png";
import bedIcon from "../assets/image39.png";
import personIcon from "../assets/image37.png";
import toiletIcon from "../assets/image40.png";
import trashcanIcon from "../assets/image36.png";
import "../styles/ShoppingCart.css";

const ShoppingCartCards = ({
    thumbnails,
    name,
    description,
    area,
    bedrooms,
    bathrooms,
    showContactAgent,
    onRemove
}) => {
    const handleRemoveClick = (e) => {
        e.stopPropagation();
        if (onRemove) {
            onRemove();
        }
    };

    const getImageToShow = () => {

        if (typeof thumbnails === 'string') {
            return thumbnails;
        }

        if (Array.isArray(thumbnails) && thumbnails.length > 0) {
            return thumbnails[0];
        }

        return thumbnails;
    };

    const imageToShow = getImageToShow();

    return (
        <div className="cart-item">
            <div className="item-image">
                <img
                    src={imageToShow}
                    alt={name || 'Propiedad'}
                    onError={(e) => {
                        console.log('Error cargando imagen:', imageToShow);
                        e.target.src = 'https://via.placeholder.com/300x200?text=Error+Imagen';
                    }}
                />
                <div className="image-counter2">
                    <img src={areaIcon} alt="Pictures" className="meta-icon" />
                </div>
            </div>
            <div className="item-details">
                <div className="item-header">
                    <h3>{name}</h3>
                </div>
                <p className="item-description">{description}</p>
                <div className="item-features">
                    <div className="feature">
                        <img src={areaIcon} alt="Área" />
                        <span>{area}</span>
                    </div>
                    <div className="feature">
                        <img src={bedIcon} alt="Dormitorios" />
                        <span>{bedrooms}</span>
                    </div>
                    <div className="feature">
                        <img src={toiletIcon} alt="Baños" />
                        <span>{bathrooms}</span>
                    </div>
                    <div className="feature">
                        {showContactAgent ? (
                            <>
                                <img src={personIcon} alt="Contactar agente" />
                                <span>1</span>
                            </>
                        ) : (
                            <>
                                <img
                                    src={trashcanIcon}
                                    alt="Eliminar"
                                    onClick={handleRemoveClick}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'opacity 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                                />
                                <span>Eliminar</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartCards;