var slider = document.getElementById('slider');
    slider.style.left = '125px';

(function setRate() {

    var star = document.createElement('i');
        star.classList.add('material-icons');
        star.style.color = '#694E00';
        star.innerHTML = 'star';

    var allRates = document.getElementsByClassName('rate');

    var rate = allRates[0].getAttribute('data-rate');

    for (var i = 0; i < 5; i++) {
        allRates[0].appendChild(star.cloneNode(true));
    }

    for (var y = 0; y < rate; y++) {
        allRates[0].children[y].style.color = '#FFC107';
    }

})();

(function galerySlide() {

    var firstClick;
    var lastClick;

    (function setFirstRotate() {

        for (var i = 1; i < slider.children.length; i++) {
            slider.children[i].style.transform = 'rotateY(-40deg)';
        }

    })();

    function swipe(e) {

        slider.style.left = -(firstClick - e.clientX) + 'px';

        function rotateSlide(distance) {

            var deg = -distance / 5;

            if (deg > -40 && deg < 40) {
                return deg;
            }

        }

        for (var i = 0; i < slider.children.length; i++) {
            slider.children[i].style.transform = 'rotateY(' + rotateSlide(parseFloat(slider.style.left) - 125 + (250* i)) + 'deg)';
        }

    }

    function toFixedPosition() {

        (function nearSlide(distance) {

            function getBreakPoints() {

                var points = [];

                for (var i = 0; i < slider.children.length; i++) {
                    points[i] = i * 250;
                }

                return points;

            }

            var breakpoints = getBreakPoints();

            if (distance <= breakpoints[0]) {
                slider.style.left = (breakpoints[1] / 2) + 'px';
                slider.children[0].style.transform = 'rotateY(0deg)';
            }

            for (var i = 0; i < breakpoints.length; i++) {

                if (distance >= breakpoints[i] && distance <= breakpoints[i+1]) {
                    slider.style.left = -(breakpoints[i + 1]  - 125) + 'px';

                    slider.style.transition = 'all 0.5s';
                    slider.children[i + 1].style.transform = 'rotateY(0deg)';


                    setTimeout(function() {
                        slider.style.transition = 'none';
                    }, 500);

                }

            }

        })(-parseFloat(slider.style.left));

    }

    function mousedown(e) {

        slider.style.cursor = 'move';

        if (lastClick) {
            firstClick = e.clientX - lastClick;
        } else {
            firstClick = e.clientX;
        }

        slider.addEventListener('mousemove', swipe);

    }

    function mouseup(e) {

        slider.style.cursor = 'pointer';

        lastClick = -(firstClick - e.clientX);

        slider.removeEventListener('mousemove', swipe);

        toFixedPosition();

    }

    function mouseleave(e) {

        slider.style.cursor = 'pointer';

        lastClick = -(firstClick - e.clientX);

        slider.removeEventListener('mousemove', swipe);

        toFixedPosition();

    }

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mouseleave', mouseleave);

})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpO1xuICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gJzEyNXB4JztcblxuKGZ1bmN0aW9uIHNldFJhdGUoKSB7XG5cbiAgICB2YXIgc3RhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgICAgICBzdGFyLnN0eWxlLmNvbG9yID0gJyM2OTRFMDAnO1xuICAgICAgICBzdGFyLmlubmVySFRNTCA9ICdzdGFyJztcblxuICAgIHZhciBhbGxSYXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JhdGUnKTtcblxuICAgIHZhciByYXRlID0gYWxsUmF0ZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXJhdGUnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIGFsbFJhdGVzWzBdLmFwcGVuZENoaWxkKHN0YXIuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHJhdGU7IHkrKykge1xuICAgICAgICBhbGxSYXRlc1swXS5jaGlsZHJlblt5XS5zdHlsZS5jb2xvciA9ICcjRkZDMTA3JztcbiAgICB9XG5cbn0pKCk7XG5cbihmdW5jdGlvbiBnYWxlcnlTbGlkZSgpIHtcblxuICAgIHZhciBmaXJzdENsaWNrO1xuICAgIHZhciBsYXN0Q2xpY2s7XG5cbiAgICAoZnVuY3Rpb24gc2V0Rmlyc3RSb3RhdGUoKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgtNDBkZWcpJztcbiAgICAgICAgfVxuXG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIHN3aXBlKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IC0oZmlyc3RDbGljayAtIGUuY2xpZW50WCkgKyAncHgnO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJvdGF0ZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWcgPSAtZGlzdGFuY2UgLyA1O1xuXG4gICAgICAgICAgICBpZiAoZGVnID4gLTQwICYmIGRlZyA8IDQwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgnICsgcm90YXRlU2xpZGUocGFyc2VGbG9hdChzbGlkZXIuc3R5bGUubGVmdCkgLSAxMjUgKyAoMjUwKiBpKSkgKyAnZGVnKSc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvRml4ZWRQb3NpdGlvbigpIHtcblxuICAgICAgICAoZnVuY3Rpb24gbmVhclNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEJyZWFrUG9pbnRzKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzW2ldID0gaSAqIDI1MDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBicmVha3BvaW50cyA9IGdldEJyZWFrUG9pbnRzKCk7XG5cbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBicmVha3BvaW50c1swXSkge1xuICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gKGJyZWFrcG9pbnRzWzFdIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlblswXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnJlYWtwb2ludHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+PSBicmVha3BvaW50c1tpXSAmJiBkaXN0YW5jZSA8PSBicmVha3BvaW50c1tpKzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gLShicmVha3BvaW50c1tpICsgMV0gIC0gMTI1KSArICdweCc7XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNXMnO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5baSArIDFdLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDBkZWcpJztcblxuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pKC1wYXJzZUZsb2F0KHNsaWRlci5zdHlsZS5sZWZ0KSk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3VzZWRvd24oZSkge1xuXG4gICAgICAgIHNsaWRlci5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG5cbiAgICAgICAgaWYgKGxhc3RDbGljaykge1xuICAgICAgICAgICAgZmlyc3RDbGljayA9IGUuY2xpZW50WCAtIGxhc3RDbGljaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpcnN0Q2xpY2sgPSBlLmNsaWVudFg7XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc3dpcGUpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2V1cChlKSB7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICBsYXN0Q2xpY2sgPSAtKGZpcnN0Q2xpY2sgLSBlLmNsaWVudFgpO1xuXG4gICAgICAgIHNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzd2lwZSk7XG5cbiAgICAgICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3VzZWxlYXZlKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgIGxhc3RDbGljayA9IC0oZmlyc3RDbGljayAtIGUuY2xpZW50WCk7XG5cbiAgICAgICAgc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHN3aXBlKTtcblxuICAgICAgICB0b0ZpeGVkUG9zaXRpb24oKTtcblxuICAgIH1cblxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZWRvd24pO1xuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBtb3VzZWxlYXZlKTtcblxufSkoKTtcbiJdLCJmaWxlIjoiaW5kZXguanMifQ==
