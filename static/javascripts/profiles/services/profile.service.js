(function(){
	'use strict';
	angular.module('thinkster.profiles.services')
	.factory('Profile',Profile);

	Profile.$inject=['$http']

	function Profile($http){

		var profile = {
			destroy:destroy,
			get:get,
			update:update
		}
		return profile;

		function get(username){
			return $http.get('/api/v1/accounts/'+username+'/');

		};

		function destroy(profile){
			return $http.delete('/api/v1/accounts/'+profile.id+'/');
		};

		function update(profile){

			return $http.put('api/v1/accounts/'+profile.username + '/', profile);
			
		};


	};

})();