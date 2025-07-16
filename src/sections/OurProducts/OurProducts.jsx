import './OurProducts.css'
import GradientText from '../../components/GradientText/GradientText';
import CountUp from '../../components/CountUp';

export default function OurProducts() {


    return (
        <section className="our-products-section pt-0 mt-5 ">

            <div className='card_product container'>
                <ul>
                    <li className='left'>
                        <h1><CountUp from={0} to={100} duration={2} className="countup" />%</h1>
                        <p>QUALITY
                            ASSURED</p>
                    </li>
                    <li className='top'>
                        <h1>+<CountUp from={0} to={33} duration={2} className="countup" /></h1>
                        <p>COUNTRIES
                            SERVED</p>
                    </li>
                    <li className='right'>
                        <h1>+<CountUp from={0} to={9} duration={2} className="countup" /></h1>
                        <p>YEARS
                            EXPERIENCE</p>
                    </li>
                </ul>
            </div>

            <div className="products-container ">
                {/* Header Section */}
                <div className="products-header our-team-content">
                    <GradientText className="products-title" showBorder colors={["#ffffff", "#e74c3c", "#ffffff", "#e74c3c", "#ffffff"]}>
                        OUR PRODUCTS
                    </GradientText>
                    <p className="products-description top">
                        HORMOGENUS offers high-quality steroid products in injectable and oral forms, developed with advanced technology and strict quality standards. Our solutions are designed for therapeutic use and performance support, ensuring safety, effectiveness, and trust for our clients worldwide.
                    </p>
                </div>

            </div>
        </section>
    )
} 