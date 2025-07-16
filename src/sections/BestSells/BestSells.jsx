import './BestSells.css'
import injec from '../../assets/videos/Export_Video_2025-06-30_1_rfsosa.mp4'
import tab from '../../assets/videos/2_mqjqng (1).mp4'
import ScrollFloat from '../../components/ScrollFloat/ScrollFloat'
export default function BestSells() {
    return (
        <section className="best-sells-section">
            <div className="container">
                <ScrollFloat containerClassName='best-sells-section_title '>Best Sellers</ScrollFloat>
                <div className="best-sells-grid">
                    <div className="best-sell-card">
                        <h2>Injections</h2>
                        <video src={injec} muted loop autoPlay playsInline />
                    </div>
                    <div className="best-sell-card">
                        <h2>Tablets</h2>
                        <video src={tab} muted loop autoPlay playsInline />
                    </div>
                </div>
            </div>
        </section>
    )
}