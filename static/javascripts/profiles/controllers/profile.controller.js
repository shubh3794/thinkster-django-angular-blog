(function(){
	'use strict';
	angular.module('thinkster.profiles.controllers')
	.controller('ProfileController',ProfileController);

	ProfileController.$inject = ['$location','$routeParams','Posts','Profile','Snackbar'];

	function ProfileController($location,$routeParams,Posts,Profile,Snackbar){


		var vm = this;
		vm.profile = undefined;
		vm.posts= [];
		activate();

		function activate(){

			var username = $routeParams.username.substr(1);
			console.log(username);
			Profile.get(username).then(ProfSuc,ProfErr);
			Posts.get(username).then(PostSuc,PostErr);

			function ProfSuc(data, status, headers, config){

				vm.profile = data.data;
			};

			function ProfErr(data , status, headers, config){
				$location.url('/');
        		Snackbar.error('That user does not exist.');
			};

			function PostSuc(data, status, headers, config){

				vm.posts = data.data;
			};

			function PostErr(data , status, headers, config){
        		Snackbar.error(data.data.error);
			
			};
		};
	};
})();