'use strict';

(function() {
    var trackList = [{
        title: 'In it to win it',
        artist: 'Fleslit',
        length: '3:22',
        url: 'tracks/init.mp3'
    }, {
        title: 'Calm Fight',
        artist: 'Fleslit',
        length: '4:24',
        url: 'tracks/calmfight.mp3'
    }, {
        title: 'Yummy',
        artist: 'Fleslit',
        length: '3:32',
        url: 'tracks/yummy.mp3'
    }, {
        title: '12:01 AM',
        artist: 'Fleslit',
        length: '3:16',
        url: 'tracks/1201.mp3'
    }, {
        title: 'MIA',
        artist: 'Fleslit',
        length: '3:14',
        url: 'tracks/mia.mp3'
    }];
    var playButton = document.getElementById('play-button');
    var controls = document.querySelectorAll('.control');
    var musicList = document.querySelector('.music-list');
    var currentTrack = document.getElementById('current-track');
    var audio = new Audio(trackList[0].url);
    var track = [];
    var title = [];
    var trackCounter = 0;
    var titleCounter = 0;


    for (var key in trackList) {
        var li = document.createElement('li');
        var num = Number(key) + 1;

        li.innerHTML = '<p>' + num + '. ' + ('' + trackList[key].title) + '</p>' + '<p>' + ('' + trackList[key].artist) + '</p>' + '<p>' + ('' + trackList[key].length) + '</p>' + '<p><span class="cloud-music">FREE MUSIC ARCHIVE</span></p>';
        musicList.appendChild(li);
        track.push(trackList[key].url);
        title.push(trackList[key].title);
        currentTrack.textContent = trackList[0].title;
    }

    playButton.addEventListener('click', function() {
        var checkPaused = this.classList.contains('fa-play');

        if (checkPaused === true) {
            this.classList.add('fa-pause', 'active', 'playing');
            this.classList.remove('fa-play', 'paused');
            playAudio();
        } else {
            this.classList.add('fa-play', 'paused');
            this.classList.remove('fa-pause', 'active', 'animation', 'playing');
            pauseAudio();
        }
    });

    function playAudio() {
        audio.play();
    }

    function pauseAudio() {
        audio.pause();
    }

    function stopAudio() {
        audio.currentTime = 0;
        audio.pause();
    }

    controls.forEach(function(controls) {
        return controls.addEventListener('click', function() {
            var forward = this.classList.contains('fa-step-forward');
            var backward = this.classList.contains('fa-step-backward');

            if (forward) {
                currentTrack.textContent = nextItem();
                stopAudio();
                audio = new Audio(nextSong());
                playAudio();
            }

            if (backward) {
                currentTrack.textContent = prevItem();
                stopAudio();
                audio = new Audio(nextSong());
                playAudio();
            }
        });

        function nextItem() {
            titleCounter = titleCounter + 1;
            titleCounter = titleCounter % title.length;

            return title[titleCounter];
        }

        function nextSong() {
            trackCounter = trackCounter + 1;
            trackCounter = trackCounter % track.length;
            return track[trackCounter];
        }

        function prevItem() {
            if (titleCounter === 0) {

                titleCounter = title.length;
            }
            titleCounter = titleCounter - 1;
            return title[titleCounter];
        }
    });
})();
