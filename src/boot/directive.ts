import LazyLoadDirective from 'src/directives/LazyLoadDirective';

export default ({ app, router, store}) => {
  app.directive('lazyload', LazyLoadDirective);
}

