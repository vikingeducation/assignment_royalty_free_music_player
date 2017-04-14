(function init() {
    'use strict';

    var rfmPlayer = {
        init: function() {
            rfmPlayer.config = {
                $trackListContainer: $('#track-list-container'),
                $tracksAll: $('ul#track-list li'),
                $trackControlBtns: $('ul#track-list .track-controls'),
                $audioPrevBtn: $('.audio-controls-prev-button'),
                $audioMainBtn: $('.audio-controls-main-button'),
                $audioNextBtn: $('.audio-controls-next-button'),
                $audioCurrentTitle: $('.currently-playing h2'),
                $audioCurrentArtist: $('.currently-playing h3')
            };
            rfmPlayer.setup();
        },

        setup: function() {
            rfmPlayer.enableTrackPlay();
        },

        enableTrackPlay: function() {
            rfmPlayer.config.$trackControlBtns.on("click.trackControlBtns", function() {
                console.log('You clicked a play/pause button. Good job!');
            });
        }
    };

    $(document).ready(function() {
        rfmPlayer.init();
    });
}());