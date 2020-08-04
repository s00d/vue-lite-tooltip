"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueLiteTooltip = void 0;
var Tooltip = (function () {
    function Tooltip() {
        this.div = null;
        this.block = null;
        this.span = null;
        this.show = false;
        this.stop = false;
    }
    Tooltip.prototype.genTooltip = function () {
        var _this = this;
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.div.classList.add("tooltip");
        this.div.style.visibility = 'hidden';
        this.div.style.left = -100 + 'px';
        this.div.style.top = -100 + 'px';
        this.div.style.width = 100 + 'px';
        this.div.style.opacity = '0.9';
        this.div.style.border = '1px solid #e4e4e4';
        this.div.style.zIndex = "1000";
        this.block = document.createElement("div");
        this.block.style.color = 'black';
        this.block.style.backgroundColor = "rgb(255, 255, 255)";
        this.block.style.padding = "7px 12px";
        this.block.style.maxWidth = "100%";
        this.block.classList.add("tooltip-inner");
        this.div.appendChild(this.block);
        this.span = document.createElement("span");
        this.block.appendChild(this.span);
        document.body.appendChild(this.div);
        this.div.onmouseover = function () {
            _this.stop = true;
        };
        this.div.onmouseout = function () {
            _this.stop = false;
            if (_this.div !== null) {
                _this.div.style.opacity = '1';
                _this.hideTooltip(1);
            }
        };
    };
    Tooltip.prototype.showTooltip = function (opt) {
        var _this = this;
        if (this.stop)
            return this.div.style.opacity = '0';
        if (!this.show)
            return;
        setTimeout(function () {
            _this.div.style.opacity = opt.toString();
            opt = Math.round((opt + 0.1) * 10) / 10;
            if (opt === 0.9)
                _this.div.style.visibility = 'visible';
            if (opt <= 0.9)
                _this.showTooltip(opt);
        }, 20);
    };
    Tooltip.prototype.hideTooltip = function (opt) {
        var _this = this;
        if (this.stop)
            return this.div.style.opacity = '1';
        if (this.show)
            return;
        setTimeout(function () {
            _this.div.style.opacity = opt.toString();
            opt = Math.round((opt - 0.1) * 10) / 10;
            if (opt === 0) {
                _this.div.style.visibility = 'hidden';
                _this.div.style.left = -100 + 'px';
                _this.div.style.top = -100 + 'px';
            }
            if (opt >= 0)
                _this.hideTooltip(opt);
        }, 20);
    };
    Tooltip.prototype.install = function (_vue) {
        var _this = this;
        this.genTooltip();
        _vue.directive('tooltip', function (el, binding) {
            el.onmouseover = function (event) {
                if ('show' in binding.value && !binding.value.show)
                    return;
                _this.span.innerHTML = binding.value.text;
                if (!('position' in binding.value))
                    binding.value.position = 'top';
                if (!('width' in binding.value))
                    binding.value.width = '200';
                if ('color' in binding.value)
                    _this.block.style.color = binding.value.color;
                if ('background' in binding.value)
                    _this.block.style.backgroundColor = binding.value.color;
                _this.div.style.width = binding.value.width + 'px';
                switch (binding.value.position) {
                    case 'top':
                        _this.div.style.left = (event.pageX - (_this.div.clientWidth / 2 - 5)) + 'px';
                        _this.div.style.top = (event.pageY - (_this.div.clientHeight + 10)) + 'px';
                        break;
                    case 'bottom':
                        _this.div.style.left = (event.pageX - (_this.div.clientWidth / 2 - 5)) + 'px';
                        _this.div.style.top = (event.pageY + 20) + 'px';
                        break;
                    case 'right':
                        _this.div.style.left = (event.pageX + 30) + 'px';
                        _this.div.style.top = (event.pageY - (_this.div.clientHeight / 2)) + 'px';
                        break;
                    case 'left':
                        _this.div.style.left = (event.pageX - (_this.div.clientWidth + 10)) + 'px';
                        _this.div.style.top = (event.pageY - (_this.div.clientHeight / 2)) + 'px';
                        break;
                    default:
                        break;
                }
                _this.show = true;
                if (_this.div !== null) {
                    _this.div.style.opacity = '0';
                    _this.showTooltip(0);
                }
            };
            el.onmouseout = function (event) {
                _this.show = false;
                if (_this.div !== null) {
                    _this.div.style.opacity = '1';
                    _this.hideTooltip(1);
                }
            };
        });
    };
    return Tooltip;
}());
;
var tooltip = new Tooltip();
try {
    window.VueLiteTooltip = tooltip;
}
catch (err) {
    console.log(err);
}
exports.VueLiteTooltip = tooltip;
exports.default = tooltip;
module.exports = tooltip;
//# sourceMappingURL=index.js.map