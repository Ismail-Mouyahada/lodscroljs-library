interface LodScrolJSOptions {
    container?: HTMLElement | Window;
    loadMore: (done: () => void) => Promise<void>;
    threshold?: number;
}
declare class LodScrolJS {
    private container;
    private loadMore;
    private threshold;
    private isLoading;
    private onScroll;
    constructor(options: LodScrolJSOptions);
    private validateOptions;
    private init;
    private handleScroll;
    private finishLoading;
    destroy(): void;
}
export default LodScrolJS;
