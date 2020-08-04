import Vue from 'vue';
declare class Tooltip {
    private div;
    private block;
    private span;
    private show;
    private stop;
    private genTooltip;
    private showTooltip;
    private hideTooltip;
    install(_vue: typeof Vue): void;
}
declare const tooltip: Tooltip;
export declare const VueLiteTooltip: Tooltip;
export default tooltip;
