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
                $audioCurrentArtist: $('.currently-playing h3'),
                $currentlyPlayingInList: $('.currently-playing-list')
            };
            rfmPlayer.setup();
        },

        setup: function() {
            rfmPlayer.enableTrackPlay();
            rfmPlayer.enableNextBtn();
            rfmPlayer.enablePrevBtn();
        },

        enableTrackPlay: function() {
            rfmPlayer.config.$trackControlBtns.on("click.trackControlBtns", function() {
                $(this).toggleClass("track-play-button");
                $(this).toggleClass("track-pause-button");
                console.log('You clicked a play/pause button. Good job!');
            });
        },

        enableNextBtn: function() {
            rfmPlayer.config.$audioNextBtn.on("click.next", function() {
                var $current = rfmPlayer.config.$currentlyPlayingInList;
                var $next = $current.closest('li')
                    .next('li');
                if ($next.length === 0) {
                    $next = $current;
                }
                $current.toggleClass('currently-playing-list');
                $next.toggleClass('currently-playing-list');
                rfmPlayer.config.$currentlyPlayingInList = $next;
            });
        },

        enablePrevBtn: function() {
            rfmPlayer.config.$audioPrevBtn.on("click.prev", function() {
                var $current = rfmPlayer.config.$currentlyPlayingInList;
                var $prev = $current.closest('li')
                    .prev('li');
                if ($prev.length === 0) {
                    $prev = $current;
                }
                $current.toggleClass('currently-playing-list');
                $prev.toggleClass('currently-playing-list');
                rfmPlayer.config.$currentlyPlayingInList = $prev;
            });
        }


    };

    $(document).ready(function() {
        rfmPlayer.init();
    });
}());