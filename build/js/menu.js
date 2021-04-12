'use strict';

// мобильное меню - начиная с планшетной версии

(function () {
  var pageHeader = document.querySelector('.page-header');
  var headerToggle = document.querySelector('.page-header__toggle');
  var body = document.querySelector('body');

  if (pageHeader && headerToggle) {
    pageHeader.classList.remove('page-header--nojs');

    headerToggle.addEventListener('click', function () {
      if (pageHeader.classList.contains('page-header--closed')) {
        pageHeader.classList.remove('page-header--closed');
        pageHeader.classList.add('page-header--opened');
        body.classList.add('overlay--open');
      } else {
        pageHeader.classList.add('page-header--closed');
        pageHeader.classList.remove('page-header--opened');
        body.classList.remove('overlay--open');

      }
    });
  }

})();
