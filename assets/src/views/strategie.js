var View = require('../View.js');
var _ = require('../lib/underscore-1.5.2.js');
var Paper = require('../lib/paper-full.min.js');
var Terrain = require('../lib/paperjs-tool.js');

StrategieView.prototype = new View();
StrategieView.constructor = StrategieView;
function StrategieView(selector, onSave, onRemove) {
  this.onSave = onSave;
  this.onRemove = onRemove;
  this.$el = selector
  this.dragItem = null;
  this.recording = false;
  this.paper;
  this.combi = [];
  this.tool;
  this.playersNode = null;
  this.playing = false;

  this.events = {
    'click': {
      '.reset': this.reset,
      '.record': this.record,
      '.combi': this.play,
      '.save': function(e) {
        e.preventDefault();
        var name = document.querySelector(this.$el + " input[name='name']").value;
        var data = {
            name: name,
            combi: this.combi
        };
        this.onSave(data);
      },
      '.btn-delete': function(e) {
        var combiId = e.target.getAttribute('data-combi-id');
        e.preventDefault();
        this.onRemove(combiId)
      }
    }
  };
}

StrategieView.prototype.setModel = function setModel(model) {
  this.combis = model;
  this.render();
};

StrategieView.prototype.reset = function reset() {
  this.terrain.placeDefence('1-5');
  this.terrain.placePlayers();
}

StrategieView.prototype._render = function() {
  var tplContent = document.getElementById('strat-template').innerHTML;
  var tpl = _.template(tplContent);
  document.querySelector(this.$el).innerHTML = tpl({combis: this.combis});

  var canvas = document.getElementById('canvas-compo');

  this.paper = new Paper.PaperScope();
  this.paper.setup(canvas);

  this.terrain = new Terrain(this.paper, 900, 450, 50, 50);
  this.terrain.draw();
  this.terrain.placeDefence('1-5');

  this.tool = new Paper.Tool();

  this.tool.onMouseDown = this.paperOnMouseDown.bind(this);

  this.tool.onMouseDrag = this.paperOnMouseDrag.bind(this);

  this.tool.onMouseUp = this.paperOnMouseUp.bind(this);

  this.paper.view.onFrame = this.paperOnFrame.bind(this);
};

StrategieView.prototype.paperOnMouseDown = function(e) {
  if (e.item && e.item.draggable ) {
    this.dragItem = e.item;
  }
};

StrategieView.prototype.paperOnMouseDrag = function(e) {
  if (this.dragItem) {
    var ball = this.getItemByNodeName('ball');

    if (this.dragItem !== ball) {
      var intersections = this.dragItem.getIntersections(ball);

      if (intersections.length > 0 ) {
        var vector = ball.position.subtract(this.dragItem.position);
      }
    }

    this.dragItem.position = e.middlePoint;

    if (vector) {
      ball.position = this.dragItem.position.add(vector);
    }
    if (this.recording) {
      this.combi.push({
        x: e.middlePoint.x,
        y: e.middlePoint.y,
        name: this.dragItem.name
      });

      var ballPos = this.getItemByNodeName('ball').position;
      this.combi.push({
        x: ballPos.x,
        y: ballPos.y,
        name: 'ball'
      });

    }
  }
};

StrategieView.prototype.paperOnMouseUp = function(e) {
  this.dragItem = null;
};

StrategieView.prototype.paperOnFrame = function(e) {
  if (this.combi && this.combi.length > 0 && this.playing) {
    this._play();
  }
};

StrategieView.prototype.record = function() {
  this.recording = !this.recording;

  if (!this.recording) {
    sessionStorage.setItem('combi', JSON.stringify(this.combi));
  } else {
    document.querySelector(this.$el + ' .record').classList.add('disabled');
    this.renderSaveBox();
    sessionStorage.removeItem('combi');
  }
};

StrategieView.prototype.play = function(e) {
  var combiId = e.target.getAttribute('data-combi-id');

  /* Add a remove button for the selected combi */
  var wrapper = document.createElement('span');
  wrapper.setAttribute('id', 'remove-combi');
  wrapper.classList.add('remove-combi');
  wrapper.classList.add('btn');
  wrapper.classList.add('btn-delete');
  wrapper.setAttribute('data-combi-id', combiId);

  var oldRemoveBtn = document.getElementById('remove-combi');
  if (oldRemoveBtn) {
    oldRemoveBtn.parentNode.removeChild(oldRemoveBtn);
  }

  document.querySelector('.toolbar').appendChild(wrapper);

  this.terrain.placePlayers();
  this.terrain.placeDefence('1-5');

  var aCombi = this.combis.filter(function(combi) {
    return combi.id === combiId;
  });
  this.combi = aCombi[0].combi.slice(0);

  var oldSelectedCombi = document.querySelector('.combi.selected');
  if (oldSelectedCombi) {
    oldSelectedCombi.classList.remove('selected');
  }
  e.target.classList.add('selected');

  this.playing = true;
};

StrategieView.prototype.getItemByNodeName = function(nodeName) {
  return this.paper.project.layers[0].children[nodeName];
};

StrategieView.prototype._play = function() {
  var step = this.combi.shift();
  var item = this.getItemByNodeName(step.name);
  item.position = new Paper.Point(step.x, step.y);

  if (this.combi.length === 0) {
    this.playing = false;
  }

  step = this.combi.shift();
  item = this.getItemByNodeName(step.name);
  item.position = new Paper.Point(step.x, step.y);
};

StrategieView.prototype.renderSaveBox = function renderSaveBox() {
  document.querySelector(this.$el + ' .save-box').classList.remove('height0');
};

module.exports = StrategieView;
