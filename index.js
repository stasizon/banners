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

__adKernelBanner.initAnimation(['./img/unsplash.jpg', './img/unsplash-2.jpg', './img/unsplash-3.jpg']);

__adKernelBanner.initGallery(imageArray, document.getElementById('slider'));

__adKernelBanner.setRate();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvYW5pbWF0aW9uL2FuaW1hdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtRQ0hBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtBRGhWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1FFVEE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FGTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtRR2ZBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7QUhYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYWRLZXJuZWxCYW5uZXIgPSB7XG5cbiAgICBpbml0R2FsbGVyeTogZnVuY3Rpb24oc2xpZGVzLCBwYXJlbnQpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9nYWxsZXJ5L2dhbGxlcnkuanNcblxuICAgIH0sXG5cbiAgICBzZXRSYXRlOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9yYXRlL3JhdGUuanNcblxuICAgIH0sXG5cbiAgICBpbml0QW5pbWF0aW9uOiBmdW5jdGlvbihpbWFnZXMpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9hbmltYXRpb24vYW5pbWF0aW9uLmpzXG5cbiAgICB9XG5cbn07XG5cbnZhciBpbWFnZUFycmF5ID0gW1xuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC00LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNS5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTYuanBnJ1xuICAgICAgICAgICAgICAgICBdO1xuXG5fX2FkS2VybmVsQmFubmVyLmluaXRBbmltYXRpb24oWycuL2ltZy91bnNwbGFzaC5qcGcnLCAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLCAnLi9pbWcvdW5zcGxhc2gtMy5qcGcnXSk7XG5cbl9fYWRLZXJuZWxCYW5uZXIuaW5pdEdhbGxlcnkoaW1hZ2VBcnJheSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpKTtcblxuX19hZEtlcm5lbEJhbm5lci5zZXRSYXRlKCk7XG4iLCJ2YXIgc2xpZGVyID0gcGFyZW50O1xuXG4oZnVuY3Rpb24gYWRkU2xpZGVzKCkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgc2xpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJyk7XG4gICAgICAgIHNsaWRlLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKCcgKyBzbGlkZXNbaV0gKyAnKSBuby1yZXBlYXQgY2VudGVyIC8gY292ZXInO1xuXG4gICAgICAgIHNsaWRlci5hcHBlbmRDaGlsZChzbGlkZSk7XG4gICAgfVxuXG59KSgpO1xuXG5mdW5jdGlvbiBnZXRCcmVha1BvaW50cygpIHtcblxuICAgIHZhciBwb2ludHMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBvaW50c1tpXSA9IC0xNTAgKiBpICsgMTkwO1xuICAgIH1cblxuICAgIHJldHVybiBwb2ludHM7XG5cbn1cblxudmFyIGJyZWFrUG9pbnRzID0gZ2V0QnJlYWtQb2ludHMoKTtcblxuKGZ1bmN0aW9uIGluaXRDb250cm9sbGVycygpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udHJvbGxlci5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtJyk7XG4gICAgICAgIGNvbnRyb2xsZXIuc2V0QXR0cmlidXRlKCdkYXRhLW51bWJlcicsIGkpO1xuXG4gICAgICAgIGNvbnRyb2xsZXIub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgdmFyIHNsaWRlTnVtYmVyID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW51bWJlcicpO1xuXG4gICAgICAgICAgICBzZXRTbGlkZShzbGlkZU51bWJlciwgdHJ1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5hcHBlbmRDaGlsZChjb250cm9sbGVyKTtcblxuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5zdHlsZS53aWR0aCA9IHNsaWRlcy5sZW5ndGggKiAyNSArICdweCc7XG5cbn0pKCk7XG5cbnZhciBzbGlkZVdpZHRoID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKS5jaGlsZHJlblswXSkud2lkdGgpO1xuXG52YXIgZ2V0U2xpZGVyT2Zmc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc2xpZGVyLnN0eWxlLmxlZnQpO1xufVxuXG52YXIgZmlyc3RDbGlja1Bvc2l0aW9uID0gMDtcbnZhciBsYXN0Q2xpY2tQb3NpdGlvbiA9IDA7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVRyYW5zZm9ybSgpIHtcblxuICAgIHZhciBjYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uKHNsaWRlTnVtYmVyKSB7XG5cbiAgICAgICAgcmV0dXJuIHNsaWRlci5jaGlsZHJlbltzbGlkZU51bWJlcl0ub2Zmc2V0UGFyZW50Lm9mZnNldExlZnQgKyAoKHNsaWRlV2lkdGggLSAxMDApICogc2xpZGVOdW1iZXIpIC0gMTE1O1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcm90YXRlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICB2YXIgZGVnID0gLWRpc3RhbmNlIC8gNTtcblxuICAgICAgICBpZiAoZGVnIDwgLTQwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTQwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZyA+IC00MCAmJiBkZWcgPCA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWcgPiA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIDQwO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FsZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC1kaXN0YW5jZSAqIDI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzdGFuY2UgKiAyO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlU2xpZGVMYXllcihkaXN0YW5jZSkge1xuXG4gICAgICAgIHZhciBkZXB0aCA9IDQwMDtcblxuICAgICAgICB2YXIgekluZGV4ID0gLWRpc3RhbmNlICsgZGVwdGggLyAyO1xuXG4gICAgICAgIGlmICh6SW5kZXggPiBkZXB0aCAvIDIpIHtcbiAgICAgICAgICAgIHJldHVybiBkZXB0aCAtIHpJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB6SW5kZXg7XG5cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICAncm90YXRlWSgnICsgcm90YXRlU2xpZGUoY2FsY3VsYXRlRGlzdGFuY2UoaSkpICsgJ2RlZyknICtcbiAgICAgICAgJ3RyYW5zbGF0ZVooJyArIHNjYWxlU2xpZGUoY2FsY3VsYXRlRGlzdGFuY2UoaSkpICsgJ3B4KSc7XG5cbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnpJbmRleCA9IGNhbGN1bGF0ZVNsaWRlTGF5ZXIoY2FsY3VsYXRlRGlzdGFuY2UoaSkpO1xuXG4gICAgfVxuXG5cbn1cblxuZnVuY3Rpb24gY2hlY2tDdXJyZW50U2xpZGUoKSB7XG5cbiAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPj0gYnJlYWtQb2ludHNbMF0pIHtcbiAgICAgICAgc2V0U2xpZGUoMCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPD0gYnJlYWtQb2ludHNbeV0gJiYgZ2V0U2xpZGVyT2Zmc2V0KCkgPj0gYnJlYWtQb2ludHNbeSArIDFdKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuLmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3pdLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5beV0uY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJylcblxuICAgICAgICAgICAgc2V0U2xpZGUoeSwgdHJ1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDw9IGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdKSB7XG5cbiAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW4ubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5jbGFzc0xpc3QucmVtb3ZlKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbltkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW4ubGVuZ3RoIC0gMV0uY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJylcblxuICAgICAgICBzZXRTbGlkZShzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMSwgdHJ1ZSk7XG5cbiAgICB9XG5cblxufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50U2xpZGUoKSB7XG5cbiAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPj0gYnJlYWtQb2ludHNbMF0pIHtcblxuICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IDI4NTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPD0gYnJlYWtQb2ludHNbeV0gJiYgZ2V0U2xpZGVyT2Zmc2V0KCkgPj0gYnJlYWtQb2ludHNbeSArIDFdKSB7XG5cbiAgICAgICAgICAgIGxhc3RDbGlja1Bvc2l0aW9uID0gLTkwIC0gKDM3NSAqICh5IC0gMSkpO1xuXG4gICAgICAgICAgICByZXR1cm4geTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPD0gYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0pIHtcblxuICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IC05MCAtICgzNzUgKiAoYnJlYWtQb2ludHMubGVuZ3RoIC0gMikpO1xuXG4gICAgICAgIHJldHVybiBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBzZXRPZmZzZXQob2Zmc2V0KSB7XG5cbiAgICBzbGlkZXIuc3R5bGUubGVmdCA9IG9mZnNldCArICdweCc7XG5cbiAgICBnZXRDdXJyZW50U2xpZGUoKTtcblxuICAgIGNhbGN1bGF0ZVRyYW5zZm9ybSgpO1xuXG59XG5cbnZhciB0aW1lcjtcbnZhciBnbG9iYWxTY3JvbGw7XG5cbmZ1bmN0aW9uIHNldFNsaWRlKHNsaWRlSWQsIGVuYWJsZVNjcm9sbCkge1xuXG4gICAgaWYgKGVuYWJsZVNjcm9sbCkge1xuXG4gICAgICAgIGdsb2JhbFNjcm9sbCA9IGVuYWJsZVNjcm9sbDtcblxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAgICAgICBsZXQgaSA9IDA7XG5cbiAgICAgICAgbGV0IHBvc2l0aW9uT25Nb3VzZU91dCA9IGdldFNsaWRlck9mZnNldCgpO1xuXG4gICAgICAgIGxldCBzbGlkZXNEaWZmZXJlbmNlID0gKGdldEN1cnJlbnRTbGlkZSgpIC0gc2xpZGVJZCkgKiAyO1xuXG4gICAgICAgIGlmIChzbGlkZXNEaWZmZXJlbmNlIDwgMCkge1xuICAgICAgICAgICAgc2xpZGVzRGlmZmVyZW5jZSA9IC1zbGlkZXNEaWZmZXJlbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNsaWRlc0RpZmZlcmVuY2UgPT09IDApIHtcbiAgICAgICAgICAgIHNsaWRlc0RpZmZlcmVuY2UrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gTWF0aC5yb3VuZCgocG9zaXRpb25Pbk1vdXNlT3V0IC0gKGJyZWFrUG9pbnRzW3NsaWRlSWRdIC0gNzUpKSAvIChzbGlkZXNEaWZmZXJlbmNlKSk7XG5cbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHNldE9mZnNldCggZ2V0U2xpZGVyT2Zmc2V0KCkgLSBzbGlkZXNEaWZmZXJlbmNlICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICBzZXRPZmZzZXQoIGdldFNsaWRlck9mZnNldCgpICsgc2xpZGVzRGlmZmVyZW5jZSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaSA9PT0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5bel0uY2xhc3NMaXN0LnJlbW92ZSgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3NsaWRlSWRdLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgNCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlmIChzbGlkZUlkID09PSAwKSB7XG4gICAgICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IDI4NTtcbiAgICAgICAgICAgIHNldE9mZnNldCggYnJlYWtQb2ludHNbMF0gLSA3NSApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSAtOTAgLSAoMzc1ICogKHNsaWRlSWQgLSAxKSk7XG4gICAgICAgICAgICBzZXRPZmZzZXQoIGJyZWFrUG9pbnRzW3NsaWRlSWRdIC0gNzUgKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG1vdXNlRG93bihlKSB7XG5cbiAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFggLSBsYXN0Q2xpY2tQb3NpdGlvbjtcblxuICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXG4gICAgc2V0U2xpZGUoZ2V0Q3VycmVudFNsaWRlKCkpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZShlKSB7XG5cbiAgICB2YXIgb2Zmc2V0ID0gTWF0aC5jZWlsKChlLmNsaWVudFggLSBmaXJzdENsaWNrUG9zaXRpb24pIC8gMi41KTtcblxuICAgIHNldE9mZnNldChvZmZzZXQpO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlVXAoZSkge1xuXG4gICAgY2hlY2tDdXJyZW50U2xpZGUoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VMZWF2ZShlKSB7XG5cbiAgICBpZiAoZS53aGljaCA9PT0gMSkge1xuICAgICAgICBjaGVja0N1cnJlbnRTbGlkZSgpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcblxufVxuXG4vLyBUT1VDSCBTVVBQT1JUXG5cbmZ1bmN0aW9uIHRvdWNoU3RhcnQoZSkge1xuXG4gICAgZmlyc3RDbGlja1Bvc2l0aW9uID0gZS50b3VjaGVzWzBdLmNsaWVudFggLSBsYXN0Q2xpY2tQb3NpdGlvbjtcbiAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICBzZXRTbGlkZShnZXRDdXJyZW50U2xpZGUoKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn1cblxuZnVuY3Rpb24gdG91Y2hNb3ZlKGUpIHtcblxuICAgIHZhciBvZmZzZXQgPSBNYXRoLmNlaWwoKGUudG91Y2hlc1swXS5jbGllbnRYIC0gZmlyc3RDbGlja1Bvc2l0aW9uKSAvIDIuNSk7XG5cbiAgICBzZXRPZmZzZXQob2Zmc2V0KTtcblxufVxuXG5mdW5jdGlvbiB0b3VjaEVuZChlKSB7XG5cbiAgICBjaGVja0N1cnJlbnRTbGlkZSgpO1xuXG59XG5cbnNldFNsaWRlKDMsIGZhbHNlKTtcbmNoZWNrQ3VycmVudFNsaWRlKCk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhbm5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBtb3VzZUxlYXZlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmQpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmUpO1xuIiwidmFyIHN0YXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgIHN0YXIuc3R5bGUuY29sb3IgPSAnIzY5NEUwMCc7XG4gICAgc3Rhci5zdHlsZS5mb250U2l6ZSA9ICcxOXB4JztcbiAgICBzdGFyLmlubmVySFRNTCA9ICdzdGFyJztcblxudmFyIGFsbFJhdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmF0ZScpO1xuXG5yYXRlID0gYWxsUmF0ZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXJhdGUnKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICBhbGxSYXRlc1swXS5hcHBlbmRDaGlsZChzdGFyLmNsb25lTm9kZSh0cnVlKSk7XG59XG5cbmZvciAodmFyIHkgPSAwOyB5IDwgcmF0ZTsgeSsrKSB7XG4gICAgYWxsUmF0ZXNbMF0uY2hpbGRyZW5beV0uc3R5bGUuY29sb3IgPSAnI0ZGQzEwNyc7XG59XG4iLCJ2YXIgc3RhcnRBbmltYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzdGFydEFuaW1hdGlvbi5pZCA9ICdzdGFydEFuaW1hdGlvbic7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhbm5lcicpLmFwcGVuZENoaWxkKHN0YXJ0QW5pbWF0aW9uKTtcblxudmFyIGJhY2tncm91bmRBbmltYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBiYWNrZ3JvdW5kQW5pbWF0aW9uLmlkID0gJ2JhY2tncm91bmRBbmltYXRpb24nO1xuICAgIHN0YXJ0QW5pbWF0aW9uLmFwcGVuZENoaWxkKGJhY2tncm91bmRBbmltYXRpb24pO1xuXG52YXIgbG9nb0FuaW1hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxvZ29BbmltYXRpb24uaWQgPSAnbG9nb0FuaW1hdGlvbic7XG4gICAgbG9nb0FuaW1hdGlvbi5jbGFzc0xpc3QuYWRkKCdiYW5uZXJfX2xvZ28nKTtcbiAgICBiYWNrZ3JvdW5kQW5pbWF0aW9uLmFwcGVuZENoaWxkKGxvZ29BbmltYXRpb24pO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgdmFyIHByZXZpZXdJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHByZXZpZXdJbWFnZS5zcmMgPSBpbWFnZXNbaV07XG4gICAgcHJldmlld0ltYWdlLmNsYXNzTGlzdC5hZGQoJ3ByZXZpZXcnKTtcblxuICAgIHN0YXJ0QW5pbWF0aW9uLmFwcGVuZENoaWxkKHByZXZpZXdJbWFnZSk7XG5cbn1cblxuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRBbmltYXRpb24nKS5yZW1vdmUoKTtcblxufSwgNTUwMCk7XG4iXX0=
