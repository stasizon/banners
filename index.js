var __adKernelBanner = {

    initGallery: function(slides, parent) {

        var IMG_WIDTH = 250;
        var IMG_HEIGHT = 160;
        
        var SLIDER_WIDTH = 1000;
        
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
        
            var origin = Math.round(-(state.offset) + 225);
        
            slider.style.perspectiveOrigin = origin + 10 + 'px';
        
            var calculateDistance = function(slideNumber) {
                return slider.children[slideNumber].offsetParent.offsetLeft + ((IMG_WIDTH - 100) * slideNumber) - 115;
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
        
        function setSlide(slideId, enableScroll) {
        
            if (enableScroll) {
        
                clearInterval(timer);
        
                var i = 0;
        
                var positionOnMouseOut = state.offset;
        
                var slidesDifference = (state.currentSlide - slideId);
        
                if (slidesDifference < 0) {
                    slidesDifference = -slidesDifference;
                }
        
                if (slidesDifference === 0) {
                    slidesDifference++;
                }
        
                timer = setInterval(function () {
        
                    var offset = Math.round((positionOnMouseOut - (breakPoints[slideId] - 75)) / slidesDifference);
        
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
        
        setSlide(3, false);
        
        document.getElementById('gallery').addEventListener('mousedown', mouseDown);
        document.getElementById('gallery').addEventListener('mouseup', mouseUp);
        document.getElementById('banner').addEventListener('mouseleave', mouseLeave);
        
        document.getElementById('gallery').addEventListener('touchstart', mouseDown);
        document.getElementById('gallery').addEventListener('touchend', touchEnd);
        document.getElementById('gallery').addEventListener('touchmove', touchMove);
        

    },

    setRate: function() {

        var star = document.createElement('i');
            star.classList.add('material-icons');
            star.style.color = '#694E00';
            star.style.fontSize = '19px';
            star.innerHTML = 'star';
        
        var allRates = document.getElementsByClassName('rate');
        
        rate = allRates[0].getAttribute('data-rate');
        
        for (var i = 0; i < 5; i++) {
            allRates[0].appendChild(star.cloneNode(true));
        }
        
        for (var y = 0; y < rate; y++) {
            allRates[0].children[y].style.color = '#FFC107';
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvYW5pbWF0aW9uL2FuaW1hdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtRQ0hBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtBRDFSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1FFVEE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FGTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtRR2ZBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7QUhYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYWRLZXJuZWxCYW5uZXIgPSB7XG5cbiAgICBpbml0R2FsbGVyeTogZnVuY3Rpb24oc2xpZGVzLCBwYXJlbnQpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9nYWxsZXJ5L2dhbGxlcnkuanNcblxuICAgIH0sXG5cbiAgICBzZXRSYXRlOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9yYXRlL3JhdGUuanNcblxuICAgIH0sXG5cbiAgICBpbml0QW5pbWF0aW9uOiBmdW5jdGlvbihpbWFnZXMpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9hbmltYXRpb24vYW5pbWF0aW9uLmpzXG5cbiAgICB9XG5cbn07XG5cbnZhciBpbWFnZUFycmF5ID0gW1xuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC00LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNS5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTYuanBnJ1xuICAgICAgICAgICAgICAgICBdO1xuXG4vLyBfX2FkS2VybmVsQmFubmVyLmluaXRBbmltYXRpb24oWycuL2ltZy91bnNwbGFzaC5qcGcnLCAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLCAnLi9pbWcvdW5zcGxhc2gtMy5qcGcnXSk7XG5cbl9fYWRLZXJuZWxCYW5uZXIuaW5pdEdhbGxlcnkoaW1hZ2VBcnJheSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpKTtcblxuX19hZEtlcm5lbEJhbm5lci5zZXRSYXRlKCk7XG4iLCJ2YXIgSU1HX1dJRFRIID0gMjUwO1xudmFyIElNR19IRUlHSFQgPSAxNjA7XG5cbnZhciBTTElERVJfV0lEVEggPSAxMDAwO1xuXG52YXIgc2xpZGVyID0gcGFyZW50O1xuXG4oZnVuY3Rpb24gYWRkU2xpZGVzKCkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgc2xpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJyk7XG4gICAgICAgIHNsaWRlLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKCcgKyBzbGlkZXNbaV0gKyAnKSBuby1yZXBlYXQgY2VudGVyIC8gY292ZXInO1xuICAgICAgICBzbGlkZS5zdHlsZS5taW5XaWR0aCA9IElNR19XSURUSCArICdweCc7XG4gICAgICAgIHNsaWRlLnN0eWxlLmhlaWdodCA9IElNR19IRUlHSFQgKyAncHgnO1xuXG4gICAgICAgIHNsaWRlci5hcHBlbmRDaGlsZChzbGlkZSk7XG4gICAgfVxuXG59KSgpO1xuXG5mdW5jdGlvbiBnZXRCcmVha1BvaW50cygpIHtcblxuICAgIHZhciBwb2ludHMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBvaW50c1tpXSA9IC0xNTAgKiBpICsgMTkwO1xuICAgIH1cblxuICAgIHJldHVybiBwb2ludHM7XG5cbn1cblxudmFyIGJyZWFrUG9pbnRzID0gZ2V0QnJlYWtQb2ludHMoKTtcblxuKGZ1bmN0aW9uIGluaXRDb250cm9sbGVycygpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udHJvbGxlci5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtJyk7XG4gICAgICAgIGNvbnRyb2xsZXIuc2V0QXR0cmlidXRlKCdkYXRhLW51bWJlcicsIGkpO1xuXG4gICAgICAgIGNvbnRyb2xsZXIub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgdmFyIHNsaWRlTnVtYmVyID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW51bWJlcicpO1xuXG4gICAgICAgICAgICBzZXRTbGlkZShzbGlkZU51bWJlciwgdHJ1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5hcHBlbmRDaGlsZChjb250cm9sbGVyKTtcblxuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5zdHlsZS53aWR0aCA9IHNsaWRlcy5sZW5ndGggKiAyNSArICdweCc7XG5cbn0pKCk7XG5cbnZhciBzdGF0ZSA9IHtcbiAgICBvZmZzZXQ6IDAsXG4gICAgY3VycmVudFNsaWRlOiAwXG59O1xuXG52YXIgZmlyc3RDbGlja1Bvc2l0aW9uID0gMDtcbnZhciBsYXN0Q2xpY2tQb3NpdGlvbiA9IDA7XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcblxuICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gc3RhdGUub2Zmc2V0ICsgJ3B4JztcblxuICAgIHZhciBvcmlnaW4gPSBNYXRoLnJvdW5kKC0oc3RhdGUub2Zmc2V0KSArIDIyNSk7XG5cbiAgICBzbGlkZXIuc3R5bGUucGVyc3BlY3RpdmVPcmlnaW4gPSBvcmlnaW4gKyAxMCArICdweCc7XG5cbiAgICB2YXIgY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihzbGlkZU51bWJlcikge1xuICAgICAgICByZXR1cm4gc2xpZGVyLmNoaWxkcmVuW3NsaWRlTnVtYmVyXS5vZmZzZXRQYXJlbnQub2Zmc2V0TGVmdCArICgoSU1HX1dJRFRIIC0gMTAwKSAqIHNsaWRlTnVtYmVyKSAtIDExNTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByb3RhdGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgIHZhciBkZWcgPSAtZGlzdGFuY2UgLyA1O1xuXG4gICAgICAgIGlmIChkZWcgPCAtNDApIHtcbiAgICAgICAgICAgIHJldHVybiAtNDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVnID4gLTQwICYmIGRlZyA8IDQwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZyA+IDQwKSB7XG4gICAgICAgICAgICByZXR1cm4gNDA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYWxlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICBpZiAoZGlzdGFuY2UgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLWRpc3RhbmNlICogMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSAqIDI7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVTbGlkZUxheWVyKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgdmFyIGRlcHRoID0gNDAwO1xuXG4gICAgICAgIHZhciB6SW5kZXggPSAtZGlzdGFuY2UgKyBkZXB0aCAvIDI7XG5cbiAgICAgICAgaWYgKHpJbmRleCA+IGRlcHRoIC8gMikge1xuICAgICAgICAgICAgcmV0dXJuIGRlcHRoIC0gekluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHpJbmRleDtcblxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICdyb3RhdGVZKCcgKyByb3RhdGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAnZGVnKScgK1xuICAgICAgICAndHJhbnNsYXRlWignICsgc2NhbGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAncHgpJztcblxuICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUuekluZGV4ID0gY2FsY3VsYXRlU2xpZGVMYXllcihjYWxjdWxhdGVEaXN0YW5jZShpKSk7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLnBlcnNwZWN0aXZlT3JpZ2luID0gc3RhdGUub2Zmc2V0IC8gc2xpZGVyXG5cbiAgICB9XG5cbiAgICAoZnVuY3Rpb24gY2hlY2tTbGlkZVN3aXRjaCgpIHtcblxuICAgICAgICBpZiAoc3RhdGUub2Zmc2V0ID49IGJyZWFrUG9pbnRzWzBdKSB7XG4gICAgICAgICAgICBzdGF0ZS5jdXJyZW50U2xpZGUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICAgICAgaWYgKHN0YXRlLm9mZnNldCA8PSBicmVha1BvaW50c1t5XSAmJiBzdGF0ZS5vZmZzZXQgPj0gYnJlYWtQb2ludHNbeSArIDFdKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuY3VycmVudFNsaWRlID0geTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLm9mZnNldCA8PSBicmVha1BvaW50c1ticmVha1BvaW50cy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgc3RhdGUuY3VycmVudFNsaWRlID0gc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cblxuICAgIH0pKCk7XG5cbn1cblxuZnVuY3Rpb24gc2V0T2Zmc2V0KG9mZnNldERpZmZlcmVuY2UpIHtcblxuICAgIHN0YXRlLm9mZnNldCArPSBvZmZzZXREaWZmZXJlbmNlO1xuICAgIHJlbmRlcigpO1xuXG59XG5cbnZhciB0aW1lcjtcbnZhciBnbG9iYWxTY3JvbGw7XG5cbmZ1bmN0aW9uIHNldFNsaWRlKHNsaWRlSWQsIGVuYWJsZVNjcm9sbCkge1xuXG4gICAgaWYgKGVuYWJsZVNjcm9sbCkge1xuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXG4gICAgICAgIHZhciBpID0gMDtcblxuICAgICAgICB2YXIgcG9zaXRpb25Pbk1vdXNlT3V0ID0gc3RhdGUub2Zmc2V0O1xuXG4gICAgICAgIHZhciBzbGlkZXNEaWZmZXJlbmNlID0gKHN0YXRlLmN1cnJlbnRTbGlkZSAtIHNsaWRlSWQpO1xuXG4gICAgICAgIGlmIChzbGlkZXNEaWZmZXJlbmNlIDwgMCkge1xuICAgICAgICAgICAgc2xpZGVzRGlmZmVyZW5jZSA9IC1zbGlkZXNEaWZmZXJlbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNsaWRlc0RpZmZlcmVuY2UgPT09IDApIHtcbiAgICAgICAgICAgIHNsaWRlc0RpZmZlcmVuY2UrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gTWF0aC5yb3VuZCgocG9zaXRpb25Pbk1vdXNlT3V0IC0gKGJyZWFrUG9pbnRzW3NsaWRlSWRdIC0gNzUpKSAvIHNsaWRlc0RpZmZlcmVuY2UpO1xuXG4gICAgICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBzZXRPZmZzZXQoIC1zbGlkZXNEaWZmZXJlbmNlICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICBzZXRPZmZzZXQoIHNsaWRlc0RpZmZlcmVuY2UgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGkgPT09IG9mZnNldCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIDE2KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldE9mZnNldCggKGJyZWFrUG9pbnRzW3NsaWRlSWRdIC0gNzUpIC0gc3RhdGUub2Zmc2V0ICk7XG4gICAgfVxuXG4gICAgc3RhdGUuY3VycmVudFNsaWRlID0gc2xpZGVJZDtcblxuICAgIGZvciAobGV0IHogPSAwOyB6IDwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuLmxlbmd0aDsgeisrKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5jbGFzc0xpc3QucmVtb3ZlKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5bc2xpZGVJZF0uY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJylcblxufVxuXG52YXIgb2xkQ2xpZW50WDtcblxuZnVuY3Rpb24gbW91c2VEb3duKGUpIHtcblxuICAgIG9sZENsaWVudFggPSBlLmNsaWVudFggfHwgZS50b3VjaGVzWzBdLmNsaWVudFg7XG5cbiAgICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcblxufVxuXG5mdW5jdGlvbiBtb3VzZU1vdmUoZSkge1xuXG4gICAgdmFyIG1vdXNlT2Zmc2V0ID0gKGUuY2xpZW50WCAtIG9sZENsaWVudFgpIC8gMi41O1xuXG4gICAgb2xkQ2xpZW50WCA9IGUuY2xpZW50WCB8fCBlLnRvdWNoZXNbMF0uY2xpZW50WDtcblxuICAgIHNldE9mZnNldChtb3VzZU9mZnNldCk7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VVcChlKSB7XG5cbiAgICBzZXRTbGlkZShzdGF0ZS5jdXJyZW50U2xpZGUsIHRydWUpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlTGVhdmUoZSkge1xuXG4gICAgLy8gSWYgbW91c2UgZG93blxuICAgIGlmIChlLndoaWNoID09PSAxKSB7XG4gICAgICAgIHNldFNsaWRlKHN0YXRlLmN1cnJlbnRTbGlkZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuXG59XG5cbi8vIFRPVUNIIFNVUFBPUlRcblxuZnVuY3Rpb24gdG91Y2hNb3ZlKGUpIHtcblxuICAgIHZhciBtb3VzZU9mZnNldCA9IChlLnRvdWNoZXNbMF0uY2xpZW50WCAtIG9sZENsaWVudFgpIC8gMi41O1xuXG4gICAgb2xkQ2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuXG4gICAgc2V0T2Zmc2V0KG1vdXNlT2Zmc2V0KTtcblxufVxuXG5mdW5jdGlvbiB0b3VjaEVuZChlKSB7XG5cbiAgICBzZXRTbGlkZShzdGF0ZS5jdXJyZW50U2xpZGUsIHRydWUpO1xuXG59XG5cbnNldFNsaWRlKDMsIGZhbHNlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIG1vdXNlTGVhdmUpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZURvd24pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoRW5kKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hNb3ZlKTtcbiIsInZhciBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICBzdGFyLnN0eWxlLmNvbG9yID0gJyM2OTRFMDAnO1xuICAgIHN0YXIuc3R5bGUuZm9udFNpemUgPSAnMTlweCc7XG4gICAgc3Rhci5pbm5lckhUTUwgPSAnc3Rhcic7XG5cbnZhciBhbGxSYXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JhdGUnKTtcblxucmF0ZSA9IGFsbFJhdGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1yYXRlJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgYWxsUmF0ZXNbMF0uYXBwZW5kQ2hpbGQoc3Rhci5jbG9uZU5vZGUodHJ1ZSkpO1xufVxuXG5mb3IgKHZhciB5ID0gMDsgeSA8IHJhdGU7IHkrKykge1xuICAgIGFsbFJhdGVzWzBdLmNoaWxkcmVuW3ldLnN0eWxlLmNvbG9yID0gJyNGRkMxMDcnO1xufVxuIiwidmFyIHN0YXJ0QW5pbWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3RhcnRBbmltYXRpb24uaWQgPSAnc3RhcnRBbmltYXRpb24nO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKS5hcHBlbmRDaGlsZChzdGFydEFuaW1hdGlvbik7XG5cbnZhciBiYWNrZ3JvdW5kQW5pbWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmFja2dyb3VuZEFuaW1hdGlvbi5pZCA9ICdiYWNrZ3JvdW5kQW5pbWF0aW9uJztcbiAgICBzdGFydEFuaW1hdGlvbi5hcHBlbmRDaGlsZChiYWNrZ3JvdW5kQW5pbWF0aW9uKTtcblxudmFyIGxvZ29BbmltYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsb2dvQW5pbWF0aW9uLmlkID0gJ2xvZ29BbmltYXRpb24nO1xuICAgIGxvZ29BbmltYXRpb24uY2xhc3NMaXN0LmFkZCgnYmFubmVyX19sb2dvJyk7XG4gICAgYmFja2dyb3VuZEFuaW1hdGlvbi5hcHBlbmRDaGlsZChsb2dvQW5pbWF0aW9uKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcblxuICAgIHZhciBwcmV2aWV3SW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gaW1hZ2VzW2ldO1xuICAgIHByZXZpZXdJbWFnZS5jbGFzc0xpc3QuYWRkKCdwcmV2aWV3Jyk7XG5cbiAgICBzdGFydEFuaW1hdGlvbi5hcHBlbmRDaGlsZChwcmV2aWV3SW1hZ2UpO1xuXG59XG5cbnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0QW5pbWF0aW9uJykucmVtb3ZlKCk7XG5cbn0sIDU1MDApO1xuIl19
