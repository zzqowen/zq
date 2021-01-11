import videojs from 'video.js';

export default function (id, options, cb) {
  // console.log(arguments);
  var player = videojs(id, options, function onPlayerReady() {
    cb && cb.call(player, videojs);
  });
};