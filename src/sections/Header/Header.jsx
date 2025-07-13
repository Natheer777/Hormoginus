import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './Header.css'
import slide1 from '../../assets/sliderNavBar/assets_task_01jzpc4v0be0rbgtrt35gzrjqd_1752023935_img_0.png'
import slide2 from '../../assets/sliderNavBar/assets_task_01jzpca6vtf93b4nf4hbtjv30v_1752024116_img_1.png'
import slide3 from '../../assets/sliderNavBar/assets_task_01jzpd3szperm9907yqt6kmqez_1752024962_img_0.png'

export default function Header() {
  const slides = [
    {
      image: slide1,
      text: "HORMOGENUS upholds rigorous quality standards to ensure the purity, safety, and effectiveness of its steroid products for various medical and performance needs"
    },
    {
      image: slide2,
      text: "HORMOGENUS invests extensively in research to develop advanced steroid formulations that support therapeutic treatments and enhance physical performance safely"
    },
    {
      image: slide3,
      text: "HORMOGENUS is a UK-based pharmaceutical company focused on innovative pharmaceutical solutions. HORMOGENUS delivers reliable formulations and a wide range of high-quality products across diverse therapeutic areas"
    }
  ]

  return (
    <>
      <div className='Headerr'>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="header-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="header-slide">
              <div className="slide-background" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="slide-overlay">
                  <div className="content_header">
                    <p>{slide.text}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
