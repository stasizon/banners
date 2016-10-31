var __adKernelBanner = {

    initGallery: function(slides, parent) {

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
        
                    console.log('timer');
        
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
        

    },

    setRate: function functionName() {

        var star = document.createElement('i');
            star.classList.add('material-icons');
            star.style.color = '#694E00';
            star.innerHTML = 'star';
        
        var allRates = document.getElementsByClassName('rate');
        
        rate = allRates[0].getAttribute('data-rate');
        
        for (var i = 0; i < 5; i++) {
            allRates[0].appendChild(star.cloneNode(true));
        }
        
        for (var y = 0; y < rate; y++) {
            allRates[0].children[y].style.color = '#FFC107';
        }
        

    }

};

var imageArray = [
                  './img/unsplash.jpg',
                  './img/unsplash-2.jpg',
                  './img/unsplash-3.jpg',
                  './img/unsplash-4.jpg',
                  './img/unsplash-5.jpg',
                  './img/unsplash-6.jpg'
                 ];

__adKernelBanner.initGallery(imageArray, document.getElementById('slider'));

__adKernelBanner.setRate();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7UUNIQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtBRHBWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1FFVEE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtBRkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2FkS2VybmVsQmFubmVyID0ge1xuXG4gICAgaW5pdEdhbGxlcnk6IGZ1bmN0aW9uKHNsaWRlcywgcGFyZW50KSB7XG5cbiAgICAgICAgLy89cmVxdWlyZSBibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzXG5cbiAgICB9LFxuXG4gICAgc2V0UmF0ZTogZnVuY3Rpb24gZnVuY3Rpb25OYW1lKCkge1xuXG4gICAgICAgIC8vPXJlcXVpcmUgYmxvY2tzL3JhdGUvcmF0ZS5qc1xuXG4gICAgfVxuXG59O1xuXG52YXIgaW1hZ2VBcnJheSA9IFtcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTIuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC0zLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNC5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTUuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC02LmpwZydcbiAgICAgICAgICAgICAgICAgXTtcblxuX19hZEtlcm5lbEJhbm5lci5pbml0R2FsbGVyeShpbWFnZUFycmF5LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJykpO1xuXG5fX2FkS2VybmVsQmFubmVyLnNldFJhdGUoKTtcbiIsInZhciBzbGlkZXIgPSBwYXJlbnQ7XG5cbihmdW5jdGlvbiBhZGRTbGlkZXMoKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBzbGlkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnlfX2l0ZW0nKTtcbiAgICAgICAgc2xpZGUuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoJyArIHNsaWRlc1tpXSArICcpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb3Zlcic7XG5cbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICB9XG5cbn0pKCk7XG5cbmZ1bmN0aW9uIGdldEJyZWFrUG9pbnRzKCkge1xuXG4gICAgdmFyIHBvaW50cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9pbnRzW2ldID0gLTE4MCAqIGkgKyAyMjA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50cztcblxufVxuXG52YXIgYnJlYWtQb2ludHMgPSBnZXRCcmVha1BvaW50cygpO1xuXG4oZnVuY3Rpb24gaW5pdENvbnRyb2xsZXJzKCkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgY29udHJvbGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGNvbnRyb2xsZXIuY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbScpO1xuXG4gICAgICAgIGNvbnRyb2xsZXIuc2V0QXR0cmlidXRlKCdkYXRhLW51bWJlcicsIGkpO1xuXG4gICAgICAgIGNvbnRyb2xsZXIub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgdmFyIHNsaWRlTnVtYmVyID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW51bWJlcicpO1xuXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiB0aW1lcigpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0aW1lcyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RQb3NpdGlvbiA9IGdldFNsaWRlck9mZnNldCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kUG9zaXRpb24gPSBicmVha1BvaW50c1tzbGlkZU51bWJlcl0gLSBzbGlkZVdpZHRoIC8gMiArIDMwICsgNSAqIHNsaWRlTnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdFBvc2l0aW9uIDwgc2Vjb25kUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBmaXJzdFBvc2l0aW9uICsgNSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaXJzdFBvc2l0aW9uID4gc2Vjb25kUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBmaXJzdFBvc2l0aW9uIC0gNSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdFBvc2l0aW9uICE9PSBzZWNvbmRQb3NpdGlvbiAmJiBmaXJzdFBvc2l0aW9uICE9PSBzZWNvbmRQb3NpdGlvbiAtIDUgJiYgZmlyc3RQb3NpdGlvbiAhPT0gc2Vjb25kUG9zaXRpb24gKyA1KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgNCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGltZXIoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIpO1xuXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoID0gc2xpZGVzLmxlbmd0aCAqIDI1ICsgJ3B4JztcblxufSkoKTtcblxudmFyIGJhbm5lcldpZHRoID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKSkud2lkdGgpO1xudmFyIGJhbm5lclBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhbm5lcicpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG52YXIgc2xpZGVXaWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJykuY2hpbGRyZW5bMF0pLndpZHRoKTtcblxudmFyIGdldFNsaWRlck9mZnNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHNsaWRlci5zdHlsZS5sZWZ0KTtcbn1cblxudmFyIGluaXREaXNwbGFjZSA9IChiYW5uZXJXaWR0aCAvIDIpIC0gKHNsaWRlV2lkdGggLyAyKSAqIChzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC8gMikgKyA1NTtcblxudmFyIGZpcnN0Q2xpY2tQb3NpdGlvbjtcbnZhciBsYXN0Q2xpY2tQb3NpdGlvbiA9IGluaXREaXNwbGFjZTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlVHJhbnNmb3JtKGUsIHgpIHtcblxuICAgIGlmICh4IHx8IHggPT09IDApIHtcbiAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSB4IC0gODA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAtKChmaXJzdENsaWNrUG9zaXRpb24gfHwgMCkgIC0gKGUuY2xpZW50WCkpICsgODAgKyAncHgnO1xuICAgIH1cblxuICAgIHZhciBjYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uKHNsaWRlTnVtYmVyKSB7XG5cbiAgICAgICAgdmFyIHNsaWRlT2Zmc2V0ID0gc2xpZGVyLmNoaWxkcmVuW3NsaWRlTnVtYmVyXS5vZmZzZXRQYXJlbnQub2Zmc2V0TGVmdCArIChzbGlkZVdpZHRoICogc2xpZGVOdW1iZXIpIC0gNzUgKiBzbGlkZU51bWJlciAtIDEyNTtcblxuICAgICAgICByZXR1cm4gc2xpZGVPZmZzZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcm90YXRlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICB2YXIgZGVnID0gLWRpc3RhbmNlIC8gNTtcblxuICAgICAgICBpZiAoZGVnIDwgLTQwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTQwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZyA+IC00MCAmJiBkZWcgPCA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWcgPiA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIDQwO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FsZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgdmFyIGRlcHRoID0gMzIwO1xuXG4gICAgICAgIHZhciB6RGlzcGxhY2UgPSArZGlzdGFuY2UgKyBkZXB0aCAvIDI7XG5cbiAgICAgICAgaWYgKHpEaXNwbGFjZSA+IGRlcHRoIC8gMikge1xuICAgICAgICAgICAgcmV0dXJuIGRlcHRoIC0gekRpc3BsYWNlIC0gZGVwdGggLyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHpEaXNwbGFjZSAtIGRlcHRoIC8gMjtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVNsaWRlTGF5ZXIoZGlzdGFuY2UpIHtcblxuICAgICAgICB2YXIgZGVwdGggPSA0MDA7XG5cbiAgICAgICAgdmFyIHpJbmRleCA9IC1kaXN0YW5jZSArIGRlcHRoIC8gMjtcblxuICAgICAgICBpZiAoekluZGV4ID4gZGVwdGggLyAyKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVwdGggLSB6SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gekluZGV4O1xuXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgJ3JvdGF0ZVkoJyArIHJvdGF0ZVNsaWRlKGNhbGN1bGF0ZURpc3RhbmNlKGkpKSArICdkZWcpJyArXG4gICAgICAgICd0cmFuc2xhdGVaKCcgKyBzY2FsZVNsaWRlKGNhbGN1bGF0ZURpc3RhbmNlKGkpKSArICdweCknO1xuXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS56SW5kZXggPSBjYWxjdWxhdGVTbGlkZUxheWVyKGNhbGN1bGF0ZURpc3RhbmNlKGkpKTtcblxuICAgIH1cblxuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgeSsrKSB7XG5cbiAgICAgICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDwgYnJlYWtQb2ludHNbeV0gJiYgZ2V0U2xpZGVyT2Zmc2V0KCkgPiBicmVha1BvaW50c1t5ICsgMV0pIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW4ubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5bel0uY2xhc3NMaXN0LnJlbW92ZSgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt5XS5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuXG59XG5cblxuZnVuY3Rpb24gdG9GaXhlZFBvc2l0aW9uKCkge1xuXG4gICAgaWYgKGdldFNsaWRlck9mZnNldCgpID4gYnJlYWtQb2ludHNbMF0pIHtcblxuICAgICAgICBsZXQgY291bnQgPSBnZXRTbGlkZXJPZmZzZXQoKSAtIChicmVha1BvaW50c1swXSAtIHNsaWRlV2lkdGggLyAyICsgMzApO1xuXG4gICAgICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuXG4gICAgICAgICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpIC0gMSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RpbWVyJyk7XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIDQpO1xuXG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPCBicmVha1BvaW50c1t5XSAmJiBnZXRTbGlkZXJPZmZzZXQoKSA+IGJyZWFrUG9pbnRzW3kgKyAxXSkge1xuXG4gICAgICAgICAgICB2YXIgY291bnQgPSBnZXRTbGlkZXJPZmZzZXQoKSAtIChicmVha1BvaW50c1t5XSAtIHNsaWRlV2lkdGggLyAyICsgMzAgKyA1ICogeSk7XG5cbiAgICAgICAgICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpIC0gMSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50IDwgMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZ2V0U2xpZGVyT2Zmc2V0KCkgKyAxKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIDQpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8IGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdKSB7XG5cbiAgICAgICAgbGV0IGNvdW50ID0gZ2V0U2xpZGVyT2Zmc2V0KCkgLSAoYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0gLSBzbGlkZVdpZHRoIC8gMiArIDMwKTtcblxuICAgICAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA8IDApIHtcblxuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBnZXRTbGlkZXJPZmZzZXQoKSArIDEpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBnZXRTbGlkZXJPZmZzZXQoKSAtIDEpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIDQpO1xuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG1vdXNlZG93bihlKSB7XG5cbiAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuXG4gICAgaWYgKGxhc3RDbGlja1Bvc2l0aW9uKSB7XG4gICAgICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUuY2xpZW50WCAtIGxhc3RDbGlja1Bvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUuY2xpZW50WDtcbiAgICB9XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlVHJhbnNmb3JtKTtcblxuICAgIHJldHVybiBmYWxzZTtcblxufVxuXG5mdW5jdGlvbiBtb3VzZXVwKGUpIHtcblxuICAgIHNsaWRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IC0oZmlyc3RDbGlja1Bvc2l0aW9uIC0gZS5jbGllbnRYKTtcblxuICAgIHNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVUcmFuc2Zvcm0pO1xuXG4gICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VsZWF2ZShlKSB7XG5cbiAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZVRyYW5zZm9ybSk7XG5cbiAgICB0b0ZpeGVkUG9zaXRpb24oKTtcblxuICAgIHJldHVybiBmYWxzZTtcblxufVxuXG5mdW5jdGlvbiB0b3VjaHN0YXJ0KGUpIHtcblxuICAgIGlmIChsYXN0Q2xpY2tQb3NpdGlvbikge1xuICAgICAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLnRvdWNoZXNbMF0uY2xpZW50WCAtIGxhc3RDbGlja1Bvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiB0b3VjaG1vdmUoZSkge1xuXG4gICAgY2FsY3VsYXRlVHJhbnNmb3JtKGUpO1xuXG59XG5cbmNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgLTIyNSk7XG5cbnRvRml4ZWRQb3NpdGlvbigpO1xuXG5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2Vkb3duKTtcbnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIG1vdXNlbGVhdmUpO1xuXG5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG1vdXNlZG93bik7XG5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZXVwKTtcbnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmUpO1xuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0KTtcbiIsInZhciBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICBzdGFyLnN0eWxlLmNvbG9yID0gJyM2OTRFMDAnO1xuICAgIHN0YXIuaW5uZXJIVE1MID0gJ3N0YXInO1xuXG52YXIgYWxsUmF0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyYXRlJyk7XG5cbnJhdGUgPSBhbGxSYXRlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmF0ZScpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgIGFsbFJhdGVzWzBdLmFwcGVuZENoaWxkKHN0YXIuY2xvbmVOb2RlKHRydWUpKTtcbn1cblxuZm9yICh2YXIgeSA9IDA7IHkgPCByYXRlOyB5KyspIHtcbiAgICBhbGxSYXRlc1swXS5jaGlsZHJlblt5XS5zdHlsZS5jb2xvciA9ICcjRkZDMTA3Jztcbn1cbiJdfQ==
