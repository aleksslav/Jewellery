'use strict';
    
(() => {

    /* слайдер */
    const PictureCount = {
      DESKTOP: 4,
      TABLET: 2
    };

    const MaxWidth = {
      TABLET: 1023,
      MOBILE: 767
    };

    const tablet = window.matchMedia(`(max-width: ${MaxWidth.TABLET}px)`);
    const mobile = window.matchMedia(`(max-width: ${MaxWidth.MOBILE}px)`);

    const list = document.querySelector(`.slider__list--js`);
    const items = document.querySelectorAll(`.slider__item--js`);
    const buttonLeft = document.querySelector(`.new-items__btn--prev`);
    const buttonRight = document.querySelector(`.new-items__btn--next`);

/* вывод количества страниц */
const paginationList = document.querySelector(`.pagination`);
let deleter = 4;

if (tablet.matches || mobile.matches) {
  deleter = 2;
};

for (let i = 1; i <= items.length / deleter; i++) {
  let li = document.createElement(`li`);
  li.classList.add(`pagination__item`);
  li.textContent= i;
  paginationList.appendChild(li);
};

let pageNumbers = document.querySelectorAll(`.pagination__item`);

let li = document.createElement(`li`);
li.classList.add(`pagination__item`, `pagination__item--span`);
li.textContent = `of`;
paginationList.appendChild(li);

li = document.createElement(`li`);
li.classList.add(`pagination__item`, `pagination__item--last-child`);
li.textContent = pageNumbers.length;
paginationList.appendChild(li);

for (let i = 0; i < pageNumbers.length; i++) {
  pageNumbers[0].classList.add(`pagination__item--active`);
};

let index = 0;

const updateSelection = () => {
  let active = document.querySelector(`li.pagination__item--active`);
  if (active) {
    active.classList.remove(`pagination__item--active`);
  }
  pageNumbers[index].classList.add(`pagination__item--active`);
};

const nextElem = () => {
  index = (index + 1) % pageNumbers.length;
  updateSelection();
  if (index === pageNumbers.length - 1) {
    buttonRight.removeEventListener('click', nextElem);
  }
};

const previousElem = () => {
  index = (index + pageNumbers.length - 1) % pageNumbers.length;
  updateSelection();
  if (index === 0) {
    buttonLeft.removeEventListener('click', previousElem);
  }
}

let wrapperWidth; /* вычисляемая под конкретное разрешение ширина контейнера */
let itemWidth; /* вычисляемая под конкретное разрешение ширина 1 слайда */
let itemMarginRight; /* вычисляемый margin */

let positionLeftItem = 0;
let transform = 0;

let step; /* шаг */
let itemsArray = [];
let startX = 0; /* для мобильного тача - начало перемещения */

if (items) {
  items.forEach((item, index) => {
    itemsArray.push({item: item, position: index, transform: 0});
  });
}

const position = {
  getMin: 0,
  getMax: itemsArray.length - 1
};

let count; /* временная переменная для определения количества изображений на адаптиве */


const changeSizeHandler = (evt) => {

  if (evt.matches) {
    count = PictureCount.TABLET;
  } else {
    count = PictureCount.DESKTOP;
  }

  if (list && items) {
    wrapperWidth = parseFloat(getComputedStyle(list).width);
    itemWidth = parseFloat(getComputedStyle(items[0]).width);
    itemMarginRight = parseInt(getComputedStyle(items[0]).marginRight);

    step = (itemWidth + itemMarginRight) / wrapperWidth * 100;

    positionLeftItem = 0;
    transform = 0;
    list.style.transform = `translateX(` + transform + `%)`;
  }
};

const setMobileHandler = (evt) => {
  if (evt.matches) {
    setMobileTouch();
  }
};

const buttonRightClickHandler = () => {
  if (positionLeftItem + count >= position.getMax) {
    return;
  }

  positionLeftItem = positionLeftItem + count;

  transform -= step * count;
  list.style.transform = `translateX(` + transform + `%)`;
  nextElem();
};

const buttonLeftClickHandler = () => {
  if (positionLeftItem <= position.getMin) {
    return;
  }

  positionLeftItem = positionLeftItem - count;
  transform += step * count;

  list.style.transform = `translateX(` + transform + `%)`;
  previousElem();
};

const setMobileTouch = () => {
  if (list) {
    list.addEventListener(`touchstart`, (evt) => {
      startX = evt.changedTouches[0].clientX;
    }, {passive: true});

    list.addEventListener(`touchend`, (evt) => {
      let endX = evt.changedTouches[0].clientX;
      let deltaX = endX - startX;

      if (deltaX > 50) {
        buttonRightClickHandler();
      } else if (deltaX < -50) {
        buttonLeftClickHandler();
      }
    }, {passive: true});
  }
};

if (buttonLeft && buttonRight) {
  buttonRight.addEventListener(`click`, buttonRightClickHandler);
  buttonLeft.addEventListener(`click`, buttonLeftClickHandler);
}

tablet.addListener(changeSizeHandler);
changeSizeHandler(tablet);

mobile.addListener(setMobileHandler);
setMobileHandler(mobile);

  })();