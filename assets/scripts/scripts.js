(function init() {
    'use strict';

    var rfmPlayer = {
        init: function() {
            rfmPlayer.config = {
                $trackListContainer: $('#track-list-container'),
                $tracksAll: $('ul#track-list li'),
                $trackControlBtns: $('ul#track-list li'),
                $audioPrevBtn: $('.audio-controls-prev-button'),
                $audioMainBtn: $('.audio-controls-main-button'),
                $audioNextBtn: $('.audio-controls-next-button'),
                $audioCurrentTitle: $('.currently-playing h2'),
                $audioCurrentArtist: $('.currently-playing h3'),
                $currentlyPlayingInList: $('.currently-playing-list'),
                trackList: [
                    {
                        'title': 'Chopin: Ballade No. 1 in G Minor, Op. 23',
                        'artist': 'Alfred Cortot'
                    }, {
                        'title': 'Chopin: Ballade No. 2 in F Major, Op. 38',
                        'artist': 'Alfred Cortot'
                    }, {
                        'title': 'Chopin: Ballade No. 3 in A Flat Major, Op. 47',
                        'artist': 'Alfred Cortot'
                    }, {
                        'title': 'Chopin: Ballade No. 4 in F Minor, Op. 52',
                        'artist': 'Alfred Cortot'
                    }
                ],
                trackSources: [
                    'https://files.freemusicarchive.org/music%2FWFMU%2FAlfred_Cortot%2FVictor_78rpm_Album_M-399_013663_-_013670_Recorded_July_6-7_1933%2FAlfred_Cortot_-_01_-_Chopin_Ballade_No_1_in_G_Minor_Op_23.mp3',
                    'https://files.freemusicarchive.org/music%2FWFMU%2FAlfred_Cortot%2FVictor_78rpm_Album_M-399_013663_-_013670_Recorded_July_6-7_1933%2FAlfred_Cortot_-_02_-_Chopin_Ballade_No_2_in_F_Major_Op_38.mp3',
                    'https://files.freemusicarchive.org/music%2FWFMU%2FAlfred_Cortot%2FVictor_78rpm_Album_M-399_013663_-_013670_Recorded_July_6-7_1933%2FAlfred_Cortot_-_03_-_Chopin_Ballade_No_3_in_A-Flat_Major_Op_47.mp3',
                    'https://files.freemusicarchive.org/music%2FWFMU%2FAlfred_Cortot%2FVictor_78rpm_Album_M-399_013663_-_013670_Recorded_July_6-7_1933%2FAlfred_Cortot_-_04_-_Chopin_Ballade_No_4_in_F_Minor_Op_52.mp3'
                ],
            }
            rfmPlayer.setup();
        },

        setup: function() {
            rfmPlayer.enableTrackPlay();
            rfmPlayer.enableNextBtn();
            rfmPlayer.enablePrevBtn();
            rfmPlayer.populateTrackList();
        },

        enableTrackPlay: function() {
            rfmPlayer.config.$trackControlBtns.on("click.trackControlBtns", function() {
                var $controlBtn = $(this).find('div.track-controls');
                var $containerParent = $(this).closest('ul');
                var $audioDOM = $(this).find('audio');

                if ($controlBtn.hasClass('track-play-button') && 
                    $(this).hasClass('currently-playing-list')) {
                    $audioDOM.trigger('play');
                } else if ($controlBtn.hasClass('track-play-button')){
                    $audioDOM.trigger('play');
                    $audioDOM[0].currentTime = 0;
                } else {
                    $audioDOM.trigger('pause');
                }

                if (!$(this).hasClass('.currently-playing-list')) {
                    rfmPlayer.pauseOtherAudio($(this), $containerParent);
                }

                rfmPlayer.changeCurrentTrack($(this));
                $controlBtn.toggleClass("track-play-button");
                $controlBtn.toggleClass("track-pause-button");
            });
        },

        pauseOtherAudio: function($current, $parent) {
            var $notCurrent = $parent
                .find('li')
                .not($current);
            $notCurrent
                .find('audio')
                .trigger("pause");
            $notCurrent
                .find('div.track-controls')
                .removeClass('track-pause-button')
                .addClass('track-play-button');
        },

        changeCurrentTrack: function($newCurrent) {
            var $formerCurrent =  $('.currently-playing-list');
            $formerCurrent.removeClass('currently-playing-list');
            $newCurrent.addClass('currently-playing-list');
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
        },

        populateTrackList: function() {
            var trackList = rfmPlayer.config.trackList;
            var sources = rfmPlayer.config.trackSources

            rfmPlayer.config.$tracksAll.each(function(i, element) {
                var $title = $(element).find('p.track-title');
                $title.html(trackList[i].title);

                var $artist = $(element).find('p.track-artist');
                $artist.html(trackList[i].artist);

                var $audioDOM = $(element).find('audio');
                $audioDOM.attr('src', sources[i]);
            });
        }
    };


    $(document).ready(function() {
        rfmPlayer.init();
    });
}());