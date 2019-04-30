var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.select = function (e) { return document.querySelector(e); };
        this.selectAll = function (e) { return document.querySelectorAll(e); };
        this.mainTl = new TimelineMax();
        this.dot = this.select('.dot');
        var dotArray = [];
        var container = this.select('.container');
        var num = 260;
        var stageWidth = 600;
        var stageHeight = 600;
        var mainCircleRadius = 220;
        var duration = 8;
        var colorArray = ["#364C62", "#F1C40F", "#E67E22", "#E74C3C", "#ECF0F1", "#95A5A6", "#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50", "#F39C12", "#D35400", "#C0392B", "#BDC3C7", "#1ABC9C", "#2ECC71", "#E87AC2", "#3498DB", "#9B59B6", "#7F8C8D"];
        var step = 360 / num;
        var tl = new TimelineMax();
        this.mainTl.add(tl);
        for (var i = 0; i < num; i++) {
            var clone = this.dot.cloneNode(true);
            container.appendChild(clone);
            var angle = step * i;
            var point = {
                x: (Math.cos(angle * Math.PI / 180) * mainCircleRadius) + stageWidth / 2,
                y: (Math.sin(angle * Math.PI / 180) * mainCircleRadius) + stageHeight / 2
            };
            TweenMax.set(clone, {
                x: stageWidth,
                y: this.randomBetween((stageHeight / 2) - 30, (stageHeight / 2) + 30),
                attr: {
                    r: this.randomBetween(1, 3) / 10
                },
                fill: colorArray[i % colorArray.length],
                alpha: 1,
                transformOrigin: '50% 50%'
            });
            dotArray.push(clone);
        }
        TweenMax.set('#portalContainer', {
            skewX: 50,
            x: 20,
            y: -36,
            rotation: 70,
            transformOrigin: '50% 50%',
            scale: 0.28
        });
        TweenMax.set('#greyPortalContainer', {
            skewX: 50,
            x: 20,
            y: -36,
            rotation: 70,
            transformOrigin: '50% 50%',
            scale: 0.28
        });
        TweenMax.set('.hoop', {
            rotation: 180,
            transformOrigin: '50% 50%'
        });
        TweenMax.to('#portal', 1.5, {
            rotation: -360,
            repeat: -1,
            ease: Linear.easeNone,
            transformOrigin: '50% 49%'
        });
        tl.staggerFromTo(dotArray, 1, {
            cycle: {
                scale: function (i, el) {
                    var s = _this.randomBetween(10, 100) / 10;
                    var a = s / 10;
                    el.setAttribute('data-scale', s);
                    return s;
                }
            }
        }, {
            cycle: {
                scale: function (i, el) {
                    return Number(el.getAttribute('data-scale'));
                },
                duration: function (i, el) {
                    return 12 - Number(el.getAttribute('data-scale'));
                },
                repeatDelay: function () {
                    return 0;
                },
                y: function () {
                    return _this.randomBetween((stageHeight / 2) - 30, (stageHeight / 2) + 30);
                }
            },
            x: 0,
            onUpdate: function (e) {
                if (e.progress().toFixed(1) == 0.5) {
                    e.target.classList.add('desat');
                }
                else if (e.progress().toFixed(1) == 0) {
                    e.target.classList.remove('desat');
                }
            },
            onUpdateParams: ["{self}"],
            repeat: -1,
            ease: Linear.easeNone
        }, 0.006);
        this.mainTl.seek(1000);
    }
    App.prototype.randomBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return App;
}());
TweenMax.set('svg', {
    visibility: 'visible'
});
var app = new App();