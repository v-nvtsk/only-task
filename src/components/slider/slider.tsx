import { useEffect, useRef } from "react";
import { SwiperSlide, type SwiperClass } from "swiper/react";
import { SliderScrollButton } from "./slider-scroll-btn/slider-scroll-btn";
import type { PeriodEvent } from "@/types/data";
import { classnames } from "@utils/classnames";
import { numberOrOne } from "@utils/number-or-one";
import { SlideCard } from "@components/slider/slide-card/slide-card";
import { CustomSwiper } from "./custom-swiper";
import { useProgress, useFadeIn } from "./hooks";
import 'swiper/css';
import * as styles from './style.module.css';

interface SliderProps{
  events: PeriodEvent[]
}

export const Slider = ({ events }: SliderProps) => {
  const {
    isBeginning,
    setIsBeginning,
    isEnd,
    setIsEnd,
    progressHandler,
  } = useProgress();
  const { isChanging } = useFadeIn(events);
  
  const swiperRef = useRef<SwiperClass | null>(null);
  const sliderPrevRef = useRef<HTMLButtonElement>(null);
  const sliderNextRef = useRef<HTMLButtonElement>(null);

  const initHandler = (swiper: SwiperClass) => {
    swiperRef.current = swiper;
    const totalSlides = swiper.slides.length;
    const slidesPerView = numberOrOne(swiper.params.slidesPerView);
    
    setIsEnd(totalSlides <= slidesPerView);
    setIsBeginning(true);
  };

  useEffect(() => {
    if (isChanging) swiperRef.current?.setProgress(0);
  }, [isChanging]);

  return (
    <div className={classnames(styles.wrapper, isChanging ? styles.changing : '')}>
      <SliderScrollButton
        isVisible={!isBeginning}
        refLink={sliderPrevRef} className={styles.prev}
        onClick={() => swiperRef.current?.slidePrev()}
      />
      <CustomSwiper
        onInit={initHandler} onEnded={() => setIsEnd(true)} onProgress={progressHandler}
      >
        {events.map((item, index) => {
          const key = `${item.year}-${index}`;
          return <SwiperSlide key={key}>
            {({ isActive }) => <SlideCard item={item} isActive={isActive}/>}
          </SwiperSlide>;
        })}
      </CustomSwiper>
      <SliderScrollButton
        isVisible={!isEnd}
        refLink={sliderNextRef} className={styles.next}
        onClick={() => swiperRef.current?.slideNext(500, true)}
      />
    </div>
  );
};
