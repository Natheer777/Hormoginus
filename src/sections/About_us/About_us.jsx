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
                            <h2 className="about-mission-title">OUR MISSION AND VISION</h2>
                        </div>
                    </div>
                    <p className="about-desc mt-4">
                        The GMP facilities at Black Tiger Pharma enables it to work towards the Vision to achieve a meaningful position in India & across the globe. We intend to expand across the Indian subcontinent in a planned manner to achieve our vision.
                    </p>
                </div>
            </div>
        </div>
    )
}
