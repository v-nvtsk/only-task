import { type PropsWithChildren } from "react";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import type { SwiperClass, SwiperProps } from "swiper/react";

type CustomSwiperProps = PropsWithChildren<
  Omit<SwiperProps, "onBeforeInit" | "onInit" | "onResize" | "children"> & {
    onInit: (swiper: SwiperClass) => void;
  }
>;

export const CustomSwiper = ({ children, onInit, ...props }: CustomSwiperProps) => (
  <Swiper
    modules={[Navigation]}
    onBeforeInit={(swiper) => {
      onInit(swiper);
    }}
    onInit={onInit}
    onResize={onInit}
    speed={500}
    spaceBetween={80}
    slidesPerView={3}
    slidesOffsetBefore={0}
    slidesOffsetAfter={0}
    breakpoints={{
      1024: {
        slidesPerView: 3,
        spaceBetween: 80,
      },
      320: {
        slidesPerView: 1.5,
        spaceBetween: 25,
      },
    }}
    {...props}
  >
    {children}
  </Swiper>
);