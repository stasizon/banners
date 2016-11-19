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
        
        setSlide(3, false);
        checkCurrentSlide();
        
        document.getElementById('gallery').addEventListener('mousedown', mouseDown);
        document.getElementById('gallery').addEventListener('mouseup', mouseUp);
        document.getElementById('banner').addEventListener('mouseleave', mouseLeave);
        
        // document.getElementById('gallery').addEventListener('touchstart', mousedown);
        // document.getElementById('gallery').addEventListener('touchend', toFixedPosition);
        // document.getElementById('gallery').addEventListener('touchmove', touchmove);
        // document.getElementById('gallery').addEventListener('touchstart', touchstart);
        

    },

    setRate: function() {

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
        

    },

    initAnimation: function(images) {

        for (var i = 0; i < images.length; i++) {
        
            var previewImage = document.createElement('img');
            previewImage.src = images[i];
            previewImage.classList.add('preview');
        
            document.getElementById('startAnimation').appendChild(previewImage);
        
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvYW5pbWF0aW9uL2FuaW1hdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtRQ0hBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtBRHhUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1FFVEE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtBRkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7UUdmQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtBSEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hZEtlcm5lbEJhbm5lciA9IHtcblxuICAgIGluaXRHYWxsZXJ5OiBmdW5jdGlvbihzbGlkZXMsIHBhcmVudCkge1xuXG4gICAgICAgIC8vPXJlcXVpcmUgYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qc1xuXG4gICAgfSxcblxuICAgIHNldFJhdGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8vPXJlcXVpcmUgYmxvY2tzL3JhdGUvcmF0ZS5qc1xuXG4gICAgfSxcblxuICAgIGluaXRBbmltYXRpb246IGZ1bmN0aW9uKGltYWdlcykge1xuXG4gICAgICAgIC8vPXJlcXVpcmUgYmxvY2tzL2FuaW1hdGlvbi9hbmltYXRpb24uanNcblxuICAgIH1cblxufTtcblxudmFyIGltYWdlQXJyYXkgPSBbXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2guanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC0yLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMy5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTQuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC01LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNi5qcGcnXG4gICAgICAgICAgICAgICAgIF07XG5cbl9fYWRLZXJuZWxCYW5uZXIuaW5pdEFuaW1hdGlvbihbJy4vaW1nL3Vuc3BsYXNoLmpwZycsICcuL2ltZy91bnNwbGFzaC0yLmpwZycsICcuL2ltZy91bnNwbGFzaC0zLmpwZyddKTtcblxuX19hZEtlcm5lbEJhbm5lci5pbml0R2FsbGVyeShpbWFnZUFycmF5LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJykpO1xuXG5fX2FkS2VybmVsQmFubmVyLnNldFJhdGUoKTtcbiIsInZhciBzbGlkZXIgPSBwYXJlbnQ7XG5cbihmdW5jdGlvbiBhZGRTbGlkZXMoKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBzbGlkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnlfX2l0ZW0nKTtcbiAgICAgICAgc2xpZGUuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoJyArIHNsaWRlc1tpXSArICcpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb3Zlcic7XG5cbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICB9XG5cbn0pKCk7XG5cbmZ1bmN0aW9uIGdldEJyZWFrUG9pbnRzKCkge1xuXG4gICAgdmFyIHBvaW50cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9pbnRzW2ldID0gLTE1MCAqIGkgKyAxOTA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50cztcblxufVxuXG52YXIgYnJlYWtQb2ludHMgPSBnZXRCcmVha1BvaW50cygpO1xuXG4oZnVuY3Rpb24gaW5pdENvbnRyb2xsZXJzKCkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgY29udHJvbGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250cm9sbGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXJfX2l0ZW0nKTtcbiAgICAgICAgY29udHJvbGxlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtbnVtYmVyJywgaSk7XG5cbiAgICAgICAgY29udHJvbGxlci5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICB2YXIgc2xpZGVOdW1iZXIgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbnVtYmVyJyk7XG5cbiAgICAgICAgICAgIHNldFNsaWRlKHNsaWRlTnVtYmVyLCB0cnVlKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIpO1xuXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoID0gc2xpZGVzLmxlbmd0aCAqIDI1ICsgJ3B4JztcblxufSkoKTtcblxudmFyIHNsaWRlV2lkdGggPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpLmNoaWxkcmVuWzBdKS53aWR0aCk7XG5cbnZhciBnZXRTbGlkZXJPZmZzZXQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzbGlkZXIuc3R5bGUubGVmdCk7XG59XG5cbnZhciBmaXJzdENsaWNrUG9zaXRpb24gPSAwO1xudmFyIGxhc3RDbGlja1Bvc2l0aW9uID0gMDtcblxuZnVuY3Rpb24gY2FsY3VsYXRlVHJhbnNmb3JtKCkge1xuXG4gICAgdmFyIGNhbGN1bGF0ZURpc3RhbmNlID0gZnVuY3Rpb24oc2xpZGVOdW1iZXIpIHtcblxuICAgICAgICByZXR1cm4gc2xpZGVyLmNoaWxkcmVuW3NsaWRlTnVtYmVyXS5vZmZzZXRQYXJlbnQub2Zmc2V0TGVmdCArICgoc2xpZGVXaWR0aCAtIDEwMCkgKiBzbGlkZU51bWJlcikgLSAxMTU7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByb3RhdGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgIHZhciBkZWcgPSAtZGlzdGFuY2UgLyA1O1xuXG4gICAgICAgIGlmIChkZWcgPCAtNDApIHtcbiAgICAgICAgICAgIHJldHVybiAtNDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVnID4gLTQwICYmIGRlZyA8IDQwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZyA+IDQwKSB7XG4gICAgICAgICAgICByZXR1cm4gNDA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYWxlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICBpZiAoZGlzdGFuY2UgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLWRpc3RhbmNlICogMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSAqIDI7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVTbGlkZUxheWVyKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgdmFyIGRlcHRoID0gNDAwO1xuXG4gICAgICAgIHZhciB6SW5kZXggPSAtZGlzdGFuY2UgKyBkZXB0aCAvIDI7XG5cbiAgICAgICAgaWYgKHpJbmRleCA+IGRlcHRoIC8gMikge1xuICAgICAgICAgICAgcmV0dXJuIGRlcHRoIC0gekluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHpJbmRleDtcblxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICdyb3RhdGVZKCcgKyByb3RhdGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAnZGVnKScgK1xuICAgICAgICAndHJhbnNsYXRlWignICsgc2NhbGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAncHgpJztcblxuICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUuekluZGV4ID0gY2FsY3VsYXRlU2xpZGVMYXllcihjYWxjdWxhdGVEaXN0YW5jZShpKSk7XG5cbiAgICB9XG5cblxufVxuXG5mdW5jdGlvbiBjaGVja0N1cnJlbnRTbGlkZSgpIHtcblxuICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA+PSBicmVha1BvaW50c1swXSkge1xuICAgICAgICBzZXRTbGlkZSgwLCB0cnVlKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IHkrKykge1xuXG4gICAgICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8PSBicmVha1BvaW50c1t5XSAmJiBnZXRTbGlkZXJPZmZzZXQoKSA+PSBicmVha1BvaW50c1t5ICsgMV0pIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW4ubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5bel0uY2xhc3NMaXN0LnJlbW92ZSgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt5XS5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKVxuXG4gICAgICAgICAgICBzZXRTbGlkZSh5LCB0cnVlKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPD0gYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0pIHtcblxuICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3pdLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGggLSAxXS5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKVxuXG4gICAgICAgIHNldFNsaWRlKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLSAxLCB0cnVlKTtcblxuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRTbGlkZSgpIHtcblxuICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA+PSBicmVha1BvaW50c1swXSkge1xuXG4gICAgICAgIGxhc3RDbGlja1Bvc2l0aW9uID0gMjg1O1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IHkrKykge1xuXG4gICAgICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8PSBicmVha1BvaW50c1t5XSAmJiBnZXRTbGlkZXJPZmZzZXQoKSA+PSBicmVha1BvaW50c1t5ICsgMV0pIHtcblxuICAgICAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSAtOTAgLSAoMzc1ICogKHkgLSAxKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB5O1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8PSBicmVha1BvaW50c1ticmVha1BvaW50cy5sZW5ndGggLSAxXSkge1xuXG4gICAgICAgIGxhc3RDbGlja1Bvc2l0aW9uID0gLTkwIC0gKDM3NSAqIChicmVha1BvaW50cy5sZW5ndGggLSAyKSk7XG5cbiAgICAgICAgcmV0dXJuIHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLSAxO1xuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHNldE9mZnNldChvZmZzZXQpIHtcblxuICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gb2Zmc2V0ICsgJ3B4JztcblxuICAgIGdldEN1cnJlbnRTbGlkZSgpO1xuXG4gICAgY2FsY3VsYXRlVHJhbnNmb3JtKCk7XG5cbn1cblxudmFyIHRpbWVyO1xudmFyIGdsb2JhbFNjcm9sbDtcblxuZnVuY3Rpb24gc2V0U2xpZGUoc2xpZGVJZCwgZW5hYmxlU2Nyb2xsKSB7XG5cbiAgICBpZiAoZW5hYmxlU2Nyb2xsKSB7XG5cbiAgICAgICAgZ2xvYmFsU2Nyb2xsID0gZW5hYmxlU2Nyb2xsO1xuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXG4gICAgICAgIGxldCBpID0gMDtcblxuICAgICAgICBsZXQgcG9zaXRpb25Pbk1vdXNlT3V0ID0gZ2V0U2xpZGVyT2Zmc2V0KCk7XG5cbiAgICAgICAgbGV0IHNsaWRlc0RpZmZlcmVuY2UgPSAoZ2V0Q3VycmVudFNsaWRlKCkgLSBzbGlkZUlkKSAqIDI7XG5cbiAgICAgICAgaWYgKHNsaWRlc0RpZmZlcmVuY2UgPCAwKSB7XG4gICAgICAgICAgICBzbGlkZXNEaWZmZXJlbmNlID0gLXNsaWRlc0RpZmZlcmVuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2xpZGVzRGlmZmVyZW5jZSA9PT0gMCkge1xuICAgICAgICAgICAgc2xpZGVzRGlmZmVyZW5jZSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBNYXRoLnJvdW5kKChwb3NpdGlvbk9uTW91c2VPdXQgLSAoYnJlYWtQb2ludHNbc2xpZGVJZF0gLSA3NSkpIC8gKHNsaWRlc0RpZmZlcmVuY2UpKTtcblxuICAgICAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgc2V0T2Zmc2V0KCBnZXRTbGlkZXJPZmZzZXQoKSAtIHNsaWRlc0RpZmZlcmVuY2UgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgIHNldE9mZnNldCggZ2V0U2xpZGVyT2Zmc2V0KCkgKyBzbGlkZXNEaWZmZXJlbmNlICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpID09PSBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxTY3JvbGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuLmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5jbGFzc0xpc3QucmVtb3ZlKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5bc2xpZGVJZF0uY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCA0KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWYgKHNsaWRlSWQgPT09IDApIHtcbiAgICAgICAgICAgIGxhc3RDbGlja1Bvc2l0aW9uID0gMjg1O1xuICAgICAgICAgICAgc2V0T2Zmc2V0KCBicmVha1BvaW50c1swXSAtIDc1ICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IC05MCAtICgzNzUgKiAoc2xpZGVJZCAtIDEpKTtcbiAgICAgICAgICAgIHNldE9mZnNldCggYnJlYWtQb2ludHNbc2xpZGVJZF0gLSA3NSApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gbW91c2VEb3duKGUpIHtcblxuICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUuY2xpZW50WCAtIGxhc3RDbGlja1Bvc2l0aW9uO1xuXG4gICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cbiAgICBzZXRTbGlkZShnZXRDdXJyZW50U2xpZGUoKSk7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VNb3ZlKGUpIHtcblxuICAgIHZhciBvZmZzZXQgPSBNYXRoLmNlaWwoKGUuY2xpZW50WCAtIGZpcnN0Q2xpY2tQb3NpdGlvbikgLyAyLjUpO1xuXG4gICAgc2V0T2Zmc2V0KG9mZnNldCk7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VVcChlKSB7XG5cbiAgICBjaGVja0N1cnJlbnRTbGlkZSgpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlTGVhdmUoZSkge1xuXG4gICAgaWYgKGUud2hpY2ggPT09IDEpIHtcbiAgICAgICAgY2hlY2tDdXJyZW50U2xpZGUoKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG5cbn1cblxuc2V0U2xpZGUoMywgZmFsc2UpO1xuY2hlY2tDdXJyZW50U2xpZGUoKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIG1vdXNlTGVhdmUpO1xuXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZWRvd24pO1xuLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvRml4ZWRQb3NpdGlvbik7XG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZSk7XG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0KTtcbiIsInZhciBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICBzdGFyLnN0eWxlLmNvbG9yID0gJyM2OTRFMDAnO1xuICAgIHN0YXIuaW5uZXJIVE1MID0gJ3N0YXInO1xuXG52YXIgYWxsUmF0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyYXRlJyk7XG5cbnJhdGUgPSBhbGxSYXRlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmF0ZScpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgIGFsbFJhdGVzWzBdLmFwcGVuZENoaWxkKHN0YXIuY2xvbmVOb2RlKHRydWUpKTtcbn1cblxuZm9yICh2YXIgeSA9IDA7IHkgPCByYXRlOyB5KyspIHtcbiAgICBhbGxSYXRlc1swXS5jaGlsZHJlblt5XS5zdHlsZS5jb2xvciA9ICcjRkZDMTA3Jztcbn1cbiIsImZvciAodmFyIGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICB2YXIgcHJldmlld0ltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgcHJldmlld0ltYWdlLnNyYyA9IGltYWdlc1tpXTtcbiAgICBwcmV2aWV3SW1hZ2UuY2xhc3NMaXN0LmFkZCgncHJldmlldycpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0QW5pbWF0aW9uJykuYXBwZW5kQ2hpbGQocHJldmlld0ltYWdlKTtcblxufVxuXG5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydEFuaW1hdGlvbicpLnJlbW92ZSgpO1xuXG59LCA1NTAwKTtcbiJdfQ==
