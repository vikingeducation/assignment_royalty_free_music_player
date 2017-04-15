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
                $currentAudioNode: "",
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
            rfmPlayer.enableMainCtrlBtn();
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
            var $mainBtn = rfmPlayer.config.$audioMainBtn;
            var $audioNode = $track.find('audio');
            rfmPlayer.config.$currentAudioNode = $audioNode;

            if ($controlBtn.hasClass('track-play-button') && isHighlighted) {
                $audioNode.trigger('play');
                rfmPlayer.switchBtnDisplay($controlBtn, "pause");
                rfmPlayer.switchBtnDisplay($mainBtn, "pause");

            } else if ($controlBtn.hasClass('track-play-button')){
                $audioNode.trigger('play');
                $audioNode[0].currentTime = 0;
                rfmPlayer.pauseOtherAudio($track, $mainBtn);
            } else {
                $audioNode.trigger('pause');
                rfmPlayer.switchBtnDisplay($controlBtn, "play");
                rfmPlayer.switchBtnDisplay($mainBtn, "play");
            }
        },

        switchBtnDisplay: function($btn, display) {
            var playClass = "";
            var pauseClass = "";
            if ($btn.hasClass('audio-controls-main-button')) {
                playClass = "audio-controls-play-button";
                pauseClass = "audio-controls-pause-button";
            } else if ($btn.hasClass('track-controls')) {
                playClass = "track-play-button";
                pauseClass = "track-pause-button";
            }

            if (display === "play") {
                $btn.removeClass(pauseClass);
                $btn.addClass(playClass);
            } else if (display === "pause") {
                $btn.removeClass(playClass);
                $btn.addClass(pauseClass);
            }
        },

        // Takes <li> element in jQuery object as input
        pauseOtherAudio: function($current, $mainBtn) {
            var $notCurrent = $current.closest('ul')
                .find('li')
                .not($current);
            var $notCurrentBtns = $notCurrent.find('div.track-controls');
            var $currentBtns = $current.find('div.track-controls');

            $notCurrent
                .find('audio')
                .trigger("pause");
            rfmPlayer.switchBtnDisplay($notCurrentBtns, "play");
            rfmPlayer.switchBtnDisplay($currentBtns, "pause");
            rfmPlayer.switchBtnDisplay($mainBtn, "pause");
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
                rfmPlayer.pauseOtherAudio($next, rfmPlayer.config.$audioMainBtn);

                var $audioDOM = $next.find('audio');
                $audioDOM.trigger("play");
                $audioDOM[0].currentTime = 0;
                rfmPlayer.config.$currentAudioNode = $audioDOM;
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
                rfmPlayer.pauseOtherAudio($prev, rfmPlayer.config.$audioMainBtn);

                var $audioDOM = $prev.find('audio');
                $audioDOM.trigger("play");
                $audioDOM[0].currentTime = 0;
                rfmPlayer.config.$currentAudioNode = $audioDOM;
            });
        },

        enableMainCtrlBtn: function() {
            rfmPlayer.config.$audioMainBtn.on("click.mainBtn", function() {
                var $currentAudioNode = rfmPlayer.config.$currentAudioNode;
                var $currentPlayStatus = $currentAudioNode.siblings('div.track-controls');
                if ($currentPlayStatus.hasClass('track-pause-button')) {
                    $currentAudioNode.trigger('pause');
                    rfmPlayer.switchBtnDisplay($(this), "play");
                    rfmPlayer.switchBtnDisplay($currentPlayStatus, "play");
                } else if ($currentPlayStatus.hasClass('track-play-button')) {
                    $currentAudioNode.trigger('play');
                    rfmPlayer.switchBtnDisplay($(this), "pause");
                    rfmPlayer.switchBtnDisplay($currentPlayStatus, "pause");
                }
            });
        },

        populateTrackList: function() {
            var trackList = rfmPlayer.config.trackList;
            var sources = rfmPlayer.config.trackSources;

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