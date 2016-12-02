var __adKernelBanner = {

    initGallery: function(slides, parent) {

        var IMG_WIDTH = 250;
        var IMG_HEIGHT = 160;
        var IMG_MARGIN = 100;
        
        var SLIDER_WIDTH = 1000;
        var SLIDER_OFFSET_TO_0 = 115;
        var BANNER_WIDTH = 480;
        
        var slider = parent;
        
        (function addSlides() {
        
            for (var i = 0; i < slides.length; i++) {
        
                var slide = document.createElement('div');
        
                slide.classList.add('gallery__item');
                slide.style.background = 'url(' + slides[i] + ') no-repeat center / cover';
                slide.style.minWidth = IMG_WIDTH + 'px';
                slide.style.height = IMG_HEIGHT + 'px';
        
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
        
        var state = {
            offset: 0,
            currentSlide: 0
        };
        
        var firstClickPosition = 0;
        var lastClickPosition = 0;
        
        function render() {
        
            slider.style.left = state.offset + 'px';
        
            var origin = Math.round(-(state.offset) + BANNER_WIDTH / 2);
        
            slider.style.perspectiveOrigin = origin + 'px';
        
            var calculateDistance = function(slideNumber) {
                return slider.children[slideNumber].offsetParent.offsetLeft + ((IMG_WIDTH - IMG_MARGIN) * slideNumber) - SLIDER_OFFSET_TO_0;
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
        
        }
        
        function setOffset(offsetDifference) {
        
            state.offset += offsetDifference;
            render();
        
        }
        
        var timer;
        var globalScroll;
        
        var scrollSpeed = 5;
        
        function setSlide(slideId, enableScroll) {
        
            if (enableScroll) {
        
                clearInterval(timer);
        
                var i = 0;
        
                var positionOnMouseOut = state.offset;
        
                console.log(scrollSpeed);
        
                var slidesDifference = (state.currentSlide - slideId) * scrollSpeed;
        
                if (slidesDifference < 0) {
                    slidesDifference = -slidesDifference;
                }
        
                if (slidesDifference === 0) {
                    slidesDifference++;
                }
        
                timer = setInterval(function () {
        
                    var time1 = Date.now();
        
                    var offset = Math.round((positionOnMouseOut - (breakPoints[slideId] - 75)) / (slidesDifference));
        
                    if (offset > 0) {
                        i++;
                        setOffset( -slidesDifference );
                    } else if(offset < 0) {
                        i--;
                        setOffset( slidesDifference );
                    }
        
                    if (i === offset) {
                        clearInterval(timer);
                    }
        
                    scrollSpeed = Date.now() - time1;
        
                }, 16);
        
        
            } else {
                setOffset( (breakPoints[slideId] - 75) - state.offset );
            }
        
            state.currentSlide = slideId;
        
            for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
            }
        
            document.getElementById('controlerContainer').children[slideId].classList.add('controller__item--active')
        
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
        
            setOffset(mouseOffset);
        
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
        
            setOffset(mouseOffset);
        
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
        

    },

    setRate: function() {

        var rate = document.getElementById('rate');
        
        var rateValue = rate.getAttribute('data-rate');
        
        
        for (var y = 0; y < rateValue; y++) {
            rate.children[y].setAttribute('fill', '#FFC107');
        }
        

    },

    initAnimation: function(images) {

        var startAnimation = document.createElement('div');
            startAnimation.id = 'startAnimation';
            document.getElementById('banner').appendChild(startAnimation);
        
        var backgroundAnimation = document.createElement('div');
            backgroundAnimation.id = 'backgroundAnimation';
            startAnimation.appendChild(backgroundAnimation);
        
        var logoAnimation = document.createElement('div');
            logoAnimation.id = 'logoAnimation';
            logoAnimation.classList.add('banner__logo');
            backgroundAnimation.appendChild(logoAnimation);
        
        for (var i = 0; i < images.length; i++) {
        
            var previewImage = document.createElement('img');
            previewImage.src = images[i];
            previewImage.classList.add('preview');
        
            startAnimation.appendChild(previewImage);
        
        }
        
        setTimeout(function () {
        
            document.getElementById('startAnimation').remove();
        
        }, 5500);
        

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

// __adKernelBanner.initAnimation(['./img/unsplash.jpg', './img/unsplash-2.jpg', './img/unsplash-3.jpg']);

__adKernelBanner.initGallery(imageArray, document.getElementById('slider'));

__adKernelBanner.setRate();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvYW5pbWF0aW9uL2FuaW1hdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtRQ0hBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7QURsU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtRRVRBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtBRkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7UUdmQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FIWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2FkS2VybmVsQmFubmVyID0ge1xuXG4gICAgaW5pdEdhbGxlcnk6IGZ1bmN0aW9uKHNsaWRlcywgcGFyZW50KSB7XG5cbiAgICAgICAgLy89cmVxdWlyZSBibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzXG5cbiAgICB9LFxuXG4gICAgc2V0UmF0ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy89cmVxdWlyZSBibG9ja3MvcmF0ZS9yYXRlLmpzXG5cbiAgICB9LFxuXG4gICAgaW5pdEFuaW1hdGlvbjogZnVuY3Rpb24oaW1hZ2VzKSB7XG5cbiAgICAgICAgLy89cmVxdWlyZSBibG9ja3MvYW5pbWF0aW9uL2FuaW1hdGlvbi5qc1xuXG4gICAgfVxuXG59O1xuXG52YXIgaW1hZ2VBcnJheSA9IFtcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTIuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC0zLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNC5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTUuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC02LmpwZydcbiAgICAgICAgICAgICAgICAgXTtcblxuLy8gX19hZEtlcm5lbEJhbm5lci5pbml0QW5pbWF0aW9uKFsnLi9pbWcvdW5zcGxhc2guanBnJywgJy4vaW1nL3Vuc3BsYXNoLTIuanBnJywgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJ10pO1xuXG5fX2FkS2VybmVsQmFubmVyLmluaXRHYWxsZXJ5KGltYWdlQXJyYXksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKSk7XG5cbl9fYWRLZXJuZWxCYW5uZXIuc2V0UmF0ZSgpO1xuIiwidmFyIElNR19XSURUSCA9IDI1MDtcbnZhciBJTUdfSEVJR0hUID0gMTYwO1xudmFyIElNR19NQVJHSU4gPSAxMDA7XG5cbnZhciBTTElERVJfV0lEVEggPSAxMDAwO1xudmFyIFNMSURFUl9PRkZTRVRfVE9fMCA9IDExNTtcbnZhciBCQU5ORVJfV0lEVEggPSA0ODA7XG5cbnZhciBzbGlkZXIgPSBwYXJlbnQ7XG5cbihmdW5jdGlvbiBhZGRTbGlkZXMoKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBzbGlkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnlfX2l0ZW0nKTtcbiAgICAgICAgc2xpZGUuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoJyArIHNsaWRlc1tpXSArICcpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb3Zlcic7XG4gICAgICAgIHNsaWRlLnN0eWxlLm1pbldpZHRoID0gSU1HX1dJRFRIICsgJ3B4JztcbiAgICAgICAgc2xpZGUuc3R5bGUuaGVpZ2h0ID0gSU1HX0hFSUdIVCArICdweCc7XG5cbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICB9XG5cbn0pKCk7XG5cbmZ1bmN0aW9uIGdldEJyZWFrUG9pbnRzKCkge1xuXG4gICAgdmFyIHBvaW50cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9pbnRzW2ldID0gLTE1MCAqIGkgKyAxOTA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50cztcblxufVxuXG52YXIgYnJlYWtQb2ludHMgPSBnZXRCcmVha1BvaW50cygpO1xuXG4oZnVuY3Rpb24gaW5pdENvbnRyb2xsZXJzKCkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgY29udHJvbGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250cm9sbGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXJfX2l0ZW0nKTtcbiAgICAgICAgY29udHJvbGxlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtbnVtYmVyJywgaSk7XG5cbiAgICAgICAgY29udHJvbGxlci5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICB2YXIgc2xpZGVOdW1iZXIgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbnVtYmVyJyk7XG5cbiAgICAgICAgICAgIHNldFNsaWRlKHNsaWRlTnVtYmVyLCB0cnVlKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIpO1xuXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoID0gc2xpZGVzLmxlbmd0aCAqIDI1ICsgJ3B4JztcblxufSkoKTtcblxudmFyIHN0YXRlID0ge1xuICAgIG9mZnNldDogMCxcbiAgICBjdXJyZW50U2xpZGU6IDBcbn07XG5cbnZhciBmaXJzdENsaWNrUG9zaXRpb24gPSAwO1xudmFyIGxhc3RDbGlja1Bvc2l0aW9uID0gMDtcblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgc2xpZGVyLnN0eWxlLmxlZnQgPSBzdGF0ZS5vZmZzZXQgKyAncHgnO1xuXG4gICAgdmFyIG9yaWdpbiA9IE1hdGgucm91bmQoLShzdGF0ZS5vZmZzZXQpICsgQkFOTkVSX1dJRFRIIC8gMik7XG5cbiAgICBzbGlkZXIuc3R5bGUucGVyc3BlY3RpdmVPcmlnaW4gPSBvcmlnaW4gKyAncHgnO1xuXG4gICAgdmFyIGNhbGN1bGF0ZURpc3RhbmNlID0gZnVuY3Rpb24oc2xpZGVOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHNsaWRlci5jaGlsZHJlbltzbGlkZU51bWJlcl0ub2Zmc2V0UGFyZW50Lm9mZnNldExlZnQgKyAoKElNR19XSURUSCAtIElNR19NQVJHSU4pICogc2xpZGVOdW1iZXIpIC0gU0xJREVSX09GRlNFVF9UT18wO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgdmFyIGRlZyA9IC1kaXN0YW5jZSAvIDU7XG5cbiAgICAgICAgaWYgKGRlZyA8IC00MCkge1xuICAgICAgICAgICAgcmV0dXJuIC00MDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWcgPiAtNDAgJiYgZGVnIDwgNDApIHtcbiAgICAgICAgICAgIHJldHVybiBkZWc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVnID4gNDApIHtcbiAgICAgICAgICAgIHJldHVybiA0MDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhbGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAtZGlzdGFuY2UgKiAyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpc3RhbmNlICogMjtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVNsaWRlTGF5ZXIoZGlzdGFuY2UpIHtcblxuICAgICAgICBpZiAoLWRpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC1kaXN0YW5jZTtcblxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICdyb3RhdGVZKCcgKyByb3RhdGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAnZGVnKScgK1xuICAgICAgICAndHJhbnNsYXRlWignICsgc2NhbGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAncHgpJztcblxuICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUuekluZGV4ID0gY2FsY3VsYXRlU2xpZGVMYXllcihjYWxjdWxhdGVEaXN0YW5jZShpKSk7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLnBlcnNwZWN0aXZlT3JpZ2luID0gc3RhdGUub2Zmc2V0IC8gc2xpZGVyXG5cbiAgICB9XG5cbiAgICAoZnVuY3Rpb24gY2hlY2tTbGlkZVN3aXRjaCgpIHtcblxuICAgICAgICBpZiAoc3RhdGUub2Zmc2V0ID49IGJyZWFrUG9pbnRzWzBdKSB7XG4gICAgICAgICAgICBzdGF0ZS5jdXJyZW50U2xpZGUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICAgICAgaWYgKHN0YXRlLm9mZnNldCA8PSBicmVha1BvaW50c1t5XSAmJiBzdGF0ZS5vZmZzZXQgPj0gYnJlYWtQb2ludHNbeSArIDFdKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuY3VycmVudFNsaWRlID0geTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLm9mZnNldCA8PSBicmVha1BvaW50c1ticmVha1BvaW50cy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgc3RhdGUuY3VycmVudFNsaWRlID0gc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cblxuICAgIH0pKCk7XG5cbn1cblxuZnVuY3Rpb24gc2V0T2Zmc2V0KG9mZnNldERpZmZlcmVuY2UpIHtcblxuICAgIHN0YXRlLm9mZnNldCArPSBvZmZzZXREaWZmZXJlbmNlO1xuICAgIHJlbmRlcigpO1xuXG59XG5cbnZhciB0aW1lcjtcbnZhciBnbG9iYWxTY3JvbGw7XG5cbnZhciBzY3JvbGxTcGVlZCA9IDU7XG5cbmZ1bmN0aW9uIHNldFNsaWRlKHNsaWRlSWQsIGVuYWJsZVNjcm9sbCkge1xuXG4gICAgaWYgKGVuYWJsZVNjcm9sbCkge1xuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXG4gICAgICAgIHZhciBpID0gMDtcblxuICAgICAgICB2YXIgcG9zaXRpb25Pbk1vdXNlT3V0ID0gc3RhdGUub2Zmc2V0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHNjcm9sbFNwZWVkKTtcblxuICAgICAgICB2YXIgc2xpZGVzRGlmZmVyZW5jZSA9IChzdGF0ZS5jdXJyZW50U2xpZGUgLSBzbGlkZUlkKSAqIHNjcm9sbFNwZWVkO1xuXG4gICAgICAgIGlmIChzbGlkZXNEaWZmZXJlbmNlIDwgMCkge1xuICAgICAgICAgICAgc2xpZGVzRGlmZmVyZW5jZSA9IC1zbGlkZXNEaWZmZXJlbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNsaWRlc0RpZmZlcmVuY2UgPT09IDApIHtcbiAgICAgICAgICAgIHNsaWRlc0RpZmZlcmVuY2UrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgdGltZTEgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gTWF0aC5yb3VuZCgocG9zaXRpb25Pbk1vdXNlT3V0IC0gKGJyZWFrUG9pbnRzW3NsaWRlSWRdIC0gNzUpKSAvIChzbGlkZXNEaWZmZXJlbmNlKSk7XG5cbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHNldE9mZnNldCggLXNsaWRlc0RpZmZlcmVuY2UgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgIHNldE9mZnNldCggc2xpZGVzRGlmZmVyZW5jZSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaSA9PT0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcm9sbFNwZWVkID0gRGF0ZS5ub3coKSAtIHRpbWUxO1xuXG4gICAgICAgIH0sIDE2KTtcblxuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0T2Zmc2V0KCAoYnJlYWtQb2ludHNbc2xpZGVJZF0gLSA3NSkgLSBzdGF0ZS5vZmZzZXQgKTtcbiAgICB9XG5cbiAgICBzdGF0ZS5jdXJyZW50U2xpZGUgPSBzbGlkZUlkO1xuXG4gICAgZm9yIChsZXQgeiA9IDA7IHogPCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW4ubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3pdLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbltzbGlkZUlkXS5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKVxuXG59XG5cbnZhciBvbGRDbGllbnRYO1xuXG5mdW5jdGlvbiBtb3VzZURvd24oZSkge1xuXG4gICAgb2xkQ2xpZW50WCA9IGUuY2xpZW50WCB8fCBlLnRvdWNoZXNbMF0uY2xpZW50WDtcblxuICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZShlKSB7XG5cbiAgICB2YXIgbW91c2VPZmZzZXQgPSAoZS5jbGllbnRYIC0gb2xkQ2xpZW50WCkgLyAyLjU7XG5cbiAgICBvbGRDbGllbnRYID0gZS5jbGllbnRYIHx8IGUudG91Y2hlc1swXS5jbGllbnRYO1xuXG4gICAgc2V0T2Zmc2V0KG1vdXNlT2Zmc2V0KTtcblxufVxuXG5mdW5jdGlvbiBtb3VzZVVwKGUpIHtcblxuICAgIHNldFNsaWRlKHN0YXRlLmN1cnJlbnRTbGlkZSwgdHJ1ZSk7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VMZWF2ZShlKSB7XG5cbiAgICAvLyBJZiBtb3VzZSBkb3duXG4gICAgaWYgKGUud2hpY2ggPT09IDEpIHtcbiAgICAgICAgc2V0U2xpZGUoc3RhdGUuY3VycmVudFNsaWRlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG5cbn1cblxuLy8gVE9VQ0ggU1VQUE9SVFxuXG5mdW5jdGlvbiB0b3VjaE1vdmUoZSkge1xuXG4gICAgdmFyIG1vdXNlT2Zmc2V0ID0gKGUudG91Y2hlc1swXS5jbGllbnRYIC0gb2xkQ2xpZW50WCkgLyAyLjU7XG5cbiAgICBvbGRDbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG5cbiAgICBzZXRPZmZzZXQobW91c2VPZmZzZXQpO1xuXG59XG5cbmZ1bmN0aW9uIHRvdWNoRW5kKGUpIHtcblxuICAgIHNldFNsaWRlKHN0YXRlLmN1cnJlbnRTbGlkZSwgdHJ1ZSk7XG5cbn1cblxuc2V0U2xpZGUoTWF0aC5mbG9vcihzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC8gMiksIGZhbHNlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIG1vdXNlTGVhdmUpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZURvd24pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoRW5kKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hNb3ZlKTtcbiIsInZhciByYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhdGUnKTtcblxudmFyIHJhdGVWYWx1ZSA9IHJhdGUuZ2V0QXR0cmlidXRlKCdkYXRhLXJhdGUnKTtcblxuXG5mb3IgKHZhciB5ID0gMDsgeSA8IHJhdGVWYWx1ZTsgeSsrKSB7XG4gICAgcmF0ZS5jaGlsZHJlblt5XS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnI0ZGQzEwNycpO1xufVxuIiwidmFyIHN0YXJ0QW5pbWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3RhcnRBbmltYXRpb24uaWQgPSAnc3RhcnRBbmltYXRpb24nO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKS5hcHBlbmRDaGlsZChzdGFydEFuaW1hdGlvbik7XG5cbnZhciBiYWNrZ3JvdW5kQW5pbWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmFja2dyb3VuZEFuaW1hdGlvbi5pZCA9ICdiYWNrZ3JvdW5kQW5pbWF0aW9uJztcbiAgICBzdGFydEFuaW1hdGlvbi5hcHBlbmRDaGlsZChiYWNrZ3JvdW5kQW5pbWF0aW9uKTtcblxudmFyIGxvZ29BbmltYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsb2dvQW5pbWF0aW9uLmlkID0gJ2xvZ29BbmltYXRpb24nO1xuICAgIGxvZ29BbmltYXRpb24uY2xhc3NMaXN0LmFkZCgnYmFubmVyX19sb2dvJyk7XG4gICAgYmFja2dyb3VuZEFuaW1hdGlvbi5hcHBlbmRDaGlsZChsb2dvQW5pbWF0aW9uKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcblxuICAgIHZhciBwcmV2aWV3SW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gaW1hZ2VzW2ldO1xuICAgIHByZXZpZXdJbWFnZS5jbGFzc0xpc3QuYWRkKCdwcmV2aWV3Jyk7XG5cbiAgICBzdGFydEFuaW1hdGlvbi5hcHBlbmRDaGlsZChwcmV2aWV3SW1hZ2UpO1xuXG59XG5cbnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0QW5pbWF0aW9uJykucmVtb3ZlKCk7XG5cbn0sIDU1MDApO1xuIl19
