"use strict";

const MusicPlayer = (function() {
  function MusicPlayer($elOrId, /* Array of Objects */ playlist = undefined) {
    if (!($elOrId instanceof jQuery))
      $elOrId = $($elOrId);

    // Property to hold reference to player controls.
    this.$playerControls;

    // Property to hold reference to current item.
    this.$currentItem;

    // Property to hold the playlist itself.
    this.playlistArr = playlist;

    // Array to hold playlist items.
    this.$items = [];

    // Method to handle playing the current item.
    this.playItem = indexItem => {
      indexItem = indexItem || 0;
      if (indexItem > this.$items.length-1)
        indexItem = 0;

      // First select the item.
      if (this.$currentItem.index() !== indexItem)
        _selectItem(this, indexItem);

      // Update UI
      this.$currentItem.children('div.song-quick-action').replaceWith(quickActionPause.clone());
      this.$playerControls.find('span:nth-child(2)').removeClass('glyphicon-play').addClass('glyphicon-pause');

      // Play the audio.
      const $audioElement = this.$currentItem.find('audio');
      $audioElement.trigger('play');

      // Set playing.
      this.$currentItem.data('playing', true);
    }

    // Method to handle pausing the current item.
    this.pauseItem = indexItem => {
      indexItem = indexItem || 0;
      if (indexItem > this.$items.length-1) {
        console.error("Error: cannot pause unknown item.");
        return;
      }

      // Pause the audio.
      const $audioElement = this.$currentItem.find('audio');
      $audioElement.trigger('pause');

      // First select the item.
      this.$currentItem.children('div.song-quick-action').replaceWith(quickActionPlay.clone());
      this.$playerControls.find('span:nth-child(2)').removeClass('glyphicon-pause').addClass('glyphicon-play');

      // Set playing.
      this.$currentItem.data('playing', false);
    }

    // Reference the playlist element
    this.$playlist = $($elOrId).find('section#playlist');
    if (!this.$playlist)
      console.error("Error: unable to find playlist element");
    else {
      // Check if we've provided a playlist.
      if (!playlist || playlist.length === 0)
        console.error("Error: no playlist provided");
      else {
        // Reference play controls.
        this.$playerControls = $('div#player-controls');
        if (!this.$playerControls)
          console.error("Error: no player controls found");
        else {
          // Show the player controls.
          this.$playerControls.removeClass('hidden');

          // Add listener to playlist element.
          _addPlaylistItemListener(this);
          _addPlayerControlsListener(this);

          // Loop through playlist object and insert playlist items.
          playlist.forEach(item => {
            item.title = item.title || "No Title";
            item.artist = item.artist || "No Artist";
            if (!item.url) {
              console.error(`Error: no url found for ${item.artist} - ${item.title}`);
              return;
            }

            // Create a playlist element.
            const $playListItem = _createPlaylistItem(item.title, item.artist);

            // Create an audio element and add the listener.
            const $audioElement = _createAudioElement(item.url);

            // Use the old addEventListener method so we can use
            // an arrow function to keep `this` from the current scope.
            $audioElement.children('audio').on('ended', () => { this.playItem(this.$currentItem.index()+1); });


            // Append the audio element to the playlist item.
            $playListItem.append($audioElement);

            // Add the element to the array and DOM.
            this.$playlist.append(
              this.$items[this.$items.push($playListItem)-1]
            );
          });

          // Set the current item to the first item.
          _selectItem(this, 0);
        }
      }
    }
  }

  /*************************************/
  /* Internal methods for Music Player */
  /*************************************/
  // For creating a song quick action element.
  function _createQuickActionDiv(isPlaying) {
    return $('<div/>', {
      class: 'song-quick-action',
      html: $('<span/>', {
        class: 'glyphicon ' + ((isPlaying) ? 'glyphicon-pause':'glyphicon-play'),
        'aria-hidden': 'true'
      })
    });
  }
  // For creating a song info element.
  function _createSongInfoDiv(title, artist) {
    return $('<div/>', {
      class: 'song-info',
      html: $('<h3/>', { text: title }).add($('<p/>', { text: artist }))
    });
  }
  // For creating an audio element.
  function _createAudioElement(uri) {
    return $('<div/>', {
      class: 'hidden',
      html: $('<audio/>', {
              class: 'audio-element',
              src: uri
            })
      });
  }
  // For creating a playlist item.
  function _createPlaylistItem(title, artist) {
     return $('<article/>', {
      class: 'player-row playlist-item',
      html: _createQuickActionDiv(false)
            .add(_createSongInfoDiv(title, artist)),
      data: { playing: false }
    });
  }
  // For selecting a playlist item.
  const quickActionPlay = _createQuickActionDiv(false);
  const quickActionPause = _createQuickActionDiv(true);
  function _selectItem(mp, index) {
    const $playListItems = mp.$playlist.children('article');
    const $audioItems = $playListItems.find('audio');

    // Pause and reset all other audio items.
    $audioItems.trigger('pause');
    $audioItems.each((_, el) => { el.currentTime = 0; });

    // Update UI and playing status.
    $playListItems.data('playing', false)
                  .children('div.song-quick-action')
                  .replaceWith(quickActionPlay.clone());

    // Set the current item.
    mp.$currentItem = mp.$items[index];

    // Get the playlist item from the array so
    // we can create a new element to replace the old
    // one in the player controls.
    const $songInfoDiv = _createSongInfoDiv(mp.playlistArr[index].title, mp.playlistArr[index].artist);

    // Replace it.
    mp.$playerControls.find(':last-child').replaceWith($songInfoDiv);
  }
  // For adding listeners to items.
  function _addPlaylistItemListener(mp) {
    function clickMe(e) {
      const $tar = $(e.target);
      const index = $tar.index();

      // Determine if we're playing already. If so,
      // pause playback. If not, start/resume it.
      const isPlaying = $tar.data('playing');
      if (isPlaying)
        mp.pauseItem(index);
      else
        mp.playItem(index);
    }

    // Delegate clicks from playlist items to playlist container.
    mp.$playlist.on('click', '.playlist-item', clickMe);
  }
  // For adding listeners to the player controls.
  function _addPlayerControlsListener(mp) {
    function clickMe(e) {
      const $tar = $(e.target);
      const index = mp.$currentItem.index();

      // Determine which button we pressed by its class.
      const targetClass = $tar.attr('class');
      const BACK_BTN = 'glyphicon-step-backward';
      const FWRD_BTN = 'glyphicon-step-forward';
      const btnClass = targetClass.slice(targetClass.indexOf(' ')+1);
      switch (btnClass) {
        case BACK_BTN:
            if (index === 0)
              mp.playItem(mp.$items.length-1);
            else
              mp.playItem(index-1);
          break;
        case FWRD_BTN:
            if (index === mp.$items.length-1)
              mp.playItem(0);
            else
              mp.playItem(index+1);
          break;
        default: // Play/Pause button
          const isPlaying = mp.$currentItem.data('playing');
          if (isPlaying)
            mp.pauseItem(index);
          else
            mp.playItem(index);
      }
    }

    // Delegate clicks from player controls buttons to player controls container.
    mp.$playerControls.on('click', 'span', clickMe);
  }
  
  // Return the constructor.
  return MusicPlayer;
}());

$(document).ready(function() {
  const MP = new MusicPlayer('#MusicPlayer', [
    { title:'On Hold', artist:'Edith Frost', url:'audio/edith_frost-on_hold.mp3' },
    { title:'How Can I Be So Thirsty Today', artist:'The Meat Purveyors', url:'audio/the_meat_purveyors-how_can_i_be_so_thirsty_today.mp3' },
    { title:'18 Wheels', artist:'Moonshine Willy', url:'audio/moonshine_willy-18_wheels.mp3' },
    { title:'Hold the Woodpile Down', artist:'The Holy Modal Rounders', url:'audio/the_holy_modal_rounders-hold_the_woodpile_down.mp3' },
    { title:'\'Til My Teardrops Turn To Gold', artist:'Rex Hobary & the Misery Boys', url:'audio/rex_hobary_and_the_misery_boys-til_my_teardrops_turn_to_gold.mp3' },
  ]);
});
