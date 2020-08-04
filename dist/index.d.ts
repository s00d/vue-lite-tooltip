import Vue from 'vue';
declare class Tooltip {
    div: HTMLElement | null;
    block: HTMLElement | any;
    span: HTMLElement | any;
    show: boolean;
    stop: boolean;
    genTooltip(): void;
    showTooltip(opt: number): any;
    hideTooltip(opt: number): any;
    install(_vue: typeof Vue): void;
}
export declare let VueLiteTooltip: Tooltip;
export {};
