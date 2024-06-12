interface LodScrolJSOptions {
  container?: HTMLElement | Window;
  loadMore: (done: () => void) => Promise<void>;
  threshold?: number;
}

class LodScrolJS {
  private container: HTMLElement | Window;
  private loadMore: (done: () => void) => Promise<void>;
  private threshold: number;
  private isLoading: boolean;
  private onScroll: () => void;

  constructor(options: LodScrolJSOptions) {
    this.validateOptions(options);
    this.container = options.container || window;
    this.loadMore = options.loadMore;
    this.threshold = options.threshold || 100;
    this.isLoading = false;
    this.onScroll = this.handleScroll.bind(this);
    this.init();
  }

  private validateOptions(options: LodScrolJSOptions) {
    if (typeof options.loadMore !== 'function') {
      throw new Error('loadMore must be a function');
    }
    if (options.container && !(options.container instanceof HTMLElement) && options.container !== window) {
      throw new Error('container must be an instance of HTMLElement or window');
    }
    if (options.threshold && typeof options.threshold !== 'number') {
      throw new Error('threshold must be a number');
    }
  }

  private init() {
    this.container.addEventListener('scroll', this.onScroll);
  }

  private async handleScroll() {
    if (this.isLoading) return;
    const { scrollTop, scrollHeight, clientHeight } = this.container === window
      ? document.documentElement
      : this.container as HTMLElement;

    if (scrollHeight - scrollTop <= clientHeight + this.threshold) {
      this.isLoading = true;
      await this.loadMore(this.finishLoading.bind(this));
    }
  }

  private finishLoading() {
    this.isLoading = false;
  }

  public destroy() {
    this.container.removeEventListener('scroll', this.onScroll);
  }
}

export default LodScrolJS;
