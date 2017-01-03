var __adKernelBanner = {
    setRate: function() {

        //=require blocks/rate/rate.js

    },

    initAnimation: function(images) {

        //=require blocks/animation/animation.js

    }
};

//=require blocks/gallery/gallery.js

var imageArray = [
                  './img/unsplash.jpg',
                  './img/unsplash-2.jpg',
                  './img/unsplash-3.jpg',
                  './img/unsplash-4.jpg',
                  './img/unsplash-5.jpg',
                  './img/unsplash-6.jpg'
                 ];

// __adKernelBanner.initAnimation(['./img/unsplash.jpg', './img/unsplash-2.jpg', './img/unsplash-3.jpg']);

__adKernelBanner.gallery.init(imageArray, document.getElementById('slider'));

__adKernelBanner.setRate();
