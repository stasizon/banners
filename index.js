function setRate(rate) {

    var star = document.createElement('i');
        star.classList.add('material-icons');
        star.style.color = '#694E00';
        star.innerHTML = 'star';

    var allRates = document.getElementsByClassName('rate');

    rate = rate || allRates[0].getAttribute('data-rate');

    for (var i = 0; i < 5; i++) {
        allRates[0].appendChild(star.cloneNode(true));
    }

    for (var y = 0; y < rate; y++) {
        allRates[0].children[y].style.color = '#FFC107';
    }

}

function initGallery(slides) {

    var slider = document.getElementById('slider');

    (function addSlides() {

        for (var i = 0; i < slides.length; i++) {

            var slide = document.createElement('div');

            slide.classList.add('gallery__item');
            slide.style.background = 'url(' + slides[i] + ') no-repeat center / cover';

            slider.appendChild(slide);
        }

    })();

    function getBreakPoints() {

        var points = [];

        for (var i = 0; i < slider.children.length; i++) {
            points[i] = -180 * i + 220;
        }

        return points;

    }

    var breakPoints = getBreakPoints();

    (function initControllers() {

        for (var i = 0; i < slides.length; i++) {

            var controller = document.createElement('div');

            controller.classList.add('controller__item');

            document.getElementById('controlerContainer').appendChild(controller);
        }

        for (var z = 0; z < slides.length; z++) {

            document.getElementById('controlerContainer').children[z].onclick = function() {
                console.log(breakPoints[z]);
                // calculateTransform(false, breakPoints[z]);
            }

        }

        document.getElementById('controlerContainer').style.width = slides.length * 25 + 'px';

    })();

    var bannerWidth = parseFloat(getComputedStyle(document.getElementById('banner')).width);
    var bannerPosition = document.getElementById('banner').getBoundingClientRect().left;
    var slideWidth = parseFloat(getComputedStyle(document.getElementById('slider').children[0]).width);

    var getSliderOffset = function() {
        return parseFloat(slider.style.left);
    }

    var initDisplace = (bannerWidth / 2) - (slideWidth / 2) * (slider.children.length / 2) + 55;

    var firstClickPosition;
    var lastClickPosition = initDisplace;

    function calculateTransform(e, x) {

        if (x) {
            slider.style.left = x + 'px';
            lastClickPosition = x - 80;
        } else {
            slider.style.left = -((firstClickPosition || 0)  - (e.clientX)) + 80 + 'px';
        }

        var calculateDistance = function(slideNumber) {

            var slideOffset = slider.children[slideNumber].offsetParent.offsetLeft + (slideWidth * slideNumber) - 75 * slideNumber - 125;

            return slideOffset;
        }

        function rotateSlide(distance) {

            var deg = -distance / 5;

            if (deg < -40) {
                return -40;
            }

            if (deg > -40 && deg < 40) {
                return deg;
            }

            if (deg > 40) {
                return 40;
            }

        }

        function scaleSlide(distance) {

            var depth = 320;

            var zDisplace = +distance + depth / 2;

            if (zDisplace > depth / 2) {
                return depth - zDisplace - depth / 2;
            }

            return zDisplace - depth / 2;

        }

        function calculateSlideLayer(distance) {

            var depth = 400;

            var zIndex = -distance + depth / 2;

            if (zIndex > depth / 2) {
                return depth - zIndex;
            }

            return zIndex;

        }

        for (var i = 0; i < slider.children.length; i++) {

            slider.children[i].style.transform =
            'rotateY(' + rotateSlide(calculateDistance(i)) + 'deg)' +
            'translateZ(' + scaleSlide(calculateDistance(i)) + 'px)';

            slider.children[i].style.zIndex = calculateSlideLayer(calculateDistance(i));

        }

        for (var y = 0; y < slider.children.length; y++) {

            if (getSliderOffset() < breakPoints[y] && getSliderOffset() > breakPoints[y + 1]) {

                for (var z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                    document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                }

                document.getElementById('controlerContainer').children[y].classList.add('controller__item--active')

            }

        }


    }


    function toFixedPosition() {

        if (getSliderOffset() > breakPoints[0]) {

            let count = getSliderOffset() - (breakPoints[0] - slideWidth / 2 + 30);

            let timer = setInterval(function () {

                if (count > 0) {

                    count--;
                    calculateTransform(false, getSliderOffset() - 1);

                }

                if (count === 0) {
                    clearInterval(timer);
                }

            }, 4);

        }

        for (var y = 0; y < slider.children.length; y++) {

            if (getSliderOffset() < breakPoints[y] && getSliderOffset() > breakPoints[y + 1]) {

                var count = getSliderOffset() - (breakPoints[y] - slideWidth / 2 + 30 + 5 * y);

                let timer = setInterval(function (y) {

                    if (count > 0) {

                        count--;
                        calculateTransform(false, getSliderOffset() - 1);

                    } else if (count < 0) {

                        count++;
                        calculateTransform(false, getSliderOffset() + 1);

                    }

                    if (count === 0) {
                        clearInterval(timer);
                    }

                }, 4, y);

            }

        }

        if (getSliderOffset() < breakPoints[breakPoints.length - 1]) {

            let count = getSliderOffset() - (breakPoints[breakPoints.length - 1] - slideWidth / 2 + 30);

            console.log(count);

            let timer = setInterval(function () {

                if (count < 0) {

                    count++;
                    calculateTransform(false, getSliderOffset() + 1);

                }

                if (count > 0) {

                    count--;
                    calculateTransform(false, getSliderOffset() - 1);

                }

                if (count === 0) {
                    clearInterval(timer);
                }

            }, 4);

        }

    }

    function mousedown(e) {

        slider.style.cursor = 'move';

        if (lastClickPosition) {
            firstClickPosition = e.clientX - lastClickPosition;
        } else {
            firstClickPosition = e.clientX;
        }

        slider.addEventListener('mousemove', calculateTransform);

        return false;

    }

    function mouseup(e) {

        slider.style.cursor = 'pointer';

        lastClickPosition = -(firstClickPosition - e.clientX);

        slider.removeEventListener('mousemove', calculateTransform);

        toFixedPosition();

        return false;

    }

    function mouseleave(e) {

        slider.style.cursor = 'pointer';

        lastClickPosition = -(firstClickPosition - e.clientX);

        slider.removeEventListener('mousemove', calculateTransform);

        toFixedPosition();

        return false;

    }

    function touchstart(e) {

        if (lastClickPosition) {
            firstClickPosition = e.touches[0].clientX - lastClickPosition;
        } else {
            firstClickPosition = e.touches[0].clientX;
        }

    }

    function touchmove(e) {

        calculateTransform(e);

    }

    calculateTransform(false, -225);

    toFixedPosition();

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mouseleave', mouseleave);

    slider.addEventListener('touchstart', mousedown);
    slider.addEventListener('touchend', mouseup);
    slider.addEventListener('touchmove', touchmove);
    slider.addEventListener('touchstart', touchstart);

}


