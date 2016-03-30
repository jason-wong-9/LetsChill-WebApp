angular.module('userService', [])

.factory('User', function($http){
	var userFactory = {};

	userFactory.create = function(userData, sessionId){
		return $http.post('/sessions/' + sessionId, userData);
	}
	userFactory.getUser = function() {
		
	}
});