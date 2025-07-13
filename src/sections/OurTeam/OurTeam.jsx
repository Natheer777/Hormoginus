import './OurTeam.css'
import teamImage from '../../assets/AboutUsImage/a-highly-detailed-digital-artwork-showing-the-human-body-in-motion-as-if-exercising-with-visible-mu67.jpg'

export default function OurTeam() {
    return (
        <section
            className="our-team-section"
            style={{
                backgroundImage: `url(${teamImage})`,
            }}
        >
            <div className="our-team-content">
                <h2 className="our-team-title products-title">ABOUT US</h2>
                <p className='top'>
                    HORMOGENUS is a pharmaceutical company dedicated to the research, development, and production of high-quality steroid formulations. With a strong focus on innovation and scientific excellence, we strive to deliver reliable and effective products that support therapeutic treatments and performance enhancement in a safe and responsible manner.
                </p>
            </div>
        </section>
    )
} 