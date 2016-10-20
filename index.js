var slider = document.getElementById('slider');
    slider.style.left = '-375px';

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
                slider.style.transition = 'all 0.5s';
                slider.style.left = (breakpoints[1] / 2) + 'px';
                slider.children[0].style.transform = 'rotateY(0deg)';

                setTimeout(function() {
                    slider.style.transition = 'none';
                }, 500);

                lastClick = breakpoints[1] / 2;
            }

            console.log(distance, breakpoints[breakpoints.length - 1]);

            for (var i = 0; i < breakpoints.length; i++) {

                if (distance >= breakpoints[i] && distance <= breakpoints[i+1] && breakpoints[i+2]) {

                    slider.style.left = -(breakpoints[i + 1]  - 125) + 'px';

                    slider.style.transition = 'all 0.5s';
                    slider.children[i].style.transition = 'all 0.5s';
                    slider.children[i].style.transform = 'rotateY(40deg)';
                    slider.children[i + 1].style.transform = 'rotateY(0deg)';
                    slider.children[i + 2].style.transform = 'rotateY(-40deg)';

                    lastClick = -(breakpoints[i + 1]  - 125);

                    setTimeout(function() {
                        console.log(slider.children[i-1]);
                        slider.style.transition = 'none';
                        slider.children[i-1].style.transition = 'none';
                    }, 500);

                }

            }

            if (distance >= breakpoints[breakpoints.length - 1]) {

                slider.style.transition = 'all 0.5s';

                slider.style.left = -1125 + 'px';
                slider.children[0].style.transform = 'rotateY(0deg)';

                setTimeout(function() {
                    slider.style.transition = 'none';
                }, 500);

                lastClick = breakpoints[breakpoints.length - 1] - 125;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpO1xuICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gJy0zNzVweCc7XG5cbihmdW5jdGlvbiBzZXRSYXRlKCkge1xuXG4gICAgdmFyIHN0YXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICAgICAgc3Rhci5zdHlsZS5jb2xvciA9ICcjNjk0RTAwJztcbiAgICAgICAgc3Rhci5pbm5lckhUTUwgPSAnc3Rhcic7XG5cbiAgICB2YXIgYWxsUmF0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyYXRlJyk7XG5cbiAgICB2YXIgcmF0ZSA9IGFsbFJhdGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1yYXRlJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBhbGxSYXRlc1swXS5hcHBlbmRDaGlsZChzdGFyLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCByYXRlOyB5KyspIHtcbiAgICAgICAgYWxsUmF0ZXNbMF0uY2hpbGRyZW5beV0uc3R5bGUuY29sb3IgPSAnI0ZGQzEwNyc7XG4gICAgfVxuXG59KSgpO1xuXG4oZnVuY3Rpb24gZ2FsZXJ5U2xpZGUoKSB7XG5cbiAgICB2YXIgZmlyc3RDbGljaztcbiAgICB2YXIgbGFzdENsaWNrO1xuXG4gICAgKGZ1bmN0aW9uIHNldEZpcnN0Um90YXRlKCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoLTQwZGVnKSc7XG4gICAgICAgIH1cblxuICAgIH0pKCk7XG5cbiAgICBmdW5jdGlvbiBzd2lwZShlKSB7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAtKGZpcnN0Q2xpY2sgLSBlLmNsaWVudFgpICsgJ3B4JztcblxuICAgICAgICBmdW5jdGlvbiByb3RhdGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgICAgICB2YXIgZGVnID0gLWRpc3RhbmNlIC8gNTtcblxuICAgICAgICAgICAgaWYgKGRlZyA+IC00MCAmJiBkZWcgPCA0MCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoJyArIHJvdGF0ZVNsaWRlKHBhcnNlRmxvYXQoc2xpZGVyLnN0eWxlLmxlZnQpIC0gMTI1ICsgKDI1MCogaSkpICsgJ2RlZyknO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0ZpeGVkUG9zaXRpb24oKSB7XG5cbiAgICAgICAgKGZ1bmN0aW9uIG5lYXJTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRCcmVha1BvaW50cygpIHtcblxuICAgICAgICAgICAgICAgIHZhciBwb2ludHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50c1tpXSA9IGkgKiAyNTA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50cztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYnJlYWtwb2ludHMgPSBnZXRCcmVha1BvaW50cygpO1xuXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gYnJlYWtwb2ludHNbMF0pIHtcbiAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMC41cyc7XG4gICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAoYnJlYWtwb2ludHNbMV0gLyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDBkZWcpJztcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgICAgICAgICBsYXN0Q2xpY2sgPSBicmVha3BvaW50c1sxXSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpc3RhbmNlLCBicmVha3BvaW50c1ticmVha3BvaW50cy5sZW5ndGggLSAxXSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnJlYWtwb2ludHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+PSBicmVha3BvaW50c1tpXSAmJiBkaXN0YW5jZSA8PSBicmVha3BvaW50c1tpKzFdICYmIGJyZWFrcG9pbnRzW2krMl0pIHtcblxuICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IC0oYnJlYWtwb2ludHNbaSArIDFdICAtIDEyNSkgKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjVzJztcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNXMnO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoNDBkZWcpJztcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2kgKyAxXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpICsgMl0uc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoLTQwZGVnKSc7XG5cbiAgICAgICAgICAgICAgICAgICAgbGFzdENsaWNrID0gLShicmVha3BvaW50c1tpICsgMV0gIC0gMTI1KTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2xpZGVyLmNoaWxkcmVuW2ktMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5baS0xXS5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+PSBicmVha3BvaW50c1ticmVha3BvaW50cy5sZW5ndGggLSAxXSkge1xuXG4gICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNXMnO1xuXG4gICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAtMTEyNSArICdweCc7XG4gICAgICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDBkZWcpJztcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgICAgICAgICBsYXN0Q2xpY2sgPSBicmVha3BvaW50c1ticmVha3BvaW50cy5sZW5ndGggLSAxXSAtIDEyNTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KSgtcGFyc2VGbG9hdChzbGlkZXIuc3R5bGUubGVmdCkpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2Vkb3duKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuXG4gICAgICAgIGlmIChsYXN0Q2xpY2spIHtcbiAgICAgICAgICAgIGZpcnN0Q2xpY2sgPSBlLmNsaWVudFggLSBsYXN0Q2xpY2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaXJzdENsaWNrID0gZS5jbGllbnRYO1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHN3aXBlKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNldXAoZSkge1xuXG4gICAgICAgIHNsaWRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgbGFzdENsaWNrID0gLShmaXJzdENsaWNrIC0gZS5jbGllbnRYKTtcblxuICAgICAgICBzbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc3dpcGUpO1xuXG4gICAgICAgIHRvRml4ZWRQb3NpdGlvbigpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2VsZWF2ZShlKSB7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICBsYXN0Q2xpY2sgPSAtKGZpcnN0Q2xpY2sgLSBlLmNsaWVudFgpO1xuXG4gICAgICAgIHNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzd2lwZSk7XG5cbiAgICAgICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICB9XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2Vkb3duKTtcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2VsZWF2ZSk7XG5cbn0pKCk7XG4iXSwiZmlsZSI6ImluZGV4LmpzIn0=
