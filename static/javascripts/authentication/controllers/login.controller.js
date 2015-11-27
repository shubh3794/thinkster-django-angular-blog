(function () {
  'use strict';

  angular
    .module('thinkster.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Authentication','Facebook'];

  /**
  * @namespace LoginController
  */
  function LoginController($location, $scope, Authentication,Facebook) {
    var vm = this;

    vm.login = login;
    vm.login_fb = login_fb;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.authentication.controllers.LoginController
    */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
    * @name login
    * @desc Log the user in
    * @memberOf thinkster.authentication.controllers.LoginController
    */
    function login() {
      Authentication.login(vm.email, vm.password);
    }

    function login_fb = function(){
      Facebook.login().then(function(response){   
      //this is where we'll contact backend. for now just log response          
      console.log(response);
           });
        }

  }
})();

