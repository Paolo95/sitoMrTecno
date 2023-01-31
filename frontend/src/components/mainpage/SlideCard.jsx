import React from 'react'
import Sdata from './Sdata'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const SlideCard = ({ tab }) => {

  SwiperCore.use([Autoplay]);
  
  return (
    <>
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
    >
      {Sdata.filter(item => item.section === tab ).map((value, index) => {
        return (
            <SwiperSlide className="box d_flex top" key={index}>
              <div className="left">
                <img src={window.location.origin + value.cover} alt="" />
              </div>
              <div className="right">
                <h1>{value.title}</h1>
                <p>{value.desc}</p>                
              </div>
            </SwiperSlide>
        )
      })}
    </Swiper>
    </>
  )     
    
}

export default SlideCard
