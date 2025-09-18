import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Controller } from 'swiper/modules';
import type SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import ArrowBack from '../assets/arrow-left.svg?react';
import ArrowForward from '../assets/arrow-right.svg?react';

import * as styles from './Slider.module.scss';
import clsx from 'clsx';
import { Button } from '@shared/ui';
import gsap from 'gsap';

export interface TimelineEvent {
  title: number | string;
  description: string;
}

interface TimelineSliderProps {
  events: TimelineEvent[];
}

export const TimelineSlider = ({ events }: TimelineSliderProps) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }

    if (wrapperRef.current) {

      gsap.fromTo(
        wrapperRef.current,
        { a11utoAlpha: 0, y: 20, opacity: 0 },
        {
          opacity: 1,
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'back.inOut',
          stagger: 0.1,
        }
      );
    }
  }, [events]);

  return (
    <div className={styles.sliderContainer} ref={wrapperRef}>
      <Button ref={prevRef} className={clsx(styles.controller)}>
        <ArrowBack className={styles.icon} />
      </Button>
      <Swiper
        modules={[Navigation, Controller]}
        spaceBetween={30}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setTimeout(() => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.6,
            spaceBetween: 25,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
        }}
        className={styles.swiper}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <div className={styles.card}>
              <h3 className={styles.title}>{event.title}</h3>
              <p className={styles.description}>{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button ref={nextRef} className={clsx(styles.controller)}>
        <ArrowForward className={styles.icon} />
      </Button>
    </div>
  );
};
