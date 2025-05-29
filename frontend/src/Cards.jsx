import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';  // Import necessary Swiper styles
import "./swiperStyles.css"
import { EffectCards ,Autoplay } from 'swiper';

const Cards = () => {
  return (
    <div className='cards_swiper_buff'>
 
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards,Autoplay]} // Use the EffectCards module
        className="mySwiper"
        // disableOnInteraction: false
        autoplay={{ delay: 600  }} 
        loop={true} 
        
      >
        <SwiperSlide><img src='./wallperSection/x.webp'   alt=''/></SwiperSlide>
        <SwiperSlide><img src='./wallperSection/y.webp'   alt=''/></SwiperSlide>
        <SwiperSlide><img src='./wallperSection/z.webp'   alt=''/></SwiperSlide>
      
       
      </Swiper> 
      
    </div>
  );
};

export default Cards;
