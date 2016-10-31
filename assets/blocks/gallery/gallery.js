var slider = parent;

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

        controller.setAttribute('data-number', i);

        controller.onclick = function(e) {

            var slideNumber = e.target.getAttribute('data-number');

            let count = 0;

            function timer() {

                var times = setTimeout(function() {

                    count++;

                    let firstPosition = getSliderOffset();
                    let secondPosition = breakPoints[slideNumber] - slideWidth / 2 + 30 + 5 * slideNumber;

                    if (firstPosition < secondPosition) {

                        calculateTransform(false, firstPosition + 5);

                    } else if (firstPosition > secondPosition) {

                        calculateTransform(false, firstPosition - 5);

                    }

                    if (firstPosition !== secondPosition && firstPosition !== secondPosition - 5 && firstPosition !== secondPosition + 5) {

                        timer();

                    }

                }, 4);

            }

            timer();

        }

        document.getElementById('controlerContainer').appendChild(controller);

    }

    document.getElementById('controlerContainer').style.width = slides.length * 25 + 'px';

})();

var bannerWidth = parseFloat(getComputedStyle(document.getElementById('banner')).width);
var bannerPosition = document.getElementById('banner').getBoundingClientRect().left;
var slideWidth = parseFloat(getComputedStyle(document.getElementById('slider').children[0]).width);

var getSliderOffset = function() {
    return parseFloat(slider.style.left);
}

var initDisplace = -50;

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

    document.getElementById('gallery').style.cursor = 'move';

    if (lastClickPosition) {
        firstClickPosition = e.clientX - lastClickPosition;
    } else {
        firstClickPosition = e.clientX;
    }

    document.getElementById('gallery').addEventListener('mousemove', calculateTransform);

    return false;

}

function mouseup(e) {

    document.getElementById('gallery').style.cursor = 'pointer';

    lastClickPosition = -(firstClickPosition - e.clientX);

    document.getElementById('gallery').removeEventListener('mousemove', calculateTransform);

    toFixedPosition();

    return false;

}

function mouseleave(e) {

    document.getElementById('gallery').style.cursor = 'pointer';

    document.getElementById('gallery').removeEventListener('mousemove', calculateTransform);

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

calculateTransform(false, initDisplace);

toFixedPosition();

document.getElementById('gallery').addEventListener('mousedown', mousedown);
document.getElementById('gallery').addEventListener('mouseup', mouseup);
document.getElementById('gallery').addEventListener('mouseleave', mouseleave);

document.getElementById('gallery').addEventListener('touchstart', mousedown);
document.getElementById('gallery').addEventListener('touchend', mouseup);
document.getElementById('gallery').addEventListener('touchmove', touchmove);
document.getElementById('gallery').addEventListener('touchstart', touchstart);
