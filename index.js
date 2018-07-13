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
