var audio = new Audio('bee2.mp3');
var showingLetter = false;

var firstMenu = document.getElementById('menu1');
var secondMenu = document.getElementById('menu2');
var model = document.getElementById('model-animator');
var selectedMenu = "";

function setVisible(item) {
  item.setAttribute('visible', 'true');
}

function setInvisible(item) {
  item.setAttribute('visible', 'false');
}

function playAudio() {
  // audio.play();
}

AFRAME.registerComponent('menu1-item1', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      if (!firstMenu.getAttribute('visible')) return; // if menu is invisible dont register onclick event
      console.log("first item selected");
      setVisible(secondMenu); // procedes into secondMenu
      setInvisible(firstMenu);
    });
  }
});

AFRAME.registerComponent('coin-menu-item', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      if (!secondMenu.getAttribute('visible')) return;
      model.setAttribute('gltf-model', '#coin')
      setVisible(firstMenu);
      setInvisible(secondMenu);
    });
  }
});

AFRAME.registerComponent('apple-menu-item', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      if (!secondMenu.getAttribute('visible')) return;
      model.setAttribute('gltf-model', '#apple')
      setVisible(firstMenu);
      setInvisible(secondMenu);
    });
  }
});

AFRAME.registerComponent('model-animator', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      if (!showingLetter) this.emit('show-letter');
      else this.emit('hide-letter');
      showingLetter = !showingLetter;
    });
  }
});

var previousMarkers = [];
var currentMarkers = [];
var gestures = [];

var clickInterval = 100;
var markers;


setInterval(() => {
  if (!markers) return;
  currentMarkers = markers.filter(m => m.object3D.visible);

  let gestureSize = gestures.length;
  gestures = gestures.concat(previousMarkers.filter(m => currentMarkers.indexOf(m) < 0));
  if (gestures.length > 0 && gestureSize == 0) {
    setTimeout(() => {
      handleGestures(gestures);
      gestures = [];
      console.log('gestures cleaned');
    }, 1000);
  }


  // console.log(gestures);
  previousMarkers = currentMarkers;
  currentMarkers = [];
}, clickInterval);

setTimeout(() => {
  markers = [...$('a-marker')];
  console.log("getmarker eventlistener");
}, 3000)

function handleGestures(gestures) {
  console.log('gesture');
  $('#box')[0].emit('rotate'+Math.max(Math.min(gestures.length, 4), 1));
}
