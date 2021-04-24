'use strict';
const swiper = document.querySelectorAll('.shop__container');
if (document.querySelector(`.shop`)) {
  document.querySelector(`.shop__no-js`).classList.remove(`shop__no-js`);
  const swiper = new Swiper(`.shop__container`, {
    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`
    },
    pagination: {
      el: `.swiper-pagination`,
      clickable: true,
      renderBullet(index, className) {
        return `<span class="` + className + `">` + (index + 1) + `</span>`;
      },
      renderFraction(currentClass, totalClass) {
        return `<span class="` + currentClass + `"></span>` +
                ` of ` +
                `<span class="` + totalClass + `"></span>`;
      }
    },
    slidesPerView: 4,
    slidesPerGroup: 4,
    loop: true,
    a11y: {
      enabled: true,
    },
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          type: `fraction`
        }
      },
      767: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          type: `bullets`
        }
      },
      1201: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        pagination: {
          type: `bullets`
        }
      }
    }
  });
}