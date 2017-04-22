$(document).ready(() => {
  _registerListeners();
});

const _registerListeners = () => {
  ['.js-play-song',
    '.js-rewind',
    '.js-fast-forward',
    '.js-play'
  ].forEach((tagName) => {
    _playerListener(tagName);
  });
}

const _pageObjects = {
  pauseButtonClassName: 'player__button--pause',
  playerSongStatus() { return $('.js-player__song__button') },
  playerSongName() { return $('.js-player__song__name') },
  playerSongArtist() { return $('.js-player__song__artist') },

  currentSong() {
    return $('.js-play-song').filter((index, song) => {
      const $name = $(song).find('.js-song__info__name');

      return $name.text() === this.playerSongName().text();
    }).first();
  },

  songName(song) { return song.find('.js-song__info__name') },
  songArtist(song) { return song.find('.js-song__info__artist') },
  songStatus(song) { return song.find('.js-song__button') },
}

const _playerListener = (tagName) => {
  $('body').on('click', tagName, e => {
    const attribute = tagName.split('js-')[1]
    const $songItem = $(e.target).closest(tagName)

    _playerListeners[attribute]($songItem)
  })
}

const _playSong = $songItem => {
  _togglePauseButton($songItem);
  _updatePlayerStatus($songItem);
}

const _togglePauseButton = $songItem => {
  const pauseButtonClassName = _pageObjects.pauseButtonClassName;
  const $songStatus = _pageObjects.songStatus($songItem);
  const $playerSongStatus = _pageObjects.playerSongStatus();

  if($songStatus.hasClass(pauseButtonClassName)) {
    $songStatus.removeClass(pauseButtonClassName);

    $playerSongStatus.removeClass(pauseButtonClassName);
  }
  else {
    $(`.${pauseButtonClassName}`).removeClass(pauseButtonClassName);

    $songStatus.addClass(pauseButtonClassName);
    $playerSongStatus.addClass(pauseButtonClassName);
  }
}

const _updatePlayerStatus = $songItem => {
  const $playerSongName = _pageObjects.playerSongName();
  const $playerSongArtist = _pageObjects.playerSongArtist();
  const songName = _pageObjects.songName($songItem).text();
  const songArtist = _pageObjects.songArtist($songItem).text();

  $playerSongName.text(songName)
  $playerSongArtist.text(songArtist)
}

const _fastForward = () => {
  _playSong(_pageObjects.currentSong().next());
}

const _rewind = () => {
  _playSong(_pageObjects.currentSong().prev());
}

const _play = () => {
  const $currentSong = _pageObjects.currentSong();

  if($currentSong.length) {
    _playSong($currentSong);
  } else {
    _pageObjects.playerSongStatus().toggleClass(_pageObjects.pauseButtonClassName);
  }
}

const _playerListeners = {
  'play-song': _playSong,
  'fast-forward': _fastForward,
  'rewind': _rewind,
  'play': _play
}
