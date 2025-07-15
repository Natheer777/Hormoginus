import './Comment.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaStar } from "react-icons/fa";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Comment() {
  return (
    <div className="comment-section">
      <h2 className="comment-title">REVIEWS</h2>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="comment-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="user-img" />
            <p className="user-comment">
              HOROGENUS supplements completely transformed my energy levels! Incredible taste and noticeable results.”
              <br /><FaStar /><FaStar /><FaStar /><FaStar /><FaStar />

            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="comment-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="user-img" />
            <p className="user-comment">
              “I’ve tried many brands, but Thunder stands out in quality and performance. Highly recommend!”
              <br /><FaStar /><FaStar /><FaStar /><FaStar /><FaStar />

            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="comment-card">
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="user-img" />
            <p className="user-comment">
              “From packaging to performance, HOROGENUS delivers excellence. My new go-to supplement brand!”
              <br /><FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
