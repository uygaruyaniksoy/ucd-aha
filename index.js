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

var morePreviousMarkers = [];
var previousMarkers = [];
var markers = [];
var lastFrameTime = (new Date()).getTime();
var clickInterval = 400;

setInterval(() => {
  console.log(markers);
  if (
    morePreviousMarkers.indexOf(0) >= 0 &&
    previousMarkers.indexOf(0) < 0 &&
    markers.indexOf(0) >= 0
  ) {
    setTimeout(() => {
      console.log("ROTATE");
      model.emit('click');
    }, 100);
  }
  morePreviousMarkers = previousMarkers;
  previousMarkers = markers;
  markers = [];
}, clickInterval);

setTimeout(() => {
  window.arController.addEventListener('getMarker', function(ev) {
    var markerId = ev.data.marker.id
    if (markers.indexOf(markerId) < 0 && markerId >= 0) {
      markers.push(markerId);
    }
    // console.log("Detected marker with ids:", ev.data.marker.id, ev.data.marker.idPatt, ev.data.marker.idMatrix);
    // console.log("Marker data", ev.data.marker);
    // console.log("morePreviousMarkers: ", morePreviousMarkers);
    // console.log("previousMarkers: ", previousMarkers);
    // console.log("markers: ", markers);
  });
  console.log("getmarker eventlistener");
}, 5000)
