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
        points[i] = -150 * i + 190;
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

            setSlide(slideNumber, true);

        }

        document.getElementById('controlerContainer').appendChild(controller);

    }

    document.getElementById('controlerContainer').style.width = slides.length * 25 + 'px';

})();

var slideWidth = parseFloat(getComputedStyle(document.getElementById('slider').children[0]).width);

var getSliderOffset = function() {
    return parseFloat(slider.style.left);
}

var firstClickPosition = 0;
var lastClickPosition = 0;

function calculateTransform() {

    var calculateDistance = function(slideNumber) {

        return slider.children[slideNumber].offsetParent.offsetLeft + ((slideWidth - 100) * slideNumber) - 115;

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

        if (distance > 0) {
            return -distance * 2;
        }

        return distance * 2;

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

function checkCurrentSlide() {

    if (getSliderOffset() >= breakPoints[0]) {
        setSlide(0, true);
    }

    for (var y = 0; y < slider.children.length; y++) {

        if (getSliderOffset() <= breakPoints[y] && getSliderOffset() >= breakPoints[y + 1]) {

            for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
            }

            document.getElementById('controlerContainer').children[y].classList.add('controller__item--active')

            setSlide(y, true);

        }

    }

    if (getSliderOffset() <= breakPoints[breakPoints.length - 1]) {

        for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
            document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
        }

        document.getElementById('controlerContainer').children[document.getElementById('controlerContainer').children.length - 1].classList.add('controller__item--active')

        setSlide(slider.children.length - 1, true);

    }


}

function getCurrentSlide() {

    if (getSliderOffset() >= breakPoints[0]) {

        lastClickPosition = 285;
        return 0;
    }

    for (var y = 0; y < slider.children.length; y++) {

        if (getSliderOffset() <= breakPoints[y] && getSliderOffset() >= breakPoints[y + 1]) {

            lastClickPosition = -90 - (375 * (y - 1));

            return y;

        }

    }

    if (getSliderOffset() <= breakPoints[breakPoints.length - 1]) {

        lastClickPosition = -90 - (375 * (breakPoints.length - 2));

        return slider.children.length - 1;

    }

}

function setOffset(offset) {

    slider.style.left = offset + 'px';

    getCurrentSlide();

    calculateTransform();

}

var timer;
var globalScroll;

function setSlide(slideId, enableScroll) {

    if (enableScroll) {

        globalScroll = enableScroll;

        clearInterval(timer);

        let i = 0;

        let positionOnMouseOut = getSliderOffset();

        let slidesDifference = (getCurrentSlide() - slideId) * 2;

        if (slidesDifference < 0) {
            slidesDifference = -slidesDifference;
        }

        if (slidesDifference === 0) {
            slidesDifference++;
        }

        timer = setInterval(function () {

            let offset = Math.round((positionOnMouseOut - (breakPoints[slideId] - 75)) / (slidesDifference));

            if (offset > 0) {
                i++;
                setOffset( getSliderOffset() - slidesDifference );
            } else if(offset < 0) {
                i--;
                setOffset( getSliderOffset() + slidesDifference );
            }

            if (i === offset) {
                globalScroll = true;
                clearInterval(timer);
                for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                    document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                }

                document.getElementById('controlerContainer').children[slideId].classList.add('controller__item--active')
            }

        }, 4);

    } else {

        if (slideId === 0) {
            lastClickPosition = 285;
            setOffset( breakPoints[0] - 75 );
        } else {
            lastClickPosition = -90 - (375 * (slideId - 1));
            setOffset( breakPoints[slideId] - 75 );
        }

    }

}

function mouseDown(e) {

    firstClickPosition = e.clientX - lastClickPosition;

    clearInterval(timer);

    setSlide(getCurrentSlide());

    document.getElementById('gallery').addEventListener('mousemove', mouseMove);

    return false;

}

function mouseMove(e) {

    var offset = Math.ceil((e.clientX - firstClickPosition) / 2.5);

    setOffset(offset);

}

function mouseUp(e) {

    checkCurrentSlide();
    document.getElementById('gallery').removeEventListener('mousemove', mouseMove);

}

function mouseLeave(e) {

    if (e.which === 1) {
        checkCurrentSlide();
    }

    document.getElementById('gallery').removeEventListener('mousemove', mouseMove);

}

// TOUCH SUPPORT

function touchStart(e) {

    firstClickPosition = e.touches[0].clientX - lastClickPosition;
    clearInterval(timer);
    setSlide(getCurrentSlide());

    return false;

}

function touchMove(e) {

    var offset = Math.ceil((e.touches[0].clientX - firstClickPosition) / 2.5);

    setOffset(offset);

}

function touchEnd(e) {

    checkCurrentSlide();

}

setSlide(3, false);
checkCurrentSlide();

document.getElementById('gallery').addEventListener('mousedown', mouseDown);
document.getElementById('gallery').addEventListener('mouseup', mouseUp);
document.getElementById('banner').addEventListener('mouseleave', mouseLeave);

document.getElementById('gallery').addEventListener('touchstart', touchStart);
document.getElementById('gallery').addEventListener('touchend', touchEnd);
document.getElementById('gallery').addEventListener('touchmove', touchMove);
