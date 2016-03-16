(function(){

'use strict'

angular
  .module('stockApp.settings')
  .config(configFunction)

  configFunction.$inject = ['$stateProvider'];

  function configFunction($stateProvider){


  //landing page state
  $stateProvider
    .state('settings', {
        url: '/settings',
        views: {
          'header': {
             templateUrl: 'app/common/header.html'
          },
          'content': {
             templateUrl: 'app/settings/settings.html',
             controller:  'SettingsController',
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

}

})();
