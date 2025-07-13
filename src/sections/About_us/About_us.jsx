import './About_us.css'
import Logo from '../../assets/Asset 11@8x.png'
export default function AboutUs() {
    return (
        <div className="BackgroundAboutUs">
            <div className="About_us">
                <div className="about-card container">
                    <h1 className="about-title">About Us</h1>
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6 about-logo">
                            <img src={Logo} className="about-img" alt="" />
                        </div>
                        <div className="col-xl-6 col-lg-6 about-mission">
                            {/* <h2 className="about-mission-title">OUR MISSION AND VISION</h2> */}
                        </div>
                    </div>
                    <p className="about-desc mt-4">
                    HORMOGENUS is a pharmaceutical company dedicated to the research, development, and production of high-quality steroid formulations. With a strong focus on innovation and scientific excellence, we strive to deliver reliable and effective products that support therapeutic treatments and performance enhancement in a safe and responsible manner.
                    </p>
                </div>
            </div>
        </div>
    )
}
