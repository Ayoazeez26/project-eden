export default {
  inserted: function (el) {
    const img = el as HTMLImageElement
    const lazyLoadingSupported = 'loading' in HTMLImageElement.prototype

    if (lazyLoadingSupported) {
      img.setAttribute('loading', 'lazy')
    } else {
      // Otherwise use IntersectionObserver API
    }
  }
}
