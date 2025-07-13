import { useState } from 'react'
import './OurProducts.css'
import productImage1 from '../../assets/imageForOtherSection/assets_task_01jzpca6vtf93b4nf4hbtjv30v_1752024116_img_0.png'
import productImage2 from '../../assets/imageForOtherSection/assets_task_01jzpcjsmbefbbdrcy952qk8ej_1752024399_img_1.png'
import productImage3 from '../../assets/imageForOtherSection/assets_task_01jzpcpmmgenbb2cbhqsa27g79_1752024517_img_0.png'
import productImage4 from '../../assets/imageForOtherSection/assets_task_01jzpctybnfedbnfc43k93degj_1752024662_img_1.png'

export default function OurProducts() {
    const [activeProduct, setActiveProduct] = useState(0)

    const products = [
        {
            id: 1,
            name: "Injectable Solutions",
            image: productImage1,
            description: "High-quality injectable steroid products developed with cutting-edge technology for optimal therapeutic outcomes."
        },
        {
            id: 2,
            name: "Oral Formulations",
            image: productImage2,
            description: "Carefully formulated oral steroid solutions designed for maximum effectiveness and safety."
        },
        {
            id: 3,
            name: "Performance Support",
            image: productImage3,
            description: "Specialized products engineered to support physical performance and recovery needs."
        },
        {
            id: 4,
            name: "Therapeutic Solutions",
            image: productImage4,
            description: "Pharmaceutical-grade steroid products meeting the highest standards for medical applications."
        }
    ]

    return (
        <section className="our-products-section ">
            <div className="products-container">
                {/* Header Section */}
                <div className="products-header">
                    <h2 className="products-title">
OUR PRODUCTS
                    </h2>
                    <p className="products-description top">
                        HORMOGENUS offers high-quality steroid products in injectable and oral forms, developed with advanced technology and strict quality standards. Our solutions are designed for therapeutic use and performance support, ensuring safety, effectiveness, and trust for our clients worldwide.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`product-card ${activeProduct === index ? 'active' : ''} top`}
                            onMouseEnter={() => setActiveProduct(index)}
                        >
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} className="product-image" />
                             
                            </div>

                            <div className="product-content">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>

                                <div className="product-actions">
                              
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="product-features">
                    <div className="feature-item left">
                        <div className="feature-icon">🔬</div>
                        <h4>Advanced Technology</h4>
                        <p>Cutting-edge pharmaceutical technology</p>
                    </div>
                    <div className="feature-item right">
                        <div className="feature-icon">🛡️</div>
                        <h4>Quality Standards</h4>
                        <p>Strict quality control and safety measures</p>
                    </div>
                    <div className="feature-item left">
                        <div className="feature-icon">🌍</div>
                        <h4>Global Trust</h4>
                        <p>Trusted by clients worldwide</p>
                    </div>
                    <div className="feature-item right">
                        <div className="feature-icon">⚡</div>
                        <h4>Performance Support</h4>
                        <p>Designed for optimal results</p>
                    </div>
                </div>
            </div>
        </section>
    )
} 