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

    var bannerWidth = parseFloat(getComputedStyle(document.getElementById('banner')).width);
    var bannerPosition = document.getElementById('banner').getBoundingClientRect().left;
    var slideWidth = parseFloat(getComputedStyle(document.getElementById('slider').children[0]).width);

    var getSliderOffset = function() {
        return parseFloat(slider.style.left);
    }

    var initDisplace = (bannerWidth / 2) - (slideWidth / 2) * (slider.children.length / 2) + 55;

    var firstClickPosition;
    var lastClickPosition = initDisplace;

    calculateTransform(false, -300);

    function calculateTransform(e, x) {

        if (x) {
            slider.style.left = x - 10 + 'px';
        } else {
            slider.style.left = -((firstClickPosition || 0)  - (e.clientX || e.touches.clientX)) - 25 + 'px';
        }

        var calculateDistance = function(slideNumber) {

            var slideOffset = slider.children[slideNumber].offsetParent.offsetLeft + (slideWidth * slideNumber) - 40 * slideNumber - 125;

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
                return depth - zDisplace;
            }

            return zDisplace;

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


    }


    function toFixedPosition() {

        // function getBreakPoints() {
        //
        //     var points = [];
        //
        //     for (var i = 0; i < slider.children.length; i++) {
        //         points[i] = -200 * i + 220;
        //     }
        //
        //     return points;
        //
        // }
        //
        // var breakPoints = getBreakPoints();
        //
        // if (getSliderOffset() > 150) {
        //
        //     calculateTransform(false, 150);
        //
        // }
        //
        // for (var y = 0; y < slider.children.length; y++) {
        //
        //     if (getSliderOffset() < breakPoints[y] && getSliderOffset() > breakPoints[y + 1]) {
        //
        //         for (var i = 0; i < slider.children.length; i++) {
        //             slider.children[i].style.transition = 'all 0.5s';
        //
        //             slider.style.transition = 'all 0.5s';
        //         }
        //
        //         calculateTransform(false, breakPoints[y] - slideWidth / 2);
        //
        //         setTimeout(function (y) {
        //             calculateTransform(false, breakPoints[y] - slideWidth / 2);
        //             console.log('www');
        //         }, 400, y);
        //
        //
        //         setTimeout(function () {
        //
        //             for (var z = 0; z < slider.children.length; z++) {
        //                 slider.children[z].style.transition = 'none';
        //             }
        //
        //             slider.style.transition = 'none';
        //
        //         }, 700);
        //
        //     }
        //
        // }
        //
        // if (getSliderOffset() < breakPoints[breakPoints.length - 1]) {
        //
        //     console.log(breakPoints[breakPoints.length - 1]);
        //
        //     calculateTransform(false, breakPoints[breakPoints[breakPoints.length - 1]]);
        //
        // }


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

    toFixedPosition();

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mouseleave', mouseleave);

    slider.addEventListener('touchstart', mousedown);
    slider.addEventListener('touchend', mouseup);
    slider.addEventListener('touchmove', calculateTransform);

}
