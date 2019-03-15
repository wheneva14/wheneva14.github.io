// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../js/chunk-index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indexInit;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import  {TweenMax}  from "gsap/TweenMax";
// import ScrollMagic from 'scrollmagic';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
function indexInit() {
  init();
}

var Ball =
/*#__PURE__*/
function () {
  function Ball(x, y, radius, dx, dy, color) {
    _classCallCheck(this, Ball);

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }, {
    key: "update",
    value: function update(delta) {
      if (this.y + this.radius + this.dy > canvasLogicalHeight) {
        this.dy = -this.dy * friction;
      } else {
        this.dy += gravity * delta;
      }

      if (this.x + this.radius + this.dx > canvasLogicalWidth || this.x - this.radius + this.dx < 0) {
        this.dx = -this.dx;
      }

      this.x += this.dx * delta;
      this.y += this.dy;
    }
  }, {
    key: "set",
    value: function set(x, y, dx, dy) {
      x ? this.x = x : null;
      y ? this.y = y : null;
      dx ? this.dx = dx : null;
      dy ? this.dy = dy : null;
    }
  }]);

  return Ball;
}();

var colorArray = ["#2B3542", "#305854", "#558A84", "#F0CFC4", "#D8726B"];
var gravity = 0.06;
var friction = 0.87;
var mouse = {
  x: undefined,
  y: undefined
};
var animationFrame;
var ballArray = [];
var canvasReal = document.createElement('canvas');
var pixelRatio = window.devicePixelRatio || 1;
var canvas = document.createElement('canvas');
canvasReal.setAttribute("id", "canvas");
canvas.height = window.innerHeight * pixelRatio;
canvas.width = window.innerWidth * pixelRatio;
canvasReal.height = window.innerHeight * pixelRatio;
canvasReal.width = window.innerWidth * pixelRatio;
document.body.append(canvasReal);
var ctx = canvas.getContext("2d");
var ctxReal = canvasReal.getContext("2d");
var canvasLogicalWidth = document.getElementById("canvas").clientWidth;
var canvasLogicalHeight = document.getElementById("canvas").clientHeight;
ctx.scale(pixelRatio, pixelRatio);
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("resize", function () {
  canvas.height = window.innerHeight * pixelRatio;
  canvas.width = window.innerWidth * pixelRatio;
  canvasLogicalWidth = document.getElementById("canvas").clientWidth;
  canvasLogicalHeight = document.getElementById("canvas").clientHeight;
  ctx.scale(pixelRatio, pixelRatio);
  init();
});
window.addEventListener('touchmove', function (e) {
  // Cache the client X/Y coordinates
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
}, false);
window.addEventListener('touchend', function (e) {
  // Cache the client X/Y coordinates
  mouse.x = undefined;
  mouse.y = undefined;
  clearInterval(spawnId);
}, false);
var spawnId;
window.addEventListener("mousedown", function (event) {
  spawnId = setInterval(function () {
    var radius = randomInt(8, 20);
    var x = mouse.x;
    var y = mouse.y;
    var dx = Math.random() * 0.24 - 0.12;
    var dy = randomInt(-2, 2);
    var color = colorArray[randomInt(0, colorArray.length - 1)];
    ballArray.push(new Ball(x, y, radius, dx, dy, color));
  }, 40);
});
window.addEventListener("mouseup", function () {
  clearInterval(spawnId);
});
window.addEventListener("touchstart", function () {
  spawnId = setInterval(function () {
    var radius = randomInt(8, 20);
    var x = mouse.x;
    var y = mouse.y;
    var dx = Math.random() * 0.24 - 0.12;
    var dy = randomInt(-2, 2);
    var color = colorArray[randomInt(0, colorArray.length - 1)];
    ballArray.push(new Ball(x, y, radius, dx, dy, color));
  }, 40);
});

function init() {
  cancelAnimationFrame(animationFrame);
  ballArray = [];

  for (var i = 0; i < 0; i++) {
    var radius = randomInt(8, 20);
    var x = randomInt(0, canvasLogicalWidth - radius - radius) + radius;
    var y = randomInt(0, canvasLogicalHeight - radius);
    var dx = Math.random() * 0.24 - 0.12;
    var dy = randomInt(-2, 2);
    var color = colorArray[randomInt(0, colorArray.length - 1)];
    ballArray.push(new Ball(x, y, radius, dx, dy, color));
  }

  requestAnimationFrame(animate);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
} // var lastCalledTime;
// var fps;
// var diff;


var delta = 0;
var lastRanTime = 0;
var timestep = 1000 / 60;
var loopPerSecound;
var lastLogTime = 0;
var cornerLength = 50;
var i = 0;
var j = 0;
var fontSize = 20;

function animate(timestamp) {
  lastLogTime == 0 ? lastLogTime = timestamp : null;
  delta += timestamp - lastRanTime;

  if (timestamp - lastLogTime >= 300) {
    loopPerSecound = Math.floor(1000 / (timestamp - lastRanTime));
    lastLogTime = timestamp;
  }

  lastRanTime = timestamp; // if(!lastCalledTime) {
  //   lastCalledTime = Date.now();
  //   fps = 0;
  // } else {
  //   diff = (Date.now() - lastCalledTime)/1000;
  //   lastCalledTime = Date.now();
  //   fps = Math.round(1/diff);
  // }

  ctx.clearRect(0, 0, canvasLogicalWidth, canvasLogicalHeight);
  ctxReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
  ctx.beginPath();
  ctx.moveTo(0, cornerLength);
  ctx.lineTo(0, 0);
  ctx.lineTo(cornerLength, 0);
  ctx.moveTo(canvasLogicalWidth - cornerLength, 0);
  ctx.lineTo(canvasLogicalWidth, 0);
  ctx.lineTo(canvasLogicalWidth, cornerLength);
  ctx.moveTo(canvasLogicalWidth - cornerLength, canvasLogicalHeight);
  ctx.lineTo(canvasLogicalWidth, canvasLogicalHeight);
  ctx.lineTo(canvasLogicalWidth, canvasLogicalHeight - cornerLength);
  ctx.moveTo(0, canvasLogicalHeight - cornerLength);
  ctx.lineTo(0, canvasLogicalHeight);
  ctx.lineTo(cornerLength, canvasLogicalHeight);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";
  ctx.stroke();

  while (delta >= timestep) {
    for (i = 0; i < ballArray.length; i++) {
      ballArray[i].update(delta);
    }

    delta -= timestep;
  }

  for (j = 0; j < ballArray.length; j++) {
    ballArray[j].draw();
  }

  ctx.font = "".concat(fontSize, "px times");
  ctx.fillStyle = "#333";
  ctx.fillText(canvas.width, 20, 20);
  ctx.fillText(canvas.height, 20, 40);
  ctx.fillText(canvasLogicalWidth, 20, 60);
  ctx.fillText(canvasLogicalHeight, 20, 80);
  ctx.fillText(pixelRatio, 20, 100);
  ctx.fillText(ballArray.length, 20, 120);
  ctx.fillText(loopPerSecound, 20, 140);
  ctxReal.drawImage(canvas, 0, 0);
  animationFrame = requestAnimationFrame(animate);
}
},{"jquery":"../../../node_modules/jquery/dist/jquery.js"}]},{},[], null)
//# sourceMappingURL=chunk-index.107c9a44.map