function initGallery(slides) {

    var initDisplace = -375;

    var slider = document.getElementById('slider');
        slider.style.left = initDisplace + 'px';

    for (var i = 0; i < slides.length; i++) {
        var slide = document.createElement('div');
        slide.classList.add('gallery__item');
        slide.style.background = 'url(' + slides[i] + ') no-repeat center / cover';
        slide.style.zIndex = slides.length - i;

        slider.appendChild(slide);
    }

    var firstClickPosition;
    var lastClickPosition = initDisplace;


    toFixedPosition();

    function swipe(e) {

        slider.style.left = -(firstClickPosition - (e.clientX || e.touches.clientX)) + 'px';

        function rotateSlide(distance) {

            var deg = -distance / 5;

            if (deg > -40 && deg < 40) {
                return deg;
            }

        }

        function scaleSlide(distance) {

            if (distance > -160 && distance < 160) {

                if (distance > 0) {
                    distance = -distance;
                }


                return distance + 80
            }

            return -80;


        }

        for (var i = 0; i < slider.children.length; i++) {
            slider.children[i].style.transform =
            'rotateY(' + rotateSlide(parseFloat(slider.style.left) - 125 + (200 * i)) + 'deg)' +
            'translateZ(' + scaleSlide(parseFloat(slider.style.left) - 125 + (200 * i)) + 'px)';
        }

    }

    function toFixedPosition() {

        var distance = -parseFloat(slider.style.left);

        function getBreakPoints() {

            var points = [];

            for (var i = 0; i < slider.children.length; i++) {
                points[i] = i * 200;
            }

            return points;

        }

        var breakpoints = getBreakPoints();

        if (distance <= breakpoints[0]) {
            slider.style.transition = 'all 0.5s';
            slider.style.left = (breakpoints[1] / 2) + 'px';
            slider.children[0].style.transition = 'all 0.5s';
            slider.children[0].style.transform = 'translateZ(80px) rotateY(0deg)';

            setTimeout(function() {
                slider.style.transition = 'none';
                slider.children[0].style.transition = 'none';
            }, 500);

            lastClickPosition = breakpoints[1] / 2;
        }

        for (var i = 0; i < breakpoints.length; i++) {

            if (distance >= breakpoints[i] && distance <= breakpoints[i + 1] && breakpoints[i + 2]) {

                slider.style.left = -(breakpoints[i + 1]  - 125) + 'px';

                slider.style.transition = 'all 0.5s';
                slider.children[i].style.transform = 'rotateY(40deg) translateZ(-80px)';
                slider.children[i + 1].style.transform = 'rotateY(0deg) translateZ(80px)';
                slider.children[i + 2].style.transform = 'rotateY(-40deg) translateZ(-80px)';

                lastClickPosition = -(breakpoints[i + 1]  - 125);

            }

        }

        for (var t = 0; t < slider.children.length; t++) {
            slider.children[t].style.transition = 'all 0.5s';
        }

        setTimeout(function() {

            slider.style.transition = 'none';

            for (var i = 0; i < slider.children.length; i++) {
                slider.children[i].style.transition = 'none';
            }

        }, 500);

        if (distance >= breakpoints[breakpoints.length - 2]) {

            slider.style.transition = 'all 0.5s';

            slider.style.left = -910 + 'px';
            slider.children[slider.children.length - 1].style.transform = 'translateZ(80px) rotateY(0deg)';

            setTimeout(function() {
                slider.style.transition = 'none';
            }, 500);
        }

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

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mouseleave', mouseleave);

    slider.addEventListener('touchstart', mousedown);
    slider.addEventListener('touchend', mouseup);
    slider.addEventListener('touchmove', swipe);

    function test(e) {
        console.log(e);
    }


}
