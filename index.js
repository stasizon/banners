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
        
                var slidesDifference = (state.currentSlide - slideId);
        
                if (slidesDifference < 0) {
                    slidesDifference = -slidesDifference;
                }
        
                if (slidesDifference === 0) {
                    slidesDifference++;
                }
        
                timer = setInterval(function () {
        
                    var offset = Math.round((state.offset - (breakPoints[slideId] - 75)));
        
                    console.log(Math.round(state.offset - (breakPoints[slideId] - 75)));
        
                    var time1 = Date.now();
        
                    if (offset > 0) {
                        i++;
                        setOffset( -slidesDifference * scrollSpeed );
        
                        // console.log(-offset, -slidesDifference * scrollSpeed, ((slidesDifference * scrollSpeed) - offset));
        
                        if (-offset > -slidesDifference * scrollSpeed) {
                            clearInterval(timer);
                            setOffset( ((slidesDifference * scrollSpeed) - offset) );
                        }
        
                    } else if(offset < 0) {
                        i--;
                        setOffset( slidesDifference * scrollSpeed );
        
                        // console.log(-offset, -slidesDifference * scrollSpeed, -((slidesDifference * scrollSpeed) + offset));
        
                        if (-offset < slidesDifference * scrollSpeed) {
                            clearInterval(timer);
                            setOffset( -((slidesDifference * scrollSpeed) + offset ));
                        }
                    }
        
                    if (offset === 0) {
                        clearInterval(timer);
                    }
        
                    scrollSpeed = Math.ceil((Date.now() - time1) / 1.5);
        
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvYW5pbWF0aW9uL2FuaW1hdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtRQ0hBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtBRC9TQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1FFVEE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FGR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtRR2ZBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7QUhYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYWRLZXJuZWxCYW5uZXIgPSB7XG5cbiAgICBpbml0R2FsbGVyeTogZnVuY3Rpb24oc2xpZGVzLCBwYXJlbnQpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9nYWxsZXJ5L2dhbGxlcnkuanNcblxuICAgIH0sXG5cbiAgICBzZXRSYXRlOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9yYXRlL3JhdGUuanNcblxuICAgIH0sXG5cbiAgICBpbml0QW5pbWF0aW9uOiBmdW5jdGlvbihpbWFnZXMpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9hbmltYXRpb24vYW5pbWF0aW9uLmpzXG5cbiAgICB9XG5cbn07XG5cbnZhciBpbWFnZUFycmF5ID0gW1xuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC00LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNS5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTYuanBnJ1xuICAgICAgICAgICAgICAgICBdO1xuXG4vLyBfX2FkS2VybmVsQmFubmVyLmluaXRBbmltYXRpb24oWycuL2ltZy91bnNwbGFzaC5qcGcnLCAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLCAnLi9pbWcvdW5zcGxhc2gtMy5qcGcnXSk7XG5cbl9fYWRLZXJuZWxCYW5uZXIuaW5pdEdhbGxlcnkoaW1hZ2VBcnJheSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpKTtcblxuX19hZEtlcm5lbEJhbm5lci5zZXRSYXRlKCk7XG4iLCJ2YXIgSU1HX1dJRFRIID0gMjUwO1xudmFyIElNR19IRUlHSFQgPSAxNjA7XG52YXIgSU1HX01BUkdJTiA9IDEwMDtcblxudmFyIFNMSURFUl9XSURUSCA9IDEwMDA7XG52YXIgU0xJREVSX09GRlNFVF9UT18wID0gMTE1O1xudmFyIEJBTk5FUl9XSURUSCA9IDQ4MDtcblxudmFyIHNsaWRlciA9IHBhcmVudDtcblxuKGZ1bmN0aW9uIGFkZFNsaWRlcygpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbScpO1xuICAgICAgICBzbGlkZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgc2xpZGVzW2ldICsgJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvdmVyJztcbiAgICAgICAgc2xpZGUuc3R5bGUubWluV2lkdGggPSBJTUdfV0lEVEggKyAncHgnO1xuICAgICAgICBzbGlkZS5zdHlsZS5oZWlnaHQgPSBJTUdfSEVJR0hUICsgJ3B4JztcblxuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQoc2xpZGUpO1xuICAgIH1cblxufSkoKTtcblxuZnVuY3Rpb24gZ2V0QnJlYWtQb2ludHMoKSB7XG5cbiAgICB2YXIgcG9pbnRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBwb2ludHNbaV0gPSAtMTUwICogaSArIDE5MDtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzO1xuXG59XG5cbnZhciBicmVha1BvaW50cyA9IGdldEJyZWFrUG9pbnRzKCk7XG5cbihmdW5jdGlvbiBpbml0Q29udHJvbGxlcnMoKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRyb2xsZXIuY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbScpO1xuICAgICAgICBjb250cm9sbGVyLnNldEF0dHJpYnV0ZSgnZGF0YS1udW1iZXInLCBpKTtcblxuICAgICAgICBjb250cm9sbGVyLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIHZhciBzbGlkZU51bWJlciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1udW1iZXInKTtcblxuICAgICAgICAgICAgc2V0U2xpZGUoc2xpZGVOdW1iZXIsIHRydWUpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuYXBwZW5kQ2hpbGQoY29udHJvbGxlcik7XG5cbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuc3R5bGUud2lkdGggPSBzbGlkZXMubGVuZ3RoICogMjUgKyAncHgnO1xuXG59KSgpO1xuXG52YXIgc3RhdGUgPSB7XG4gICAgb2Zmc2V0OiAwLFxuICAgIGN1cnJlbnRTbGlkZTogMFxufTtcblxudmFyIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IDA7XG52YXIgbGFzdENsaWNrUG9zaXRpb24gPSAwO1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG5cbiAgICBzbGlkZXIuc3R5bGUubGVmdCA9IHN0YXRlLm9mZnNldCArICdweCc7XG5cbiAgICB2YXIgb3JpZ2luID0gTWF0aC5yb3VuZCgtKHN0YXRlLm9mZnNldCkgKyBCQU5ORVJfV0lEVEggLyAyKTtcblxuICAgIHNsaWRlci5zdHlsZS5wZXJzcGVjdGl2ZU9yaWdpbiA9IG9yaWdpbiArICdweCc7XG5cbiAgICB2YXIgY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihzbGlkZU51bWJlcikge1xuICAgICAgICByZXR1cm4gc2xpZGVyLmNoaWxkcmVuW3NsaWRlTnVtYmVyXS5vZmZzZXRQYXJlbnQub2Zmc2V0TGVmdCArICgoSU1HX1dJRFRIIC0gSU1HX01BUkdJTikgKiBzbGlkZU51bWJlcikgLSBTTElERVJfT0ZGU0VUX1RPXzA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcm90YXRlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICB2YXIgZGVnID0gLWRpc3RhbmNlIC8gNTtcblxuICAgICAgICBpZiAoZGVnIDwgLTQwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTQwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZyA+IC00MCAmJiBkZWcgPCA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWcgPiA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIDQwO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FsZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC1kaXN0YW5jZSAqIDI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzdGFuY2UgKiAyO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlU2xpZGVMYXllcihkaXN0YW5jZSkge1xuXG4gICAgICAgIGlmICgtZGlzdGFuY2UgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlzdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLWRpc3RhbmNlO1xuXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgJ3JvdGF0ZVkoJyArIHJvdGF0ZVNsaWRlKGNhbGN1bGF0ZURpc3RhbmNlKGkpKSArICdkZWcpJyArXG4gICAgICAgICd0cmFuc2xhdGVaKCcgKyBzY2FsZVNsaWRlKGNhbGN1bGF0ZURpc3RhbmNlKGkpKSArICdweCknO1xuXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS56SW5kZXggPSBjYWxjdWxhdGVTbGlkZUxheWVyKGNhbGN1bGF0ZURpc3RhbmNlKGkpKTtcblxuICAgICAgICBzbGlkZXIuc3R5bGUucGVyc3BlY3RpdmVPcmlnaW4gPSBzdGF0ZS5vZmZzZXQgLyBzbGlkZXJcblxuICAgIH1cblxuICAgIChmdW5jdGlvbiBjaGVja1NsaWRlU3dpdGNoKCkge1xuXG4gICAgICAgIGlmIChzdGF0ZS5vZmZzZXQgPj0gYnJlYWtQb2ludHNbMF0pIHtcbiAgICAgICAgICAgIHN0YXRlLmN1cnJlbnRTbGlkZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IHkrKykge1xuXG4gICAgICAgICAgICBpZiAoc3RhdGUub2Zmc2V0IDw9IGJyZWFrUG9pbnRzW3ldICYmIHN0YXRlLm9mZnNldCA+PSBicmVha1BvaW50c1t5ICsgMV0pIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50U2xpZGUgPSB5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUub2Zmc2V0IDw9IGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBzdGF0ZS5jdXJyZW50U2xpZGUgPSBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuXG4gICAgfSkoKTtcblxufVxuXG5mdW5jdGlvbiBzZXRPZmZzZXQob2Zmc2V0RGlmZmVyZW5jZSkge1xuXG4gICAgc3RhdGUub2Zmc2V0ICs9IG9mZnNldERpZmZlcmVuY2U7XG4gICAgcmVuZGVyKCk7XG5cbn1cblxudmFyIHRpbWVyO1xudmFyIGdsb2JhbFNjcm9sbDtcblxudmFyIHNjcm9sbFNwZWVkID0gNTtcblxuZnVuY3Rpb24gc2V0U2xpZGUoc2xpZGVJZCwgZW5hYmxlU2Nyb2xsKSB7XG5cbiAgICBpZiAoZW5hYmxlU2Nyb2xsKSB7XG5cbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICAgIHZhciBzbGlkZXNEaWZmZXJlbmNlID0gKHN0YXRlLmN1cnJlbnRTbGlkZSAtIHNsaWRlSWQpO1xuXG4gICAgICAgIGlmIChzbGlkZXNEaWZmZXJlbmNlIDwgMCkge1xuICAgICAgICAgICAgc2xpZGVzRGlmZmVyZW5jZSA9IC1zbGlkZXNEaWZmZXJlbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNsaWRlc0RpZmZlcmVuY2UgPT09IDApIHtcbiAgICAgICAgICAgIHNsaWRlc0RpZmZlcmVuY2UrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gTWF0aC5yb3VuZCgoc3RhdGUub2Zmc2V0IC0gKGJyZWFrUG9pbnRzW3NsaWRlSWRdIC0gNzUpKSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKE1hdGgucm91bmQoc3RhdGUub2Zmc2V0IC0gKGJyZWFrUG9pbnRzW3NsaWRlSWRdIC0gNzUpKSk7XG5cbiAgICAgICAgICAgIHZhciB0aW1lMSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHNldE9mZnNldCggLXNsaWRlc0RpZmZlcmVuY2UgKiBzY3JvbGxTcGVlZCApO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coLW9mZnNldCwgLXNsaWRlc0RpZmZlcmVuY2UgKiBzY3JvbGxTcGVlZCwgKChzbGlkZXNEaWZmZXJlbmNlICogc2Nyb2xsU3BlZWQpIC0gb2Zmc2V0KSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoLW9mZnNldCA+IC1zbGlkZXNEaWZmZXJlbmNlICogc2Nyb2xsU3BlZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgICAgIHNldE9mZnNldCggKChzbGlkZXNEaWZmZXJlbmNlICogc2Nyb2xsU3BlZWQpIC0gb2Zmc2V0KSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmKG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgc2V0T2Zmc2V0KCBzbGlkZXNEaWZmZXJlbmNlICogc2Nyb2xsU3BlZWQgKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKC1vZmZzZXQsIC1zbGlkZXNEaWZmZXJlbmNlICogc2Nyb2xsU3BlZWQsIC0oKHNsaWRlc0RpZmZlcmVuY2UgKiBzY3JvbGxTcGVlZCkgKyBvZmZzZXQpKTtcblxuICAgICAgICAgICAgICAgIGlmICgtb2Zmc2V0IDwgc2xpZGVzRGlmZmVyZW5jZSAqIHNjcm9sbFNwZWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgICAgICAgICBzZXRPZmZzZXQoIC0oKHNsaWRlc0RpZmZlcmVuY2UgKiBzY3JvbGxTcGVlZCkgKyBvZmZzZXQgKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcm9sbFNwZWVkID0gTWF0aC5jZWlsKChEYXRlLm5vdygpIC0gdGltZTEpIC8gMS41KTtcblxuICAgICAgICB9LCAxNik7XG5cblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldE9mZnNldCggKGJyZWFrUG9pbnRzW3NsaWRlSWRdIC0gNzUpIC0gc3RhdGUub2Zmc2V0ICk7XG4gICAgfVxuXG4gICAgc3RhdGUuY3VycmVudFNsaWRlID0gc2xpZGVJZDtcblxuICAgIGZvciAobGV0IHogPSAwOyB6IDwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuLmxlbmd0aDsgeisrKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5jbGFzc0xpc3QucmVtb3ZlKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5bc2xpZGVJZF0uY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJylcblxufVxuXG52YXIgb2xkQ2xpZW50WDtcblxuZnVuY3Rpb24gbW91c2VEb3duKGUpIHtcblxuICAgIG9sZENsaWVudFggPSBlLmNsaWVudFggfHwgZS50b3VjaGVzWzBdLmNsaWVudFg7XG5cbiAgICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcblxufVxuXG5mdW5jdGlvbiBtb3VzZU1vdmUoZSkge1xuXG4gICAgdmFyIG1vdXNlT2Zmc2V0ID0gKGUuY2xpZW50WCAtIG9sZENsaWVudFgpIC8gMi41O1xuXG4gICAgb2xkQ2xpZW50WCA9IGUuY2xpZW50WCB8fCBlLnRvdWNoZXNbMF0uY2xpZW50WDtcblxuICAgIHNldE9mZnNldChtb3VzZU9mZnNldCk7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VVcChlKSB7XG5cbiAgICBzZXRTbGlkZShzdGF0ZS5jdXJyZW50U2xpZGUsIHRydWUpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlTGVhdmUoZSkge1xuXG4gICAgLy8gSWYgbW91c2UgZG93blxuICAgIGlmIChlLndoaWNoID09PSAxKSB7XG4gICAgICAgIHNldFNsaWRlKHN0YXRlLmN1cnJlbnRTbGlkZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuXG59XG5cbi8vIFRPVUNIIFNVUFBPUlRcblxuZnVuY3Rpb24gdG91Y2hNb3ZlKGUpIHtcblxuICAgIHZhciBtb3VzZU9mZnNldCA9IChlLnRvdWNoZXNbMF0uY2xpZW50WCAtIG9sZENsaWVudFgpIC8gMi41O1xuXG4gICAgb2xkQ2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuXG4gICAgc2V0T2Zmc2V0KG1vdXNlT2Zmc2V0KTtcblxufVxuXG5mdW5jdGlvbiB0b3VjaEVuZChlKSB7XG5cbiAgICBzZXRTbGlkZShzdGF0ZS5jdXJyZW50U2xpZGUsIHRydWUpO1xuXG59XG5cbnNldFNsaWRlKE1hdGguZmxvb3Ioc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAvIDIpLCBmYWxzZSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhbm5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBtb3VzZUxlYXZlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgbW91c2VEb3duKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEVuZCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoTW92ZSk7XG4iLCJ2YXIgcmF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYXRlJyk7XG5cbnZhciByYXRlVmFsdWUgPSByYXRlLmdldEF0dHJpYnV0ZSgnZGF0YS1yYXRlJyk7XG5cblxuZm9yICh2YXIgeSA9IDA7IHkgPCByYXRlVmFsdWU7IHkrKykge1xuICAgIHJhdGUuY2hpbGRyZW5beV0uc2V0QXR0cmlidXRlKCdmaWxsJywgJyNGRkMxMDcnKTtcbn1cbiIsInZhciBzdGFydEFuaW1hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHN0YXJ0QW5pbWF0aW9uLmlkID0gJ3N0YXJ0QW5pbWF0aW9uJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJykuYXBwZW5kQ2hpbGQoc3RhcnRBbmltYXRpb24pO1xuXG52YXIgYmFja2dyb3VuZEFuaW1hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJhY2tncm91bmRBbmltYXRpb24uaWQgPSAnYmFja2dyb3VuZEFuaW1hdGlvbic7XG4gICAgc3RhcnRBbmltYXRpb24uYXBwZW5kQ2hpbGQoYmFja2dyb3VuZEFuaW1hdGlvbik7XG5cbnZhciBsb2dvQW5pbWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbG9nb0FuaW1hdGlvbi5pZCA9ICdsb2dvQW5pbWF0aW9uJztcbiAgICBsb2dvQW5pbWF0aW9uLmNsYXNzTGlzdC5hZGQoJ2Jhbm5lcl9fbG9nbycpO1xuICAgIGJhY2tncm91bmRBbmltYXRpb24uYXBwZW5kQ2hpbGQobG9nb0FuaW1hdGlvbik7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICB2YXIgcHJldmlld0ltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgcHJldmlld0ltYWdlLnNyYyA9IGltYWdlc1tpXTtcbiAgICBwcmV2aWV3SW1hZ2UuY2xhc3NMaXN0LmFkZCgncHJldmlldycpO1xuXG4gICAgc3RhcnRBbmltYXRpb24uYXBwZW5kQ2hpbGQocHJldmlld0ltYWdlKTtcblxufVxuXG5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydEFuaW1hdGlvbicpLnJlbW92ZSgpO1xuXG59LCA1NTAwKTtcbiJdfQ==
