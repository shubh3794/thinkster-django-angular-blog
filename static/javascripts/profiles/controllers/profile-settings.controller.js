(function(){
	'use strict';
	angular.module('thinkster.profiles.controllers')
	.controller('ProfileSettingsController', ProfileSettingsController);

	ProfileSettingsController.$inject = ['$location', '$routeParams', 'Authentication', 'Snackbar', 'Profile'];

	function ProfileSettingsController($location,$routeParams,Authentication,Snackbar,Profile){
		var vm = this;
		vm.destroy = destroy;
		vm.update = update;

		activate();

		function activate(){
			var username = $routeParams.username.substr(1);
			var authacc = Authentication.getAuthenticatedAccount();
			if (!authacc){
				$location.url('/');
				Snackbar.error('You are not authenticated');

			}
			else if (authacc.username !== username){
				Snackbar.error('You arent the owner of this account');
			}


		Profile.get(username).then(FetchProfSuc, FetchProfErr);

		function profileSuccessFn(data, status, headers, config) {
        	vm.profile = data.data;
      	};

      	function profileErrorFn(data, status, headers, config) {
        	$location.url('/');
        	Snackbar.error('That user does not exist.');
      	};
	};

		function destroy(){
			Profile.delete(vm.profile).then(DestrSuc, DestrErr);
		      

		    function DestrSuc(data, status, headers, config) {
    		    Authentication.unauthenticate();
        		window.location = '/';
        		Snackbar.show('Your account has been deleted.');
      		};


      		function DestrErr(data, status, headers, config) {
        		Snackbar.error(data.error);
      		};
		};

		function update(){
			Profile.update(vm.profile).then(profileSuccessFn,profileErrorFn);
			

			function profileSuccessFn(data, status, headers, config) {
        			Snackbar.show('Your profile has been updated.');
      			};

      		function profileErrorFn(data, status, headers, config) {
        			Snackbar.error(data.error);
      			};


		};
	}
})();