let tooltip = {};

let div = null;
let block = null;
let span = null;
let show = false;
let stop = false;

let showTooltip = function (opt) {
    if(stop) return div.style.opacity = 0;
    if(!show) return;
    setTimeout(() => {
        div.style.opacity = opt;
        opt = Math.round((opt+0.1)*10)/10;
        if(opt === 0.9) div.style.visibility = 'visible';
        if(opt <= 0.9) showTooltip(opt);
    }, 20)
};

let hideTooltip = function (opt) {
    if(stop) return div.style.opacity = 1;
    if(show) return;
    setTimeout(() => {
        div.style.opacity = opt;
        opt = Math.round((opt-0.1)*10)/10;
        if(opt === 0) {
            div.style.visibility = 'hidden';
            div.style.left = -100+'px';
            div.style.top = -100+'px';
        }
        if(opt >= 0) hideTooltip(opt);
    }, 20)
};

let genTooltip = function () {
    div = document.createElement("div");
    div.style.position = "absolute";
    div.classList.add("tooltip");
    div.style.visibility = 'hidden';
    div.style.left = -100+'px';
    div.style.top = -100+'px';
    div.style.width = 100+'px';
    div.style.opacity = 0.9;
    div.style.border = '1px solid #e4e4e4';

    div.style.zIndex = "1000";

    block = document.createElement("div");
    block.style.color =  'black';
    block.style.backgroundColor = "rgb(255, 255, 255)";
    block.style.padding = "7px 12px";
    block.style.maxWidth = "100%";
    block.classList.add("tooltip-inner");
    div.appendChild(block);

    span = document.createElement("span");

    block.appendChild(span);

    document.body.appendChild(div);

    div.onmouseover = function (event) {
        stop = true;
    };
    div.onmouseout = function (event) {
        stop = false;
        if(div !== null) {
            div.style.opacity = 1;
            hideTooltip(1);
        }
    };
};

tooltip.install = function(Vue) {
    genTooltip();
    Vue.directive('tooltip', function (el, binding) {
        el.onmouseover = function (event) {
            if ('show' in binding.value && !binding.value.show) return;
            span.innerHTML =  binding.value.text;
            if(!('position' in binding.value)) binding.value.position = 'top';
            if(!('width' in binding.value)) binding.value.width = '200';
            if('color' in binding.value) block.style.color = binding.value.color;
            if('background' in binding.value) block.style.backgroundColor = binding.value.color;
            div.style.width = binding.value.width+'px';
            switch (binding.value.position) {
                case 'top':
                    div.style.left = (event.pageX - (div.clientWidth / 2 - 5))+'px';
                    div.style.top = (event.pageY - (div.clientHeight + 10 ))+'px';
                    break;
                case 'bottom':
                    div.style.left = (event.pageX - (div.clientWidth / 2 - 5))+'px';
                    div.style.top = (event.pageY + 20)+'px';
                    break;
                case 'right':
                    div.style.left = (event.pageX + 30)+'px';
                    div.style.top = (event.pageY - (div.clientHeight / 2))+'px';
                    break;
                case 'left':
                    div.style.left = (event.pageX - (div.clientWidth + 10))+'px';
                    div.style.top = (event.pageY - (div.clientHeight / 2))+'px';
                    break;
                default:
                    break;
            }
            show = true;
            if(div !== null) {
                div.style.opacity = 0;
                showTooltip(0);
            }
        };
        el.onmouseout = function (event) {
            show = false;
            if(div !== null) {
                div.style.opacity = 1;
                hideTooltip(1);
            }
        };
        // el.onmousemove = function (event) {
        //     console.log(event);
        // };
    })
};

try {
    window.VueLiteTooltip = tooltip;
} catch(err) {}

export let VueLiteTooltip = tooltip;