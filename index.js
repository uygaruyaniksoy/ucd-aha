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

  document.addEventListener('shortleftslide', handleShortLeftSlide);
  document.addEventListener('leftslide', handleLeftSlide);
  document.addEventListener('longleftslide', handleLongLeftSlide);
  document.addEventListener('shortrightslide', handleShortRightSlide);
  document.addEventListener('rightslide', handleRightSlide);
  document.addEventListener('longrightslide', handleLongRightSlide);
  document.addEventListener('downslide', handleDownSlide);
  document.addEventListener('upslide', handleUpSlide);
}, 3000)

function handleGestures(gestures) {
  let includesArray = (first, second) => {
    let index = 0;
    for (var i = 0; i < second.length; i++) {
      if (first.slice(index).indexOf(second[i]) >= 0) {
        index = first.slice(index).indexOf(second[i]) + index;
      } else {
        return false;
      }
    }
    return true;
  }
  console.log('gesture');
  let m1 = $('a-marker[value="2"]')[0];
  let m2 = $('a-marker[value="3"]')[0];
  let m3 = $('a-marker[value="4"]')[0];
  let m4 = $('a-marker[value="5"]')[0];
  let m5 = $('a-marker[value="6"]')[0];
  let m6 = $('a-marker[value="7"]')[0];
  let m7 = $('a-marker[value="8"]')[0];
  let m8 = $('a-marker[value="9"]')[0];
  let events = [
    { markers: [m3, m4], event: 'shortrightslide' },
    { markers: [m2, m3, m4], event: 'longrightslide' },
    { markers: [m2, m1], event: 'shortleftslide' },
    { markers: [m3, m2, m1], event: 'longleftslide' },
    { markers: [m5, m6], event: 'rightslide' },
    { markers: [m6, m5], event: 'leftslide' },
    { markers: [m7, m8], event: 'downslide' },
    { markers: [m8, m7], event: 'upslide' },
  ];
  let found = false;
  events.forEach((e) => {
    if (found) return;
    if (includesArray(gestures, e.markers)) {
      console.log(e.event);
      document.dispatchEvent(new Event(e.event));
      found = true;
    }
  });
  // $('#box')[0].emit('rotate'+Math.max(Math.min(gestures.length, 4), 1));
}

function handleShortRightSlide(event) {
  $('#box')[0].emit('rotate1');
}

function handleLongRightSlide(event) {
  $('#box')[0].emit('rotate2');
}

function handleShortLeftSlide(event) {
  $('#box')[0].emit('color1');
}

function handleLongLeftSlide(event) {
  $('#box')[0].emit('color2');
}

function handleLeftSlide(event) {
  // if ($('#temp-anim').length > 0) return;
  animate(selection, {
    'id': "temp-anim",
    'attribute': "position",
    'dur': "600",
    'from': selectionDistance(selectedValue),
    'to': selectionDistance(--selectedValue)
  })
}

function handleRightSlide(event) {
  // if ($('#temp-anim').length > 0) return;
  animate(selection, {
    'id': "temp-anim",
    'attribute': "position",
    'dur': "600",
    'from': selectionDistance(selectedValue),
    'to': selectionDistance(++selectedValue)
  })
}

function handleDownSlide(event) {
  let model = document.getElementById('model_' + ((selectedValue + items.length) % items.length));
  animate(model, {
    'id': "temp-anim",
    'attribute': "rotation",
    'dur': "600",
    'from': '90 180 0',
    'to': '-90 0 0'
  }).next({
    'id': "temp-anim",
    'attribute': "position",
    'dur': "600",
    'from': ('0 0.3 ' + (-bottomOffset)),
    'to': selectionDistance(selectedValue)
    });
}

function handleUpSlide(event) {
  let model = document.getElementById('model_' + ((selectedValue + items.length) % items.length));
  animate(model, {
    'id': "temp-anim",
    'attribute': "position",
    'dur': "600",
    'from': selectionDistance(selectedValue),
    'to': ('0 0.3 ' + (-bottomOffset))
  }).next({
      'id': "temp-anim",
      'attribute': "rotation",
      'dur': "600",
      'from': '-90 0 0',
      'to': '90 180 0'
    });
  setTimeout(() => {
    audio.play();
  }, 600);
}


var image3D = document.getElementById('spread-image');
var selection = document.getElementById('selection-identicatior');

var items = ['coin', 'ink', 'boy', 'snake', 'apple'];
var distanceFromCenter = 1.25;
var bottomOffset = 1.00;
var selectionDistance = (i) => "" +
      ((distanceFromCenter) * Math.sin(Math.PI * 2 * i / items.length)) +
      " 0 " +
      ((- ((distanceFromCenter) * Math.cos(Math.PI * 2 * i / items.length))) - bottomOffset + 0.05);

var selectedValue = 0;
image3D.setAttribute('position', '0 0 ' + (-bottomOffset));
selection.setAttribute('position', selectionDistance(selectedValue));

items.forEach((item, i) => {
  var newElement = document.createElement("a-entity");
  newElement.setAttribute('id', "model_"+i);
  newElement.setAttribute('gltf-model', "#"+item);
  newElement.setAttribute('scale', "0.25 0.25 0.25");
  newElement.setAttribute('position', "" +
                                    (distanceFromCenter * Math.sin(Math.PI * 2 * i / items.length)) + // x y z
                                    " 0 " +
                                    ((- (distanceFromCenter * Math.cos(Math.PI * 2 * i / items.length))) - bottomOffset) );
  newElement.setAttribute('rotation', "-90 0 0");

  image3D.parentEl.appendChild(newElement);
});

var animationCounter = 0;
function animate(element, options) {
  var newElement = document.createElement("a-animation");
  var id = options.id;
  var animId = animationCounter++;
  newElement.setAttribute('id', id + animId);
  newElement.setAttribute('begin', id + animId);

  Object.keys(options).forEach((opt) => {
    newElement.setAttribute(opt, options[opt]);
  });
  element.appendChild(newElement);
  element.emit(id + animId);
  setTimeout(() => {
    $('#' + id + animId).remove();
  }, options.dur);
  return {
    next: function(opts) {
      setTimeout(() => animate(element, opts), options.dur);
    }
  };
}
