(function(){
	'use strict'
	angular.module('thinkster.posts')
	.factory('Posts',Posts);


	Posts.$inject=['$http'];


	function Posts($http){
		var Post = {
			create : create,
			all : all,
			get : get
		};
		return Post;

	function all(){
		return $http.get('/api/v1/posts/');

	};
	function get(username){
		var x = $http.get('/api/v1/accounts/'+username+'/posts/');
		console.log(x.success);
		return x
	};

	function create(cont){
		return $http.post('/api/v1/posts/', {content : cont});
	};
}

})();