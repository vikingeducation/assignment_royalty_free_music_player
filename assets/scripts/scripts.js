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
            rfmPlayer.populateTrackList();
            rfmPlayer.enableTrackPlay();
            rfmPlayer.enableNextBtn();
            rfmPlayer.enablePrevBtn();
        },

        enableTrackPlay: function() {
            rfmPlayer.config.$trackControlBtns.on("click.trackControlBtns", function() {
                var $controlBtn = $(this).find('div.track-controls');
                var isHighlighted = $(this).hasClass('currently-playing-list')

                rfmPlayer.changeCurrentHighlight($(this));
                rfmPlayer.playTrack($(this), isHighlighted);
            });
        },

        // Takes <li> element in jQuery object as input
        // Notes: Find a way to clean up button changing
        playTrack: function($track, isHighlighted) {
            var $controlBtn = $track.find('div.track-controls');
            var $audioDOM = $track.find('audio');

            if ($controlBtn.hasClass('track-play-button') && isHighlighted) {
                $audioDOM.trigger('play');
                $controlBtn.toggleClass("track-play-button");
                $controlBtn.toggleClass("track-pause-button");
            } else if ($controlBtn.hasClass('track-play-button')){
                $audioDOM.trigger('play');
                $audioDOM[0].currentTime = 0;
                rfmPlayer.pauseOtherAudio($track);
            } else {
                $audioDOM.trigger('pause');
                $controlBtn.toggleClass("track-play-button");
                $controlBtn.toggleClass("track-pause-button");
            }
        },

        // Takes <li> element in jQuery object as input
        pauseOtherAudio: function($current) {
            var $notCurrent = $current.closest('ul')
                .find('li')
                .not($current);
            $notCurrent
                .find('audio')
                .trigger("pause");
            $notCurrent
                .find('div.track-controls')
                .removeClass('track-pause-button')
                .addClass('track-play-button');
            $current.find('div.track-controls')
                .removeClass("track-play-button")
                .addClass("track-pause-button");
        },

        //Takes <li> element in jQuery object as input
        changeCurrentHighlight: function($newCurrent) {
            var $formerCurrent =  $('.currently-playing-list');
            if ($formerCurrent.get(0) !== $newCurrent.get(0)) {
                $formerCurrent.removeClass('currently-playing-list');
                $newCurrent.addClass('currently-playing-list');
            }
            rfmPlayer.changeCurrentInfo($newCurrent);
        },

        changeCurrentInfo: function($newCurrent) {
            var currentTitle = $newCurrent.find("p.track-title").text();
            var currentArtist = $newCurrent.find("p.track-artist").text();
            rfmPlayer.config.$audioCurrentTitle.text(currentTitle);
            rfmPlayer.config.$audioCurrentArtist.text(currentArtist);
        },

        enableNextBtn: function() {
            rfmPlayer.config.$audioNextBtn.on("click.next", function() {
                var $current = $('.currently-playing-list');
                var $next = $current.closest('li')
                    .next('li');
                if ($next.length === 0) {
                    $next = $current;
                }
                rfmPlayer.changeCurrentHighlight($next);
                rfmPlayer.pauseOtherAudio($next, $next.closest('ul'));

                var $audioDOM = $next.find('audio');
                $audioDOM.trigger("play");
                $audioDOM[0].currentTime = 0;
            });
        },

        enablePrevBtn: function() {
            rfmPlayer.config.$audioPrevBtn.on("click.prev", function() {
                var $current = $('.currently-playing-list');
                var $prev = $current.closest('li')
                    .prev('li');
                if ($prev.length === 0) {
                    $prev = $current;
                }
                rfmPlayer.changeCurrentHighlight($prev);
                rfmPlayer.pauseOtherAudio($prev, $prev.closest('ul'));

                var $audioDOM = $prev.find('audio');
                $audioDOM.trigger("play");
                $audioDOM[0].currentTime = 0;
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