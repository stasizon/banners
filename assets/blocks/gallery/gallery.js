var IMG_WIDTH = 250;
var IMG_HEIGHT = 160;
var IMG_MARGIN = 100;

var SLIDER_OFFSET_TO_0 = 115;
var BANNER_WIDTH = 480;

var SLIDE_SPEED = 0.15;
var SLIDE_SPEED_DEPEND = 0.001;

var slider = parent;
var timer;

__adKernelBanner.gallery = {
    _slides: null,
    _container: null,

    init: function (slides, container) {
        this._slides = slides;
        this._container = container;

        for (var i = 0; i < slides.length; i++) {

            var slide = document.createElement('div');

            slide.classList.add('gallery__item');
            slide.style.background = 'url(' + slides[i] + ') no-repeat center / cover';
            slide.style.minWidth = IMG_WIDTH + 'px';
            slide.style.height = IMG_HEIGHT + 'px';

            slider.appendChild(slide);
        }
    },

    getOffset: function (slideId) {
        return (BANNER_WIDTH - IMG_WIDTH) / 2 + slideId * (IMG_MARGIN - IMG_WIDTH);
    }
};

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

        };

        document.getElementById('controlerContainer').appendChild(controller);

    }

    document.getElementById('controlerContainer').style.width = slides.length * 25 + 'px';

})();

var state = {
    offset: 0,
    currentSlide: 0,
    timer: 0
};

function setState(changes) {
    for (var field in changes) {
        state[field] = changes[field];
    }
    render();
}

var firstClickPosition = 0;
var lastClickPosition = 0;

function render() {
    slider.style.left = state.offset + 'px';

    var origin = Math.round(-(state.offset) + BANNER_WIDTH / 2);

    slider.style.perspectiveOrigin = origin + 'px';

    var calculateDistance = function(slideNumber) {
        return slider.children[slideNumber].offsetParent.offsetLeft + ((IMG_WIDTH - IMG_MARGIN) * slideNumber) - SLIDER_OFFSET_TO_0;
    };

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

        if (-distance > 0) {
            return distance;
        }

        return -distance;

    }

    for (var i = 0; i < slider.children.length; i++) {

        slider.children[i].style.transform =
        'rotateY(' + rotateSlide(calculateDistance(i)) + 'deg)' +
        'translateZ(' + scaleSlide(calculateDistance(i)) + 'px)';

        slider.children[i].style.zIndex = calculateSlideLayer(calculateDistance(i));

        slider.style.perspectiveOrigin = state.offset / slider

    }

    (function checkSlideSwitch() {

        if (state.offset >= breakPoints[0]) {
            state.currentSlide = 0;
        }

        for (var y = 0; y < slider.children.length; y++) {

            if (state.offset <= breakPoints[y] && state.offset >= breakPoints[y + 1]) {
                state.currentSlide = y;
            }

        }

        if (state.offset <= breakPoints[breakPoints.length - 1]) {
            state.currentSlide = slider.children.length - 1;
        }

    })();

    for (var z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
        document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
    }

    document.getElementById('controlerContainer').children[state.currentSlide].classList.add('controller__item--active')
}

function setSlide(slideId, enableScroll) {
    var oldTime = Date.now();
    var offset = getOffset(slideId);
    var speed = SLIDE_SPEED + (Math.abs(state.offset - offset) * SLIDE_SPEED_DEPEND);

    clearInterval(timer);

    if (!enableScroll) {
        setState({
            offset: offset,
            currentSlide: slideId
        });
        return;
    }
    
    timer = setInterval(function () {
        var currentTime = Date.now();
        var side = 1;

        if (offset < state.offset) {
            side = -1;
        }

        var delta = Math.round((currentTime - oldTime) * speed * side);
        var currentOffset = state.offset + delta;

        if ((offset - currentOffset) * side <= 0) {
            currentOffset = offset;
            state.currentSlide = slideId;
            clearInterval(timer);
        }
        
        oldTime = currentTime;

        setState({
            offset: currentOffset
        });
    }, 16);
}

var oldClientX;

function mouseDown(e) {

    oldClientX = e.clientX || e.touches[0].clientX;

    clearInterval(timer);

    document.getElementById('gallery').addEventListener('mousemove', mouseMove);

}

function mouseMove(e) {
    var mouseOffset = (e.clientX - oldClientX) / 2.5;

    oldClientX = e.clientX || e.touches[0].clientX;

    setState({
        offset: state.offset + mouseOffset
    });
}

function mouseUp(e) {
    setSlide(state.currentSlide, true);

    document.getElementById('gallery').removeEventListener('mousemove', mouseMove);
}

function mouseLeave(e) {

    // If mouse down
    if (e.which === 1) {
        setSlide(state.currentSlide, true);
    }

    document.getElementById('gallery').removeEventListener('mousemove', mouseMove);

}

// TOUCH SUPPORT

function touchMove(e) {
    var mouseOffset = (e.touches[0].clientX - oldClientX) / 2.5;

    oldClientX = e.touches[0].clientX;

    setState({
        offset: state.offset + mouseOffset
    });
}

function touchEnd(e) {
    setSlide(state.currentSlide, true);
}

setSlide(Math.floor(slider.children.length / 2), false);

document.getElementById('gallery').addEventListener('mousedown', mouseDown);
document.getElementById('gallery').addEventListener('mouseup', mouseUp);
document.getElementById('banner').addEventListener('mouseleave', mouseLeave);

document.getElementById('gallery').addEventListener('touchstart', mouseDown);
document.getElementById('gallery').addEventListener('touchend', touchEnd);
document.getElementById('gallery').addEventListener('touchmove', touchMove);