var imageArray = [
                  './img/unsplash.jpg',
                  './img/unsplash-2.jpg',
                  './img/unsplash-3.jpg',
                  './img/unsplash-4.jpg',
                  './img/unsplash-5.jpg',
                  './img/unsplash-6.jpg'
                 ];

setRate();
initGallery(imageArray);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2V0UmF0ZShyYXRlKSB7XG5cbiAgICB2YXIgc3RhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgICAgICBzdGFyLnN0eWxlLmNvbG9yID0gJyM2OTRFMDAnO1xuICAgICAgICBzdGFyLmlubmVySFRNTCA9ICdzdGFyJztcblxuICAgIHZhciBhbGxSYXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JhdGUnKTtcblxuICAgIHJhdGUgPSByYXRlIHx8IGFsbFJhdGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1yYXRlJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBhbGxSYXRlc1swXS5hcHBlbmRDaGlsZChzdGFyLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCByYXRlOyB5KyspIHtcbiAgICAgICAgYWxsUmF0ZXNbMF0uY2hpbGRyZW5beV0uc3R5bGUuY29sb3IgPSAnI0ZGQzEwNyc7XG4gICAgfVxuXG59XG4iLCJmdW5jdGlvbiBpbml0R2FsbGVyeShzbGlkZXMpIHtcblxuICAgIHZhciBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJyk7XG5cbiAgICAoZnVuY3Rpb24gYWRkU2xpZGVzKCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHZhciBzbGlkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJyk7XG4gICAgICAgICAgICBzbGlkZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgc2xpZGVzW2ldICsgJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvdmVyJztcblxuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIGdldEJyZWFrUG9pbnRzKCkge1xuXG4gICAgICAgIHZhciBwb2ludHMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcG9pbnRzW2ldID0gLTE4MCAqIGkgKyAyMjA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9pbnRzO1xuXG4gICAgfVxuXG4gICAgdmFyIGJyZWFrUG9pbnRzID0gZ2V0QnJlYWtQb2ludHMoKTtcblxuICAgIChmdW5jdGlvbiBpbml0Q29udHJvbGxlcnMoKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgY29udHJvbGxlci5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtJyk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5hcHBlbmRDaGlsZChjb250cm9sbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIHogPSAwOyB6IDwgc2xpZGVzLmxlbmd0aDsgeisrKSB7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYnJlYWtQb2ludHNbel0pO1xuICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgYnJlYWtQb2ludHNbel0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuc3R5bGUud2lkdGggPSBzbGlkZXMubGVuZ3RoICogMjUgKyAncHgnO1xuXG4gICAgfSkoKTtcblxuICAgIHZhciBiYW5uZXJXaWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJykpLndpZHRoKTtcbiAgICB2YXIgYmFubmVyUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICB2YXIgc2xpZGVXaWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJykuY2hpbGRyZW5bMF0pLndpZHRoKTtcblxuICAgIHZhciBnZXRTbGlkZXJPZmZzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc2xpZGVyLnN0eWxlLmxlZnQpO1xuICAgIH1cblxuICAgIHZhciBpbml0RGlzcGxhY2UgPSAoYmFubmVyV2lkdGggLyAyKSAtIChzbGlkZVdpZHRoIC8gMikgKiAoc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAvIDIpICsgNTU7XG5cbiAgICB2YXIgZmlyc3RDbGlja1Bvc2l0aW9uO1xuICAgIHZhciBsYXN0Q2xpY2tQb3NpdGlvbiA9IGluaXREaXNwbGFjZTtcblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVRyYW5zZm9ybShlLCB4KSB7XG5cbiAgICAgICAgaWYgKHgpIHtcbiAgICAgICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IHggLSA4MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gLSgoZmlyc3RDbGlja1Bvc2l0aW9uIHx8IDApICAtIChlLmNsaWVudFgpKSArIDgwICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uKHNsaWRlTnVtYmVyKSB7XG5cbiAgICAgICAgICAgIHZhciBzbGlkZU9mZnNldCA9IHNsaWRlci5jaGlsZHJlbltzbGlkZU51bWJlcl0ub2Zmc2V0UGFyZW50Lm9mZnNldExlZnQgKyAoc2xpZGVXaWR0aCAqIHNsaWRlTnVtYmVyKSAtIDc1ICogc2xpZGVOdW1iZXIgLSAxMjU7XG5cbiAgICAgICAgICAgIHJldHVybiBzbGlkZU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJvdGF0ZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWcgPSAtZGlzdGFuY2UgLyA1O1xuXG4gICAgICAgICAgICBpZiAoZGVnIDwgLTQwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC00MDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRlZyA+IC00MCAmJiBkZWcgPCA0MCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkZWcgPiA0MCkge1xuICAgICAgICAgICAgICAgIHJldHVybiA0MDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2NhbGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgICAgICB2YXIgZGVwdGggPSAzMjA7XG5cbiAgICAgICAgICAgIHZhciB6RGlzcGxhY2UgPSArZGlzdGFuY2UgKyBkZXB0aCAvIDI7XG5cbiAgICAgICAgICAgIGlmICh6RGlzcGxhY2UgPiBkZXB0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVwdGggLSB6RGlzcGxhY2UgLSBkZXB0aCAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB6RGlzcGxhY2UgLSBkZXB0aCAvIDI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVNsaWRlTGF5ZXIoZGlzdGFuY2UpIHtcblxuICAgICAgICAgICAgdmFyIGRlcHRoID0gNDAwO1xuXG4gICAgICAgICAgICB2YXIgekluZGV4ID0gLWRpc3RhbmNlICsgZGVwdGggLyAyO1xuXG4gICAgICAgICAgICBpZiAoekluZGV4ID4gZGVwdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlcHRoIC0gekluZGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gekluZGV4O1xuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgICAgICdyb3RhdGVZKCcgKyByb3RhdGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAnZGVnKScgK1xuICAgICAgICAgICAgJ3RyYW5zbGF0ZVooJyArIHNjYWxlU2xpZGUoY2FsY3VsYXRlRGlzdGFuY2UoaSkpICsgJ3B4KSc7XG5cbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS56SW5kZXggPSBjYWxjdWxhdGVTbGlkZUxheWVyKGNhbGN1bGF0ZURpc3RhbmNlKGkpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICAgICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDwgYnJlYWtQb2ludHNbeV0gJiYgZ2V0U2xpZGVyT2Zmc2V0KCkgPiBicmVha1BvaW50c1t5ICsgMV0pIHtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIHogPSAwOyB6IDwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuLmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5jbGFzc0xpc3QucmVtb3ZlKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5beV0uY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJylcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0b0ZpeGVkUG9zaXRpb24oKSB7XG5cbiAgICAgICAgaWYgKGdldFNsaWRlck9mZnNldCgpID4gYnJlYWtQb2ludHNbMF0pIHtcblxuICAgICAgICAgICAgbGV0IGNvdW50ID0gZ2V0U2xpZGVyT2Zmc2V0KCkgLSAoYnJlYWtQb2ludHNbMF0gLSBzbGlkZVdpZHRoIC8gMiArIDMwKTtcblxuICAgICAgICAgICAgbGV0IHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZ2V0U2xpZGVyT2Zmc2V0KCkgLSAxKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIDQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IHkrKykge1xuXG4gICAgICAgICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPCBicmVha1BvaW50c1t5XSAmJiBnZXRTbGlkZXJPZmZzZXQoKSA+IGJyZWFrUG9pbnRzW3kgKyAxXSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gZ2V0U2xpZGVyT2Zmc2V0KCkgLSAoYnJlYWtQb2ludHNbeV0gLSBzbGlkZVdpZHRoIC8gMiArIDMwICsgNSAqIHkpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKHkpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpIC0gMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA8IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZ2V0U2xpZGVyT2Zmc2V0KCkgKyAxKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgNCwgeSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDwgYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0pIHtcblxuICAgICAgICAgICAgbGV0IGNvdW50ID0gZ2V0U2xpZGVyT2Zmc2V0KCkgLSAoYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0gLSBzbGlkZVdpZHRoIC8gMiArIDMwKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coY291bnQpO1xuXG4gICAgICAgICAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPCAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBnZXRTbGlkZXJPZmZzZXQoKSArIDEpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZ2V0U2xpZGVyT2Zmc2V0KCkgLSAxKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIDQpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNlZG93bihlKSB7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcblxuICAgICAgICBpZiAobGFzdENsaWNrUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUuY2xpZW50WCAtIGxhc3RDbGlja1Bvc2l0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlyc3RDbGlja1Bvc2l0aW9uID0gZS5jbGllbnRYO1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZVRyYW5zZm9ybSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2V1cChlKSB7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IC0oZmlyc3RDbGlja1Bvc2l0aW9uIC0gZS5jbGllbnRYKTtcblxuICAgICAgICBzbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlVHJhbnNmb3JtKTtcblxuICAgICAgICB0b0ZpeGVkUG9zaXRpb24oKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3VzZWxlYXZlKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgIGxhc3RDbGlja1Bvc2l0aW9uID0gLShmaXJzdENsaWNrUG9zaXRpb24gLSBlLmNsaWVudFgpO1xuXG4gICAgICAgIHNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVUcmFuc2Zvcm0pO1xuXG4gICAgICAgIHRvRml4ZWRQb3NpdGlvbigpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvdWNoc3RhcnQoZSkge1xuXG4gICAgICAgIGlmIChsYXN0Q2xpY2tQb3NpdGlvbikge1xuICAgICAgICAgICAgZmlyc3RDbGlja1Bvc2l0aW9uID0gZS50b3VjaGVzWzBdLmNsaWVudFggLSBsYXN0Q2xpY2tQb3NpdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaG1vdmUoZSkge1xuXG4gICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShlKTtcblxuICAgIH1cblxuICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgLTIyNSk7XG5cbiAgICB0b0ZpeGVkUG9zaXRpb24oKTtcblxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZWRvd24pO1xuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBtb3VzZWxlYXZlKTtcblxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgbW91c2Vkb3duKTtcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZXVwKTtcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlKTtcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQpO1xuXG59XG4iLCIvLz1yZXF1aXJlIGJsb2Nrcy9yYXRlL3JhdGUuanNcbi8vPXJlcXVpcmUgYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qc1xuXG52YXIgaW1hZ2VBcnJheSA9IFtcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTIuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC0zLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNC5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTUuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC02LmpwZydcbiAgICAgICAgICAgICAgICAgXTtcblxuc2V0UmF0ZSgpO1xuaW5pdEdhbGxlcnkoaW1hZ2VBcnJheSk7XG4iXX0=
