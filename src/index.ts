import Vue from 'vue'

class Tooltip {
    private div: HTMLElement|null = null;
    private block: HTMLElement|any = null;
    private span: HTMLElement|any = null;
    private show = false;
    private stop = false;
    // install(el: HTMLElement, node: HTMLElement) {
    private genTooltip() {
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.div.classList.add("tooltip");
        this.div.style.visibility = 'hidden';
        this.div.style.left = -100+'px';
        this.div.style.top = -100+'px';
        this.div.style.width = 100+'px';
        this.div.style.opacity = '0.9';
        this.div.style.border = '1px solid #e4e4e4';

        this.div.style.zIndex = "1000";

        this.block = document.createElement("div");
        this.block.style.color =  'black';
        this.block.style.backgroundColor = "rgb(255, 255, 255)";
        this.block.style.padding = "7px 12px";
        this.block.style.maxWidth = "100%";
        this.block.classList.add("tooltip-inner");
        this.div.appendChild(this.block);

        this.span = document.createElement("span");

        this.block.appendChild(this.span);

        document.body.appendChild(this.div);

        this.div.onmouseover = () => {
            this.stop = true;
        };
        this.div.onmouseout = () => {
            this.stop = false;
            if(this.div !== null) {
                this.div.style.opacity = '1';
                this.hideTooltip(1);
            }
        };
    }
    private showTooltip(opt: number): any {
        if(this.stop) return this.div!.style.opacity = '0';
        if(!this.show) return;
        setTimeout(() => {
            this.div!.style.opacity = opt.toString();
            opt = Math.round((opt+0.1)*10)/10;
            if(opt === 0.9) this.div!.style.visibility = 'visible';
            if(opt <= 0.9) this.showTooltip(opt);
        }, 20)
    }
    private hideTooltip(opt: number): any {
        if(this.stop) return this.div!.style.opacity = '1';
        if(this.show) return;
        setTimeout(() => {
            this.div!.style.opacity = opt.toString();
            opt = Math.round((opt-0.1)*10)/10;
            if(opt === 0) {
                this.div!.style.visibility = 'hidden';
                this.div!.style.left = -100+'px';
                this.div!.style.top = -100+'px';
            }
            if(opt >= 0) this.hideTooltip(opt);
        }, 20)
    }
    install(_vue: typeof Vue) {
        this.genTooltip();
        _vue.directive('tooltip',  (el, binding) => {
            el.onmouseover = (event) => {
                if ('show' in binding.value && !binding.value.show) return;
                this.span.innerHTML = binding.value.text;
                if(!('position' in binding.value)) binding.value.position = 'top';
                if(!('width' in binding.value)) binding.value.width = '200';
                if('color' in binding.value) this.block.style.color = binding.value.color;
                if('background' in binding.value) this.block.style.backgroundColor = binding.value.color;
                this.div!.style.width = binding.value.width+'px';
                switch (binding.value.position) {
                    case 'top':
                        this.div!.style.left = (event.pageX - (this.div!.clientWidth / 2 - 5))+'px';
                        this.div!.style.top = (event.pageY - (this.div!.clientHeight + 10 ))+'px';
                        break;
                    case 'bottom':
                        this.div!.style.left = (event.pageX - (this.div!.clientWidth / 2 - 5))+'px';
                        this.div!.style.top = (event.pageY + 20)+'px';
                        break;
                    case 'right':
                        this.div!.style.left = (event.pageX + 30)+'px';
                        this.div!.style.top = (event.pageY - (this.div!.clientHeight / 2))+'px';
                        break;
                    case 'left':
                        this.div!.style.left = (event.pageX - (this.div!.clientWidth + 10))+'px';
                        this.div!.style.top = (event.pageY - (this.div!.clientHeight / 2))+'px';
                        break;
                    default:
                        break;
                }
                this.show = true;
                if(this.div !== null) {
                    this.div!.style.opacity = '0';
                    this.showTooltip(0);
                }
            };
            el.onmouseout = (event) => {
                this.show = false;
                if(this.div !== null) {
                    this.div.style.opacity = '1';
                    this.hideTooltip(1);
                }
            };
        })
    }
};

const tooltip = new Tooltip();

try {
    // @ts-ignore
    window.VueLiteTooltip = tooltip;
} catch(err) {
    console.log(err);
}

export const VueLiteTooltip = tooltip;
export default tooltip;
module.exports = tooltip;

