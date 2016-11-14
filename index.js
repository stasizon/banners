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
        
            if (getSliderOffset() > breakPoints[0]) {
                setSlide(0, true);
            }
        
            for (var y = 0; y < slider.children.length; y++) {
        
                if (getSliderOffset() < breakPoints[y] && getSliderOffset() > breakPoints[y + 1]) {
        
                    for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                        document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                    }
        
                    document.getElementById('controlerContainer').children[y].classList.add('controller__item--active')
        
                    setSlide(y, true);
        
                }
        
            }
        
            if (getSliderOffset() < breakPoints[breakPoints.length - 1]) {
        
                for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                    document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                }
        
                document.getElementById('controlerContainer').children[document.getElementById('controlerContainer').children.length - 1].classList.add('controller__item--active')
        
                setSlide(slider.children.length - 1, true);
        
            }
        
        
        }
        
        function setOffset(offset) {
        
            slider.style.left = offset + 'px';
        
            calculateTransform();
        
        }
        
        var timer;
        
        function setSlide(slideId, enableScroll) {
        
            if (enableScroll) {
        
                let i = 0;
        
                let positionOnMouseOut = getSliderOffset();
        
                timer = setInterval(function () {
        
                    let offset = Math.round((positionOnMouseOut - (breakPoints[slideId] - 75)) / 5);
        
                    if (offset > 0) {
                        i++;
                        setOffset( getSliderOffset() - 5 );
                    } else if(offset < 0) {
                        i--;
                        setOffset( getSliderOffset() + 5 );
                    }
        
                    if (i === offset) {
                        clearInterval(timer);
                        lastClickPosition = -90 - (375 * (slideId - 1));
                        for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                            document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                        }
        
                        document.getElementById('controlerContainer').children[slideId].classList.add('controller__item--active')
                    }
        
                }, 4);
        
            } else {
        
                if (slideId === 0) {
                    setOffset( breakPoints[0] - 75 );
                    lastClickPosition = 285;
                } else {
                    setOffset( breakPoints[slideId] - 75 );
                    lastClickPosition = -90 - (375 * (slideId - 1));
                }
        
            }
        
        }
        
        function mouseDown(e) {
        
            firstClickPosition = e.clientX - lastClickPosition;
        
            clearInterval(timer);
            checkCurrentSlide();
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
        
            clearInterval(timer);
            checkCurrentSlide();
        
            document.getElementById('gallery').removeEventListener('mousemove', mouseMove);
        
        }
        
        setSlide(3, false);
        
        document.getElementById('gallery').addEventListener('mousedown', mouseDown);
        document.getElementById('gallery').addEventListener('mouseup', mouseUp);
        document.getElementById('banner').addEventListener('mouseleave', mouseLeave);
        
        // document.getElementById('gallery').addEventListener('touchstart', mousedown);
        // document.getElementById('gallery').addEventListener('touchend', toFixedPosition);
        // document.getElementById('gallery').addEventListener('touchmove', touchmove);
        // document.getElementById('gallery').addEventListener('touchstart', touchstart);
        

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7UUNIQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7QURyUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtRRVRBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7QUZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hZEtlcm5lbEJhbm5lciA9IHtcblxuICAgIGluaXRHYWxsZXJ5OiBmdW5jdGlvbihzbGlkZXMsIHBhcmVudCkge1xuXG4gICAgICAgIC8vPXJlcXVpcmUgYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qc1xuXG4gICAgfSxcblxuICAgIHNldFJhdGU6IGZ1bmN0aW9uIGZ1bmN0aW9uTmFtZSgpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9yYXRlL3JhdGUuanNcblxuICAgIH1cblxufTtcblxudmFyIGltYWdlQXJyYXkgPSBbXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2guanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC0yLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMy5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTQuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC01LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNi5qcGcnXG4gICAgICAgICAgICAgICAgIF07XG5cbl9fYWRLZXJuZWxCYW5uZXIuaW5pdEdhbGxlcnkoaW1hZ2VBcnJheSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpKTtcblxuX19hZEtlcm5lbEJhbm5lci5zZXRSYXRlKCk7XG4iLCJ2YXIgc2xpZGVyID0gcGFyZW50O1xuXG4oZnVuY3Rpb24gYWRkU2xpZGVzKCkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgc2xpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJyk7XG4gICAgICAgIHNsaWRlLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKCcgKyBzbGlkZXNbaV0gKyAnKSBuby1yZXBlYXQgY2VudGVyIC8gY292ZXInO1xuXG4gICAgICAgIHNsaWRlci5hcHBlbmRDaGlsZChzbGlkZSk7XG4gICAgfVxuXG59KSgpO1xuXG5mdW5jdGlvbiBnZXRCcmVha1BvaW50cygpIHtcblxuICAgIHZhciBwb2ludHMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBvaW50c1tpXSA9IC0xNTAgKiBpICsgMTkwO1xuICAgIH1cblxuICAgIHJldHVybiBwb2ludHM7XG5cbn1cblxudmFyIGJyZWFrUG9pbnRzID0gZ2V0QnJlYWtQb2ludHMoKTtcblxuKGZ1bmN0aW9uIGluaXRDb250cm9sbGVycygpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udHJvbGxlci5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtJyk7XG4gICAgICAgIGNvbnRyb2xsZXIuc2V0QXR0cmlidXRlKCdkYXRhLW51bWJlcicsIGkpO1xuXG4gICAgICAgIGNvbnRyb2xsZXIub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgdmFyIHNsaWRlTnVtYmVyID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW51bWJlcicpO1xuXG4gICAgICAgICAgICBzZXRTbGlkZShzbGlkZU51bWJlciwgdHJ1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5hcHBlbmRDaGlsZChjb250cm9sbGVyKTtcblxuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5zdHlsZS53aWR0aCA9IHNsaWRlcy5sZW5ndGggKiAyNSArICdweCc7XG5cbn0pKCk7XG5cbnZhciBzbGlkZVdpZHRoID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKS5jaGlsZHJlblswXSkud2lkdGgpO1xuXG52YXIgZ2V0U2xpZGVyT2Zmc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc2xpZGVyLnN0eWxlLmxlZnQpO1xufVxuXG52YXIgZmlyc3RDbGlja1Bvc2l0aW9uID0gMDtcbnZhciBsYXN0Q2xpY2tQb3NpdGlvbiA9IDA7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVRyYW5zZm9ybSgpIHtcblxuICAgIHZhciBjYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uKHNsaWRlTnVtYmVyKSB7XG5cbiAgICAgICAgcmV0dXJuIHNsaWRlci5jaGlsZHJlbltzbGlkZU51bWJlcl0ub2Zmc2V0UGFyZW50Lm9mZnNldExlZnQgKyAoKHNsaWRlV2lkdGggLSAxMDApICogc2xpZGVOdW1iZXIpIC0gMTE1O1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcm90YXRlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICB2YXIgZGVnID0gLWRpc3RhbmNlIC8gNTtcblxuICAgICAgICBpZiAoZGVnIDwgLTQwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTQwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZyA+IC00MCAmJiBkZWcgPCA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWcgPiA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIDQwO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FsZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC1kaXN0YW5jZSAqIDI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzdGFuY2UgKiAyO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlU2xpZGVMYXllcihkaXN0YW5jZSkge1xuXG4gICAgICAgIHZhciBkZXB0aCA9IDQwMDtcblxuICAgICAgICB2YXIgekluZGV4ID0gLWRpc3RhbmNlICsgZGVwdGggLyAyO1xuXG4gICAgICAgIGlmICh6SW5kZXggPiBkZXB0aCAvIDIpIHtcbiAgICAgICAgICAgIHJldHVybiBkZXB0aCAtIHpJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB6SW5kZXg7XG5cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICAncm90YXRlWSgnICsgcm90YXRlU2xpZGUoY2FsY3VsYXRlRGlzdGFuY2UoaSkpICsgJ2RlZyknICtcbiAgICAgICAgJ3RyYW5zbGF0ZVooJyArIHNjYWxlU2xpZGUoY2FsY3VsYXRlRGlzdGFuY2UoaSkpICsgJ3B4KSc7XG5cbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnpJbmRleCA9IGNhbGN1bGF0ZVNsaWRlTGF5ZXIoY2FsY3VsYXRlRGlzdGFuY2UoaSkpO1xuXG4gICAgfVxuXG5cbn1cblxuZnVuY3Rpb24gY2hlY2tDdXJyZW50U2xpZGUoKSB7XG5cbiAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPiBicmVha1BvaW50c1swXSkge1xuICAgICAgICBzZXRTbGlkZSgwLCB0cnVlKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IHkrKykge1xuXG4gICAgICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8IGJyZWFrUG9pbnRzW3ldICYmIGdldFNsaWRlck9mZnNldCgpID4gYnJlYWtQb2ludHNbeSArIDFdKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuLmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3pdLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5beV0uY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJylcblxuICAgICAgICAgICAgc2V0U2xpZGUoeSwgdHJ1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDwgYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0pIHtcblxuICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3pdLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGggLSAxXS5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKVxuXG4gICAgICAgIHNldFNsaWRlKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLSAxLCB0cnVlKTtcblxuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIHNldE9mZnNldChvZmZzZXQpIHtcblxuICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gb2Zmc2V0ICsgJ3B4JztcblxuICAgIGNhbGN1bGF0ZVRyYW5zZm9ybSgpO1xuXG59XG5cbnZhciB0aW1lcjtcblxuZnVuY3Rpb24gc2V0U2xpZGUoc2xpZGVJZCwgZW5hYmxlU2Nyb2xsKSB7XG5cbiAgICBpZiAoZW5hYmxlU2Nyb2xsKSB7XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbk9uTW91c2VPdXQgPSBnZXRTbGlkZXJPZmZzZXQoKTtcblxuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IE1hdGgucm91bmQoKHBvc2l0aW9uT25Nb3VzZU91dCAtIChicmVha1BvaW50c1tzbGlkZUlkXSAtIDc1KSkgLyA1KTtcblxuICAgICAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgc2V0T2Zmc2V0KCBnZXRTbGlkZXJPZmZzZXQoKSAtIDUgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgIHNldE9mZnNldCggZ2V0U2xpZGVyT2Zmc2V0KCkgKyA1ICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpID09PSBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IC05MCAtICgzNzUgKiAoc2xpZGVJZCAtIDEpKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5bel0uY2xhc3NMaXN0LnJlbW92ZSgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3NsaWRlSWRdLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgNCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlmIChzbGlkZUlkID09PSAwKSB7XG4gICAgICAgICAgICBzZXRPZmZzZXQoIGJyZWFrUG9pbnRzWzBdIC0gNzUgKTtcbiAgICAgICAgICAgIGxhc3RDbGlja1Bvc2l0aW9uID0gMjg1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0T2Zmc2V0KCBicmVha1BvaW50c1tzbGlkZUlkXSAtIDc1ICk7XG4gICAgICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IC05MCAtICgzNzUgKiAoc2xpZGVJZCAtIDEpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG1vdXNlRG93bihlKSB7XG5cbiAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFggLSBsYXN0Q2xpY2tQb3NpdGlvbjtcblxuICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgIGNoZWNrQ3VycmVudFNsaWRlKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZShlKSB7XG5cbiAgICB2YXIgb2Zmc2V0ID0gTWF0aC5jZWlsKChlLmNsaWVudFggLSBmaXJzdENsaWNrUG9zaXRpb24pIC8gMi41KTtcblxuICAgIHNldE9mZnNldChvZmZzZXQpO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlVXAoZSkge1xuXG4gICAgY2hlY2tDdXJyZW50U2xpZGUoKTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcblxufVxuXG5mdW5jdGlvbiBtb3VzZUxlYXZlKGUpIHtcblxuICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgIGNoZWNrQ3VycmVudFNsaWRlKCk7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG5cbn1cblxuc2V0U2xpZGUoMywgZmFsc2UpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlRG93bik7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2VMZWF2ZSk7XG5cbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG1vdXNlZG93bik7XG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG9GaXhlZFBvc2l0aW9uKTtcbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlKTtcbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQpO1xuIiwidmFyIHN0YXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgIHN0YXIuc3R5bGUuY29sb3IgPSAnIzY5NEUwMCc7XG4gICAgc3Rhci5pbm5lckhUTUwgPSAnc3Rhcic7XG5cbnZhciBhbGxSYXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JhdGUnKTtcblxucmF0ZSA9IGFsbFJhdGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1yYXRlJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgYWxsUmF0ZXNbMF0uYXBwZW5kQ2hpbGQoc3Rhci5jbG9uZU5vZGUodHJ1ZSkpO1xufVxuXG5mb3IgKHZhciB5ID0gMDsgeSA8IHJhdGU7IHkrKykge1xuICAgIGFsbFJhdGVzWzBdLmNoaWxkcmVuW3ldLnN0eWxlLmNvbG9yID0gJyNGRkMxMDcnO1xufVxuIl19
