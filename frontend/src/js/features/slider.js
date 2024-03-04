// import Swiper JS
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiperHero', {
  modules: [Navigation, Pagination],
});

const swiperImg = new Swiper('.swiperImg', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  direction: "vertical",
  slidesPerView: 1.1,
  spaceBetween: 10,
  autoHeight: true,
});
