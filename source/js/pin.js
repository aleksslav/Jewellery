'use strict';

(function () {
  var catalog = document.querySelector('.page-catalog');
  var filter = document.querySelector('.filter__item');

  if (document.contains(catalog) && document.contains(filter)) {

    var depth = document.querySelector('.filter__line-depth');
    var line = document.querySelector('.filter__price-controls');

    var firstPin = {
      pin: document.querySelector('.filter__line-pin--min'),
      value: document.querySelector('.filter__value--first'),
      label: document.querySelector('.filter__label--first'),
      getX: function (x) {
        if (x < MIN) {
          x = MIN;
        }
        if (x > MAX) {
          x = MAX;
        }
        if (x > secondPin.pin.offsetLeft) {
          x = secondPin.pin.offsetLeft;
        }

        this.pin.style.left = x + 'px';
        depth.style.left = x + 'px';

        return x;
      }
    };

    var secondPin = {
      pin: document.querySelector('.filter__line-pin--max'),
      value: document.querySelector('.filter__value--second'),
      label: document.querySelector('.filter__label--second'),
      getX: function (x, mx) {
        if (x < MIN) {
          x = MIN;
        }
        if (x > MAX) {
          x = MAX;
        }
        if (x < firstPin.pin.offsetLeft) {
          x = firstPin.pin.offsetLeft;
        }
        if (firstPin.pin.offsetLeft === secondPin.pin.offsetLeft && (secondPin.pin.offsetLeft - x) > -1 && mx !== 0) {
          x = firstPin.pin.offsetLeft + mx;
          x = firstPin.getX(x);
          firstPin.value.value = Math.floor(x / MAX * maxPrice);
        }

        this.pin.style.left = x + 'px';
        depth.style.right = (MAX - x) + 'px';

        return x;
      }
    };

    var MIN = 0;
    var MAX = line.offsetWidth - firstPin.pin.offsetWidth;
    var maxPrice = firstPin.value.max;

    var toValue = function (pin) {
      if (pin.classList.contains('filter__line-pin--min')) {
        return firstPin.value;
      } else {
        return secondPin.value;
      }
    };

    var sliderHandler = function (evt) {
      evt.preventDefault();

      var mouseMoveHandler = function (em) {
        em.preventDefault();

        if (evt.target.classList.contains('filter__line-pin--min')) {
          var a = firstPin.pin.offsetLeft + em.movementX;
          a = firstPin.getX(a);
          firstPin.value.value = Math.floor(a / MAX * maxPrice);
        } else {
          var b = secondPin.pin.offsetLeft + em.movementX;
          b = secondPin.getX(b, em.movementX);
          secondPin.value.value = Math.floor(b / MAX * maxPrice);
        }
      };

      var mouseUpHandler = function (eu) {
        eu.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    var mobileSliderHandler = function (evt) {
      evt.preventDefault();

      var touchStart = evt.changedTouches[0].pageX;

      var touchMoveHandler = function (tm) {

        var touchCurrent = tm.changedTouches[0].pageX - touchStart;

        if (evt.target.classList.contains('filter__line-pin--min')) {
          var c = firstPin.pin.offsetLeft + touchCurrent;
          c = firstPin.getX(c);
          firstPin.value.value = Math.floor(c / MAX * maxPrice);
        } else {
          var d = secondPin.pin.offsetLeft + touchCurrent;
          d = secondPin.getX(d, touchCurrent);
          secondPin.value.value = Math.floor(d / MAX * maxPrice);
        }

        touchStart = tm.changedTouches[0].pageX;
      };

      var touchEndHandler = function (te) {
        te.preventDefault();

        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('touchend', touchEndHandler);
      };

      document.addEventListener('touchmove', touchMoveHandler);
      document.addEventListener('touchend', touchEndHandler);
    };

    var numberChange = function (index) {
      if (index === 0) {
        var e = firstPin.value.value * MAX / maxPrice;
        e = firstPin.getX(e);
        if (e < (firstPin.value.value * MAX / maxPrice)) {
          firstPin.value.value = secondPin.value.value;
        }
      } else {
        var f = secondPin.value.value * MAX / maxPrice;
        f = secondPin.getX(f);
        if (f > (secondPin.value.value * MAX / maxPrice)) {
          secondPin.value.value = firstPin.value.value;
        }
      }
    };

    document.querySelectorAll('.filter__value').forEach(function (value, index) {
      value.addEventListener('change', function () {
        numberChange(index);
      });
    });

    document.querySelectorAll('.filter__line-pin').forEach(function (pin, index) {
      pin.addEventListener('mousedown', function (evt) {
        sliderHandler(evt);
      });
      pin.addEventListener('touchstart', function (evt) {
        mobileSliderHandler(evt);
      });
      pin.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 39) {
          toValue(pin).value = Number(toValue(pin).value) + 10;
          numberChange(index);
        }
        if (evt.keyCode === 37) {
          toValue(pin).value = Number(toValue(pin).value) - 10;
          numberChange(index);
        }
      });
    });
  }
})();
