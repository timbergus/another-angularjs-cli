import angular from 'angular';
import router from 'angular-ui-router';

import Home from './states/home/home';

const providers = ['$stateProvider', '$urlRouterProvider'];

angular
  .module('myApp', [router])
  .config([...providers, (state, routerProvider) => {
    state
      .state('home', Home);
    routerProvider.otherwise('/');
  }]);
