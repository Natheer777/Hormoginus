import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './Header.css'
import slide1 from '../../assets/sliderNavBar/assets_task_01jzpc4v0be0rbgtrt35gzrjqd_1752023935_img_0.png'
import slide2 from '../../assets/sliderNavBar/assets_task_01jzpca6vtf93b4nf4hbtjv30v_1752024116_img_1.png'
import slide3 from '../../assets/sliderNavBar/assets_task_01jzpd3szperm9907yqt6kmqez_1752024962_img_0.png'
import CircularText from '../../components/CircularText/CircularText';
export default function Header() {
  const slides = [
    {
      image: slide1,
      text: "HORMOGENUS ensures strict quality standards to deliver pure, safe, and effective steroid products designed for medical therapies and athletic performance support."
    },
    {
      image: slide2,
      text: "HORMOGENUS advances research to create refined steroid formulas that support treatment goals and improve physical performance with innovation, care, and safety."
    },
    {
      image: slide3,
      text: "HORMOGENUS is a UK pharmaceutical company offering innovative solutions and premium-quality products tailored for a wide range of therapeutic and medical applications."
    }
  ];
  

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className='Headerr mb-0' style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20
        }}>
          <CircularText text="-HORMOGENUS-ORIGINAL" spinDuration={20} onHover="speedUp" />
        </div>
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
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="header-slide">
              <div className="slide-background" style={{ backgroundImage: `url(${slide.image})` }}>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="content_header" style={{ zIndex: 9999, position: 'absolute', top: 210, left: '50%', transform: 'translateX(-50%)' }}>
          <p>{slides[activeIndex].text}</p>
        </div>
      </div>

    </>
  )
}
