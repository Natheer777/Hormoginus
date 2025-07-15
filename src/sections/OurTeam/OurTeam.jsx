import './OurTeam.css'
import teamImage from '../../assets/imageForOtherSection/assets_task_01jzpcpmmgenbb2cbhqsa27g79_1752024517_img_0.png'
import OurProducts from '../OurProducts/OurProducts'
import ScrollFloat from '../../components/ScrollFloat/ScrollFloat';

export default function OurTeam() {
    return (
        <div className='overlay'>


            <div
                className="our-team-section"
                style={{
                    backgroundImage: `linear-gradient(rgb(0 0 64 / 26%), rgb(0 0 64 / 23%)), url(${teamImage})`,
                }}
            >
                <div className="our-team-content">
                    <ScrollFloat containerClassName="our-team-title products-title">ABOUT US</ScrollFloat>
                    <p className='top products-description'>
                        HORMOGENUS is a pharmaceutical company dedicated to the research, development, and production of high-quality steroid formulations. With a strong focus on innovation and scientific excellence, we strive to deliver reliable and effective products that support therapeutic treatments and performance enhancement in a safe and responsible manner.
                    </p>
                </div>
                <OurProducts />
            </div>
        </div>

    )
} 