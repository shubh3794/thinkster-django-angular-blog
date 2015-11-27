/**
* Register controller
* @namespace thinkster.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];



  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication) {
    var vm = this;
      activate();


function activate() {
  // If the user is authenticated, they should not be here.
  if (Authentication.isAuthenticated()) {
    $location.url('/');
  }
};

    vm.register = register;
  function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
  }).then(registerSuccessFn, registerErrorFn);

  
  function registerSuccessFn(data, status, headers, config) {
    Authentication.login(email, password);
  };

 
  function registerErrorFn(data, status, headers, config) {
    console.error('Epic failure!');
  };
};
};
})();
