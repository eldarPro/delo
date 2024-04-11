import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { IonButton, IonModal } from '@ionic/react';

const Slides: React.FC = () => {

  const [isOpen, setIsOpen] = useState(!localStorage.closed_slider);

  const closeSlides = () => {
    localStorage.closed_slider = true
    setIsOpen(false)
  }

  return (
    <IonModal isOpen={isOpen}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <section className='back_section'>
            <div className='slide_content'>
              <div className='slide_num'>1 шаг</div>
              <div className='slide_title'>Ознакомьтесь со сметой и комиссией!</div>
            </div>
            <div className='air air1'></div>
            <div className='air air2'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className='back_section'>
            <div className='slide_content'>
              <div className='slide_num'>2 шаг</div>
              <div className='slide_title'>Попросите чтобы с Вами связались для предварительного расчёта!<br /><br />Далее если все устраивает, вызвать замерщика.<br /><br />Он платный</div>
            </div>
            <div className='air air1'></div>
            <div className='air air2'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>
          </section>
        </SwiperSlide>

        <SwiperSlide>
          <section className='back_section'>
            <div className='slide_content'>
              <div className='slide_num'>3 шаг</div>
              <div className='slide_title'>После замера на прямую с производство заказываете весь материал.<br /><br />Замерщик все организует</div>
            </div>
            <div className='air air1'></div>
            <div className='air air2'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>
          </section>
        </SwiperSlide>

        <SwiperSlide>
          <section className='back_section'>
            
            <div className='slide_content'>
              <div className='slide_num'>4 шаг</div>
              <div className='slide_title'>Заключаем договор, оплачиваете комиссию и мы грузим Ваш заказ в приложение</div>
            </div>
            <div className='air air1'></div>
            <div className='air air2'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>
            <IonButton size='large' slot='fixed' color="warning" className='slide_done_button' onClick={closeSlides}>Понятно</IonButton>
          </section>
        </SwiperSlide>
      </Swiper>
    </IonModal>
  );
}

export default Slides;