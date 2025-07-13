import './OurTeam.css'
import teamImage from '../../assets/AboutUsImage/a-highly-detailed-digital-artwork-showing-the-human-body-in-motion-as-if-exercising-with-visible-mu67.jpg'

export default function OurTeam() {
    return (
        <section className="our-team-section">
            <div className="team-container">
                {/* Header Section */}
                <div className="team-header">
                    <h2 className="team-title">
                        <span className="title-accent">Our</span> Team
                    </h2>
                </div>

                {/* Content Section */}
                <div className="team-content">
                    <div className="team-image-container">
                        <img src={teamImage} alt="HORMOGENUS Team" className="team-image" />
                        <div className="image-overlay">
                            <div className="overlay-content">
                                <h3>Expert Team</h3>
                                <p>Dedicated to Excellence</p>
                            </div>
                        </div>
                    </div>

                    <div className="team-text-content">
                        <p className="team-description">
                            Our team of experts combines advanced technology and rigorous quality standards to ensure the purity, safety, and consistency of every product we manufacture. We are committed to meeting the evolving needs of the medical field and athletic industry, distributing our diverse range of steroid solutions to clients and healthcare professionals worldwide.
                        </p>

                        <p className="team-description">
                            At HORMOGENUS, we believe in transparency, integrity, and continuous improvement, aiming to set new standards in the steroid pharmaceutical sector and contribute to better health outcomes and enhanced physical performance.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="team-stats">
                    <div className="stat-item">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Years Experience</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Countries Served</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Quality Assured</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Support Available</div>
                    </div>
                </div>
            </div>
        </section>
    )
} 