class LodScrolJS {
    constructor(options) {
      this.validateOptions(options);
  
      this.container = options.container || window;
      this.loadMore = options.loadMore;
      this.threshold = options.threshold || 100;
      this.isLoading = false;
  
      this.onScroll = this.onScroll.bind(this);
      this.init();
    }
  
    validateOptions(options) {
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
  
    init() {
      this.container.addEventListener('scroll', this.onScroll);
    }
  
    async onScroll() {
      if (this.isLoading) return;
  
      const { scrollTop, scrollHeight, clientHeight } = this.container === window
        ? document.documentElement
        : this.container;
  
      if (scrollHeight - scrollTop <= clientHeight + this.threshold) {
        this.isLoading = true;
        await this.loadMore(this.finishLoading.bind(this));
      }
    }
  
    finishLoading() {
      this.isLoading = false;
    }
  
    destroy() {
      this.container.removeEventListener('scroll', this.onScroll);
    }
  }
  
  export default LodScrolJS;
  