import { useState } from 'react'
import './OurProducts.css'
import ScrollFloat from '../../components/ScrollFloat/ScrollFloat';

export default function OurProducts() {
    const [activeProduct, setActiveProduct] = useState(0)


    return (
        <section className="our-products-section pt-0 mt-5 ">

            <div className='card_product container'>
                <ul>
                    <li className='left'>
                        <h1>%100</h1>
                        <p>QUALITY
                            ASSURED</p>
                    </li>
                    <li className='top'>
                        <h1>+33</h1>
                        <p>COUNTRIES
                            SERVED</p>
                    </li>
                    <li className='right'>
                        <h1>+9</h1>
                        <p>YEARS
                            EXPERIENCE</p>
                    </li>
                </ul>
            </div>

            <div className="products-container ">
                {/* Header Section */}
                <div className="products-header our-team-content">
                    <ScrollFloat containerClassName="products-title">
                        OUR PRODUCTS
                    </ScrollFloat>
                    <p className="products-description top">
                        HORMOGENUS offers high-quality steroid products in injectable and oral forms, developed with advanced technology and strict quality standards. Our solutions are designed for therapeutic use and performance support, ensuring safety, effectiveness, and trust for our clients worldwide.
                    </p>
                </div>


             
            </div>
        </section>
    )
} 