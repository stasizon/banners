function initGallery(slides) {

    var slider = document.getElementById('slider');

    (function addSlides() {

        for (var i = 0; i < slides.length; i++) {

            var slide = document.createElement('div');

            slide.classList.add('gallery__item');
            slide.style.background = 'url(' + slides[i] + ') no-repeat center / cover';
            // slide.style.zIndex = slides.length - i;

            slider.appendChild(slide);
        }

    })();

    var bannerWidth = parseFloat(getComputedStyle(document.getElementById('banner')).width);
    var bannerPosition = document.getElementById('banner').getBoundingClientRect().left;
    var slideWidth = parseFloat(getComputedStyle(document.getElementById('slider').children[0]).width);

    var getSliderOffset = function() {
        return parseFloat(slider.style.left);
    }

    var initDisplace = (bannerWidth / 2) - (slideWidth / 2) * (slider.children.length / 2);

    var firstClickPosition;
    var lastClickPosition = initDisplace;

    slider.style.left = initDisplace + 'px';

    function swipe(e) {

        slider.style.left = -(firstClickPosition - (e.clientX || e.touches.clientX)) + 'px';

        var calculateDistance = function(slideNumber) {

            var slideOffset = slider.children[slideNumber].getBoundingClientRect().left - slideWidth / 2 + bannerPosition;

            return slideOffset.toFixed();
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

        // slider.children[1].style.zIndex = calculateSlideLayer(calculateDistance(1));
        //
        // console.log(slider.children[1].style.zIndex);

    }

    function toFixedPosition() {

        // var distance = -parseFloat(slider.style.left);
        //
        // function getBreakPoints() {
        //
        //     var points = [];
        //
        //     for (var i = 0; i < slider.children.length; i++) {
        //         points[i] = i * slideWidth  ;
        //     }
        //
        //     return points;
        //
        // }
        //
        // var breakpoints = getBreakPoints();
        //
        //
        // if (distance <= breakpoints[0]) {
        //
        //     slider.style.transition = 'all 0.5s';
        //
        //     slider.style.left = bannerWidth / 2 - slideWidth / 2 + 'px';
        //
        //     slider.children[0].style.transition = 'all 0.5s';
        //     slider.children[0].style.transform = 'translateZ(80px) rotateY(0deg)';
        //
        //     setTimeout(function() {
        //         slider.style.transition = 'none';
        //         slider.children[0].style.transition = 'none';
        //     }, 500);
        //
        //     lastClickPosition = breakpoints[1] / 2;
        // }
        //
        // for (var i = 0; i < breakpoints.length; i++) {
        //
        //     if (distance >= breakpoints[i] && distance <= breakpoints[i + 1] && breakpoints[i + 2]) {
        //
        //         slider.style.left = -(breakpoints[i + 1] - 180) + 'px';
        //
        //         console.log(-(breakpoints[i + 1]));
        //
        //         slider.style.transition = 'all 0.5s';
        //         slider.children[i].style.transform = 'rotateY(40deg) translateZ(-80px)';
        //         slider.children[i + 1].style.transform = 'rotateY(0deg) translateZ(80px)';
        //         slider.children[i + 2].style.transform = 'rotateY(-40deg) translateZ(-80px)';
        //
        //         lastClickPosition = -(breakpoints[i + 1]  - 125);
        //
        //     }
        //
        // }
        //
        // for (var t = 0; t < slider.children.length; t++) {
        //     slider.children[t].style.transition = 'all 0.5s';
        // }
        //
        // setTimeout(function() {
        //
        //     slider.style.transition = 'none';
        //
        //     for (var i = 0; i < slider.children.length; i++) {
        //         slider.children[i].style.transition = 'none';
        //     }
        //
        // }, 500);
        //
        // if (distance >= breakpoints[breakpoints.length - 2]) {
        //
        //     slider.style.transition = 'all 0.5s';
        //
        //     slider.style.left = -910 + 'px';
        //     slider.children[slider.children.length - 1].style.transform = 'translateZ(80px) rotateY(0deg)';
        //
        //     setTimeout(function() {
        //         slider.style.transition = 'none';
        //     }, 500);
        // }

    }

    function mousedown(e) {

        slider.style.cursor = 'move';

        if (lastClickPosition) {
            firstClickPosition = e.clientX - lastClickPosition;
        } else {
            firstClickPosition = e.clientX;
        }

        slider.addEventListener('mousemove', swipe);

    }

    function mouseup(e) {

        slider.style.cursor = 'pointer';

        lastClickPosition = -(firstClickPosition - e.clientX);

        slider.removeEventListener('mousemove', swipe);

        toFixedPosition();

    }

    function mouseleave(e) {

        slider.style.cursor = 'pointer';

        lastClickPosition = -(firstClickPosition - e.clientX);

        slider.removeEventListener('mousemove', swipe);

        toFixedPosition();

    }

    toFixedPosition();

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mouseleave', mouseleave);

    slider.addEventListener('touchstart', mousedown);
    slider.addEventListener('touchend', mouseup);
    slider.addEventListener('touchmove', swipe);

}
