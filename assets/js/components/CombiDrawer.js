/** @jsx React.DOM */
var React = require('react');
var paper = require('../../../bower_components/paper/dist/paper-core').exports;
var PaperScope = paper.PaperScope;
var Tool = paper.Tool;
var Terrain = require('../lib/terrain');

var CombiDrawer = React.createClass({
  getInitialState: function() {
    return {
      recording: false,
      playing: false,
      dragItem: null
    };
  },

  render: function(e) {
    return (
      <div className="drawer">
        <div className="drawer-tool">
          <button>Record</button>
          <button>Play</button>
          <button>Reset</button>
        </div>
        <canvas ref="canvas"></canvas>
      </div>
    );
  },

  componentDidMount: function() {
    var canvas = this.refs.canvas.getDOMNode();
    this.paper = new PaperScope();
    this.paper.setup(canvas);

    canvas.setAttribute('width', canvas.parentNode.offsetWidth);
    canvas.setAttribute('height', '500px');

    this.terrain = new Terrain(this.paper, 900, 450, 50, 50);
    this.terrain.draw();
    this.terrain.placeDefence('1-5');
    tool = new Tool();

    tool.onMouseDown = this.onMouseDown;
    tool.onMouseDrag = this.onMouseDrag;
    tool.onMouseUp = this.onMouseUp;
  },

  onRecord: function(e) {
    e.preventDefault();
  },
  onPlay: function(e) {
    e.preventDefault();
  },
  onReset: function(e) {
    e.preventDefault();
    this.terrain.placePlayers();
    this.terrain.placeDefence('1-5');
    this.terrain.placeBall();
  },

  onMouseDown: function(e) {
    if (e.item && e.item.draggable ) {
      this.setState({dragItem: e.item});
    }
  },

  onMouseDrag: function(e) {
    dragItem = this.state.dragItem;
    if (dragItem) {
      var ball = this.getItemByNodeName('ball');
      if (dragItem !== ball) {
        var intersections = dragItem.getIntersections(ball);
        if (intersections.length > 0 ) {
          var vector = ball.position.subtract(dragItem.position);
        }
      }
      dragItem.position = e.middlePoint;
      if (vector) {
        ball.position = dragItem.position.add(vector);
      }
      if (this.recording) {
        this.combi.push({
          x: e.middlePoint.x,
          y: e.middlePoint.y,
          name: dragItem.name
        });
        var ballPos = this.getItemByNodeName('ball').position;
        this.combi.push({
          x: ballPos.x,
          y: ballPos.y,
          name: 'ball'
        });
      }
    }
  },

  getItemByNodeName: function(name) {
    return this.paper.project.layers[0].children[name];
  },

  onMouseUp: function(e) {
    this.setState({dragItem: null});
  },

  onFrame: function(e) {
  }
});

module.exports = CombiDrawer;
