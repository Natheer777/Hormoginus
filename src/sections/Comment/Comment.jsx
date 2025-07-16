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
              “HOROGENUS products exceeded my expectations in both quality and performance. I felt stronger, more focused, and energized within days!”
              <br /><FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="comment-card">
            <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="User" className="user-img" />
            <p className="user-comment">
              “The purity and consistency of HOROGENUS supplements are unmatched. My workouts are more effective, and recovery is faster than ever.”
              <br /><FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="comment-card">
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="user-img" />
            <p className="user-comment">
              “HOROGENUS delivers pharmaceutical-grade quality you can trust. Visible results, enhanced endurance, and no side effects at all!”
              <br /><FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </p>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
