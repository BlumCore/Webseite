// import Swiper JS
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiperHero', {
  modules: [Navigation, Pagination],
  autoplay: {
    delay: 4000,
  },
});

const swiperImg = new Swiper('.swiperImg', {
  modules: [Navigation, Pagination],
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  autoplay: {
    delay: 4000,
  },
});
