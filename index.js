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

        if (x || x === 0) {
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

                let timer = setInterval(function () {

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

                }, 4);

            }

        }

        if (getSliderOffset() < breakPoints[breakPoints.length - 1]) {

            let count = getSliderOffset() - (breakPoints[breakPoints.length - 1] - slideWidth / 2 + 30);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzZXRSYXRlKHJhdGUpIHtcblxuICAgIHZhciBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gICAgICAgIHN0YXIuc3R5bGUuY29sb3IgPSAnIzY5NEUwMCc7XG4gICAgICAgIHN0YXIuaW5uZXJIVE1MID0gJ3N0YXInO1xuXG4gICAgdmFyIGFsbFJhdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmF0ZScpO1xuXG4gICAgcmF0ZSA9IHJhdGUgfHwgYWxsUmF0ZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXJhdGUnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIGFsbFJhdGVzWzBdLmFwcGVuZENoaWxkKHN0YXIuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHJhdGU7IHkrKykge1xuICAgICAgICBhbGxSYXRlc1swXS5jaGlsZHJlblt5XS5zdHlsZS5jb2xvciA9ICcjRkZDMTA3JztcbiAgICB9XG5cbn1cbiIsImZ1bmN0aW9uIGluaXRHYWxsZXJ5KHNsaWRlcykge1xuXG4gICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKTtcblxuICAgIChmdW5jdGlvbiBhZGRTbGlkZXMoKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgdmFyIHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnlfX2l0ZW0nKTtcbiAgICAgICAgICAgIHNsaWRlLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKCcgKyBzbGlkZXNbaV0gKyAnKSBuby1yZXBlYXQgY2VudGVyIC8gY292ZXInO1xuXG4gICAgICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQoc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICB9KSgpO1xuXG4gICAgZnVuY3Rpb24gZ2V0QnJlYWtQb2ludHMoKSB7XG5cbiAgICAgICAgdmFyIHBvaW50cyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwb2ludHNbaV0gPSAtMTgwICogaSArIDIyMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb2ludHM7XG5cbiAgICB9XG5cbiAgICB2YXIgYnJlYWtQb2ludHMgPSBnZXRCcmVha1BvaW50cygpO1xuXG4gICAgKGZ1bmN0aW9uIGluaXRDb250cm9sbGVycygpIHtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICB2YXIgY29udHJvbGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICBjb250cm9sbGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXJfX2l0ZW0nKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCBzbGlkZXMubGVuZ3RoOyB6KyspIHtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3pdLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhicmVha1BvaW50c1t6XSk7XG4gICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBicmVha1BvaW50c1t6XSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5zdHlsZS53aWR0aCA9IHNsaWRlcy5sZW5ndGggKiAyNSArICdweCc7XG5cbiAgICB9KSgpO1xuXG4gICAgdmFyIGJhbm5lcldpZHRoID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKSkud2lkdGgpO1xuICAgIHZhciBiYW5uZXJQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIHZhciBzbGlkZVdpZHRoID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKS5jaGlsZHJlblswXSkud2lkdGgpO1xuXG4gICAgdmFyIGdldFNsaWRlck9mZnNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzbGlkZXIuc3R5bGUubGVmdCk7XG4gICAgfVxuXG4gICAgdmFyIGluaXREaXNwbGFjZSA9IChiYW5uZXJXaWR0aCAvIDIpIC0gKHNsaWRlV2lkdGggLyAyKSAqIChzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC8gMikgKyA1NTtcblxuICAgIHZhciBmaXJzdENsaWNrUG9zaXRpb247XG4gICAgdmFyIGxhc3RDbGlja1Bvc2l0aW9uID0gaW5pdERpc3BsYWNlO1xuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlVHJhbnNmb3JtKGUsIHgpIHtcblxuICAgICAgICBpZiAoeCB8fCB4ID09PSAwKSB7XG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgICAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSB4IC0gODA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IC0oKGZpcnN0Q2xpY2tQb3NpdGlvbiB8fCAwKSAgLSAoZS5jbGllbnRYKSkgKyA4MCArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihzbGlkZU51bWJlcikge1xuXG4gICAgICAgICAgICB2YXIgc2xpZGVPZmZzZXQgPSBzbGlkZXIuY2hpbGRyZW5bc2xpZGVOdW1iZXJdLm9mZnNldFBhcmVudC5vZmZzZXRMZWZ0ICsgKHNsaWRlV2lkdGggKiBzbGlkZU51bWJlcikgLSA3NSAqIHNsaWRlTnVtYmVyIC0gMTI1O1xuXG4gICAgICAgICAgICByZXR1cm4gc2xpZGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByb3RhdGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgICAgICB2YXIgZGVnID0gLWRpc3RhbmNlIC8gNTtcblxuICAgICAgICAgICAgaWYgKGRlZyA8IC00MCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtNDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkZWcgPiAtNDAgJiYgZGVnIDwgNDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGVnID4gNDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNjYWxlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICAgICAgdmFyIGRlcHRoID0gMzIwO1xuXG4gICAgICAgICAgICB2YXIgekRpc3BsYWNlID0gK2Rpc3RhbmNlICsgZGVwdGggLyAyO1xuXG4gICAgICAgICAgICBpZiAoekRpc3BsYWNlID4gZGVwdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlcHRoIC0gekRpc3BsYWNlIC0gZGVwdGggLyAyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gekRpc3BsYWNlIC0gZGVwdGggLyAyO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYWxjdWxhdGVTbGlkZUxheWVyKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHZhciBkZXB0aCA9IDQwMDtcblxuICAgICAgICAgICAgdmFyIHpJbmRleCA9IC1kaXN0YW5jZSArIGRlcHRoIC8gMjtcblxuICAgICAgICAgICAgaWYgKHpJbmRleCA+IGRlcHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXB0aCAtIHpJbmRleDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHpJbmRleDtcblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICAncm90YXRlWSgnICsgcm90YXRlU2xpZGUoY2FsY3VsYXRlRGlzdGFuY2UoaSkpICsgJ2RlZyknICtcbiAgICAgICAgICAgICd0cmFuc2xhdGVaKCcgKyBzY2FsZVNsaWRlKGNhbGN1bGF0ZURpc3RhbmNlKGkpKSArICdweCknO1xuXG4gICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUuekluZGV4ID0gY2FsY3VsYXRlU2xpZGVMYXllcihjYWxjdWxhdGVEaXN0YW5jZShpKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgeSsrKSB7XG5cbiAgICAgICAgICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8IGJyZWFrUG9pbnRzW3ldICYmIGdldFNsaWRlck9mZnNldCgpID4gYnJlYWtQb2ludHNbeSArIDFdKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5bel0uY2xhc3NMaXN0LnJlbW92ZSgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3ldLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdG9GaXhlZFBvc2l0aW9uKCkge1xuXG4gICAgICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA+IGJyZWFrUG9pbnRzWzBdKSB7XG5cbiAgICAgICAgICAgIGxldCBjb3VudCA9IGdldFNsaWRlck9mZnNldCgpIC0gKGJyZWFrUG9pbnRzWzBdIC0gc2xpZGVXaWR0aCAvIDIgKyAzMCk7XG5cbiAgICAgICAgICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpIC0gMSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCA0KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICAgICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDwgYnJlYWtQb2ludHNbeV0gJiYgZ2V0U2xpZGVyT2Zmc2V0KCkgPiBicmVha1BvaW50c1t5ICsgMV0pIHtcblxuICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IGdldFNsaWRlck9mZnNldCgpIC0gKGJyZWFrUG9pbnRzW3ldIC0gc2xpZGVXaWR0aCAvIDIgKyAzMCArIDUgKiB5KTtcblxuICAgICAgICAgICAgICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpIC0gMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA8IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZ2V0U2xpZGVyT2Zmc2V0KCkgKyAxKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgNCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDwgYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0pIHtcblxuICAgICAgICAgICAgbGV0IGNvdW50ID0gZ2V0U2xpZGVyT2Zmc2V0KCkgLSAoYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0gLSBzbGlkZVdpZHRoIC8gMiArIDMwKTtcblxuICAgICAgICAgICAgbGV0IHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50IDwgMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZ2V0U2xpZGVyT2Zmc2V0KCkgKyAxKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpIC0gMSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCA0KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3VzZWRvd24oZSkge1xuXG4gICAgICAgIHNsaWRlci5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG5cbiAgICAgICAgaWYgKGxhc3RDbGlja1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFggLSBsYXN0Q2xpY2tQb3NpdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUuY2xpZW50WDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVUcmFuc2Zvcm0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNldXAoZSkge1xuXG4gICAgICAgIHNsaWRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSAtKGZpcnN0Q2xpY2tQb3NpdGlvbiAtIGUuY2xpZW50WCk7XG5cbiAgICAgICAgc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZVRyYW5zZm9ybSk7XG5cbiAgICAgICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2VsZWF2ZShlKSB7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IC0oZmlyc3RDbGlja1Bvc2l0aW9uIC0gZS5jbGllbnRYKTtcblxuICAgICAgICBzbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlVHJhbnNmb3JtKTtcblxuICAgICAgICB0b0ZpeGVkUG9zaXRpb24oKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaHN0YXJ0KGUpIHtcblxuICAgICAgICBpZiAobGFzdENsaWNrUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUudG91Y2hlc1swXS5jbGllbnRYIC0gbGFzdENsaWNrUG9zaXRpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2htb3ZlKGUpIHtcblxuICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZSk7XG5cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIC0yMjUpO1xuXG4gICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2Vkb3duKTtcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2VsZWF2ZSk7XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG1vdXNlZG93bik7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW91c2V1cCk7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZSk7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0KTtcblxufVxuIiwiLy89cmVxdWlyZSBibG9ja3MvcmF0ZS9yYXRlLmpzXG4vLz1yZXF1aXJlIGJsb2Nrcy9nYWxsZXJ5L2dhbGxlcnkuanNcblxudmFyIGltYWdlQXJyYXkgPSBbXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2guanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC0yLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMy5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTQuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC01LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNi5qcGcnXG4gICAgICAgICAgICAgICAgIF07XG5cbnNldFJhdGUoKTtcbmluaXRHYWxsZXJ5KGltYWdlQXJyYXkpO1xuIl19
