(function(){

'use strict'

angular
  .module('stockApp.landing')
  .config(configFunction)

  configFunction.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configFunction($stateProvider, $urlRouterProvider){
  //landing page state
  $stateProvider.state('home', {
      url: '/',
      views: {
        'header': {
           templateUrl: 'app/common/header.html'
        },
        'content': {
           templateUrl: 'app/landing/landing.html',
           controller:  'LandingController',
           controllerAs: 'vm'
        },
        'footer' : {
          templateUrl: 'app/common/footer.html'
        }
      },
      data : {
        authenticate: false
      }

    });

    $urlRouterProvider.otherwise('/');

}



})();
