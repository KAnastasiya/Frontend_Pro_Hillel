/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Получение случайного целого неравномерно распределенного числа между min (включительно) и max (не включая max)
 * @param  {Number} min Минимальное значение параметра
 * @param  {Number} max Максимальное значение параметра
 * @return {Number}
 */
var getRandomParam = exports.getRandomParam = function getRandomParam(min, max) {
  var res = void 0;
  // Цикл do while исключает получение нуля
  do {
    res = Math.floor(Math.random() * (max - min) + min);
  } while (!res);
  return res;
};

/**
 * Вычисление времени прохождения некоторой дистанции с заданной скоростью
 * @param  {Number} distance Дистанция
 * @param  {Number} speed    Скорость
 * @return {Number}          Время
 */
var getTimeByDistanceAndSpeed = exports.getTimeByDistanceAndSpeed = function getTimeByDistanceAndSpeed(distance, speed) {
  return Math.floor(distance / speed);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasicRace = function () {
  function BasicRace(name) {
    _classCallCheck(this, BasicRace);

    this.name = name;
    this.health = 100;
    this.power = 50;
    this.damage = 15;
    this.walkingSpeed = 5;
    this.runningSpeed = 15;
    this.maxHealth = 110;
  }

  _createClass(BasicRace, [{
    key: 'walk',
    value: function walk(distance) {
      console.log(this.name + ' walk ' + distance + 'km with speed ' + this.walkingSpeed + 'km/h (time - ' + (0, _utils.getTimeByDistanceAndSpeed)(distance, this.walkingSpeed) + 'h)');
    }
  }, {
    key: 'run',
    value: function run(distance) {
      console.log(this.name + ' run ' + distance + 'km with speed ' + this.runningSpeed + 'km/h (time - ' + (0, _utils.getTimeByDistanceAndSpeed)(distance, this.runningSpeed) + 'h)');
    }
  }]);

  return BasicRace;
}();

exports.default = BasicRace;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BasicRace2 = __webpack_require__(1);

var _BasicRace3 = _interopRequireDefault(_BasicRace2);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cache = {};

var Elf = function (_BasicRace) {
  _inherits(Elf, _BasicRace);

  function Elf(name) {
    _classCallCheck(this, Elf);

    var _this = _possibleConstructorReturn(this, (Elf.__proto__ || Object.getPrototypeOf(Elf)).call(this, name));

    _this.health = 70;
    _this.power = 20;
    _this.damage = 40;
    _this.race = 'elf';
    _this.maxArrows = 10;
    _this.maxShootDistance = 90;
    _this.humanHealthDecreaseStepForOneArrow = 5;
    _this.humanHealthDecreaseStepForOneUnitOfDistance = 0.1;
    _this._id = (0, _utils.getRandomParam)(10, 1);
    cache[_this._id] = 0;
    return _this;
  }

  _createClass(Elf, [{
    key: 'shoot',
    value: function shoot(enemy, arrows, distance) {
      this.shootDistance = distance;
      this.newArrows = cache[this._id] + arrows;
      cache[this._id] = this.newArrows;
      console.info(this.name + ' (' + this.race + ') shot ' + arrows + ' arrows on ' + this.shootDistance + ' (he can shoot still ' + (this.maxArrows - cache[this._id]) + ' arrows)');
      enemy.updateHealth(-Math.floor(arrows * this.humanHealthDecreaseStepForOneArrow + this.shootDistance * this.humanHealthDecreaseStepForOneUnitOfDistance));
    }
  }, {
    key: 'arrowsCount',
    get: function get() {
      return cache[this._id];
    }
  }]);

  return Elf;
}(_BasicRace3.default);

exports.default = Elf;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BasicRace2 = __webpack_require__(1);

var _BasicRace3 = _interopRequireDefault(_BasicRace2);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cache = {};

var Human = function (_BasicRace) {
  _inherits(Human, _BasicRace);

  function Human(name) {
    _classCallCheck(this, Human);

    var _this = _possibleConstructorReturn(this, (Human.__proto__ || Object.getPrototypeOf(Human)).call(this, name));

    _this.health = 80;
    _this.power = 30;
    _this.damage = 10;
    _this.race = 'human';
    _this.maxBuild = 3;
    _this.healthIncrementStep = 10;
    _this._id = (0, _utils.getRandomParam)(10, 1);
    cache[_this._id] = 0;
    return _this;
  }

  _createClass(Human, [{
    key: 'build',
    value: function build() {
      cache[this._id] += 1;
      console.info(this.name + ' (' + this.race + ') built (he can build still ' + (this.maxBuild - this.builds) + ' times)');
      this.updateHealth();
    }
  }, {
    key: 'updateHealth',
    value: function updateHealth() {
      var healthIncrement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.healthIncrementStep;

      var prevHealth = this.health;
      var newHealth = this.health + healthIncrement;
      this.health = newHealth <= this.maxHealth ? newHealth : this.maxHealth;
      console.log(this.name + ' (' + this.race + ') new health = ' + this.health + ' (' + prevHealth + ' + ' + healthIncrement + ')');
    }
  }, {
    key: 'buildCount',
    get: function get() {
      return cache[this._id];
    }
  }]);

  return Human;
}(_BasicRace3.default);

exports.default = Human;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BasicRace2 = __webpack_require__(1);

var _BasicRace3 = _interopRequireDefault(_BasicRace2);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cache = {};

var Orc = function (_BasicRace) {
  _inherits(Orc, _BasicRace);

  function Orc(name) {
    _classCallCheck(this, Orc);

    var _this = _possibleConstructorReturn(this, (Orc.__proto__ || Object.getPrototypeOf(Orc)).call(this, name));

    _this.health = 40;
    _this.power = 80;
    _this.damage = 130;
    _this.race = 'orc';
    _this.maxAttacks = 5;
    _this.powerIncrementStep = 10;
    _this.humanHealthDecreaseStep = 0.2;
    _this._id = (0, _utils.getRandomParam)(10, 1);
    cache[_this._id] = 0;
    return _this;
  }

  _createClass(Orc, [{
    key: 'attack',
    value: function attack(enemy) {
      cache[this._id] += 1;
      this.updatePower();
      enemy.updateHealth(-Math.floor(this.power * this.humanHealthDecreaseStep));
    }
  }, {
    key: 'updatePower',
    value: function updatePower() {
      var powerIncrement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.powerIncrementStep;

      var prevPower = this.power;
      this.power += powerIncrement;
      console.info(this.name + ' (' + this.race + ') attacked (he can attack still ' + (this.maxAttacks - this.attacks) + ' times). His new power = ' + this.power + ' (' + prevPower + ' + ' + powerIncrement + ')');
    }
  }, {
    key: 'attackCount',
    get: function get() {
      return cache[this._id];
    }
  }]);

  return Orc;
}(_BasicRace3.default);

exports.default = Orc;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Human = __webpack_require__(3);

var _Human2 = _interopRequireDefault(_Human);

var _Orc = __webpack_require__(4);

var _Orc2 = _interopRequireDefault(_Orc);

var _Elf = __webpack_require__(2);

var _Elf2 = _interopRequireDefault(_Elf);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Номер текущего хода
 * @type {Number}
 */
var turnNumber = void 0;

/**
 * Создание бойца
 * @param  {String} race Тип бойца (его раса)
 * @param  {String} name Имя бойца
 * @return {Object}
 */
var createFighter = function createFighter(race, name) {
  switch (race) {
    case 'human':
      return new _Human2.default(name);
    case 'orc':
      return new _Orc2.default(name);
    case 'elf':
      return new _Elf2.default(name);
    default:
      console.error('It is impossible to create a fighter. Unknown race of fighter - ' + race);
  }
};

/**
 * Делаем ход
 * @param  {Object} fighter Боец, который делает ход
 * @param  {Object} enemy   Противник, который противостоит бойцу
 */
var makeMove = function makeMove(fighter, enemy) {
  switch (fighter.race) {
    case 'human':
      fighter.build();
      break;
    case 'orc':
      fighter.attack(enemy);
      break;
    case 'elf':
      var currentArrows = (0, _utils.getRandomParam)(10, 1);
      var currentDistance = (0, _utils.getRandomParam)(90, 1);
      var battleNeedStop = isBattleNeedStop(fighter, currentArrows, currentDistance);
      if (battleNeedStop) {
        stopBattle(battleNeedStop);
      } else {
        fighter.shoot(enemy, currentArrows, currentDistance);
      }
      break;
    default:
      console.error('It is impossible to make a move. Unknown race of fighter');
  }
};

/**
 * Проверяем нужно ли остановить бой исходя из состояния каждого бойца
 * @param  {Object}  fighter Проверяемый боец
 * @return {String}
 */
var isBattleNeedStop = function isBattleNeedStop(fighter, arrows, distance) {
  switch (fighter.race) {
    case 'human':
      if (fighter.health === 0) {
        return 'Battle stopped. ' + fighter.name + ' loses :-(';
      } else if (fighter.buildCount() === fighter.maxBuild) {
        return 'Battle stopped. ' + fighter.name + ' (' + fighter.race + ') can not build more';
      }
      return '';
    case 'orc':
      if (fighter.attackCount() === fighter.maxAttacks) {
        return 'Battle stopped. ' + fighter.name + ' (' + fighter.race + ') can not attack more';
      }
      return '';
    case 'elf':
      if (fighter.arrowsCount() >= fighter.maxArrows) {
        return 'Battle stopped. ' + fighter.name + ' (' + fighter.race + ') can not shoot more';
      } else if (fighter.arrowsCount() + arrows > fighter.maxArrows) {
        return 'Battle stopped. ' + fighter.name + ' (' + fighter.race + ') can not shoot ' + arrows + ' arrows. He can shoot only ' + (fighter.maxArrows - fighter.arrows);
      } else if (distance > fighter.maxShootDistance) {
        return 'Battle stopped. ' + fighter.name + ' (' + fighter.race + ') can not shoot on ' + distance + ' meters. He can shoot only on ' + fighter.maxShootDistance;
      }
      return '';
    default:
      return 'Battle stopped. Unknown race of fighter - ' + fighter.race;
  }
};

/**
 * Остановка боя
 * @param  {String} message Текст сообщения, которое будет отображено пользователю
 */
var stopBattle = function stopBattle(message) {
  console.warn(message);
  turnNumber = 0;
};

/**
 * Запуск боя
 * @param  {String} fighterRace1 Тип 1-ого бойца
 * @param  {String} fighterName1 Имя 1-ого бойца
 * @param  {String} fighterRace2 Тип 2-ого бойца
 * @param  {String} fighterName2 Имя 2-ого бойца
 */
var battle = function battle(fighterRace1, fighterName1, fighterRace2, fighterName2) {
  turnNumber = 100;
  var fighter1 = createFighter(fighterRace1, fighterName1);
  var fighter2 = createFighter(fighterRace2, fighterName2);

  if (fighter1 && fighter2 && fighter1.race !== fighter2.race) {
    if (fighter1.race !== 'human' && fighter2.race !== 'human') {
      console.error('Battle between ' + fighter1.race + ' and ' + fighter2.race + ' is impossible. One of the fighters must be a human');
    } else {
      console.warn('Battle started');
      while (turnNumber > 0) {
        var battleNeedStop = isBattleNeedStop(fighter1) || isBattleNeedStop(fighter2);
        if (battleNeedStop) {
          stopBattle(battleNeedStop);
        } else if (turnNumber % 2) {
          makeMove(fighter2, fighter1);
        } else {
          makeMove(fighter1, fighter2);
        }
        turnNumber -= 1;
      }
    }
  } else {
    console.error('Battle between two fighters of one race is impossible');
  }
};

/* ----------------------------------------------------- */
battle('elf', 'Argon', 'human', 'Bob');
console.log('*******************************************');
battle('human', 'Bony', 'orc', 'Bolg');
console.log('*******************************************');
battle('human', 'Jake', 'elf', 'Argon');
console.log('*******************************************');
battle('orc', 'Bolg', 'ninja', 'Katty');
console.log('*******************************************');
battle('orc', 'Bolg', 'elf', 'Argon');

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzA4NTlkODQ0ZDc0ZmE1OWY4MmEiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9CYXNpY1JhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9FbGYuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IdW1hbi5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL09yYy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHQuanMiXSwibmFtZXMiOlsiZ2V0UmFuZG9tUGFyYW0iLCJtaW4iLCJtYXgiLCJyZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZXRUaW1lQnlEaXN0YW5jZUFuZFNwZWVkIiwiZGlzdGFuY2UiLCJzcGVlZCIsIkJhc2ljUmFjZSIsIm5hbWUiLCJoZWFsdGgiLCJwb3dlciIsImRhbWFnZSIsIndhbGtpbmdTcGVlZCIsInJ1bm5pbmdTcGVlZCIsIm1heEhlYWx0aCIsImNvbnNvbGUiLCJsb2ciLCJjYWNoZSIsIkVsZiIsInJhY2UiLCJtYXhBcnJvd3MiLCJtYXhTaG9vdERpc3RhbmNlIiwiaHVtYW5IZWFsdGhEZWNyZWFzZVN0ZXBGb3JPbmVBcnJvdyIsImh1bWFuSGVhbHRoRGVjcmVhc2VTdGVwRm9yT25lVW5pdE9mRGlzdGFuY2UiLCJfaWQiLCJlbmVteSIsImFycm93cyIsInNob290RGlzdGFuY2UiLCJuZXdBcnJvd3MiLCJpbmZvIiwidXBkYXRlSGVhbHRoIiwiSHVtYW4iLCJtYXhCdWlsZCIsImhlYWx0aEluY3JlbWVudFN0ZXAiLCJidWlsZHMiLCJoZWFsdGhJbmNyZW1lbnQiLCJwcmV2SGVhbHRoIiwibmV3SGVhbHRoIiwiT3JjIiwibWF4QXR0YWNrcyIsInBvd2VySW5jcmVtZW50U3RlcCIsImh1bWFuSGVhbHRoRGVjcmVhc2VTdGVwIiwidXBkYXRlUG93ZXIiLCJwb3dlckluY3JlbWVudCIsInByZXZQb3dlciIsImF0dGFja3MiLCJ0dXJuTnVtYmVyIiwiY3JlYXRlRmlnaHRlciIsImVycm9yIiwibWFrZU1vdmUiLCJmaWdodGVyIiwiYnVpbGQiLCJhdHRhY2siLCJjdXJyZW50QXJyb3dzIiwiY3VycmVudERpc3RhbmNlIiwiYmF0dGxlTmVlZFN0b3AiLCJpc0JhdHRsZU5lZWRTdG9wIiwic3RvcEJhdHRsZSIsInNob290IiwiYnVpbGRDb3VudCIsImF0dGFja0NvdW50IiwiYXJyb3dzQ291bnQiLCJtZXNzYWdlIiwid2FybiIsImJhdHRsZSIsImZpZ2h0ZXJSYWNlMSIsImZpZ2h0ZXJOYW1lMSIsImZpZ2h0ZXJSYWNlMiIsImZpZ2h0ZXJOYW1lMiIsImZpZ2h0ZXIxIiwiZmlnaHRlcjIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBOzs7Ozs7QUFNTyxJQUFNQSwwQ0FBaUIsU0FBakJBLGNBQWlCLENBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzFDLE1BQUlDLFlBQUo7QUFDQTtBQUNBLEtBQUc7QUFDREEsVUFBTUMsS0FBS0MsS0FBTCxDQUFZRCxLQUFLRSxNQUFMLE1BQWlCSixNQUFNRCxHQUF2QixDQUFELEdBQWdDQSxHQUEzQyxDQUFOO0FBQ0QsR0FGRCxRQUVTLENBQUNFLEdBRlY7QUFHQSxTQUFPQSxHQUFQ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akQsUUFBUUMsR0FBUixDQUFZLDZDQUFaO0FBQ0FnRCxPQUFPLEtBQVAsRUFBYyxNQUFkLEVBQXNCLE9BQXRCLEVBQStCLE9BQS9CO0FBQ0FqRCxRQUFRQyxHQUFSLENBQVksNkNBQVo7QUFDQWdELE9BQU8sS0FBUCxFQUFjLE1BQWQsRUFBc0IsS0FBdEIsRUFBNkIsT0FBN0IsRSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MDg1OWQ4NDRkNzRmYTU5ZjgyYSIsIi8qKlxuICog0J/QvtC70YPRh9C10L3QuNC1INGB0LvRg9GH0LDQudC90L7Qs9C+INGG0LXQu9C+0LPQviDQvdC10YDQsNCy0L3QvtC80LXRgNC90L4g0YDQsNGB0L/RgNC10LTQtdC70LXQvdC90L7Qs9C+INGH0LjRgdC70LAg0LzQtdC20LTRgyBtaW4gKNCy0LrQu9GO0YfQuNGC0LXQu9GM0L3Qvikg0LggbWF4ICjQvdC1INCy0LrQu9GO0YfQsNGPIG1heClcbiAqIEBwYXJhbSAge051bWJlcn0gbWluINCc0LjQvdC40LzQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0LBcbiAqIEBwYXJhbSAge051bWJlcn0gbWF4INCc0LDQutGB0LjQvNCw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1INC/0LDRgNCw0LzQtdGC0YDQsFxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tUGFyYW0gPSAobWluLCBtYXgpID0+IHtcbiAgbGV0IHJlcztcbiAgLy8g0KbQuNC60LsgZG8gd2hpbGUg0LjRgdC60LvRjtGH0LDQtdGCINC/0L7Qu9GD0YfQtdC90LjQtSDQvdGD0LvRj1xuICBkbyB7XG4gICAgcmVzID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbik7XG4gIH0gd2hpbGUgKCFyZXMpO1xuICByZXR1cm4gcmVzO1xufTtcblxuLyoqXG4gKiDQktGL0YfQuNGB0LvQtdC90LjQtSDQstGA0LXQvNC10L3QuCDQv9GA0L7RhdC+0LbQtNC10L3QuNGPINC90LXQutC+0YLQvtGA0L7QuSDQtNC40YHRgtCw0L3RhtC40Lgg0YEg0LfQsNC00LDQvdC90L7QuSDRgdC60L7RgNC+0YHRgtGM0Y5cbiAqIEBwYXJhbSAge051bWJlcn0gZGlzdGFuY2Ug0JTQuNGB0YLQsNC90YbQuNGPXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHNwZWVkICAgINCh0LrQvtGA0L7RgdGC0YxcbiAqIEByZXR1cm4ge051bWJlcn0gICAgICAgICAg0JLRgNC10LzRj1xuICovXG5leHBvcnQgY29uc3QgZ2V0VGltZUJ5RGlzdGFuY2VBbmRTcGVlZCA9IChkaXN0YW5jZSwgc3BlZWQpID0+IE1hdGguZmxvb3IoZGlzdGFuY2UgLyBzcGVlZCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy5qcyIsImltcG9ydCB7IGdldFRpbWVCeURpc3RhbmNlQW5kU3BlZWQgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2ljUmFjZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMucG93ZXIgPSA1MDtcbiAgICB0aGlzLmRhbWFnZSA9IDE1O1xuICAgIHRoaXMud2Fsa2luZ1NwZWVkID0gNTtcbiAgICB0aGlzLnJ1bm5pbmdTcGVlZCA9IDE1O1xuICAgIHRoaXMubWF4SGVhbHRoID0gMTEwO1xuICB9XG4gIHdhbGsoZGlzdGFuY2UpIHtcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IHdhbGsgJHtkaXN0YW5jZX1rbSB3aXRoIHNwZWVkICR7dGhpcy53YWxraW5nU3BlZWR9a20vaCAodGltZSAtICR7Z2V0VGltZUJ5RGlzdGFuY2VBbmRTcGVlZChkaXN0YW5jZSwgdGhpcy53YWxraW5nU3BlZWQpfWgpYCk7XG4gIH1cbiAgcnVuKGRpc3RhbmNlKSB7XG4gICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBydW4gJHtkaXN0YW5jZX1rbSB3aXRoIHNwZWVkICR7dGhpcy5ydW5uaW5nU3BlZWR9a20vaCAodGltZSAtICR7Z2V0VGltZUJ5RGlzdGFuY2VBbmRTcGVlZChkaXN0YW5jZSwgdGhpcy5ydW5uaW5nU3BlZWQpfWgpYCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvQmFzaWNSYWNlLmpzIiwiaW1wb3J0IEJhc2ljUmFjZSBmcm9tICcuL0Jhc2ljUmFjZSc7XG5pbXBvcnQgeyBnZXRSYW5kb21QYXJhbSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgY2FjaGUgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxmIGV4dGVuZHMgQmFzaWNSYWNlIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpO1xuICAgIHRoaXMuaGVhbHRoID0gNzA7XG4gICAgdGhpcy5wb3dlciA9IDIwO1xuICAgIHRoaXMuZGFtYWdlID0gNDA7XG4gICAgdGhpcy5yYWNlID0gJ2VsZic7XG4gICAgdGhpcy5tYXhBcnJvd3MgPSAxMDtcbiAgICB0aGlzLm1heFNob290RGlzdGFuY2UgPSA5MDtcbiAgICB0aGlzLmh1bWFuSGVhbHRoRGVjcmVhc2VTdGVwRm9yT25lQXJyb3cgPSA1O1xuICAgIHRoaXMuaHVtYW5IZWFsdGhEZWNyZWFzZVN0ZXBGb3JPbmVVbml0T2ZEaXN0YW5jZSA9IDAuMTtcbiAgICB0aGlzLl9pZCA9IGdldFJhbmRvbVBhcmFtKDEwLCAxKTtcbiAgICBjYWNoZVt0aGlzLl9pZF0gPSAwO1xuICB9XG4gIGdldCBhcnJvd3NDb3VudCgpIHtcbiAgICByZXR1cm4gY2FjaGVbdGhpcy5faWRdO1xuICB9XG4gIHNob290KGVuZW15LCBhcnJvd3MsIGRpc3RhbmNlKSB7XG4gICAgdGhpcy5zaG9vdERpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgdGhpcy5uZXdBcnJvd3MgPSBjYWNoZVt0aGlzLl9pZF0gKyBhcnJvd3M7XG4gICAgY2FjaGVbdGhpcy5faWRdID0gdGhpcy5uZXdBcnJvd3M7XG4gICAgY29uc29sZS5pbmZvKGAke3RoaXMubmFtZX0gKCR7dGhpcy5yYWNlfSkgc2hvdCAke2Fycm93c30gYXJyb3dzIG9uICR7dGhpcy5zaG9vdERpc3RhbmNlfSAoaGUgY2FuIHNob290IHN0aWxsICR7dGhpcy5tYXhBcnJvd3MgLSBjYWNoZVt0aGlzLl9pZF19IGFycm93cylgKTtcbiAgICBlbmVteS51cGRhdGVIZWFsdGgoLShNYXRoLmZsb29yKChhcnJvd3MgKiB0aGlzLmh1bWFuSGVhbHRoRGVjcmVhc2VTdGVwRm9yT25lQXJyb3cpICsgKHRoaXMuc2hvb3REaXN0YW5jZSAqIHRoaXMuaHVtYW5IZWFsdGhEZWNyZWFzZVN0ZXBGb3JPbmVVbml0T2ZEaXN0YW5jZSkpKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvRWxmLmpzIiwiaW1wb3J0IEJhc2ljUmFjZSBmcm9tICcuL0Jhc2ljUmFjZSc7XG5pbXBvcnQgeyBnZXRSYW5kb21QYXJhbSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgY2FjaGUgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHVtYW4gZXh0ZW5kcyBCYXNpY1JhY2Uge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgc3VwZXIobmFtZSk7XG4gICAgdGhpcy5oZWFsdGggPSA4MDtcbiAgICB0aGlzLnBvd2VyID0gMzA7XG4gICAgdGhpcy5kYW1hZ2UgPSAxMDtcbiAgICB0aGlzLnJhY2UgPSAnaHVtYW4nO1xuICAgIHRoaXMubWF4QnVpbGQgPSAzO1xuICAgIHRoaXMuaGVhbHRoSW5jcmVtZW50U3RlcCA9IDEwO1xuICAgIHRoaXMuX2lkID0gZ2V0UmFuZG9tUGFyYW0oMTAsIDEpO1xuICAgIGNhY2hlW3RoaXMuX2lkXSA9IDA7XG4gIH1cbiAgZ2V0IGJ1aWxkQ291bnQoKSB7XG4gICAgcmV0dXJuIGNhY2hlW3RoaXMuX2lkXTtcbiAgfVxuICBidWlsZCgpIHtcbiAgICBjYWNoZVt0aGlzLl9pZF0gKz0gMTtcbiAgICBjb25zb2xlLmluZm8oYCR7dGhpcy5uYW1lfSAoJHt0aGlzLnJhY2V9KSBidWlsdCAoaGUgY2FuIGJ1aWxkIHN0aWxsICR7dGhpcy5tYXhCdWlsZCAtIHRoaXMuYnVpbGRzfSB0aW1lcylgKTtcbiAgICB0aGlzLnVwZGF0ZUhlYWx0aCgpO1xuICB9XG4gIHVwZGF0ZUhlYWx0aChoZWFsdGhJbmNyZW1lbnQgPSB0aGlzLmhlYWx0aEluY3JlbWVudFN0ZXApIHtcbiAgICBjb25zdCBwcmV2SGVhbHRoID0gdGhpcy5oZWFsdGg7XG4gICAgY29uc3QgbmV3SGVhbHRoID0gdGhpcy5oZWFsdGggKyBoZWFsdGhJbmNyZW1lbnQ7XG4gICAgdGhpcy5oZWFsdGggPSAobmV3SGVhbHRoIDw9IHRoaXMubWF4SGVhbHRoKSA/IG5ld0hlYWx0aCA6IHRoaXMubWF4SGVhbHRoO1xuICAgIGNvbnNvbGUubG9nKGAke3RoaXMubmFtZX0gKCR7dGhpcy5yYWNlfSkgbmV3IGhlYWx0aCA9ICR7dGhpcy5oZWFsdGh9ICgke3ByZXZIZWFsdGh9ICsgJHtoZWFsdGhJbmNyZW1lbnR9KWApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0h1bWFuLmpzIiwiaW1wb3J0IEJhc2ljUmFjZSBmcm9tICcuL0Jhc2ljUmFjZSc7XG5pbXBvcnQgeyBnZXRSYW5kb21QYXJhbSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgY2FjaGUgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JjIGV4dGVuZHMgQmFzaWNSYWNlIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpO1xuICAgIHRoaXMuaGVhbHRoID0gNDA7XG4gICAgdGhpcy5wb3dlciA9IDgwO1xuICAgIHRoaXMuZGFtYWdlID0gMTMwO1xuICAgIHRoaXMucmFjZSA9ICdvcmMnO1xuICAgIHRoaXMubWF4QXR0YWNrcyA9IDU7XG4gICAgdGhpcy5wb3dlckluY3JlbWVudFN0ZXAgPSAxMDtcbiAgICB0aGlzLmh1bWFuSGVhbHRoRGVjcmVhc2VTdGVwID0gMC4yO1xuICAgIHRoaXMuX2lkID0gZ2V0UmFuZG9tUGFyYW0oMTAsIDEpO1xuICAgIGNhY2hlW3RoaXMuX2lkXSA9IDA7XG4gIH1cbiAgZ2V0IGF0dGFja0NvdW50KCkge1xuICAgIHJldHVybiBjYWNoZVt0aGlzLl9pZF07XG4gIH1cbiAgYXR0YWNrKGVuZW15KSB7XG4gICAgY2FjaGVbdGhpcy5faWRdICs9IDE7XG4gICAgdGhpcy51cGRhdGVQb3dlcigpO1xuICAgIGVuZW15LnVwZGF0ZUhlYWx0aCgtTWF0aC5mbG9vcih0aGlzLnBvd2VyICogdGhpcy5odW1hbkhlYWx0aERlY3JlYXNlU3RlcCkpO1xuICB9XG4gIHVwZGF0ZVBvd2VyKHBvd2VySW5jcmVtZW50ID0gdGhpcy5wb3dlckluY3JlbWVudFN0ZXApIHtcbiAgICBjb25zdCBwcmV2UG93ZXIgPSB0aGlzLnBvd2VyO1xuICAgIHRoaXMucG93ZXIgKz0gcG93ZXJJbmNyZW1lbnQ7XG4gICAgY29uc29sZS5pbmZvKGAke3RoaXMubmFtZX0gKCR7dGhpcy5yYWNlfSkgYXR0YWNrZWQgKGhlIGNhbiBhdHRhY2sgc3RpbGwgJHt0aGlzLm1heEF0dGFja3MgLSB0aGlzLmF0dGFja3N9IHRpbWVzKS4gSGlzIG5ldyBwb3dlciA9ICR7dGhpcy5wb3dlcn0gKCR7cHJldlBvd2VyfSArICR7cG93ZXJJbmNyZW1lbnR9KWApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL09yYy5qcyIsImltcG9ydCBIdW1hbiBmcm9tICcuL2NvbXBvbmVudHMvSHVtYW4nO1xuaW1wb3J0IE9yYyBmcm9tICcuL2NvbXBvbmVudHMvT3JjJztcbmltcG9ydCBFbGYgZnJvbSAnLi9jb21wb25lbnRzL0VsZic7XG5pbXBvcnQgeyBnZXRSYW5kb21QYXJhbSB9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqINCd0L7QvNC10YAg0YLQtdC60YPRidC10LPQviDRhdC+0LTQsFxuICogQHR5cGUge051bWJlcn1cbiAqL1xubGV0IHR1cm5OdW1iZXI7XG5cbi8qKlxuICog0KHQvtC30LTQsNC90LjQtSDQsdC+0LnRhtCwXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHJhY2Ug0KLQuNC/INCx0L7QudGG0LAgKNC10LPQviDRgNCw0YHQsClcbiAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSDQmNC80Y8g0LHQvtC50YbQsFxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5jb25zdCBjcmVhdGVGaWdodGVyID0gKHJhY2UsIG5hbWUpID0+IHtcbiAgc3dpdGNoIChyYWNlKSB7XG4gICAgY2FzZSAnaHVtYW4nOlxuICAgICAgcmV0dXJuIG5ldyBIdW1hbihuYW1lKTtcbiAgICBjYXNlICdvcmMnOlxuICAgICAgcmV0dXJuIG5ldyBPcmMobmFtZSk7XG4gICAgY2FzZSAnZWxmJzpcbiAgICAgIHJldHVybiBuZXcgRWxmKG5hbWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb25zb2xlLmVycm9yKGBJdCBpcyBpbXBvc3NpYmxlIHRvIGNyZWF0ZSBhIGZpZ2h0ZXIuIFVua25vd24gcmFjZSBvZiBmaWdodGVyIC0gJHtyYWNlfWApO1xuICB9XG59O1xuXG4vKipcbiAqINCU0LXQu9Cw0LXQvCDRhdC+0LRcbiAqIEBwYXJhbSAge09iamVjdH0gZmlnaHRlciDQkdC+0LXRhiwg0LrQvtGC0L7RgNGL0Lkg0LTQtdC70LDQtdGCINGF0L7QtFxuICogQHBhcmFtICB7T2JqZWN0fSBlbmVteSAgINCf0YDQvtGC0LjQstC90LjQuiwg0LrQvtGC0L7RgNGL0Lkg0L/RgNC+0YLQuNCy0L7RgdGC0L7QuNGCINCx0L7QudGG0YNcbiAqL1xuY29uc3QgbWFrZU1vdmUgPSAoZmlnaHRlciwgZW5lbXkpID0+IHtcbiAgc3dpdGNoIChmaWdodGVyLnJhY2UpIHtcbiAgICBjYXNlICdodW1hbic6XG4gICAgICBmaWdodGVyLmJ1aWxkKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdvcmMnOlxuICAgICAgZmlnaHRlci5hdHRhY2soZW5lbXkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZWxmJzpcbiAgICAgIGNvbnN0IGN1cnJlbnRBcnJvd3MgPSBnZXRSYW5kb21QYXJhbSgxMCwgMSk7XG4gICAgICBjb25zdCBjdXJyZW50RGlzdGFuY2UgPSBnZXRSYW5kb21QYXJhbSg5MCwgMSk7XG4gICAgICBjb25zdCBiYXR0bGVOZWVkU3RvcCA9IGlzQmF0dGxlTmVlZFN0b3AoZmlnaHRlciwgY3VycmVudEFycm93cywgY3VycmVudERpc3RhbmNlKTtcbiAgICAgIGlmIChiYXR0bGVOZWVkU3RvcCkge1xuICAgICAgICBzdG9wQmF0dGxlKGJhdHRsZU5lZWRTdG9wKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpZ2h0ZXIuc2hvb3QoZW5lbXksIGN1cnJlbnRBcnJvd3MsIGN1cnJlbnREaXN0YW5jZSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS5lcnJvcignSXQgaXMgaW1wb3NzaWJsZSB0byBtYWtlIGEgbW92ZS4gVW5rbm93biByYWNlIG9mIGZpZ2h0ZXInKTtcbiAgfVxufTtcblxuLyoqXG4gKiDQn9GA0L7QstC10YDRj9C10Lwg0L3Rg9C20L3QviDQu9C4INC+0YHRgtCw0L3QvtCy0LjRgtGMINCx0L7QuSDQuNGB0YXQvtC00Y8g0LjQtyDRgdC+0YHRgtC+0Y/QvdC40Y8g0LrQsNC20LTQvtCz0L4g0LHQvtC50YbQsFxuICogQHBhcmFtICB7T2JqZWN0fSAgZmlnaHRlciDQn9GA0L7QstC10YDRj9C10LzRi9C5INCx0L7QtdGGXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmNvbnN0IGlzQmF0dGxlTmVlZFN0b3AgPSAoZmlnaHRlciwgYXJyb3dzLCBkaXN0YW5jZSkgPT4ge1xuICBzd2l0Y2ggKGZpZ2h0ZXIucmFjZSkge1xuICAgIGNhc2UgJ2h1bWFuJzpcbiAgICAgIGlmIChmaWdodGVyLmhlYWx0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYEJhdHRsZSBzdG9wcGVkLiAke2ZpZ2h0ZXIubmFtZX0gbG9zZXMgOi0oYDtcbiAgICAgIH0gZWxzZSBpZiAoZmlnaHRlci5idWlsZENvdW50KCkgPT09IGZpZ2h0ZXIubWF4QnVpbGQpIHtcbiAgICAgICAgcmV0dXJuIGBCYXR0bGUgc3RvcHBlZC4gJHtmaWdodGVyLm5hbWV9ICgke2ZpZ2h0ZXIucmFjZX0pIGNhbiBub3QgYnVpbGQgbW9yZWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgY2FzZSAnb3JjJzpcbiAgICAgIGlmIChmaWdodGVyLmF0dGFja0NvdW50KCkgPT09IGZpZ2h0ZXIubWF4QXR0YWNrcykge1xuICAgICAgICByZXR1cm4gYEJhdHRsZSBzdG9wcGVkLiAke2ZpZ2h0ZXIubmFtZX0gKCR7ZmlnaHRlci5yYWNlfSkgY2FuIG5vdCBhdHRhY2sgbW9yZWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgY2FzZSAnZWxmJzpcbiAgICAgIGlmIChmaWdodGVyLmFycm93c0NvdW50KCkgPj0gZmlnaHRlci5tYXhBcnJvd3MpIHtcbiAgICAgICAgcmV0dXJuIGBCYXR0bGUgc3RvcHBlZC4gJHtmaWdodGVyLm5hbWV9ICgke2ZpZ2h0ZXIucmFjZX0pIGNhbiBub3Qgc2hvb3QgbW9yZWA7XG4gICAgICB9IGVsc2UgaWYgKChmaWdodGVyLmFycm93c0NvdW50KCkgKyBhcnJvd3MpID4gZmlnaHRlci5tYXhBcnJvd3MpIHtcbiAgICAgICAgcmV0dXJuIGBCYXR0bGUgc3RvcHBlZC4gJHtmaWdodGVyLm5hbWV9ICgke2ZpZ2h0ZXIucmFjZX0pIGNhbiBub3Qgc2hvb3QgJHthcnJvd3N9IGFycm93cy4gSGUgY2FuIHNob290IG9ubHkgJHtmaWdodGVyLm1heEFycm93cyAtIGZpZ2h0ZXIuYXJyb3dzfWA7XG4gICAgICB9IGVsc2UgaWYgKGRpc3RhbmNlID4gZmlnaHRlci5tYXhTaG9vdERpc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBgQmF0dGxlIHN0b3BwZWQuICR7ZmlnaHRlci5uYW1lfSAoJHtmaWdodGVyLnJhY2V9KSBjYW4gbm90IHNob290IG9uICR7ZGlzdGFuY2V9IG1ldGVycy4gSGUgY2FuIHNob290IG9ubHkgb24gJHtmaWdodGVyLm1heFNob290RGlzdGFuY2V9YDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGBCYXR0bGUgc3RvcHBlZC4gVW5rbm93biByYWNlIG9mIGZpZ2h0ZXIgLSAke2ZpZ2h0ZXIucmFjZX1gO1xuICB9XG59O1xuXG4vKipcbiAqINCe0YHRgtCw0L3QvtCy0LrQsCDQsdC+0Y9cbiAqIEBwYXJhbSAge1N0cmluZ30gbWVzc2FnZSDQotC10LrRgdGCINGB0L7QvtCx0YnQtdC90LjRjywg0LrQvtGC0L7RgNC+0LUg0LHRg9C00LXRgiDQvtGC0L7QsdGA0LDQttC10L3QviDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y5cbiAqL1xuY29uc3Qgc3RvcEJhdHRsZSA9IChtZXNzYWdlKSA9PiB7XG4gIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgdHVybk51bWJlciA9IDA7XG59O1xuXG4vKipcbiAqINCX0LDQv9GD0YHQuiDQsdC+0Y9cbiAqIEBwYXJhbSAge1N0cmluZ30gZmlnaHRlclJhY2UxINCi0LjQvyAxLdC+0LPQviDQsdC+0LnRhtCwXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGZpZ2h0ZXJOYW1lMSDQmNC80Y8gMS3QvtCz0L4g0LHQvtC50YbQsFxuICogQHBhcmFtICB7U3RyaW5nfSBmaWdodGVyUmFjZTIg0KLQuNC/IDIt0L7Qs9C+INCx0L7QudGG0LBcbiAqIEBwYXJhbSAge1N0cmluZ30gZmlnaHRlck5hbWUyINCY0LzRjyAyLdC+0LPQviDQsdC+0LnRhtCwXG4gKi9cbmNvbnN0IGJhdHRsZSA9IChmaWdodGVyUmFjZTEsIGZpZ2h0ZXJOYW1lMSwgZmlnaHRlclJhY2UyLCBmaWdodGVyTmFtZTIpID0+IHtcbiAgdHVybk51bWJlciA9IDEwMDtcbiAgY29uc3QgZmlnaHRlcjEgPSBjcmVhdGVGaWdodGVyKGZpZ2h0ZXJSYWNlMSwgZmlnaHRlck5hbWUxKTtcbiAgY29uc3QgZmlnaHRlcjIgPSBjcmVhdGVGaWdodGVyKGZpZ2h0ZXJSYWNlMiwgZmlnaHRlck5hbWUyKTtcblxuICBpZiAoKGZpZ2h0ZXIxICYmIGZpZ2h0ZXIyKSAmJiAoZmlnaHRlcjEucmFjZSAhPT0gZmlnaHRlcjIucmFjZSkpIHtcbiAgICBpZiAoKGZpZ2h0ZXIxLnJhY2UgIT09ICdodW1hbicpICYmIChmaWdodGVyMi5yYWNlICE9PSAnaHVtYW4nKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgQmF0dGxlIGJldHdlZW4gJHtmaWdodGVyMS5yYWNlfSBhbmQgJHtmaWdodGVyMi5yYWNlfSBpcyBpbXBvc3NpYmxlLiBPbmUgb2YgdGhlIGZpZ2h0ZXJzIG11c3QgYmUgYSBodW1hbmApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0JhdHRsZSBzdGFydGVkJyk7XG4gICAgICB3aGlsZSAodHVybk51bWJlciA+IDApIHtcbiAgICAgICAgY29uc3QgYmF0dGxlTmVlZFN0b3AgPSBpc0JhdHRsZU5lZWRTdG9wKGZpZ2h0ZXIxKSB8fCBpc0JhdHRsZU5lZWRTdG9wKGZpZ2h0ZXIyKTtcbiAgICAgICAgaWYgKGJhdHRsZU5lZWRTdG9wKSB7XG4gICAgICAgICAgc3RvcEJhdHRsZShiYXR0bGVOZWVkU3RvcCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHVybk51bWJlciAlIDIpIHtcbiAgICAgICAgICBtYWtlTW92ZShmaWdodGVyMiwgZmlnaHRlcjEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1ha2VNb3ZlKGZpZ2h0ZXIxLCBmaWdodGVyMik7XG4gICAgICAgIH1cbiAgICAgICAgdHVybk51bWJlciAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKCdCYXR0bGUgYmV0d2VlbiB0d28gZmlnaHRlcnMgb2Ygb25lIHJhY2UgaXMgaW1wb3NzaWJsZScpO1xuICB9XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuYmF0dGxlKCdlbGYnLCAnQXJnb24nLCAnaHVtYW4nLCAnQm9iJyk7XG5jb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicpO1xuYmF0dGxlKCdodW1hbicsICdCb255JywgJ29yYycsICdCb2xnJyk7XG5jb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicpO1xuYmF0dGxlKCdodW1hbicsICdKYWtlJywgJ2VsZicsICdBcmdvbicpO1xuY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcbmJhdHRsZSgnb3JjJywgJ0JvbGcnLCAnbmluamEnLCAnS2F0dHknKTtcbmNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XG5iYXR0bGUoJ29yYycsICdCb2xnJywgJ2VsZicsICdBcmdvbicpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==