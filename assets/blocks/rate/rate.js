var rate = document.getElementById('rate');

var rateValue = rate.getAttribute('data-rate');


for (var y = 0; y < rateValue; y++) {
    rate.children[y].setAttribute('fill', '#FFC107');
}
