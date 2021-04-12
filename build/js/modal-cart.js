'use strict';

// модальные окна

(function () {

  var modalcartOpen = document.querySelectorAll('.modal-open--cart');
  var modalcart = document.querySelector('.modal--cart');
  var modalcartClose = document.querySelector('.modal__close--cart');

  var body = document.querySelector('body');

  var setVisible = function (visible) {
    if (visible) {
      body.classList.add('overlay-cart--open');
      document.addEventListener('keydown', escapeClickHandler);
    } else {
      body.classList.remove('overlay-cart--open');
      document.querySelector('.modal-show').classList.remove('modal-show');
      document.querySelector('.overlay-cart').remove();
      document.removeEventListener('keydowm', escapeClickHandler);
    }
  };

  var escapeClickHandler = function (evt) {
    if (evt.key === window.utils.KeyCode.ESCAPE) {
      evt.preventDefault();
      setVisible(false);
    }
  };

  var createOverlay = function () {
    var overlay = document.createElement('div');
    overlay.classList.add('overlay-cart');
    body.appendChild(overlay);

    overlay.addEventListener('click', function (overlayEvt) {
      if (overlayEvt.target === overlay) {
        setVisible(false);
      }
    });
  };

  var modalOpenHandler = function (modal) {
    modal.classList.add('modal-show');
    createOverlay();
    setVisible(true);
  };

  var modalCloseHandler = function (evt) {
    evt.preventDefault();
    setVisible(false);
  };

  if (modalcartOpen && modalcart) {
    for (var i = 0; i < modalcartOpen.length; i++) {
      modalcartOpen[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        modalOpenHandler(modalcart);
      });
    }
  }

  if (modalcartClose) {
    modalcartClose.addEventListener('click', modalCloseHandler);
  }

})();
