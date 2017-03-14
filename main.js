(function() {
    const trackList = [{
            title: 'In it to win it',
            artist: 'Fleslit',
            length: '3:22',
            url: 'tracks/init.mp3'
        },
        {
            title: 'Calm Fight',
            artist: 'Fleslit',
            length: '4:24',
            url: 'tracks/calmfight.mp3'
        },
        {
            title: 'Yummy',
            artist: 'Fleslit',
            length: '3:32',
            url: 'tracks/yummy.mp3'
        },
        {
            title: '12:01 AM',
            artist: 'Fleslit',
            length: '3:16',
            url: 'tracks/1201.mp3'
        },
        {
            title: 'MIA',
            artist: 'Fleslit',
            length: '3:14',
            url: 'tracks/mia.mp3'
        }
    ];
    const playButton = document.getElementById('play-button');
    const controls = document.querySelectorAll('.control');
    const musicList = document.querySelector('.music-list');
    const currentTrack = document.getElementById('current-track');
    let audio = new Audio(trackList[0].url);
    let track = [];
    let title = [];
    let trackCounter = 0;
    let titleCounter = 0;
    // titleCount titleCounterlet musicPlayer = musicPlayer || {};

    for (var key in trackList) {
        let li = document.createElement('li');
        let num = Number(key) + 1;

        li.innerHTML = '<p>' + num + '. ' + `${trackList[key].title}` + '</p>' + '<p>' + `${trackList[key].artist}` + '</p>' + '<p>' + `${trackList[key].length}` + '</p>' + '<p><span class="cloud-music">FREE MUSIC ARCHIVE</span></p>';
        musicList.appendChild(li);
        track.push(trackList[key].url);
        title.push(trackList[key].title);
        currentTrack.textContent = trackList[0].title;
    }


    playButton.addEventListener('click', function() {
        const checkPaused = this.classList.contains('fa-play');

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
            const forward = this.classList.contains('fa-step-forward');
            const backward = this.classList.contains('fa-step-backward');

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
            titleCounter = titleCounter + 1; // increase i by one
            titleCounter = titleCounter % title.length; // if we've gone too high, start from `0` again

            return title[titleCounter]; // give us back the item of where we are now
        }

        function nextSong() {
            trackCounter = trackCounter + 1; // increase i by one
            trackCounter = trackCounter % track.length; // if we've gone too high, start from `0` again
            return track[trackCounter]; // give us back the item of where we are now
        }

        function prevItem() {
            if (titleCounter === 0) { // i would become 0
                titleCounter = title.length; // so put it at the other end of the array
            }
            titleCounter = titleCounter - 1; // decrease by one
            return title[titleCounter]; // give us back the item of where we are now
        }
    });
})();
